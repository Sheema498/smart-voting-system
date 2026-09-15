import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Plus, Search, Filter, Eye, Edit3, BarChart2, Calendar } from 'lucide-react';

export const AdminElectionsPage = () => {
  const { elections, votes } = useVoting();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredElections = useMemo(() => {
    return elections.filter((e) => {
      const matchesStatus = statusFilter === 'all' || e.status.toLowerCase() === statusFilter.toLowerCase();
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [elections, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Elections Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure, monitor, and certify democratic contests across all jurisdictions.
          </p>
        </div>

        <Link to="/admin/elections/new">
          <Button variant="primary" className="shadow-xs">
            <Plus className="w-4 h-4 mr-1.5" /> Create New Election
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search by title, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'active', 'upcoming', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  statusFilter === status
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Elections Table */}
      <Card className="bg-white overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3.5 px-6">Election / Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Turnout</th>
                <th className="py-3.5 px-6">Schedule</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredElections.length > 0 ? (
                filteredElections.map((e) => {
                  const elVotes = votes[e.id]?.totalVotes || 0;
                  const turnout = ((elVotes / (e.eligibleVoters || 1)) * 100).toFixed(1);

                  return (
                    <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{e.title}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{e.id}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                          {e.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            e.status === 'Active'
                              ? 'success'
                              : e.status === 'Upcoming'
                              ? 'primary'
                              : 'neutral'
                          }
                        >
                          {e.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs font-bold text-slate-900">
                          {elVotes.toLocaleString()} / {e.eligibleVoters?.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold">{turnout}% Turnout</div>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600">
                        <div>{e.startDate}</div>
                        <div className="text-slate-400">to {e.endDate}</div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/elections/${e.id}`}
                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Inspect Election"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/admin/elections/${e.id}/edit`}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Parameters"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/admin/results/${e.id}`}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Tallies"
                          >
                            <BarChart2 className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No elections found matching the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
