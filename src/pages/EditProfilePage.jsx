import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { User, ShieldCheck, ArrowLeft, CheckCircle2, Save } from 'lucide-react';

export const EditProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-8901',
    address: user?.address || '742 Evergreen Terrace, Springfield, OR',
    preferredLanguage: 'English (US)',
    emailNotifications: true,
    smsAlerts: false
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate('/profile');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/profile"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Profile
        </Link>
        <span className="text-xs text-slate-500 font-mono">
          Voter ID: {user?.voterId || 'VS-984210-2026'} (Immutable)
        </span>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Voter Contact & Preferences</h1>
            <p className="text-xs text-slate-500 mt-1">
              Update your contact information and civic communications preferences.
            </p>
          </div>
          <Badge variant="success">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Certified
          </Badge>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 mr-2 shrink-0 text-emerald-600" />
            <span>Profile information successfully updated! Redirecting to voter card...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Legal Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Contact Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Interface Language
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish (Español)">Español</option>
                <option value="French (Français)">Français</option>
              </select>
            </div>
          </div>

          <Input
            label="Residential Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Notification Preferences
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) =>
                    setFormData({ ...formData, emailNotifications: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span>Receive election opening & closing email notices</span>
              </label>

              <label className="flex items-center space-x-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.smsAlerts}
                  onChange={(e) => setFormData({ ...formData, smsAlerts: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span>Receive urgent voter verification SMS reminders</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
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
