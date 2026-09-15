import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { mockFaq } from '../data/mockFaq';
import {
  Vote,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Users,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Fingerprint,
  FileCheck2,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const LandingPage = () => {
  const { elections, hasVoted } = useVoting();
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(0);

  const activeElections = elections.filter(e => e.status === 'active');

  // Overall platform statistics
  const totalEligible = elections.reduce((sum, e) => sum + (e.totalEligibleVoters || 0), 0);
  const totalCast = elections.reduce((sum, e) => sum + (e.totalVotesCast || 0), 0);
  const overallParticipation = totalEligible > 0 ? ((totalCast / totalEligible) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/70 via-slate-50 to-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Next-Generation Civic Technology</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Empowering Democracy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-civic-500">Verifiable Trust</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                VoteSphere provides an accessible, transparent, and cryptographically verified digital ballot experience for civic institutions, student unions, and community councils.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/elections">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Active Elections
                  </Button>
                </Link>

                <a href="#how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-medium">100% Secret Ballot</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Lock className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="text-xs font-medium">SHA-256 Hash Receipts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="text-xs font-medium">Zero-Trace Privacy</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Digital Ballot Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-civic-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
                
                {/* Card Container */}
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">VoteSphere Secure Terminal</span>
                  </div>

                  {/* Active Ballot Feature Mock */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Live Ballot Booth</span>
                      <Badge status="active" dot size="sm">Polls Open</Badge>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Student Council General Election 2026</h4>
                    <p className="text-xs text-slate-500 mt-1">Single ballot selection • Tamper-evident receipt generated instantly</p>
                  </div>

                  {/* Simulated Selection Options */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 rounded-xl border-2 border-brand-500 bg-brand-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
                          AS
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Aria Sterling</p>
                          <p className="text-[11px] text-brand-700">Campus Progress Alliance</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                          MC
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Marcus Chen</p>
                          <p className="text-[11px] text-slate-500">Innovate Campus Coalition</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-slate-300" />
                    </div>
                  </div>

                  {/* Security Hash Footnote */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">Hash: 0x8f4c...33d4</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Audit Ready
                    </span>
                  </div>

                  <Link to="/voting/elec-2026-sc" className="block">
                    <Button variant="trust" fullWidth size="md">
                      Cast Verified Ballot
                    </Button>
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {totalCast.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Verified Ballots Cast</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-600 tracking-tight">
                {totalEligible.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Registered Voters</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                {overallParticipation}%
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Overall Participation</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                100%
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Audit Trail Integrity</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE ELECTIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
              <Vote className="w-4 h-4" />
              <span>Current Balloting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Active Elections Open for Voting
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select an ongoing election to review candidacies and exercise your vote.
            </p>
          </div>

          <Link to="/elections">
            <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              View All Elections ({elections.length})
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeElections.map((election) => {
            const alreadyVoted = hasVoted(election.id);
            return (
              <Card key={election.id} hover className="flex flex-col justify-between h-full border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {election.category}
                    </span>
                    <Badge status="active" dot size="sm">
                      {election.badgeText || 'Active'}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                    {election.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {election.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {election.candidateIds.length} Candidates
                    </span>
                    <span>
                      {election.totalVotesCast.toLocaleString()} votes cast
                    </span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link to={`/elections/${election.id}`} className="flex-1">
                    <Button variant="secondary" fullWidth size="sm">
                      Overview
                    </Button>
                  </Link>
                  <Link to={`/voting/${election.id}`} className="flex-1">
                    {alreadyVoted ? (
                      <Button variant="outline" fullWidth size="sm" leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}>
                        Voted
                      </Button>
                    ) : (
                      <Button variant="primary" fullWidth size="sm">
                        Vote Now
                      </Button>
                    )}
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. HOW VOTING WORKS */}
      <section id="how-it-works" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Transparent Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How Voting Works on VoteSphere
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every vote follows a verified 5-stage cryptographic procedure ensuring absolute secrecy and universal auditability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Sign In",
                desc: "Authenticate using your registered digital voter ID and secure credentials.",
                icon: <Fingerprint className="w-6 h-6 text-brand-400" />
              },
              {
                step: "02",
                title: "Choose Election",
                desc: "Browse eligible ballots with transparent timelines and certified guidelines.",
                icon: <Vote className="w-6 h-6 text-civic-400" />
              },
              {
                step: "03",
                title: "Review Candidates",
                desc: "Examine detailed policy manifestos, credentials, and priority roadmaps.",
                icon: <Users className="w-6 h-6 text-emerald-400" />
              },
              {
                step: "04",
                title: "Cast Ballot",
                desc: "Confirm your selection and sign with your private digital security PIN.",
                icon: <Lock className="w-6 h-6 text-amber-400" />
              },
              {
                step: "05",
                title: "Verified Receipt",
                desc: "Receive an instant SHA-256 ballot receipt to audit your vote in final tallies.",
                icon: <FileCheck2 className="w-6 h-6 text-purple-400" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 font-mono">{item.step}</span>
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link to={isAuthenticated ? "/voting" : "/login"}>
              <Button variant="trust" size="lg">
                {isAuthenticated ? "Enter Voting Booth Now" : "Sign In & Experience It"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM PILLARS & INTEGRITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Built for Integrity
          </span>
          <h2 className="text-3xl font-bold text-slate-900">
            Why Modern Institutions Trust VoteSphere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Simplicity First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean intuitive interface optimized for all ages and digital literacy levels. Vote in under 60 seconds.
            </p>
          </Card>

          <Card className="border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">End-to-End Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Voter authentication tokens are decoupled from ballot choices, making voter profiling mathematically impossible.
            </p>
          </Card>

          <Card className="border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Universal Auditability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every voter receives a verifiable digital receipt hash to confirm their vote is included without exposing candidates.
            </p>
          </Card>

          <Card className="border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Universal Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built according to WCAG 2.1 AA accessibility guidelines, supporting high contrast, screen readers, and mobile keyboards.
            </p>
          </Card>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {mockFaq.slice(0, 4).map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-brand-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link to="/about#faq" className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
            Read all security & platform questions <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-civic-600 p-8 sm:p-14 text-white text-center shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Shape the Future of Your Community?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Every vote matters. Check your registered voter status, explore candidates in your district, and cast your secure ballot today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/elections">
                <Button size="lg" variant="secondary" className="text-brand-700 font-bold">
                  View Open Elections
                </Button>
              </Link>
              <Link to="/candidates">
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  Browse Candidates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
