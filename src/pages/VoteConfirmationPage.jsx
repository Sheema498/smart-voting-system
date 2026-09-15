import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Vote,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export const VoteConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { elections, hasVoted } = useVoting();

  const activeElections = elections.filter(e => e.status === 'active' && !hasVoted(e.id));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Back Link */}
      <div>
        <Link
          to="/voting"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Voting Hub
        </Link>
      </div>

      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Ballot Verification & Pre-Submission Audit
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Before your ballot is sealed into the cryptographic ledger, review the electoral integrity guarantees applied to every vote cast on VoteSphere.
        </p>
      </div>

      <Card className="border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
          Verification Guarantees
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Anonymized Ballot Enclosure</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Your authentication identifier is permanently severed from the ballot package prior to recording.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">SHA-256 Digital Receipt Generation</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Every cast ballot issues a cryptographic hash receipt confirming inclusion in official election tallies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Finality of Submission</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                To preserve election integrity, votes cannot be rewritten or reversed once the security PIN is accepted.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/voting" className="w-full sm:w-auto">
            <Button variant="outline" fullWidth size="md">
              Back to Voting Hub
            </Button>
          </Link>

          {activeElections.length > 0 ? (
            <Link to={`/voting/${activeElections[0].id}`} className="w-full sm:w-auto">
              <Button variant="trust" fullWidth size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Active Ballot Booth
              </Button>
            </Link>
          ) : (
            <Link to="/results" className="w-full sm:w-auto">
              <Button variant="primary" fullWidth size="md">
                View Election Results
              </Button>
            </Link>
          )}
        </div>
      </Card>

    </div>
  );
};
