import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AdminElectionEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { elections, setElections } = useVoting();
  const { adminUser } = useAdminAuth();

  const election = elections.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    category: '',
    status: '',
    startDate: '',
    endDate: '',
    eligibleVoters: 0,
    description: '',
    eligibility: '',
    votingRules: ''
  });

  useEffect(() => {
    if (election) {
      setFormData({
        title: election.title || '',
        shortTitle: election.shortTitle || '',
        category: election.category || '',
        status: election.status || 'Active',
        startDate: election.startDate || '',
        endDate: election.endDate || '',
        eligibleVoters: election.eligibleVoters || 0,
        description: election.description || '',
        eligibility: election.eligibility || '',
        votingRules: election.votingRules || ''
      });
    }
  }, [election]);

  if (!election) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Election Not Found</h2>
        <Link to="/admin/elections">
          <Button variant="primary">Back to Elections</Button>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      ...election,
      ...formData,
      eligibleVoters: Number(formData.eligibleVoters)
    };

    if (setElections) {
      setElections((prev) => prev.map((el) => (el.id === election.id ? updated : el)));
    }

    await AuditService.logEvent({
      action: 'ELECTION_PARAMETERS_MODIFIED',
      actor: adminUser?.name || 'Administrator',
      severity: 'warning',
      details: { electionId: election.id, newEndDate: updated.endDate, status: updated.status }
    });

    navigate(`/admin/elections/${election.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to={`/admin/elections/${election.id}`}
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Election Overview
        </Link>
        <span className="text-xs text-slate-400 font-mono">ID: {election.id}</span>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Edit Election Parameters
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Adjust voting timetable deadlines, participation thresholds, or descriptive notices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Election Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Short Title"
              name="shortTitle"
              value={formData.shortTitle}
              onChange={handleChange}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
            />
            <Input
              label="Eligible Elector Roll"
              name="eligibleVoters"
              type="number"
              value={formData.eligibleVoters}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/elections/${election.id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-1.5" /> Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
