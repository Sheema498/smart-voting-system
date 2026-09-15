import React, { useState, useMemo } from 'react';
import { mockVoters } from '../../data/mockVoters';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Search, UserCheck, ShieldAlert, Filter, Power } from 'lucide-react';

export const AdminVotersPage = () => {
  const { adminUser } = useAdminAuth();
  const [voters, setVoters] = useState(() => {
    try {
      const stored = localStorage.getItem('votesphere_admin_voters');
      return stored ? JSON.parse(stored) : mockVoters;
    } catch {
      return mockVoters;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateVotersState = (newVoters) => {
    setVoters(newVoters);
    localStorage.setItem('votesphere_admin_voters', JSON.stringify(newVoters));
  };

  const handleToggleStatus = async (voter) => {
    const nextStatus = voter.status === 'Active' ? 'Suspended' : 'Active';
    const updated = voters.map((v) => (v.id === voter.id ? { ...v, status: nextStatus } : v));
    updateVotersState(updated);

    await AuditService.logEvent({
      action: 'VOTER_REGISTRY_STATUS_CHANGED',
      actor: adminUser?.name || 'Administrator',
      severity: 'warning',
      details: { voterId: voter.voterId, name: voter.name, newStatus: nextStatus }
    });
  };

  const filteredVoters = useMemo(() => {
    return voters.filter((v) => {
      const matchesStatus = statusFilter === 'all' || v.status.toLowerCase() === statusFilter.toLowerCase();
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        v.name.toLowerCase().includes(q) ||
        v.voterId.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        (v.district && v.district.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [voters, searchTerm, statusFilter]);

  const totalCount = voters.length;
  const activeCount = voters.filter((v) => v.status === 'Active').length;
  const pendingCount = voters.filter((v) => v.status === 'Pending').length;
  const suspendedCount = voters.filter((v) => v.status === 'Suspended').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Voter Registry Roll
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit registered electors, jurisdiction districts, and participation eligibility.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Registered</span>
          <p className="text-2xl font-extrabold text-slate-900">{totalCount}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Active Standing</span>
          <p className="text-2xl font-extrabold text-emerald-600">{activeCount}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Pending Verification</span>
          <p className="text-2xl font-extrabold text-amber-600">{pendingCount}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Suspended</span>
          <p className="text-2xl font-extrabold text-rose-600">{suspendedCount}</p>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search voter by name, Voter ID (VS-...), email, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'active', 'pending', 'suspended'].map((status) => (
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

      {/* Voters Table */}
      <Card className="bg-white overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-3.5 px-6">Elector Name</th>
                <th className="py-3.5 px-6">Official Voter ID</th>
                <th className="py-3.5 px-6">District / Region</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Registered</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredVoters.length > 0 ? (
                filteredVoters.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{v.name}</div>
                      <div className="text-xs text-slate-400">{v.email}</div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-primary-700">
                      {v.voterId}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-700">
                      {v.district || 'District 4 - Central'}
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          v.status === 'Active'
                            ? 'success'
                            : v.status === 'Pending'
                            ? 'primary'
                            : 'neutral'
                        }
                      >
                        {v.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {v.registeredAt || '2026-01-15'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(v)}
                        className={`text-xs ${
                          v.status === 'Active'
                            ? 'text-rose-600 hover:text-rose-700'
                            : 'text-emerald-600 hover:text-emerald-700'
                        }`}
                      >
                        <Power className="w-3 h-3 mr-1" />
                        {v.status === 'Active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No voters located matching the current query.
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
