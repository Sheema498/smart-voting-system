import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Search,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Vote,
  BarChart3,
  X
} from 'lucide-react';

export const ElectionsPage = () => {
  const { elections, hasVoted } = useVoting();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'upcoming', 'completed'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(elections.map(e => e.category));
    return ['all', ...Array.from(cats)];
  }, [elections]);

  // Filtered elections
  const filteredElections = useMemo(() => {
    return elections.filter(e => {
      const matchesSearch = 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [elections, searchTerm, statusFilter, categoryFilter]);

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Electoral Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Elections & Referendums
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Review open ballots, upcoming candidate elections, and certified historical referendum results across your registered voting jurisdictions.
        </p>
      </div>

      {/* Controls: Search & Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search elections by title, keywords, or jurisdiction..."
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

          {/* Status Filter Tabs */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active Polls' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'completed', label: 'Completed' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all ${
                  statusFilter === tab.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg border transition-colors ${
                categoryFilter === cat
                  ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Elections Grid */}
      {filteredElections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map(election => {
            const alreadyVoted = hasVoted(election.id);
            const isActive = election.status === 'active';
            const isUpcoming = election.status === 'upcoming';
            const isCompleted = election.status === 'completed';

            return (
              <Card key={election.id} hover className="flex flex-col justify-between h-full border-slate-200">
                <div className="space-y-4">
                  
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg truncate">
                      {election.category}
                    </span>
                    <Badge status={election.status} dot={isActive} size="sm">
                      {election.status === 'active' ? 'Polls Open' : election.status === 'upcoming' ? 'Scheduled' : 'Certified'}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Link
                      to={`/elections/${election.id}`}
                      className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {election.title}
                    </Link>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {election.description}
                    </p>
                  </div>

                  {/* Metadata: Dates & Counts */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {isCompleted ? 'Closed' : isUpcoming ? 'Opens' : 'Closes'}:
                      </span>
                      <span className="font-medium text-slate-700">
                        {formatDate(isUpcoming ? election.startDate : election.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Candidates:
                      </span>
                      <span className="font-medium text-slate-700">
                        {election.candidateIds.length} Registered
                      </span>
                    </div>

                    {alreadyVoted && (
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>You have cast your ballot in this election</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link to={`/elections/${election.id}`}>
                    <Button variant="secondary" fullWidth size="sm">
                      Details
                    </Button>
                  </Link>

                  {isActive ? (
                    alreadyVoted ? (
                      <Link to={`/results`}>
                        <Button variant="outline" fullWidth size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                          Results
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/voting/${election.id}`}>
                        <Button variant="primary" fullWidth size="sm" leftIcon={<Vote className="w-3.5 h-3.5" />}>
                          Vote Now
                        </Button>
                      </Link>
                    )
                  ) : isCompleted ? (
                    <Link to="/results">
                      <Button variant="outline" fullWidth size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                        Results
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/elections/${election.id}`}>
                      <Button variant="outline" fullWidth size="sm">
                        Candidates
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
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching elections found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any elections matching "{searchTerm}". Try clearing your keyword filters or switching status categories.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}

    </div>
  );
};
