import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Logo } from '../components/common/Logo';
import {
  User,
  Mail,
  Phone,
  MapPin,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { showToast, addNotification } = useNotifications();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: 'Metro District 4 (Central Academic)',
    pin: '1234',
    confirmPin: '1234',
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const districts = [
    'Metro District 1 (Downtown Civic)',
    'Metro District 2 (North Harbor)',
    'Metro District 3 (Highland Tech Corridor)',
    'Metro District 4 (Central Academic)',
    'Metro District 5 (South Greenlands)',
    'Metro District 6 (Riverfront Arts)',
    'Metro District 7 (East Valley)'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full legal name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email address required.';
    if (formData.pin.length !== 4 || isNaN(formData.pin)) newErrors.pin = 'Voting PIN must be exactly 4 digits.';
    if (formData.pin !== formData.confirmPin) newErrors.confirmPin = 'PIN confirmation does not match.';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must confirm voter eligibility.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = register(formData);
      setIsLoading(false);

      if (res.success) {
        showToast('Registration Approved', res.message, 'success');
        addNotification({
          title: 'Voter Registration Approved',
          message: `Your voter credential has been verified for 2026 balloting. Voter ID: ${res.voterId}.`,
          category: 'security',
          type: 'success',
          link: '/profile',
          actionText: 'View ID'
        });
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center">
          <Logo size="lg" showTagline={true} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Voter Registration Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
          Enroll in the 2026 digital voter roll to receive an official cryptographic Voter ID and participate in upcoming civic ballots.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <Card className="border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Simulated Enrollment:</strong> All data is stored locally in your browser. No real personal voter records or government databases are connected.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <Input
              label="Full Name"
              id="reg-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jordan Miller"
              error={errors.name}
              required
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              id="reg-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. jordan.miller@university.edu"
              error={errors.email}
              required
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone (Optional)"
                id="reg-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                leftIcon={<Phone className="w-4 h-4" />}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Voting District
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <Input
                label="4-Digit Voting PIN"
                id="reg-pin"
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                placeholder="1234"
                error={errors.pin}
                helperText="Used to authorize cast ballots"
                required
                leftIcon={<KeyRound className="w-4 h-4" />}
              />

              <Input
                label="Confirm 4-Digit PIN"
                id="reg-confirm-pin"
                type="password"
                maxLength={4}
                value={formData.confirmPin}
                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
                placeholder="1234"
                error={errors.confirmPin}
                required
                leftIcon={<KeyRound className="w-4 h-4" />}
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I certify that I am a resident citizen or enrolled student eligible to vote in the selected jurisdiction.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.agreeTerms}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="trust"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Registration & Issue Voter ID
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Already have a registered Voter ID?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign In Here
            </Link>
          </div>

        </Card>
      </div>
    </div>
  );
};
