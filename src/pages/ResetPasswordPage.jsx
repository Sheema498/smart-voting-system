import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { isValidPin } from '../utils/validators';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'MOCK-TOKEN-SEC-42';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isValidPin(newPin)) {
      setError('Voting PIN must be a 4-digit numeric code.');
      return;
    }

    setError('');
    setIsSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Set New Security Credentials
        </h1>
        <p className="text-xs text-slate-600">
          Update your voter authentication password and balloting PIN.
        </p>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        {isSuccess ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Credentials Successfully Updated</h3>
              <p className="text-xs text-slate-600">
                Your new login password and 4-digit balloting security PIN are now active.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Sign In With New Credentials
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono">
              Token: {token}
            </div>

            <Input
              label="New Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Input
              label="New 4-Digit Balloting PIN"
              type="password"
              maxLength={4}
              placeholder="e.g. 5821"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full shadow-xs">
              Save Security Credentials
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};
