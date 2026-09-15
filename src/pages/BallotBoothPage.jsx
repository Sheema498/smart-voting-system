import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import {
  Vote,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  User,
  KeyRound,
  FileCheck2,
  Info,
  ExternalLink
} from 'lucide-react';

export const BallotBoothPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getElectionById, getCandidatesForElection, hasVoted, castVote } = useVoting();

  const election = getElectionById(electionId);
  const candidates = election ? getCandidatesForElection(election.id) : [];
  const alreadyVoted = election ? hasVoted(election.id) : false;

  // Wizard steps: 1: Select, 2: Review, 3: Sign & Submit
  const [step, setStep] = useState(1);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [pin, setPin] = useState('');
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inspectCandidate, setInspectCandidate] = useState(null);

  if (!election) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Election Not Found</h2>
        <p className="text-sm text-slate-600">Please select an active election from the voting hub.</p>
        <Link to="/voting">
          <Button variant="primary">Return to Voting Hub</Button>
        </Link>
      </div>
    );
  }

  if (alreadyVoted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Ballot Already Recorded</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            You have already cast your confidential ballot for <span className="font-semibold text-slate-800">{election.title}</span>. Each voter is permitted exactly one ballot to ensure democratic integrity.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link to="/voting">
            <Button variant="outline">Other Open Ballots</Button>
          </Link>
          <Link to="/results">
            <Button variant="primary">View Live Results</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);

  const handleProceedToReview = () => {
    if (!selectedCandidateId) {
      setError('Please select a candidate before proceeding.');
      return;
    }
    setError('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToSign = () => {
    setError('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter your 4-digit voting security PIN.');
      return;
    }
    if (!confirmedDeclaration) {
      setError('Please certify your democratic declaration checkbox.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const result = castVote({
        electionId: election.id,
        candidateId: selectedCandidateId,
        pin
      });

      setIsSubmitting(false);

      if (result.success) {
        // Navigate to success receipt page with receipt data
        navigate('/vote-success', { state: { receipt: result.receipt } });
      } else {
        setError(result.error);
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/voting"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Cancel & Exit Booth
        </Link>
        <span className="text-xs font-mono text-slate-400">
          Terminal ID: VS-BOOTH-04
        </span>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className={step >= 1 ? 'text-brand-600 font-bold' : 'text-slate-400'}>
            1. Select Candidate
          </span>
          <span className={step >= 2 ? 'text-brand-600 font-bold' : 'text-slate-400'}>
            2. Review Ballot
          </span>
          <span className={step >= 3 ? 'text-brand-600 font-bold' : 'text-slate-400'}>
            3. Sign & Seal
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Booth Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
          Official Ballot Booth • {election.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {election.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Voter ID: <span className="font-mono font-semibold text-slate-800">{user.voterId}</span> • Registered in {user.district}
        </p>
      </div>

      {/* STEP 1: CANDIDATE SELECTION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 flex items-start gap-3 text-xs text-brand-800">
            <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <span>
              Select one candidate or proposition below. Click on candidate details to inspect their complete policy manifesto before casting your selection.
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            {candidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidateId(candidate.id)}
                  className={`
                    p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4
                    ${isSelected
                      ? 'border-brand-600 bg-brand-50/40 shadow-md ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-subtle'
                    }
                  `}
                >
                  {/* Candidate Info */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${candidate.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 mt-0.5`}>
                      {candidate.avatarInitials}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {candidate.name}
                        </h3>
                        <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          {candidate.party}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{candidate.position}</p>
                      <p className="text-xs text-slate-600 line-clamp-1 italic pt-0.5">
                        "{candidate.tagline}"
                      </p>
                    </div>
                  </div>

                  {/* Right side: Radio check & manifesto preview */}
                  <div className="flex items-center gap-3 sm:shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectCandidate(candidate);
                      }}
                      className="text-xs text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-white"
                    >
                      Manifesto <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="trust"
              size="lg"
              onClick={handleProceedToReview}
              disabled={!selectedCandidateId}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Review Selection
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW BALLOT */}
      {step === 2 && selectedCandidate && (
        <div className="space-y-6">
          <Card className="border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Official Ballot Confirmation
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Please Review Your Choice Carefully
              </h2>
            </div>

            {/* Selected Choice Summary */}
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-brand-500/50 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${selectedCandidate.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}>
                  {selectedCandidate.avatarInitials}
                </div>
                <div>
                  <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Selected Candidate
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedCandidate.position} • {selectedCandidate.party}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                <p><strong>Election:</strong> {election.title}</p>
                <p><strong>Ballot Type:</strong> Direct Secret Choice (Decoupled Token)</p>
              </div>
            </div>

            {/* Caution Banner */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Irreversible Submission Notice
              </p>
              <p className="leading-relaxed">
                In accordance with electoral standards, once you proceed to digital signature verification and cast this ballot, it cannot be modified, replaced, or retracted.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep(1)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Change Selection
              </Button>

              <Button
                variant="trust"
                size="lg"
                onClick={handleProceedToSign}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Confirm & Proceed to PIN Signature
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 3: DIGITAL SIGNATURE & SEAL */}
      {step === 3 && selectedCandidate && (
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <Card className="border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Digital Cryptographic Signature
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Authorize & Seal Your Confidential Ballot
              </h2>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Summary strip */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="text-slate-500">Casting vote for:</p>
                <p className="text-sm font-bold text-slate-900">{selectedCandidate.name}</p>
              </div>
              <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                {selectedCandidate.party}
              </span>
            </div>

            {/* 4-digit voting PIN */}
            <div className="space-y-2 max-w-sm">
              <Input
                label="Enter 4-Digit Voting Security PIN"
                id="security-pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="1234"
                helperText="Demo Voter PIN is 1234"
                required
                leftIcon={<KeyRound className="w-4 h-4" />}
              />
            </div>

            {/* Citizen Declaration */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmedDeclaration}
                  onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I solemnly declare that I am the verified citizen registered to Voter ID <strong>{user.voterId}</strong>, and I am voluntarily casting this confidential ballot in accordance with electoral guidelines.
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setStep(2)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Back to Review
              </Button>

              <Button
                type="submit"
                variant="trust"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<Lock className="w-4 h-4" />}
              >
                Cast & Seal Ballot Now
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* Candidate Manifesto Inspection Modal */}
      {inspectCandidate && (
        <Modal
          isOpen={Boolean(inspectCandidate)}
          onClose={() => setInspectCandidate(null)}
          title={inspectCandidate.name}
          subtitle={`${inspectCandidate.position} • ${inspectCandidate.party}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Campaign Vision</p>
              <p className="text-xs text-slate-600 italic">"{inspectCandidate.quote || inspectCandidate.tagline}"</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Biography</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{inspectCandidate.bio}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Priorities</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {inspectCandidate.priorities.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedCandidateId(inspectCandidate.id);
                  setInspectCandidate(null);
                }}
              >
                Select This Candidate
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
