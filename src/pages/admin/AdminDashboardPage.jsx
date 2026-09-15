import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  Vote,
  Users,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Plus,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Bell,
  Cpu
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { elections, candidates, votes } = useVoting();
  const { adminUser, systemConfig } = useAdminAuth();
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    const logs = AuditService.getLogs();
    setRecentLogs(logs.slice(0, 5));
  }, []);

  const totalVotesCast = Object.values(votes).reduce((sum, v) => sum + (v.totalVotes || 0), 0);
  const activeElections = elections.filter((e) => e.status === 'Active');
  const closedElections = elections.filter((e) => e.status === 'Closed');
  const totalEligible = elections.reduce((sum, e) => sum + (e.eligibleVoters || 0), 0);
  const aggregateTurnout = totalEligible > 0 ? ((totalVotesCast / totalEligible) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>National Electoral Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Governance Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Logged in as <strong className="text-white">{adminUser?.name || 'Administrator'}</strong> ({adminUser?.title || 'Electoral Commissioner'}). Real-time voting node status is normal.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/admin/elections/new">
            <Button variant="primary" className="bg-primary-600 hover:bg-primary-500 shadow-md">
              <Plus className="w-4 h-4 mr-1.5" /> Create Election
            </Button>
          </Link>
          <Link to="/admin/candidates/new">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Plus className="w-4 h-4 mr-1.5" /> Add Candidate
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 sm:p-6 bg-white space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Ballots Cast</span>
            <Vote className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalVotesCast.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Verified SHA-256 Ledger
          </p>
        </Card>

        <Card className="p-5 sm:p-6 bg-white space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Active Races</span>
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {activeElections.length}
          </p>
          <p className="text-xs text-slate-500 font-semibold">
            {closedElections.length} Closed & Certified
          </p>
        </Card>

        <Card className="p-5 sm:p-6 bg-white space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Registered Candidates</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {candidates.length}
          </p>
          <p className="text-xs text-slate-500 font-semibold">
            Across {elections.length} Certified Contests
          </p>
        </Card>

        <Card className="p-5 sm:p-6 bg-white space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Aggregate Turnout</span>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {aggregateTurnout}%
          </p>
          <p className="text-xs text-slate-500 font-semibold">
            Of {totalEligible.toLocaleString()} Eligible Voters
          </p>
        </Card>
      </div>

      {/* Grid: Active Elections Monitor & Recent Audit Trail */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Elections Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Active Election Roster</h2>
            <Link
              to="/admin/elections"
              className="text-xs font-semibold text-primary-600 hover:text-primary-800 flex items-center"
            >
              View All Contests <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeElections.map((election) => {
              const elVotes = votes[election.id]?.totalVotes || 0;
              const turnout = ((elVotes / (election.eligibleVoters || 1)) * 100).toFixed(1);

              return (
                <Card key={election.id} className="p-5 bg-white space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="success">Active</Badge>
                        <span className="text-xs text-slate-400 font-mono">{election.id}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mt-1">{election.title}</h3>
                      <p className="text-xs text-slate-500">{election.category}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-extrabold text-slate-900">
                        {elVotes.toLocaleString()}
                      </span>
                      <p className="text-xs text-slate-500">Votes ({turnout}%)</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-600 h-full rounded-full transition-all"
                      style={{ width: `${turnout}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500">Closes: {election.endDate}</span>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/admin/elections/${election.id}`}
                        className="font-semibold text-primary-600 hover:underline"
                      >
                        Manage
                      </Link>
                      <span className="text-slate-300">|</span>
                      <Link
                        to={`/admin/results/${election.id}`}
                        className="font-semibold text-slate-600 hover:underline"
                      >
                        Tally
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Live Audit Ledger & Quick Tools */}
        <div className="space-y-6">
          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Live Audit Ledger</h3>
              </div>
              <Link
                to="/admin/audit"
                className="text-[11px] font-semibold text-primary-600 hover:underline"
              >
                Inspect All
              </Link>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="text-xs space-y-1 p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">By {log.actor}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="p-6 bg-white space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Administrative Tools</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/admin/notifications"
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>Issue Broadcast Announcement</span>
                </div>
                <ChevronRightIcon />
              </Link>

              <Link
                to="/admin/voters"
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>Inspect Voter Registry</span>
                </div>
                <ChevronRightIcon />
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-slate-600" />
                  <span>Platform Parameters & Cipher</span>
                </div>
                <ChevronRightIcon />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ChevronRightIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
