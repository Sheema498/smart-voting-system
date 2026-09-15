import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import {
  Search,
  Users,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Vote,
  Sparkles,
  X,
  Scale,
  CheckCircle2,
  GraduationCap,
  Award
} from 'lucide-react';

export const CandidatesPage = () => {
  const { candidates, elections } = useVoting();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElection, setSelectedElection] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'votes', 'election'
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.tagline && c.tagline.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (c.bio && c.bio.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesElection = selectedElection === 'all' || c.electionId === selectedElection;

        return matchesSearch && matchesElection;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'votes') {
          return (b.votes || 0) - (a.votes || 0);
        }
        if (sortBy === 'election') {
          return (a.electionId || '').localeCompare(b.electionId || '');
        }
        return 0;
      });
  }, [candidates, searchTerm, selectedElection, sortBy]);

  const getElectionTitle = (electionId) => {
    const el = elections.find((e) => e.id === electionId);
    return el ? el.shortTitle || el.title : 'Election';
  };

  const toggleCompare = (candidate) => {
    if (compareList.some((c) => c.id === candidate.id)) {
      setCompareList((prev) => prev.filter((c) => c.id !== candidate.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 candidates simultaneously.');
        return;
      }
      setCompareList((prev) => [...prev, candidate]);
    }
  };

  const removeCompare = (id) => {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Candidate Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Verified Candidates & Propositions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Learn about the candidates running in your jurisdiction. Review their professional background, manifestos, policy pledges, and compare up to 3 candidates side-by-side.
        </p>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate by name, party, position, or policy..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Election Filter Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-700 font-medium"
            >
              <option value="all">All Elections ({elections.length})</option>
              {elections.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.shortTitle || el.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-700 font-medium"
            >
              <option value="name">Alphabetical (A-Z)</option>
              <option value="votes">Most Votes Tally</option>
              <option value="election">By Election</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Cards Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => {
            const election = elections.find((e) => e.id === candidate.electionId);
            const isActiveElection = election && election.status === 'Active';
            const isComparing = compareList.some((c) => c.id === candidate.id);

            return (
              <Card
                key={candidate.id}
                className={`flex flex-col justify-between h-full border transition-all ${
                  isComparing
                    ? 'border-primary-500 ring-2 ring-primary-100 bg-primary-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Card Header: Avatar & Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${
                          candidate.avatarBg || 'bg-primary-600'
                        } text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
                      >
                        {candidate.avatarInitials || candidate.name.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <Link
                          to={`/candidates/${candidate.id}`}
                          className="text-base font-bold text-slate-900 hover:text-primary-600 transition-colors block truncate"
                        >
                          {candidate.name}
                        </Link>
                        <p className="text-xs text-slate-500 truncate">{candidate.position}</p>
                        <div className="mt-1">
                          <span className="inline-block text-[10px] font-semibold text-primary-700 bg-primary-50 border border-primary-200/60 px-2 py-0.5 rounded-full">
                            {candidate.party}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Compare Checkbox Button */}
                    <button
                      onClick={() => toggleCompare(candidate)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                        isComparing
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                      title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isComparing ? 'Added' : 'Compare'}</span>
                    </button>
                  </div>

                  {/* Election Label */}
                  <div className="text-[11px] font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span>Election:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">
                      {getElectionTitle(candidate.electionId)}
                    </span>
                  </div>

                  {/* Tagline / Bio */}
                  {candidate.tagline && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
                      "{candidate.tagline}"
                    </p>
                  )}

                  {/* Key Priorities Preview */}
                  {candidate.priorities && candidate.priorities.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                        Key Priorities:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {candidate.priorities.slice(0, 2).map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span className="line-clamp-1">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link to={`/candidates/${candidate.id}`}>
                    <Button variant="outline" className="w-full" size="sm">
                      View Profile
                    </Button>
                  </Link>

                  {isActiveElection ? (
                    <Link to={`/voting/${candidate.electionId}`}>
                      <Button variant="primary" className="w-full" size="sm">
                        <Vote className="w-3.5 h-3.5 mr-1" /> Vote For
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/elections/${candidate.electionId}`}>
                      <Button variant="outline" className="w-full" size="sm">
                        Election
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No candidates match your filters</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try adjusting your search terms or clearing the election filter to explore all registered candidates.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedElection('all');
              setSortBy('name');
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Floating Compare Drawer Bar (When 1+ candidates selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 flex items-center gap-4 max-w-lg animate-in slide-in-from-bottom">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Scale className="w-5 h-5 text-primary-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                Comparing {compareList.length} candidate{compareList.length > 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 truncate">
                {compareList.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center text-[10px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded-md"
                  >
                    {c.name.split(' ')[0]}
                    <button
                      onClick={() => removeCompare(c.id)}
                      className="ml-1 text-slate-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-primary-500 hover:bg-primary-600 text-xs font-bold"
            >
              Compare Now
            </Button>
            <button
              onClick={() => setCompareList([])}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <Modal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        title="Side-by-Side Candidate Comparison"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {compareList.map((cand) => (
              <div key={cand.id} className="pt-4 md:pt-0 md:px-3 space-y-4 first:pl-0 last:pr-0">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${
                      cand.avatarBg || 'bg-primary-600'
                    } text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
                  >
                    {cand.avatarInitials || cand.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{cand.name}</h4>
                    <p className="text-xs text-primary-600 font-semibold">{cand.party}</p>
                    <p className="text-xs text-slate-500">{cand.position}</p>
                  </div>
                </div>

                {cand.tagline && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs italic text-slate-700">
                    "{cand.tagline}"
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Platform Summary
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{cand.bio}</p>
                </div>

                {cand.priorities && cand.priorities.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Core Priorities
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {cand.priorities.map((pr, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {cand.education && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Education
                    </span>
                    <p className="text-xs text-slate-700 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{cand.education}</span>
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <Link to={`/candidates/${cand.id}`} onClick={() => setIsCompareModalOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Full Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="secondary" onClick={() => setIsCompareModalOpen(false)}>
              Close Comparison
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
