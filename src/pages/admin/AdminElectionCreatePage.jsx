import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { validateElectionForm } from '../../utils/validators';
import { ArrowLeft, Save, Plus, AlertCircle } from 'lucide-react';

export const AdminElectionCreatePage = () => {
  const navigate = useNavigate();
  const { elections, setElections } = useVoting();
  const { adminUser } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    category: 'Municipal Government',
    status: 'Upcoming',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    eligibleVoters: 5000,
    description: '',
    eligibility: 'All verified electors registered within the designated district.',
    votingRules: 'Standard democratic ballot: select one certified candidate; PIN signature required.'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Academic Governance',
    'Municipal Government',
    'Civic Board',
    'Community Initiatives',
    'Corporate / Co-op',
    'Cultural Arts'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateElectionForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    const newId = `el-${Date.now().toString(36)}`;
    const newElection = {
      ...formData,
      id: newId,
      shortTitle: formData.shortTitle || formData.title.slice(0, 20),
      eligibleVoters: Number(formData.eligibleVoters)
    };

    // Update elections state
    if (setElections) {
      setElections((prev) => [newElection, ...prev]);
    }

    await AuditService.logEvent({
      action: 'ELECTION_INITIATED',
      actor: adminUser?.name || 'Administrator',
      severity: 'info',
      details: {
        electionId: newId,
        title: newElection.title,
        category: newElection.category
      }
    });

    setIsSubmitting(false);
    navigate('/admin/elections');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/elections"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Elections List
        </Link>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create New Election Contest
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Establish a new democratic race, configure timetable parameters, and designate eligible voter rolls.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Election Title *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g. 2026 Metropolitan Water District Board"
              required
            />
            <Input
              label="Short Title / Nav Label"
              name="shortTitle"
              value={formData.shortTitle}
              onChange={handleChange}
              placeholder="e.g. Water Board"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Initial Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Upcoming">Upcoming (Scheduled)</option>
                <option value="Active">Active (Open for Voting)</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Polls Open Date *"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
            />
            <Input
              label="Polls Close Date *"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              required
            />
            <Input
              label="Eligible Elector Count *"
              name="eligibleVoters"
              type="number"
              value={formData.eligibleVoters}
              onChange={handleChange}
              error={errors.eligibleVoters}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Official Description *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a comprehensive summary of this election and why it matters..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-600 mt-1 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Eligibility Criteria"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
            />
            <Input
              label="Voting Rules Statement"
              name="votingRules"
              value={formData.votingRules}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/elections')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-1.5" />
              {isSubmitting ? 'Registering...' : 'Register Election Contest'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
