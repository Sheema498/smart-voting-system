import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ShieldCheck, Lock, EyeOff, Database, FileText } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Header */}
      <section className="text-center space-y-4">
        <Badge variant="primary">Privacy Standards</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Voter Confidentiality & Privacy Policy
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Last Revised: September 2026 • Certified for Demonstration & Democratic Sandboxing
        </p>
      </section>

      {/* Highlights Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Zero Balloting Traces</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your candidate choices are separated from your voter profile before being cryptographically sealed.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Local-Only Processing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All hashing and receipt verification calculations occur in your browser without external tracking scripts.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">No Advertising or Sale</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            VoteSphere collects zero advertising identifiers, sells zero information, and uses no invasive tracking cookies.
          </p>
        </Card>
      </div>

      {/* Main Content Sections */}
      <Card className="p-8 sm:p-10 bg-white space-y-8 prose prose-slate max-w-none">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">1. Democratic Confidentiality Pledge</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            VoteSphere operates under the foundational premise that the secret ballot is the bedrock of free and fair democratic societies. Our systems are engineered to prevent any entity—including system administrators, election officials, government regulators, or external auditors—from determining how an individual voter cast their ballot.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">2. The Cryptographic Decoupling Architecture</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you participate in an election on VoteSphere, two distinct and disconnected records are generated:
          </p>
          <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
            <li>
              <strong>Participation Record:</strong> Confirms that Voter ID <code>VS-XXXXXX</code> has exercised their right to vote in the designated election. This prevents duplicate balloting.
            </li>
            <li>
              <strong>Cryptographic Ballot Record:</strong> An anonymous, tamper-evident token recording the choice, verified against the candidate roster and stamped with a public SHA-256 hash.
            </li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            No relational foreign key, IP tracking link, or database column connects these two datasets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">3. Information Processed Locally</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            During your active session, the platform stores session parameters in standard browser <code>localStorage</code> solely for:
          </p>
          <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
            <li>Active voter authentication token and simulated profile parameters.</li>
            <li>Uncompleted ballot drafts to prevent data loss during accidental refreshes.</li>
            <li>Digital ballot receipt hashes for personal verification.</li>
            <li>User interface preferences such as high-contrast settings or font scaling.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">4. Public Auditability & Receipts</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each voter receives an immutable Digital Ballot Receipt. While this receipt allows the individual voter to prove their vote was counted in the general tally, it contains no human-readable candidate data, ensuring voters cannot be coerced or pressured into proving their political choices to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">5. Questions & Governance</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            For further information regarding privacy implementation details or verification algorithms, please contact the electoral data office at <code>privacy@votesphere.gov</code>.
          </p>
        </section>
      </Card>
    </div>
  );
};
