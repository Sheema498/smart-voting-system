import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  ArrowLeft,
  Edit3,
  BarChart2,
  Users,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Power
} from 'lucide-react';

export const AdminElectionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { elections, setElections, getCandidatesForElection, votes } = useVoting();
  const { adminUser } = useAdminAuth();

  const election = elections.find((e) => e.id === id);
  const candidates = election ? getCandidatesForElection(election.id) : [];
  const elVotes = election ? votes[election.id]?.totalVotes || 0 : 0;
  const turnout = election
    ? ((elVotes / (election.eligibleVoters || 1)) * 100).toFixed(1)
    : '0.0';

  if (!election) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Election Record Not Found</h2>
        <Link to="/admin/elections">
          <Button variant="primary">Return to Elections List</Button>
        </Link>
      </div>
    );
  }

  const handleToggleStatus = async () => {
    const nextStatus = election.status === 'Active' ? 'Closed' : 'Active';
    if (setElections) {
      setElections((prev) =>
        prev.map((e) => (e.id === election.id ? { ...e, status: nextStatus } : e))
      );
    }
    await AuditService.logEvent({
      action: 'ELECTION_STATUS_TOGGLED',
      actor: adminUser?.name || 'Administrator',
      severity: 'warning',
      details: { electionId: election.id, newStatus: nextStatus }
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/admin/elections"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Elections List
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            className={election.status === 'Active' ? 'text-amber-600' : 'text-emerald-600'}
          >
            <Power className="w-3.5 h-3.5 mr-1.5" />
            {election.status === 'Active' ? 'Close Polls' : 'Open Polls'}
          </Button>
          <Link to={`/admin/elections/${election.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit Parameters
            </Button>
          </Link>
          <Link to={`/admin/results/${election.id}`}>
            <Button variant="primary" size="sm">
              <BarChart2 className="w-3.5 h-3.5 mr-1.5" /> Certified Tallies
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Details Card */}
      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={election.status === 'Active' ? 'success' : 'neutral'}>
                {election.status}
              </Badge>
              <Badge variant="primary">{election.category}</Badge>
              <span className="text-xs text-slate-400 font-mono">{election.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{election.title}</h1>
          </div>

          <div className="text-right shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Live Participation</span>
            <div className="text-2xl font-black text-primary-600">{turnout}%</div>
            <p className="text-[11px] text-slate-400">
              {elVotes.toLocaleString()} / {election.eligibleVoters?.toLocaleString()} Registered
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{election.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Eligibility Framework</span>
            <p className="text-slate-600">{election.eligibility || 'Standard District Voter Roll'}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Democratic Rules</span>
            <p className="text-slate-600">{election.votingRules || 'Single choice secret ballot with SHA-256 receipt'}</p>
          </div>
        </div>
      </Card>

      {/* Candidates Roster for this election */}
      <Card className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Assigned Candidate Roster ({candidates.length})
          </h2>
          <Link
            to="/admin/candidates/new"
            className="text-xs font-semibold text-primary-600 hover:underline"
          >
            + Register Candidate
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {candidates.map((cand) => (
            <div
              key={cand.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-2"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl ${
                    cand.avatarBg || 'bg-primary-600'
                  } text-white flex items-center justify-center font-bold text-xs shrink-0`}
                >
                  {cand.avatarInitials || cand.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{cand.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{cand.party}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{cand.position}</span>
                <Link
                  to={`/admin/candidates/${cand.id}`}
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
