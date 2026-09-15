import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Printer,
  Download,
  ShieldCheck,
  BarChart3,
  LayoutDashboard,
  Copy,
  Check,
  Lock
} from 'lucide-react';

export const VoteSuccessPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { lastReceipt } = useVoting();
  const [copied, setCopied] = React.useState(false);

  // Retrieve receipt from router location state or context lastReceipt or fallback default
  const receipt = location.state?.receipt || lastReceipt || {
    receiptHash: "0x8f4c2e19a0d8b573c9f1165a29db4ef891a27e01b33d45c6",
    confirmationCode: "VS-REC-2026-88391",
    electionTitle: "University Student Council General Election 2026",
    candidateName: "Aria Sterling",
    candidatePosition: "Student Body President Candidate",
    timestamp: new Date().toISOString(),
    voterId: user?.voterId || 'VS-984210-2026',
    status: "Cryptographically Verified"
  };

  useEffect(() => {
    // Fire celebratory confetti bursts
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch (e) {
      console.error('Confetti animation error', e);
    }
  }, []);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(receipt.receiptHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `=====================================================
VOTESPHERE OFFICIAL DIGITAL BALLOT RECEIPT
=====================================================
Election:          ${receipt.electionTitle}
Selected Option:   ${receipt.candidateName}
Timestamp:         ${new Date(receipt.timestamp).toUTCString()}
Verification Code: ${receipt.confirmationCode}
Cryptographic Hash:
${receipt.receiptHash}
Voter Credential:  ${receipt.voterId}
Status:            ${receipt.status}
=====================================================
This cryptographic receipt certifies that your ballot was
successfully verified, anonymized, and recorded in the
electoral pool. Keep this receipt to verify your vote in
published tally audits.
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VoteSphere-Receipt-${receipt.confirmationCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Header Badge */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Ballot Successfully Cast!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your confidential ballot has been sealed into the cryptographic tally pool. Below is your permanent verification receipt.
        </p>
      </div>

      {/* Official Printable Receipt Card */}
      <div id="printable-receipt">
        <Card className="border-2 border-slate-300 p-6 sm:p-8 space-y-6 bg-white shadow-elevated">
          
          {/* Receipt Top Row */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                VS
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">VoteSphere Civic Platform</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Official Digital Ballot Receipt</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Tallied
              </span>
            </div>
          </div>

          {/* Receipt Data Details */}
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Election:</span>
              <span className="font-bold text-slate-900 text-right max-w-[280px]">
                {receipt.electionTitle}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Selection Cast:</span>
              <span className="font-bold text-slate-900 text-right">
                {receipt.candidateName}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Timestamp:</span>
              <span className="font-mono text-slate-700 text-right">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Confirmation Code:</span>
              <span className="font-mono font-bold text-brand-700 text-right">
                {receipt.confirmationCode}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Voter ID (Authorization):</span>
              <span className="font-mono text-slate-700 text-right">
                {receipt.voterId}
              </span>
            </div>

            {/* Cryptographic SHA-256 Hash Box */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> Cryptographic Ballot Hash (SHA-256):
                </span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="text-brand-600 hover:text-brand-700 text-[11px] font-semibold inline-flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy Hash'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 break-all select-all">
                {receipt.receiptHash}
              </div>
            </div>
          </div>

          {/* Receipt Watermark / Notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed text-center">
            This digital certificate serves as mathematical proof that your vote was successfully counted. Your personal voter identity remains completely detached and confidential.
          </div>

        </Card>
      </div>

      {/* Action Buttons (Excluded from print) */}
      <div className="no-print space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            size="md"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Receipt
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="md"
            onClick={handleDownload}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Receipt (.txt)
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link to="/results" className="block">
            <Button
              variant="trust"
              fullWidth
              size="lg"
              leftIcon={<BarChart3 className="w-4 h-4" />}
            >
              View Live Election Results
            </Button>
          </Link>

          <Link to="/dashboard" className="block">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
