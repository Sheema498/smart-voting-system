import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ProgressBar } from '../components/common/ProgressBar';
import { exportToCsv, exportToJson } from '../utils/csvExport';
import {
  Trophy,
  Users,
  CheckCircle2,
  ArrowLeft,
  Download,
  Printer,
  Search,
  ShieldCheck,
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const ElectionResultDetailPage = () => {
  const { electionId } = useParams();
  const { elections, getCandidatesForElection, getVotesForElection, verifyReceipt } = useVoting();

  const [receiptQuery, setReceiptQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const election = elections.find((e) => e.id === electionId);
  const candidates = election ? getCandidatesForElection(election.id) : [];
  const results = election ? getVotesForElection(election.id) : null;

  if (!election) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Election Record Not Found</h2>
        <p className="text-slate-600 text-sm">
          The requested election result could not be located in the certified database.
        </p>
        <Link to="/results">
          <Button variant="primary">Return to Results Directory</Button>
        </Link>
      </div>
    );
  }

  const totalVotes = results?.totalVotes || 0;
  const eligibleVoters = election.eligibleVoters || 1;
  const turnoutPercent = ((totalVotes / eligibleVoters) * 100).toFixed(1);

  // Sort candidates by vote count descending
  const candidateResults = candidates.map((cand) => {
    const votes = results?.candidateVotes?.[cand.id] || 0;
    const percent = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0.0';
    return {
      ...cand,
      votes,
      percent: parseFloat(percent)
    };
  }).sort((a, b) => b.votes - a.votes);

  const winner = candidateResults[0];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!receiptQuery.trim()) return;
    const res = verifyReceipt(receiptQuery.trim());
    setVerificationResult(res);
  };

  const handleExportCsv = () => {
    const headers = ['Candidate ID', 'Name', 'Party', 'Position', 'Votes Cast', 'Percentage Share'];
    const rows = candidateResults.map((c) => [
      c.id,
      c.name,
      c.party,
      c.position,
      c.votes,
      `${c.percent}%`
    ]);
    exportToCsv(`${election.id}-certified-tally`, headers, rows);
  };

  const handleExportJson = () => {
    const exportData = {
      electionId: election.id,
      electionTitle: election.title,
      category: election.category,
      status: election.status,
      certifiedAt: new Date().toISOString(),
      totalEligibleVoters: eligibleVoters,
      totalVotesCast: totalVotes,
      turnoutPercentage: `${turnoutPercent}%`,
      candidateResults
    };
    exportToJson(`${election.id}-certified-tally`, exportData);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Back nav & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/results"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Results
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="w-4 h-4 mr-1.5" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJson}>
            <Download className="w-4 h-4 mr-1.5" /> Export JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1.5" /> Print Official Report
          </Button>
        </div>
      </div>

      {/* Hero Header */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={election.status === 'Active' ? 'success' : 'neutral'}>
                {election.status}
              </Badge>
              <Badge variant="primary">{election.category}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {election.title}
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">{election.description}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right min-w-[200px] shrink-0">
            <p className="text-xs uppercase font-bold text-slate-500">Official Turnout</p>
            <p className="text-3xl font-extrabold text-primary-600 mt-1">{turnoutPercent}%</p>
            <p className="text-xs text-slate-500 mt-1">
              {totalVotes.toLocaleString()} / {eligibleVoters.toLocaleString()} Voters
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-sm">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Election ID</span>
            <span className="font-mono font-semibold text-slate-800">{election.id}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Certified Date</span>
            <span className="font-semibold text-slate-800">{election.endDate || 'Present'}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Tally Method</span>
            <span className="font-semibold text-slate-800">First-Past-The-Post</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Audit Status</span>
            <span className="inline-flex items-center font-semibold text-emerald-600">
              <ShieldCheck className="w-4 h-4 mr-1" /> Reconciled
            </span>
          </div>
        </div>
      </Card>

      {/* Winner Spotlight Banner (if votes exist) */}
      {winner && totalVotes > 0 && (
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-200">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-700">
                Projected / Certified Winner
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">{winner.name}</h2>
              <p className="text-sm font-semibold text-slate-700">
                {winner.party} • {winner.position}
              </p>
              <p className="text-xs text-slate-600">
                Secured <strong className="text-slate-900">{winner.votes.toLocaleString()}</strong> votes ({winner.percent}% of total ballots cast).
              </p>
            </div>
            <Link to={`/candidates/${winner.id}`} className="shrink-0">
              <Button variant="outline" size="sm" className="bg-white">
                View Profile <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Candidate Breakdown Roster */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Complete Candidate Vote Breakdown</h3>

        <div className="space-y-6">
          {candidateResults.map((c, index) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      <Link to={`/candidates/${c.id}`} className="hover:text-primary-600">
                        {c.name}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-500">
                      {c.party} • {c.position}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:shrink-0 flex items-center sm:block space-x-3 sm:space-x-0">
                  <span className="text-lg font-extrabold text-slate-900">{c.votes.toLocaleString()} votes</span>
                  <span className="text-xs font-semibold text-slate-500 sm:ml-2">({c.percent}%)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-amber-500' : 'bg-primary-600'
                  }`}
                  style={{ width: `${c.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Ballot Hash Audit Widget */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Audit Your Digital Ballot Receipt</h3>
          <p className="text-xs text-slate-500">
            Verify that your individual confidential receipt code is officially recorded in the cryptographic ledger for this election.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter receipt ID or SHA-256 hash (e.g. VOTE-A4B7-9X2M-K8P1)..."
            value={receiptQuery}
            onChange={(e) => setReceiptQuery(e.target.value)}
            className="flex-1 text-sm font-mono"
          />
          <Button type="submit" variant="primary" className="shrink-0">
            <Search className="w-4 h-4 mr-2" /> Verify Inclusion
          </Button>
        </form>

        {verificationResult && (
          <div
            className={`p-4 rounded-xl border text-sm ${
              verificationResult.verified
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            {verificationResult.verified ? (
              <div className="space-y-1">
                <div className="flex items-center space-x-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Cryptographic Confirmation: Ballot Certified in Ledger</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Ballot Receipt <code className="font-mono">{verificationResult.receipt.receiptId}</code> was recorded on{' '}
                  {new Date(verificationResult.receipt.timestamp).toLocaleString()}. Election:{' '}
                  {verificationResult.receipt.electionTitle}.
                </p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 font-semibold text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>Receipt code not located. Please double-check formatting or verify that your ballot submission completed.</span>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
