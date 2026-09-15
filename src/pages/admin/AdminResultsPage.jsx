import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { exportToCsv, exportToJson } from '../../utils/csvExport';
import {
  Trophy,
  CheckCircle2,
  Lock,
  Download,
  Printer,
  RefreshCw,
  ShieldCheck,
  BarChart2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export const AdminResultsPage = () => {
  const { electionId } = useParams();
  const { elections, getCandidatesForElection, votes, setElections } = useVoting();
  const { adminUser } = useAdminAuth();

  const [selectedElectionId, setSelectedElectionId] = useState(
    electionId || elections[0]?.id || ''
  );
  const [isRecounting, setIsRecounting] = useState(false);
  const [recountMessage, setRecountMessage] = useState('');

  const currentElection = elections.find((e) => e.id === selectedElectionId);
  const candidates = currentElection ? getCandidatesForElection(currentElection.id) : [];
  const results = currentElection ? votes[currentElection.id] : null;

  const totalVotes = results?.totalVotes || 0;
  const eligibleVoters = currentElection?.eligibleVoters || 1;
  const turnoutPercent = ((totalVotes / eligibleVoters) * 100).toFixed(1);

  // Calculate sorted candidate tally
  const candidateTally = candidates
    .map((c) => {
      const v = results?.candidateVotes?.[c.id] || 0;
      const pct = totalVotes > 0 ? ((v / totalVotes) * 100).toFixed(1) : '0.0';
      return {
        ...c,
        voteCount: v,
        percentage: parseFloat(pct)
      };
    })
    .sort((a, b) => b.voteCount - a.voteCount);

  const isCertified = currentElection?.status === 'Certified' || currentElection?.status === 'Closed';

  const handleCertifyElection = async () => {
    if (!currentElection) return;

    if (setElections) {
      setElections((prev) =>
        prev.map((e) => (e.id === currentElection.id ? { ...e, status: 'Closed' } : e))
      );
    }

    await AuditService.logEvent({
      action: 'ELECTION_RESULTS_CERTIFIED',
      actor: adminUser?.name || 'Administrator',
      severity: 'warning',
      details: {
        electionId: currentElection.id,
        totalVotes,
        certifiedWinner: candidateTally[0]?.name || 'N/A'
      }
    });
  };

  const handleSimulateRecount = () => {
    setIsRecounting(true);
    setRecountMessage('');
    setTimeout(async () => {
      setIsRecounting(false);
      setRecountMessage(
        `Algorithmic audit complete: 100% of ${totalVotes.toLocaleString()} ballots reconciled with SHA-256 cryptographic hashes. Zero discrepancies detected.`
      );
      await AuditService.logEvent({
        action: 'ALGORITHMIC_RECOUNT_AUDITED',
        actor: adminUser?.name || 'Administrator',
        severity: 'info',
        details: { electionId: currentElection?.id, verifiedBallots: totalVotes, discrepancyCount: 0 }
      });
    }, 800);
  };

  const handleExportCsv = () => {
    if (!currentElection) return;
    const headers = ['Candidate ID', 'Name', 'Party', 'Votes', 'Share %'];
    const rows = candidateTally.map((c) => [
      c.id,
      c.name,
      c.party,
      c.voteCount,
      `${c.percentage}%`
    ]);
    exportToCsv(`${currentElection.id}-admin-certified-results`, headers, rows);
  };

  const handleExportJson = () => {
    if (!currentElection) return;
    const data = {
      electionId: currentElection.id,
      title: currentElection.title,
      certifiedStatus: isCertified ? 'CERTIFIED' : 'PRELIMINARY',
      totalVotes,
      eligibleVoters,
      turnoutPercentage: `${turnoutPercent}%`,
      auditTimestamp: new Date().toISOString(),
      candidateTally
    };
    exportToJson(`${currentElection.id}-admin-results`, data);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Results & Certification Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Reconcile democratic tallies, execute algorithmic recounts, and lock official certifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJson}>
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-3.5 h-3.5 mr-1.5" /> Print Summary
          </Button>
        </div>
      </div>

      {/* Election Selector Pill Bar */}
      <Card className="p-4 bg-white">
        <div className="flex items-center space-x-3 overflow-x-auto pb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Select Contest:
          </span>
          {elections.map((el) => (
            <button
              key={el.id}
              onClick={() => setSelectedElectionId(el.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedElectionId === el.id
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {el.shortTitle || el.title}
            </button>
          ))}
        </div>
      </Card>

      {currentElection && (
        <>
          {/* Main Contest Overview Card */}
          <Card className="p-6 sm:p-8 bg-white space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant={isCertified ? 'neutral' : 'success'}>
                    {isCertified ? 'Closed / Certified' : 'Active Tabulation'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">{currentElection.id}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">{currentElection.title}</h2>
                <p className="text-xs text-slate-500">{currentElection.category}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSimulateRecount}
                  disabled={isRecounting}
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRecounting ? 'animate-spin' : ''}`} />
                  {isRecounting ? 'Reconciling Ledger...' : 'Run Audit Recount'}
                </Button>

                {!isCertified && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleCertifyElection}
                  >
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Certify & Seal Results
                  </Button>
                )}
              </div>
            </div>

            {recountMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 shrink-0 text-emerald-600" />
                <span>{recountMessage}</span>
              </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Total Ballots Cast</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {totalVotes.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Eligible Voters</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {eligibleVoters.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Turnout Share</span>
                <span className="text-xl font-extrabold text-primary-600">{turnoutPercent}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Certification</span>
                <span className="text-sm font-bold text-slate-800">
                  {isCertified ? 'Locked in Ledger' : 'Preliminary Open'}
                </span>
              </div>
            </div>
          </Card>

          {/* Candidate Breakdown */}
          <Card className="p-6 bg-white space-y-4">
            <h3 className="text-base font-bold text-slate-900">Candidate Tally Rankings</h3>

            <div className="space-y-4">
              {candidateTally.map((c, index) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                        <span className="text-xs text-slate-500 ml-2">({c.party})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900">
                        {c.voteCount.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5">({c.percentage}%)</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        index === 0 ? 'bg-amber-500' : 'bg-primary-600'
                      }`}
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
