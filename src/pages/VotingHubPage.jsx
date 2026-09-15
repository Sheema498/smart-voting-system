import React from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Vote,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Calendar,
  AlertCircle,
  ArrowRight,
  BarChart3,
  FileCheck2
} from 'lucide-react';

export const VotingHubPage = () => {
  const { elections, hasVoted } = useVoting();
  const { user } = useAuth();

  const activeElections = elections.filter(e => e.status === 'active');
  const pendingElections = activeElections.filter(e => !hasVoted(e.id));
  const completedBallots = activeElections.filter(e => hasVoted(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
          <Vote className="w-4 h-4" />
          <span>Ballot Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Official Digital Voting Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Enter the secure ballot booth to cast your confidential vote in open elections. All ballots are cryptographically decoupled from voter credentials to ensure 100% secrecy.
        </p>
      </div>

      {/* Security Pre-Voting Checklist */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold">Cryptographic Voter Assurance Protocol</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-400" /> Single-Use Blind Token
            </span>
            <p className="text-slate-400 leading-relaxed">
              Your voter ID authorizes your single-ballot entry. Once cast, your token is retired to eliminate double-voting.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Anonymous Ballot
            </span>
            <p className="text-slate-400 leading-relaxed">
              Candidate choices are stored without personal identifiers. No administrator can map your vote back to your name.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-sky-400" /> SHA-256 Receipt
            </span>
            <p className="text-slate-400 leading-relaxed">
              You will receive an immutable hash receipt upon completion to independently audit your vote in public tallies.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Open Ballots Ready to Cast */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Open Ballots Available</span>
            <span className="text-xs bg-brand-100 text-brand-800 font-bold px-2.5 py-0.5 rounded-full">
              {pendingElections.length} Ready
            </span>
          </h2>
        </div>

        {pendingElections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingElections.map(election => (
              <Card key={election.id} hover className="border-slate-200 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {election.category}
                    </span>
                    <Badge status="active" dot size="sm">
                      {election.badgeText || 'Open for Voting'}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {election.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {election.description}
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                    <p><strong>Candidates:</strong> {election.candidateIds.length} certified options</p>
                    <p><strong>Closes:</strong> {new Date(election.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link to={`/elections/${election.id}`} className="flex-1">
                    <Button variant="secondary" fullWidth size="sm">
                      Review Guidelines
                    </Button>
                  </Link>
                  <Link to={`/voting/${election.id}`} className="flex-1">
                    <Button variant="trust" fullWidth size="sm" leftIcon={<Vote className="w-4 h-4" />}>
                      Enter Booth
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">All Current Ballots Cast</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You have completed voting in all currently active elections for your jurisdiction. Check back when new elections are announced.
            </p>
          </div>
        )}
      </div>

      {/* Section 2: Ballots Already Cast */}
      {completedBallots.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Ballots Already Submitted ({completedBallots.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedBallots.map(election => (
              <Card key={election.id} className="border-slate-200 p-5 bg-slate-50/70 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Voted & Sealed
                    </span>
                    <span className="text-xs text-slate-400">{election.shortTitle}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{election.title}</h4>
                </div>

                <Link to="/results">
                  <Button variant="outline" size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                    Results
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
