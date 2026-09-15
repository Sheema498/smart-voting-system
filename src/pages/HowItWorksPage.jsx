import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  UserCheck,
  Search,
  CheckCircle2,
  Lock,
  FileCheck2,
  ShieldCheck,
  Cpu,
  Fingerprint,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const HowItWorksPage = () => {
  const steps = [
    {
      num: '01',
      title: 'Voter Registration & Identity Verification',
      desc: 'Eligible electors register or authenticate with their official state voter ID and democratic security PIN. The system verifies eligibility without tying your cast ballot back to your personal identity record.',
      icon: <UserCheck className="w-8 h-8 text-primary-600" />,
      tag: 'Identity Layer'
    },
    {
      num: '02',
      title: 'Jurisdiction & Ballot Allocation',
      desc: 'Based on your certified district parameters, the platform dynamically generates and delivers your exact local, regional, and national ballots directly to your secure voter dashboard.',
      icon: <Search className="w-8 h-8 text-primary-600" />,
      tag: 'Jurisdiction Routing'
    },
    {
      num: '03',
      title: 'Confidential Candidate Evaluation',
      desc: 'Compare candidate manifestos, verified voting records, policy commitments, and civic priorities side-by-side inside the interactive candidate directory without sponsored bias.',
      icon: <Sparkles className="w-8 h-8 text-primary-600" />,
      tag: 'Informed Choice'
    },
    {
      num: '04',
      title: 'Cryptographic Ballot Casting & Decoupling',
      desc: 'When you cast your choice, client-side SHA-256 cryptographic hashing severs your voter credentials from your ballot token. A zero-knowledge proof receipt is generated immediately for your records.',
      icon: <Lock className="w-8 h-8 text-primary-600" />,
      tag: 'Zero-Knowledge Privacy'
    },
    {
      num: '05',
      title: 'Live Tallying & Independent Audit Verification',
      desc: 'Every ballot increments the transparent verifiable tally. Voters can input their confidential receipt code anytime into the public audit ledger to certify their vote was counted accurately.',
      icon: <FileCheck2 className="w-8 h-8 text-primary-600" />,
      tag: 'Mathematical Audit'
    }
  ];

  const securityFeatures = [
    {
      title: 'Client-Side Cryptographic Shield',
      desc: 'All sensitive verification operations occur locally within your browser sandbox before transmission.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Tamper-Evident SHA-256 Hashes',
      desc: 'Each ballot receipt is mathematically generated from a continuous cryptographic ledger chain.',
      icon: <Cpu className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Voter Anonymity Decoupling',
      desc: 'Voter turnout registries record THAT you voted, but NEVER WHICH candidate you chose.',
      icon: <Fingerprint className="w-6 h-6 text-amber-600" />
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Platform Architecture</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How VoteSphere Delivers Verifiable Democracy
        </h1>
        <p className="text-lg text-slate-600">
          Explore the transparent, five-step cryptographic workflow that empowers citizens with absolute privacy, mathematical auditability, and tamper-resistant balloting.
        </p>
      </section>

      {/* Steps Progression */}
      <section className="max-w-4xl mx-auto space-y-6">
        {steps.map((step, idx) => (
          <Card key={idx} className="p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 font-display font-extrabold text-2xl shrink-0 shadow-inner">
                {step.num}
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
              <div className="hidden sm:block shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {step.icon}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Security Architecture Highlights */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto space-y-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400">
            Trust By Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">The Cryptographic Foundation</h2>
          <p className="text-slate-400 text-sm">
            VoteSphere guarantees democratic integrity by enforcing zero-knowledge voter isolation and real-time public auditability.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {securityFeatures.map((f, i) => (
            <div key={i} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-700/60 flex items-center justify-center">
                {f.icon}
              </div>
              <h4 className="font-semibold text-white">{f.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="text-center max-w-2xl mx-auto space-y-6 pt-6">
        <h3 className="text-2xl font-bold text-slate-900">Ready to Experience Modern Voting?</h3>
        <p className="text-slate-600 text-sm">
          Join thousands of registered voters participating in open, verifiable democratic governance.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button variant="primary" size="lg" className="shadow-lg shadow-primary-600/20">
              Register as Voter <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/elections">
            <Button variant="outline" size="lg">
              Explore Active Elections
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
