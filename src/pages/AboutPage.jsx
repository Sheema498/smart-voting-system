import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockFaq } from '../data/mockFaq';
import {
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
  FileText,
  Accessibility,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Vote
} from 'lucide-react';

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Electoral Transparency & Civic Technology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Modern Democratic Voting with Uncompromised Integrity
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          VoteSphere was engineered to bridge the gap between digital convenience and rigorous democratic security. Our platform ensures that every vote is confidential, accurate, and independently auditable.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Absolute Ballot Secrecy</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            By mathematically decoupling voter authentication tokens from recorded ballots, our zero-trace privacy protocol guarantees that no administrator or system can connect your vote to your identity.
          </p>
        </Card>

        <Card className="border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Verifiable Receipts</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Upon voting, each citizen receives a cryptographic SHA-256 ballot hash. This unique receipt allows individual verification that the vote was correctly recorded without revealing the selected candidate.
          </p>
        </Card>

        <Card className="border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-civic-50 text-civic-600 flex items-center justify-center">
            <Accessibility className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Universal Accessibility</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Democracy belongs to all citizens. VoteSphere is built in strict adherence to WCAG 2.1 AA accessibility guidelines, ensuring seamless participation on mobile devices, screen readers, and assisted inputs.
          </p>
        </Card>
      </div>

      {/* Security Architecture Deep Dive */}
      <div id="security" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Technical Specification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How VoteSphere Protects Democratic Elections
          </h2>
          <p className="text-sm text-slate-500">
            A three-tier integrity model ensuring fraud prevention, voter privacy, and auditable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <span className="text-xs font-mono font-bold text-brand-700 uppercase bg-brand-50 px-2 py-1 rounded">
              Tier 1 • Authentication
            </span>
            <h4 className="text-base font-bold text-slate-900">Identity Verification</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Voters are registered and verified against certified voter rolls before the election. Two-step confirmation with a private 4-digit voting PIN prevents impersonation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-1 rounded">
              Tier 2 • Ballot Booth
            </span>
            <h4 className="text-base font-bold text-slate-900">Token Decoupling</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When entering the ballot booth, the voter’s authentication credential generates a single-use blind token. Once the ballot is cast, the voter is marked as "voted" while the ballot choice is stored anonymously.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <span className="text-xs font-mono font-bold text-civic-700 uppercase bg-civic-50 px-2 py-1 rounded">
              Tier 3 • Public Tally
            </span>
            <h4 className="text-base font-bold text-slate-900">Cryptographic Ledger</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tally results are calculated from the tamper-evident ballot pool. Voters can check their confirmation receipt code against the public tally audit ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Full FAQ Section */}
      <div id="faq" className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Support & Documentation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about voting, security, and verification.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 pt-4">
          {mockFaq.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
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
      </div>

      {/* CTA Bottom Banner */}
      <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to Exercise Your Civic Voice?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Explore current elections in your jurisdiction and participate in transparent, verifiable democratic decision making.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/elections">
            <Button size="lg" variant="trust" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Elections
            </Button>
          </Link>
          <Link to="/candidates">
            <Button size="lg" variant="secondary">
              View Candidates
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
