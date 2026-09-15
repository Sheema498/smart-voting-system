import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVoting } from '../context/VotingContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Vote,
  CheckCircle2,
  Calendar,
  Bell,
  User,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  BarChart3,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { elections, hasVoted } = useVoting();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const activeElections = elections.filter(e => e.status === 'active');
  const upcomingElections = elections.filter(e => e.status === 'upcoming');
  const completedElections = elections.filter(e => e.status === 'completed');

  const pendingElections = activeElections.filter(e => !hasVoted(e.id));
  const votedCount = user.votingHistory ? user.votingHistory.length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Welcome & Voter Credential Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-civic-700 p-6 sm:p-10 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold text-white border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Verified Citizen Identity
              </span>
              <span className="text-xs text-brand-200">
                District: {user.district}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Welcome back, {user.name}
            </h1>

            <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
              Voter Credential ID: <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{user.voterId}</span> • Registered since {user.registrationDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link to="/voting">
              <Button size="lg" variant="trust" fullWidth leftIcon={<Vote className="w-5 h-5" />}>
                Voting Booth ({pendingElections.length} Open)
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" fullWidth className="text-white border-white/30 hover:bg-white/10">
                Voter Profile
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Ballots</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {pendingElections.length}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Ready to cast today</p>
        </Card>

        <Card className="border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ballots Cast</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {votedCount}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Verified & tallied</p>
        </Card>

        <Card className="border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {upcomingElections.length}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Upcoming in October</p>
        </Card>

        <Card className="border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unread Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {unreadCount}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Election notifications</p>
        </Card>
      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Ballots & Upcoming */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Ballots Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Active Elections in Your Jurisdiction
                </h2>
                <p className="text-xs text-slate-500">
                  Select an election to review candidates and submit your confidential vote.
                </p>
              </div>
              <Link to="/elections">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {activeElections.map(election => {
                const voted = hasVoted(election.id);
                return (
                  <Card key={election.id} hover className="border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {election.category}
                        </span>
                        <Badge status="active" dot size="sm">
                          {election.badgeText || 'Active Poll'}
                        </Badge>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {election.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {election.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span>{election.candidateIds.length} Candidates</span>
                        <span>•</span>
                        <span>{election.totalVotesCast.toLocaleString()} votes cast</span>
                      </div>
                    </div>

                    <div className="sm:shrink-0 flex flex-col sm:items-end gap-2">
                      {voted ? (
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Ballot Cast
                          </span>
                          <Link to="/results">
                            <Button variant="outline" size="sm" fullWidth>
                              View Tally
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Link to={`/elections/${election.id}`}>
                            <Button variant="secondary" size="sm">
                              Overview
                            </Button>
                          </Link>
                          <Link to={`/voting/${election.id}`}>
                            <Button variant="trust" size="sm" leftIcon={<Vote className="w-4 h-4" />}>
                              Vote Now
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Verified Voting Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Your Voting Activity & Hash Receipts
              </h2>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  Full History
                </Button>
              </Link>
            </div>

            {user.votingHistory && user.votingHistory.length > 0 ? (
              <div className="space-y-3">
                {user.votingHistory.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {item.status}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(item.castTimestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.electionTitle}</h4>
                      <p className="text-xs font-mono text-slate-500 break-all">
                        Hash: {item.receiptHash}
                      </p>
                    </div>

                    <Link to="/results">
                      <Button variant="outline" size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                        Results
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                No ballots cast yet in this browser session. Select an active election above to cast your first vote.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Quick Actions & Recent Notifications */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Card */}
          <Card className="border-slate-200 p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link to="/voting" className="block">
                <Button variant="secondary" fullWidth size="md" className="justify-start" leftIcon={<Vote className="w-4 h-4 text-brand-600" />}>
                  Access Voting Booth
                </Button>
              </Link>
              <Link to="/candidates" className="block">
                <Button variant="secondary" fullWidth size="md" className="justify-start" leftIcon={<User className="w-4 h-4 text-civic-600" />}>
                  Explore Candidates
                </Button>
              </Link>
              <Link to="/results" className="block">
                <Button variant="secondary" fullWidth size="md" className="justify-start" leftIcon={<BarChart3 className="w-4 h-4 text-emerald-600" />}>
                  Check Certified Tallies
                </Button>
              </Link>
              <Link to="/profile" className="block">
                <Button variant="secondary" fullWidth size="md" className="justify-start" leftIcon={<ShieldCheck className="w-4 h-4 text-purple-600" />}>
                  Manage Voter Profile
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Notifications Widget */}
          <Card className="border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Electoral Bulletins
                </h3>
              </div>
              <Link to="/notifications" className="text-xs text-brand-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map(notif => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 transition-colors ${
                    notif.read ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-brand-50/50 border-brand-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold line-clamp-1">{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                    )}
                  </div>
                  <p className="line-clamp-2 text-slate-500 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link
                      to={notif.link}
                      onClick={() => markAsRead(notif.id)}
                      className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline pt-0.5"
                    >
                      {notif.actionText || 'View'} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};
