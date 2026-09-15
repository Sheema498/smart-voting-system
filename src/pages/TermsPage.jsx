import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Scale, CheckCircle2, ShieldAlert, BookOpen } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Democratic Governance</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service & Voter Code of Conduct
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Governing rules and democratic commitments for all participants on the VoteSphere platform.
        </p>
      </section>

      {/* Core Principles */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">One Voter, One Vote</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every registered elector has equal standing and is entitled to exactly one non-transferable ballot per race.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Anti-Coercion Guard</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ballot selling, voter intimidation, automated credential harvesting, or coercion is strictly prohibited.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Binding Certification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Once submitted with a verified 4-digit PIN, ballots are sealed irreversibly into the cryptographic tally.
          </p>
        </Card>
      </div>

      {/* Content Body */}
      <Card className="p-8 sm:p-10 bg-white space-y-8 prose prose-slate max-w-none">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By accessing VoteSphere, authenticating as a voter or administrator, or reviewing candidate manifestos, you agree to adhere to these Terms of Service, all applicable electoral regulations, and the Democratic Code of Conduct set forth herein.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">2. Elector Eligibility & Credentials</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each voter must authenticate solely with credentials issued in their legal name or authorized demonstration profile. You may not:
          </p>
          <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
            <li>Impersonate another voter or cast a ballot on behalf of another citizen without verified legal proxy status.</li>
            <li>Share your voting PIN, private cryptographic keys, or security phrases with third parties.</li>
            <li>Attempt to bypass jurisdiction checks or vote in municipal districts where you do not maintain eligible standing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">3. Integrity of the Ballot Box</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All ballots submitted through the VoteSphere interface are final. To maintain democratic stability and prevent strategic vote cancellation, the platform strictly disallows retracting, resubmitting, or altering a cast ballot once cryptographic receipt generation completes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">4. Prohibited Malicious Activities</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Users are explicitly barred from deploying automated scrapers, denial-of-service tools, penetration payloads, or simulated voting bot scripts against the VoteSphere infrastructure. Any suspicious attempt to manipulate voter registries will trigger an immediate high-severity event in the immutable audit log.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">5. Certification & Public Ledger Audit</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Election results published on this platform become binding upon formal administrative certification lock. Public tallies and audit logs are open for civic inspection and verification in perpetuity.
          </p>
        </section>
      </Card>
    </div>
  );
};
