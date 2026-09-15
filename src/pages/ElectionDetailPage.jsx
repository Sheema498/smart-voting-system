import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  ChevronLeft,
  ArrowRight,
  Vote,
  BarChart3,
  FileText,
  AlertCircle
} from 'lucide-react';

export const ElectionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getElectionById, getCandidatesForElection, hasVoted } = useVoting();

  const election = getElectionById(id);
  const candidates = election ? getCandidatesForElection(election.id) : [];
  const alreadyVoted = election ? hasVoted(election.id) : false;

  if (!election) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Election Record Not Found</h2>
        <p className="text-sm text-slate-600">
          The requested election identifier does not correspond to an active or registered election in the platform.
        </p>
        <Link to="/elections">
          <Button variant="primary">Return to Elections Directory</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    return new Date(isoStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isActive = election.status === 'active';
  const isUpcoming = election.status === 'upcoming';
  const isCompleted = election.status === 'completed';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumbs & Back Link */}
      <div>
        <Link
          to="/elections"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Elections
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-600">Home</Link>
          <span>/</span>
          <Link to="/elections" className="hover:text-slate-600">Elections</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate">{election.shortTitle}</span>
        </div>
      </div>

      {/* Main Election Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-card space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                {election.category}
              </span>
              <Badge status={election.status} dot={isActive} size="md">
                {election.status === 'active' ? 'Voting Open' : election.status === 'upcoming' ? 'Scheduled Election' : 'Certified Completed'}
              </Badge>
              {alreadyVoted && (
                <Badge variant="emerald" size="md">
                  Ballot Cast ✓
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {election.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {election.description}
            </p>
          </div>

          {/* Voting Action Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 lg:min-w-[280px] space-y-4 text-center">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ballot Status</p>
              <p className="text-lg font-bold text-slate-900">
                {alreadyVoted
                  ? 'Vote Recorded'
                  : isActive
                  ? 'Eligible to Vote'
                  : isUpcoming
                  ? 'Voting Not Yet Open'
                  : 'Polls Closed'}
              </p>
            </div>

            {isActive && !alreadyVoted && (
              <Link to={`/voting/${election.id}`} className="block">
                <Button variant="trust" fullWidth size="lg" leftIcon={<Vote className="w-5 h-5" />}>
                  Enter Voting Booth
                </Button>
              </Link>
            )}

            {alreadyVoted && (
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your ballot is confirmed</span>
                </div>
                <Link to="/results" className="block">
                  <Button variant="outline" fullWidth size="sm" leftIcon={<BarChart3 className="w-4 h-4" />}>
                    View Current Tally
                  </Button>
                </Link>
              </div>
            )}

            {isCompleted && (
              <Link to="/results" className="block">
                <Button variant="primary" fullWidth size="md" leftIcon={<BarChart3 className="w-4 h-4" />}>
                  View Official Results
                </Button>
              </Link>
            )}

            {isUpcoming && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                Balloting commences on {formatDate(election.startDate)}.
              </p>
            )}
          </div>
        </div>

        {/* Timeline & Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Start Date
            </span>
            <p className="font-semibold text-slate-800 text-sm">{formatDate(election.startDate)}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Close Date
            </span>
            <p className="font-semibold text-slate-800 text-sm">{formatDate(election.endDate)}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Candidate Count
            </span>
            <p className="font-semibold text-slate-800 text-sm">{candidates.length} Registered Candidates</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Turnout / Tally
            </span>
            <p className="font-semibold text-slate-800 text-sm">{election.totalVotesCast.toLocaleString()} Ballots Cast</p>
          </div>
        </div>
      </div>

      {/* Rules & Eligibility Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <FileText className="w-5 h-5 text-brand-600" />
            <span>Voting Rules & Protocols</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 pt-1">
            {election.rules && election.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Voter Eligibility & Verification</span>
          </div>
          <div className="space-y-3 text-xs text-slate-600 pt-1">
            <p className="leading-relaxed">
              <strong className="text-slate-800">Eligibility Requirement:</strong> {election.eligibility}
            </p>
            <p className="leading-relaxed">
              Before casting your ballot, your voter ID and 4-digit voting PIN are validated against the authorized voter registry for this jurisdiction.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Voter authentication tokens are separated from ballot selections to protect total ballot secrecy.
            </div>
          </div>
        </Card>
      </div>

      {/* Candidate Roster Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Candidates for this Election ({candidates.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review candidates, read their key policy priorities, and inspect their full platforms.
            </p>
          </div>

          <Link to="/candidates">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              All Candidates
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <Card key={candidate.id} hover className="flex flex-col justify-between h-full border-slate-200">
              <div className="space-y-4">
                {/* Candidate Header */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${candidate.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0`}>
                    {candidate.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-900 truncate">
                      {candidate.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{candidate.position}</p>
                    <span className="inline-block text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full mt-1">
                      {candidate.party}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed italic">
                  "{candidate.tagline}"
                </p>

                {/* Key Priorities Snapshot */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Top Priority:</p>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    <span className="line-clamp-2">{candidate.priorities[0]}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link to={`/candidates/${candidate.id}`}>
                  <Button variant="secondary" fullWidth size="sm">
                    View Profile
                  </Button>
                </Link>

                {isActive && !alreadyVoted ? (
                  <Link to={`/voting/${election.id}`}>
                    <Button variant="primary" fullWidth size="sm">
                      Vote For
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/candidates/${candidate.id}`}>
                    <Button variant="outline" fullWidth size="sm">
                      Platform
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
