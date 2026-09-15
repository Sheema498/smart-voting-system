import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  ChevronLeft,
  Vote,
  Award,
  CheckCircle2,
  Calendar,
  Briefcase,
  Quote,
  ArrowRight,
  AlertCircle,
  FileCheck2,
  Share2
} from 'lucide-react';

export const CandidateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidateById, getElectionById, hasVoted } = useVoting();

  const candidate = getCandidateById(id);
  const election = candidate ? getElectionById(candidate.electionId) : null;
  const alreadyVoted = election ? hasVoted(election.id) : false;
  const isActive = election && election.status === 'active';

  if (!candidate) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Candidate Not Found</h2>
        <p className="text-sm text-slate-600">
          The requested candidate record could not be retrieved from the verified registry.
        </p>
        <Link to="/candidates">
          <Button variant="primary">Return to Candidates Roster</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumbs */}
      <div>
        <Link
          to="/candidates"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Candidate Directory
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-600">Home</Link>
          <span>/</span>
          <Link to="/candidates" className="hover:text-slate-600">Candidates</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{candidate.name}</span>
        </div>
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-card space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Large Avatar */}
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ${candidate.avatarBg} text-white flex items-center justify-center font-extrabold text-3xl sm:text-4xl shadow-lg shadow-brand-500/10 shrink-0`}>
            {candidate.avatarInitials}
          </div>

          {/* Core Profile Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-block text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                {candidate.party}
              </span>
              <Badge variant="emerald" size="md">
                Certified Candidacy ✓
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {candidate.name}
            </h1>

            <p className="text-base text-slate-600 font-medium">
              {candidate.position}
            </p>

            {election && (
              <p className="text-xs text-slate-500">
                Running in:{' '}
                <Link to={`/elections/${election.id}`} className="text-brand-600 font-semibold hover:underline">
                  {election.title}
                </Link>
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto shrink-0 flex flex-col gap-2">
            {isActive && !alreadyVoted ? (
              <Link to={`/voting/${candidate.electionId}`} className="w-full">
                <Button variant="trust" size="lg" fullWidth leftIcon={<Vote className="w-5 h-5" />}>
                  Cast Ballot For {candidate.name.split(' ')[0]}
                </Button>
              </Link>
            ) : alreadyVoted ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You Have Voted In This Election</span>
              </div>
            ) : (
              <Link to={`/elections/${candidate.electionId}`} className="w-full">
                <Button variant="outline" size="md" fullWidth>
                  View Election
                </Button>
              </Link>
            )}
          </div>

        </div>

        {/* Candidate Quote / Campaign Slogan */}
        {candidate.quote && (
          <div className="p-5 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-start gap-3.5">
            <Quote className="w-6 h-6 text-brand-500 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base font-medium text-brand-900 italic">
              "{candidate.quote}"
            </p>
          </div>
        )}
      </div>

      {/* Two Column Layout: Biography & Policy Manifestos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Biography & Experience */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Biography & Background
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {candidate.bio}
            </p>
          </Card>

          <Card className="border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
              <Briefcase className="w-5 h-5 text-brand-600" />
              <h2>Experience & Leadership History</h2>
            </div>
            <ul className="space-y-3 pt-2">
              {candidate.experience.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-brand-600 mt-2 shrink-0" />
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right Column: Key Priorities & Election Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
              <Award className="w-5 h-5 text-emerald-600" />
              <h2>Key Policy Priorities</h2>
            </div>
            <p className="text-xs text-slate-500">
              Core legislative and administrative goals if elected:
            </p>
            <ul className="space-y-3 pt-1">
              {candidate.priorities.map((priority, idx) => (
                <li key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Election Info Widget */}
          {election && (
            <Card className="border-slate-200 p-6 space-y-3 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Related Election Overview
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {election.title}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Total Candidates: {election.candidateIds.length}</span>
                <Link to={`/elections/${election.id}`} className="text-brand-600 font-semibold hover:underline">
                  View Rules & Timeline →
                </Link>
              </div>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};
