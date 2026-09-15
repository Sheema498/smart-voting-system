import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { validateCandidateForm } from '../../utils/validators';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export const AdminCandidateCreatePage = () => {
  const navigate = useNavigate();
  const { elections, candidates, setCandidates } = useVoting();
  const { adminUser } = useAdminAuth();

  const [formData, setFormData] = useState({
    name: '',
    party: '',
    position: '',
    electionId: elections[0]?.id || '',
    tagline: '',
    bio: '',
    education: '',
    prioritiesText: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateCandidateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    const newId = `cand-${Date.now().toString(36)}`;

    const priorities = formData.prioritiesText
      ? formData.prioritiesText.split('\n').map((s) => s.trim()).filter(Boolean)
      : ['Integrity & Public Service', 'Transparent Governance'];

    const initials = formData.name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newCandidate = {
      id: newId,
      name: formData.name,
      party: formData.party,
      position: formData.position,
      electionId: formData.electionId,
      tagline: formData.tagline || 'Committed to serving our community with transparency and dedication.',
      bio: formData.bio,
      education: formData.education || 'B.A. Public Policy & Civic Governance',
      priorities,
      avatarInitials: initials,
      avatarBg: 'bg-primary-600',
      votes: 0
    };

    if (setCandidates) {
      setCandidates((prev) => [newCandidate, ...prev]);
    }

    await AuditService.logEvent({
      action: 'CANDIDATE_CERTIFIED',
      actor: adminUser?.name || 'Administrator',
      severity: 'info',
      details: {
        candidateId: newId,
        name: newCandidate.name,
        party: newCandidate.party,
        electionId: newCandidate.electionId
      }
    });

    setIsSubmitting(false);
    navigate('/admin/candidates');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/candidates"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Candidate Registry
        </Link>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Register Candidate Nomination
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish official candidate profile, manifesto pledges, and election contest affiliation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Candidate Full Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. Maya Lin-Chen"
              required
            />
            <Input
              label="Party / Group Affiliation *"
              name="party"
              value={formData.party}
              onChange={handleChange}
              error={errors.party}
              placeholder="e.g. Democratic Alliance / Independent"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Contested Office / Position *"
              name="position"
              value={formData.position}
              onChange={handleChange}
              error={errors.position}
              placeholder="e.g. Municipal Council Chair"
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Election Contest *
              </label>
              <select
                name="electionId"
                value={formData.electionId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {elections.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.title} ({el.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Campaign Tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="e.g. Building transparent, sustainable community infrastructure."
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Candidate Manifesto / Biography *
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Provide the candidate's verified platform statement, background, and civic vision..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.bio ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
              }`}
            />
            {errors.bio && (
              <p className="text-xs text-rose-600 mt-1 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.bio}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Key Priorities (One per line)
              </label>
              <textarea
                name="prioritiesText"
                rows={3}
                value={formData.prioritiesText}
                onChange={handleChange}
                placeholder="Expand public transit&#10;Fiscal transparency audit&#10;Community solar energy"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <Input
              label="Education & Background"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g. M.S. Urban Planning, Harvard University"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/candidates')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-1.5" />
              {isSubmitting ? 'Registering...' : 'Register Candidate Profile'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
