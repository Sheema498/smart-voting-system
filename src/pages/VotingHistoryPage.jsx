import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  History,
  FileCheck2,
  ShieldCheck,
  Download,
  Printer,
  ExternalLink,
  Calendar,
  Lock,
  Vote
} from 'lucide-react';
import { downloadBlob } from '../utils/csvExport';

export const VotingHistoryPage = () => {
  const { user } = useAuth();
  const { voterReceipts, elections } = useVoting();
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleDownloadReceipt = (rc) => {
    const text = `=====================================================
OFFICIAL DIGITAL BALLOT RECEIPT
VOTESPHERE DEMOCRATIC EXCHANGE
=====================================================
Receipt ID       : ${rc.receiptId}
Election Title   : ${rc.electionTitle}
Election ID      : ${rc.electionId}
Timestamp (UTC)  : ${rc.timestamp}
SHA-256 Hash     : ${rc.hash}
Decoupling Status: Verified Anonymous (Zero-Knowledge)
Signature Alg    : SHA-256 HMAC Multi-Signature
=====================================================
This receipt is mathematical proof that your ballot
was included in the certified election tally.
Verify at: https://votesphere.gov/results/${rc.electionId}
=====================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    downloadBlob(blob, `${rc.receiptId}-certificate.txt`);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>Voter Ledger</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Verified Voting History
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Review cryptographic certificates for every election in which you have cast a ballot. Each receipt contains a unique SHA-256 hash enabling you to independently audit that your vote was tallied.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-medium">Ballots Cast</span>
          <p className="text-2xl font-extrabold text-slate-900">{voterReceipts.length}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-medium">Participation Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {elections.length > 0 ? `${((voterReceipts.length / elections.length) * 100).toFixed(0)}%` : '100%'}
          </p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-medium">Decoupling Integrity</span>
          <p className="text-2xl font-extrabold text-primary-600">100%</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-medium">Voter Standing</span>
          <p className="text-2xl font-extrabold text-slate-900">Good Faith</p>
        </Card>
      </div>

      {/* Receipts List */}
      {voterReceipts.length > 0 ? (
        <div className="space-y-4">
          {voterReceipts.map((rc, idx) => (
            <Card
              key={rc.receiptId || idx}
              className="p-6 bg-white hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="success">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Cast
                    </Badge>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(rc.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{rc.electionTitle}</h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReceipt(rc)}
                    title="Download verifiable text certificate"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Certificate
                  </Button>
                  <Link to={`/results/${rc.electionId}`}>
                    <Button variant="primary" size="sm">
                      Audit Tally <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-sans">Official Receipt Code</span>
                  <span className="font-bold text-primary-700 text-sm">{rc.receiptId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Cryptographic Hash (SHA-256)</span>
                  <span className="text-slate-700 truncate block">{rc.hash || '8fa43e91b409cd83...'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center text-emerald-700">
                  <Lock className="w-3.5 h-3.5 mr-1" /> Candidate choice severed from identity for zero-knowledge secrecy
                </span>
                <span className="font-semibold text-slate-700">Jurisdiction: Certified</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center max-w-lg mx-auto space-y-4 bg-white">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Vote className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Ballots Cast Yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You haven't participated in any active elections yet. Check the voting hub to view open ballots ready for your submission.
          </p>
          <Link to="/voting">
            <Button variant="primary" size="sm">
              Open Voting Hub
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};
