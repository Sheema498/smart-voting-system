import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  ArrowLeft,
  Edit3,
  CheckCircle2,
  GraduationCap,
  Vote,
  ExternalLink
} from 'lucide-react';

export const AdminCandidateDetailPage = () => {
  const { id } = useParams();
  const { candidates, elections } = useVoting();

  const candidate = candidates.find((c) => c.id === id);
  const election = candidate ? elections.find((e) => e.id === candidate.electionId) : null;

  if (!candidate) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Candidate Not Found</h2>
        <Link to="/admin/candidates">
          <Button variant="primary">Return to Candidates</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/candidates"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Candidate Registry
        </Link>
        <Link to={`/admin/candidates/${candidate.id}/edit`}>
          <Button variant="outline" size="sm">
            <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit Candidate Profile
          </Button>
        </Link>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 border-b border-slate-100 pb-6">
          <div
            className={`w-16 h-16 rounded-2xl ${
              candidate.avatarBg || 'bg-primary-600'
            } text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm`}
          >
            {candidate.avatarInitials || candidate.name.charAt(0)}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{candidate.party}</Badge>
              <span className="text-xs text-slate-400 font-mono">{candidate.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{candidate.name}</h1>
            <p className="text-sm font-semibold text-slate-700">{candidate.position}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right min-w-[140px] shrink-0">
            <span className="text-xs text-slate-400 font-semibold uppercase">Current Tally</span>
            <div className="text-2xl font-extrabold text-primary-600">
              {(candidate.votes || 0).toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">Verified Ballots</p>
          </div>
        </div>

        {candidate.tagline && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm italic text-slate-700">
            "{candidate.tagline}"
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Platform Manifesto
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {candidate.bio}
          </p>
        </div>

        {candidate.priorities && candidate.priorities.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Policy Commitments
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-800">
              {candidate.priorities.map((p, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {election && (
          <div className="p-4 bg-primary-50/50 rounded-xl border border-primary-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-primary-800 font-semibold block">Associated Contest</span>
              <p className="text-primary-950 font-bold text-sm">{election.title}</p>
            </div>
            <Link to={`/admin/elections/${election.id}`}>
              <Button variant="outline" size="sm" className="bg-white">
                Inspect Contest <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};
