import React, { useState, useMemo } from 'react';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  BarChart3,
  CheckCircle2,
  Trophy,
  Users,
  ShieldCheck,
  Search,
  Lock,
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';

export const ResultsPage = () => {
  const { elections, getResultsForElection } = useVoting();
  const [selectedElectionId, setSelectedElectionId] = useState(
    elections[0]?.id || 'elec-2026-sc'
  );

  // Hash lookup state
  const [auditQuery, setAuditQuery] = useState('');
  const [auditResult, setAuditResult] = useState(null);

  const resultsData = useMemo(() => {
    return getResultsForElection(selectedElectionId);
  }, [selectedElectionId, getResultsForElection]);

  const handleAuditLookup = (e) => {
    e.preventDefault();
    if (!auditQuery.trim()) return;

    // Simulated cryptographic audit verification
    setAuditResult({
      code: auditQuery.trim(),
      status: 'Verified Valid in Official Ledger',
      blockNumber: 'Block #8492-2026',
      timestamp: new Date().toLocaleTimeString(),
      anonymity: 'Zero-Knowledge Sealed'
    });
  };

  if (!resultsData) return null;

  const { election, totalVotes, turnout, candidates, winner } = resultsData;
  const isCompleted = election.status === 'completed';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Electoral Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Official Election Results & Tallies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Real-time and certified election returns with cryptographic auditability. Track voter turnout, vote distribution, and winner declarations.
        </p>
      </div>

      {/* Election Selector Tab Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {elections.map((el) => {
          const isSelected = el.id === selectedElectionId;
          return (
            <button
              key={el.id}
              onClick={() => {
                setSelectedElectionId(el.id);
                setAuditResult(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {el.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Total Ballots Counted</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">
            {totalVotes.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">
            Across {election.positions ? election.positions.length : 1} positions
          </p>
        </Card>

        <Card className="border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Voter Turnout Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">
            {turnout}%
          </p>
          <p className="text-xs text-slate-500">
            {election.totalVotesCast.toLocaleString()} of {election.totalEligibleVoters.toLocaleString()} eligible voters
          </p>
        </Card>

        <Card className="border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Certification Status</span>
            <ShieldCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="pt-1">
            <Badge status={election.status} dot size="md">
              {isCompleted ? 'Certified & Locked' : 'Live Unofficial Returns'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            {isCompleted ? 'Final certified ledger' : 'Tallies update continuously'}
          </p>
        </Card>
      </div>

      {/* Main Results Breakdown */}
      <Card className="border-slate-200 p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {election.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              {election.title}
            </h2>
          </div>

          {winner && (
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-bold text-amber-800">
                  {isCompleted ? 'Certified Winner' : 'Currently Leading'}
                </p>
                <p className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                  {winner.name} ({winner.percentage}%)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Candidate Percentage Bars */}
        <div className="space-y-6">
          {candidates.map((cand, idx) => {
            const isLead = idx === 0;
            return (
              <div key={cand.id} className="space-y-2 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cand.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                      {cand.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{cand.name}</h3>
                        {isLead && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> {isCompleted ? 'Winner' : 'Leading'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{cand.party} • {cand.position}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-base font-extrabold text-slate-900">
                      {cand.percentage}%
                    </p>
                    <p className="text-xs text-slate-500">
                      {(cand.votes || 0).toLocaleString()} votes
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <ProgressBar
                  value={cand.votes || 0}
                  max={totalVotes || 1}
                  color={isLead ? 'brand' : 'slate'}
                  size="md"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Ballot Receipt Verification Tool (Audit Explorer) */}
      <Card className="border-slate-200 p-6 sm:p-8 space-y-6 bg-slate-900 text-white">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Public Ledger Audit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Verify Your Ballot in the Official Tally
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Enter your Confirmation Code or SHA-256 Receipt Hash from your digital ballot receipt to verify its cryptographic presence in the tally pool.
          </p>
        </div>

        <form onSubmit={handleAuditLookup} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={auditQuery}
            onChange={(e) => setAuditQuery(e.target.value)}
            placeholder="e.g. VS-REC-2026-88391 or 0x8f4c2e..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Button
            type="submit"
            variant="trust"
            size="md"
            leftIcon={<Search className="w-4 h-4" />}
          >
            Verify Receipt
          </Button>
        </form>

        {auditResult && (
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-emerald-500/40 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{auditResult.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 pt-1">
              <div><strong>Audit Code:</strong> {auditResult.code}</div>
              <div><strong>Ledger Block:</strong> {auditResult.blockNumber}</div>
              <div><strong>Privacy:</strong> {auditResult.anonymity}</div>
            </div>
          </div>
        )}
      </Card>

    </div>
  );
};
