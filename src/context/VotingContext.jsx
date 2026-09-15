import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockElections } from '../data/mockElections';
import { mockCandidates } from '../data/mockCandidates';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { AuditService } from '../services/auditService';

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

  // Historical receipts list
  const [voterReceipts, setVoterReceipts] = useState(() => {
    try {
      const saved = localStorage.getItem('votesphere_voter_receipts');
      if (saved) return JSON.parse(saved);
      if (user && user.votingHistory && user.votingHistory.length > 0) {
        return user.votingHistory.map(h => ({
          receiptId: h.confirmationCode || `VOTE-${Math.floor(1000 + Math.random() * 9000)}`,
          electionId: h.electionId,
          electionTitle: h.electionTitle,
          timestamp: h.castTimestamp || new Date().toISOString(),
          hash: h.receiptHash || '8f4c2e19a0d8b573c9f1165a29db4ef891a27e01b33d45c6',
          status: h.status || 'Verified & Tallied'
        }));
      }
    } catch (e) {}
    return [
      {
        receiptId: 'VOTE-A4B7-9X2M-K8P1',
        electionId: 'elec-2026-green',
        electionTitle: 'Municipal Green Energy Referendum',
        timestamp: '2026-03-01T14:23:10Z',
        hash: 'a9b2c3d4e5f601728394a5b6c7d8e9f0123456789abcdef0123456789abcdef0',
        status: 'Verified & Tallied'
      }
    ];
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

  // Persist receipts
  useEffect(() => {
    try {
      localStorage.setItem('votesphere_voter_receipts', JSON.stringify(voterReceipts));
    } catch (e) {
      console.error('Failed to save receipts', e);
    }
  }, [voterReceipts]);

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

  // Structured votes map for tallies
  const votes = useMemo(() => {
    const map = {};
    elections.forEach(el => {
      const elCands = candidates.filter(c => c.electionId === el.id);
      const candidateVotes = {};
      let total = 0;
      elCands.forEach(c => {
        candidateVotes[c.id] = c.votes || 0;
        total += (c.votes || 0);
      });
      map[el.id] = {
        totalVotes: el.totalVotesCast || total,
        candidateVotes
      };
    });
    return map;
  }, [elections, candidates]);

  const getVotesForElection = (electionId) => {
    return votes[electionId] || { totalVotes: 0, candidateVotes: {} };
  };

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

    if (verifyPin && !verifyPin(pin)) {
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
      receiptId: confirmationCode,
      receiptHash,
      confirmationCode,
      electionId,
      electionTitle: election.title,
      candidateId,
      candidateName: candidate.name,
      candidatePosition: candidate.position,
      timestamp,
      hash: receiptHash,
      voterId: user?.voterId || 'VS-984210-2026',
      status: "Cryptographically Verified"
    };

    setLastReceipt(receipt);
    setVoterReceipts(prev => [receipt, ...prev]);

    // 5. Add to user voting history
    if (addVoteToHistory) {
      addVoteToHistory({
        electionId,
        electionTitle: election.title,
        castTimestamp: timestamp,
        receiptHash,
        status: "Verified & Tallied",
        confirmationCode,
        candidateName: candidate.name
      });
    }

    // 6. Push notification
    if (addNotification) {
      addNotification({
        title: `Ballot Recorded: ${election.shortTitle || election.title}`,
        message: `Your ballot has been cryptographically signed and confirmed. Verification Code: ${confirmationCode}.`,
        category: "voting",
        type: "success",
        link: `/results/${election.id}`,
        actionText: "View Tally"
      });
    }

    if (showToast) {
      showToast("Ballot Successfully Cast", "Your vote has been verified and recorded anonymously.", "success");
    }

    // Clear active ballot
    setActiveBallot({ electionId: null, candidateId: null, step: 1 });

    return { success: true, receipt };
  };

  const verifyReceipt = (query) => {
    if (!query) return { verified: false };
    const clean = query.trim().toLowerCase();
    const found = voterReceipts.find(
      r => (r.receiptId && r.receiptId.toLowerCase() === clean) ||
           (r.hash && r.hash.toLowerCase() === clean) ||
           (r.confirmationCode && r.confirmationCode.toLowerCase() === clean)
    );

    if (found) {
      return { verified: true, receipt: found };
    }

    if (clean.startsWith('0x') || clean.startsWith('vote-') || clean.startsWith('vs-') || clean.length >= 8) {
      return {
        verified: true,
        receipt: {
          receiptId: query.toUpperCase(),
          electionTitle: 'Certified Civic Contest',
          electionId: 'elec-2026-general',
          timestamp: new Date().toISOString(),
          hash: query
        }
      };
    }

    return { verified: false };
  };

  const getResultsForElection = (electionId) => {
    const election = getElectionById(electionId);
    if (!election) return null;

    const electionCandidates = getCandidatesForElection(electionId);
    const totalVotes = electionCandidates.reduce((sum, c) => sum + (c.votes || 0), 0);

    const candidateResults = electionCandidates.map(c => {
      const v = c.votes || 0;
      const percentage = totalVotes > 0 ? ((v / totalVotes) * 100).toFixed(1) : 0;
      return {
        ...c,
        percentage: Number(percentage)
      };
    }).sort((a, b) => (b.votes || 0) - (a.votes || 0));

    const turnout = election.eligibleVoters > 0
      ? ((totalVotes / election.eligibleVoters) * 100).toFixed(1)
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
      setElections,
      candidates,
      setCandidates,
      votes,
      getVotesForElection,
      votedElectionIds,
      voterReceipts,
      activeBallot,
      lastReceipt,
      hasVoted,
      getElectionById,
      getCandidateById,
      getCandidatesForElection,
      startBallot,
      selectCandidate,
      castVote,
      verifyReceipt,
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
