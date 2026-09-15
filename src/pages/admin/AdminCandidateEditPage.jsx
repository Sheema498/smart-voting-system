import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useVoting } from '../../context/VotingContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AdminCandidateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, setCandidates, elections } = useVoting();
  const { adminUser } = useAdminAuth();

  const candidate = candidates.find((c) => c.id === id);

  const [formData, setFormData] = useState({
    name: '',
    party: '',
    position: '',
    electionId: '',
    tagline: '',
    bio: '',
    education: '',
    prioritiesText: ''
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name || '',
        party: candidate.party || '',
        position: candidate.position || '',
        electionId: candidate.electionId || '',
        tagline: candidate.tagline || '',
        bio: candidate.bio || '',
        education: candidate.education || '',
        prioritiesText: candidate.priorities ? candidate.priorities.join('\n') : ''
      });
    }
  }, [candidate]);

  if (!candidate) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Candidate Not Found</h2>
        <Link to="/admin/candidates">
          <Button variant="primary">Return to Candidates</Button>
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

    const priorities = formData.prioritiesText
      ? formData.prioritiesText.split('\n').map((s) => s.trim()).filter(Boolean)
      : candidate.priorities;

    const updated = {
      ...candidate,
      name: formData.name,
      party: formData.party,
      position: formData.position,
      electionId: formData.electionId,
      tagline: formData.tagline,
      bio: formData.bio,
      education: formData.education,
      priorities
    };

    if (setCandidates) {
      setCandidates((prev) => prev.map((c) => (c.id === candidate.id ? updated : c)));
    }

    await AuditService.logEvent({
      action: 'CANDIDATE_PROFILE_UPDATED',
      actor: adminUser?.name || 'Administrator',
      severity: 'info',
      details: { candidateId: candidate.id, name: updated.name }
    });

    navigate(`/admin/candidates/${candidate.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to={`/admin/candidates/${candidate.id}`}
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Candidate Details
        </Link>
        <span className="text-xs text-slate-400 font-mono">ID: {candidate.id}</span>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Edit Candidate Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update biographical statements, endorsements, or policy commitments.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Party Affiliation"
              name="party"
              value={formData.party}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Office / Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Election Assignment
              </label>
              <select
                name="electionId"
                value={formData.electionId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
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
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Manifesto / Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <Input
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/candidates/${candidate.id}`)}
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
