import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Plus, Search, Eye, Edit3, Users } from 'lucide-react';

export const AdminCandidatesPage = () => {
  const { candidates, elections } = useVoting();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElection, setSelectedElection] = useState('all');

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesElection = selectedElection === 'all' || c.electionId === selectedElection;
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        c.name.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        c.position.toLowerCase().includes(q);
      return matchesElection && matchesSearch;
    });
  }, [candidates, searchTerm, selectedElection]);

  const getElectionTitle = (elId) => {
    const el = elections.find((e) => e.id === elId);
    return el ? el.shortTitle || el.title : elId;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Candidate Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit certified candidate profiles, manifestos, and election race affiliations.
          </p>
        </div>

        <Link to="/admin/candidates/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-1.5" /> Register Candidate
          </Button>
        </Link>
      </div>

      <Card className="p-4 bg-white space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-7 relative">
            <Input
              placeholder="Search by candidate name, party, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          <div className="sm:col-span-5">
            <select
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            >
              <option value="all">All Elections ({elections.length})</option>
              {elections.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.shortTitle || el.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="bg-white overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3.5 px-6">Candidate</th>
                <th className="py-3.5 px-6">Affiliation / Party</th>
                <th className="py-3.5 px-6">Contest / Office</th>
                <th className="py-3.5 px-6">Election</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${
                            c.avatarBg || 'bg-primary-600'
                          } text-white flex items-center justify-center font-bold text-xs shrink-0`}
                        >
                          {c.avatarInitials || c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-50 text-primary-700">
                        {c.party}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-700 font-medium">
                      {c.position}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-semibold truncate max-w-[200px]">
                      {getElectionTitle(c.electionId)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/candidates/${c.id}`}
                          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/candidates/${c.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                    No candidates located matching your query.
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
