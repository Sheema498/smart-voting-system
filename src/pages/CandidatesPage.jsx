import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Search,
  Users,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Vote,
  Sparkles,
  X
} from 'lucide-react';

export const CandidatesPage = () => {
  const { candidates, elections } = useVoting();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElection, setSelectedElection] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'votes', 'election'

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(c => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.bio.toLowerCase().includes(searchTerm.toLowerCase());

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
          return a.electionId.localeCompare(b.electionId);
        }
        return 0;
      });
  }, [candidates, searchTerm, selectedElection, sortBy]);

  const getElectionTitle = (electionId) => {
    const el = elections.find(e => e.id === electionId);
    return el ? el.shortTitle : 'Election';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Candidate Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Verified Candidates & Propositions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Learn about the candidates running in your jurisdiction. Review their professional background, manifestos, policy pledges, and community endorsements.
        </p>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
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
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
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
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-700 font-medium"
            >
              <option value="all">All Elections ({elections.length})</option>
              {elections.map(el => (
                <option key={el.id} value={el.id}>
                  {el.shortTitle}
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
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-700 font-medium"
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
          {filteredCandidates.map(candidate => {
            const election = elections.find(e => e.id === candidate.electionId);
            const isActiveElection = election && election.status === 'active';

            return (
              <Card key={candidate.id} hover className="flex flex-col justify-between h-full border-slate-200">
                <div className="space-y-4">
                  
                  {/* Card Header: Avatar & Info */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${candidate.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}>
                      {candidate.avatarInitials}
                    </div>

                    <div className="min-w-0">
                      <Link
                        to={`/candidates/${candidate.id}`}
                        className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block truncate"
                      >
                        {candidate.name}
                      </Link>
                      <p className="text-xs text-slate-500 truncate">{candidate.position}</p>
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full">
                          {candidate.party}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Election Label */}
                  <div className="text-[11px] font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span>Election:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">
                      {getElectionTitle(candidate.electionId)}
                    </span>
                  </div>

                  {/* Tagline / Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
                    "{candidate.tagline}"
                  </p>

                  {/* Key Priorities Preview */}
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

                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link to={`/candidates/${candidate.id}`}>
                    <Button variant="secondary" fullWidth size="sm">
                      View Profile
                    </Button>
                  </Link>

                  {isActiveElection ? (
                    <Link to={`/voting/${candidate.electionId}`}>
                      <Button variant="primary" fullWidth size="sm" leftIcon={<Vote className="w-3.5 h-3.5" />}>
                        Vote For
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/elections/${candidate.electionId}`}>
                      <Button variant="outline" fullWidth size="sm">
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

    </div>
  );
};
