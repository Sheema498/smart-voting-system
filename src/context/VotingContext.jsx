import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockElections } from '../data/mockElections';
import { mockCandidates } from '../data/mockCandidates';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const VotingContext = createContext(null);

export const VotingProvider = ({ children }) => {
  const { user, addVoteToHistory, verifyPin } = useAuth();
  const { addNotification, showToast } = useNotifications();

  // Load elections
  const [elections, setElections] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_elections');
      return saved ? JSON.parse(saved) : mockElections;
    } catch (e) {
      return mockElections;
    }
  });

  // Load candidates
  const [candidates, setCandidates] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_candidates');
      return saved ? JSON.parse(saved) : mockCandidates;
    } catch (e) {
      return mockCandidates;
    }
  });

  // Track voted election IDs
  const [votedElectionIds, setVotedElectionIds] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_voted_elections');
      if (saved) return JSON.parse(saved);
      // Default to what user history already contains
      return user && user.votingHistory ? user.votingHistory.map(h => h.electionId) : ['elec-2026-green'];
    } catch (e) {
      return ['elec-2026-green'];
    }
  });

  // In-flight ballot selection
  const [activeBallot, setActiveBallot] = useState({
    electionId: null,
    candidateId: null,
    step: 1
  });

  // Last completed receipt
  const [lastReceipt, setLastReceipt] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_last_receipt');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Persist elections
  useEffect(() => {
    try {
      localStorage.setItem('votesphere_elections', JSON.stringify(elections));
    } catch (e) {
      console.error('Failed to save elections', e);
    }
  }, [elections]);

  // Persist candidates
  useEffect(() => {
    try {
      localStorage.setItem('votesphere_candidates', JSON.stringify(candidates));
    } catch (e) {
      console.error('Failed to save candidates', e);
    }
  }, [candidates]);

  // Persist voted election IDs
  useEffect(() => {
    try {
      localStorage.setItem('votesphere_voted_elections', JSON.stringify(votedElectionIds));
    } catch (e) {
      console.error('Failed to save voted elections', e);
    }
  }, [votedElectionIds]);

  // Persist last receipt
  useEffect(() => {
    if (lastReceipt) {
      try {
        localStorage.setItem('votesphere_last_receipt', JSON.stringify(lastReceipt));
      } catch (e) {
        console.error('Failed to save last receipt', e);
      }
    }
  }, [lastReceipt]);

  const hasVoted = (electionId) => {
    return votedElectionIds.includes(electionId);
  };

  const getElectionById = (id) => {
    return elections.find(e => e.id === id);
  };

  const getCandidateById = (id) => {
    return candidates.find(c => c.id === id);
  };

  const getCandidatesForElection = (electionId) => {
    return candidates.filter(c => c.electionId === electionId);
  };

  // Helper to generate simulated cryptographic SHA-256 hash
  const generateBallotHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 48; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const startBallot = (electionId) => {
    setActiveBallot({
      electionId,
      candidateId: null,
      step: 1
    });
  };

  const selectCandidate = (candidateId) => {
    setActiveBallot(prev => ({
      ...prev,
      candidateId
    }));
  };

  const castVote = ({ electionId, candidateId, pin }) => {
    if (!electionId || !candidateId) {
      return { success: false, error: 'Please select a candidate before proceeding.' };
    }

    if (hasVoted(electionId)) {
      return { success: false, error: 'You have already cast your ballot in this election.' };
    }

    if (!verifyPin(pin)) {
      return { success: false, error: 'Invalid security PIN. Default demo PIN is 1234.' };
    }

    const election = getElectionById(electionId);
    const candidate = getCandidateById(candidateId);

    if (!election || !candidate) {
      return { success: false, error: 'Election or candidate record not found.' };
    }

    const timestamp = new Date().toISOString();
    const receiptHash = generateBallotHash();
    const confirmationCode = `VS-REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // 1. Increment candidate vote tally
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return { ...c, votes: (c.votes || 0) + 1 };
      }
      return c;
    }));

    // 2. Increment election total votes cast
    setElections(prev => prev.map(e => {
      if (e.id === electionId) {
        return { ...e, totalVotesCast: (e.totalVotesCast || 0) + 1 };
      }
      return e;
    }));

    // 3. Mark as voted in context
    setVotedElectionIds(prev => [...prev, electionId]);

    // 4. Construct receipt
    const receipt = {
      receiptHash,
      confirmationCode,
      electionId,
      electionTitle: election.title,
      candidateId,
      candidateName: candidate.name,
      candidatePosition: candidate.position,
      timestamp,
      voterId: user.voterId,
      status: "Cryptographically Verified"
    };

    setLastReceipt(receipt);

    // 5. Add to user voting history
    addVoteToHistory({
      electionId,
      electionTitle: election.title,
      castTimestamp: timestamp,
      receiptHash,
      status: "Verified & Tallied",
      confirmationCode,
      candidateName: candidate.name
    });

    // 6. Push notification
    addNotification({
      title: `Ballot Recorded: ${election.shortTitle}`,
      message: `Your ballot has been cryptographically signed and confirmed. Verification Code: ${confirmationCode}.`,
      category: "voting",
      type: "success",
      link: "/results",
      actionText: "View Tally"
    });

    showToast("Ballot Successfully Cast", "Your vote has been verified and recorded anonymously.", "success");

    // Clear active ballot
    setActiveBallot({ electionId: null, candidateId: null, step: 1 });

    return { success: true, receipt };
  };

  const getResultsForElection = (electionId) => {
    const election = getElectionById(electionId);
    if (!election) return null;

    const electionCandidates = getCandidatesForElection(electionId);
    const totalVotes = electionCandidates.reduce((sum, c) => sum + (c.votes || 0), 0);

    const candidateResults = electionCandidates.map(c => {
      const votes = c.votes || 0;
      const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
      return {
        ...c,
        percentage: Number(percentage)
      };
    }).sort((a, b) => (b.votes || 0) - (a.votes || 0));

    const turnout = election.totalEligibleVoters > 0
      ? ((election.totalVotesCast / election.totalEligibleVoters) * 100).toFixed(1)
      : 0;

    return {
      election,
      totalVotes,
      turnout: Number(turnout),
      candidates: candidateResults,
      winner: candidateResults.length > 0 ? candidateResults[0] : null
    };
  };

  return (
    <VotingContext.Provider value={{
      elections,
      candidates,
      votedElectionIds,
      activeBallot,
      lastReceipt,
      hasVoted,
      getElectionById,
      getCandidateById,
      getCandidatesForElection,
      startBallot,
      selectCandidate,
      castVote,
      getResultsForElection
    }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};
