import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  CheckCircle2,
  FileCheck2,
  Save,
  KeyRound,
  ExternalLink
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotifications();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '+1 (555) 382-9014',
    district: user.district,
    avatarBg: user.avatarBg || 'bg-indigo-600'
  });

  const districts = [
    'Metro District 1 (Downtown Civic)',
    'Metro District 2 (North Harbor)',
    'Metro District 3 (Highland Tech Corridor)',
    'Metro District 4 (Central Academic)',
    'Metro District 5 (South Greenlands)',
    'Metro District 6 (Riverfront Arts)',
    'Metro District 7 (East Valley)'
  ];

  const avatarColorOptions = [
    { label: 'Indigo', class: 'bg-indigo-600' },
    { label: 'Emerald', class: 'bg-emerald-600' },
    { label: 'Teal', class: 'bg-teal-600' },
    { label: 'Purple', class: 'bg-purple-600' },
    { label: 'Rose', class: 'bg-rose-600' },
    { label: 'Sky', class: 'bg-sky-600' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const initials = formData.name
      ? formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : user.avatarInitials;

    updateProfile({
      ...formData,
      avatarInitials: initials
    });

    setIsEditing(false);
    showToast('Profile Updated', 'Your profile details have been saved to local storage.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${user.avatarBg || 'bg-indigo-600'} text-white flex items-center justify-center font-extrabold text-3xl shadow-md shrink-0`}>
              {user.avatarInitials || 'VR'}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <Badge variant="emerald" size="md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {user.status || 'Verified Active'}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm font-mono text-slate-500">
                Official Voter Credential ID: <span className="text-brand-600 font-bold">{user.voterId}</span>
              </p>

              <p className="text-xs text-slate-500">
                Registered Jurisdiction: <span className="font-semibold text-slate-700">{user.district}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant={isEditing ? 'outline' : 'primary'}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </div>

        </div>
      </div>

      {/* Profile Editing / Details Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Info */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Voter Registration Particulars
              </h2>
              <span className="text-xs text-slate-400">
                {isEditing ? 'Editing Mode' : 'Read-Only View'}
              </span>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  label="Display Full Name"
                  id="prof-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                  label="Email Address"
                  id="prof-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <Input
                  label="Phone Number"
                  id="prof-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  leftIcon={<Phone className="w-4 h-4" />}
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assigned Voting District
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800"
                  >
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Avatar color picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Avatar Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    {avatarColorOptions.map((c) => (
                      <button
                        key={c.class}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatarBg: c.class })}
                        className={`w-7 h-7 rounded-full ${c.class} transition-transform ${
                          formData.avatarBg === c.class ? 'scale-125 ring-2 ring-slate-900 ring-offset-2' : 'hover:scale-110'
                        }`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="trust"
                    size="md"
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Voter Name:</span>
                  <span className="font-bold text-slate-800">{user.name}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Official Voter ID:</span>
                  <span className="font-mono font-bold text-brand-600">{user.voterId}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Registered Email:</span>
                  <span className="font-mono text-slate-700">{user.email}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <span className="text-slate-700">{user.phone}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Assigned District:</span>
                  <span className="font-semibold text-slate-800">{user.district}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Registration Date:</span>
                  <span className="text-slate-700">{user.registrationDate}</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Voting Security PIN:</span>
                  <span className="font-mono text-slate-700">•••• (Protected)</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Voting History & Verified Badges */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              <h2>Verified Voting Ledger History</h2>
            </div>

            {user.votingHistory && user.votingHistory.length > 0 ? (
              <div className="space-y-3">
                {user.votingHistory.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 line-clamp-1">{item.electionTitle}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Tallied ✓
                      </span>
                    </div>

                    <p className="text-slate-600">
                      <strong>Option:</strong> {item.candidateName || 'Secret Choice'}
                    </p>

                    <p className="text-slate-400">
                      <strong>Date:</strong> {new Date(item.castTimestamp).toLocaleString()}
                    </p>

                    <div className="pt-1 font-mono text-[10px] text-slate-500 break-all bg-white p-2 rounded border border-slate-200">
                      Hash: {item.receiptHash}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No ballots cast yet. Once you vote, your cryptographic receipts will appear here.
              </p>
            )}
          </Card>

          {/* Privacy & Trust Badge */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Cryptographic Voter Privacy Guaranteed</span>
            </div>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              Profile edits are strictly stored in your local browser sandbox. Your ballot receipts are mathematically decoupled from your voter profile identity.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
