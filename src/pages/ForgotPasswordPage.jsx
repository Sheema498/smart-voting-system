import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { isValidEmail } from '../utils/validators';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please provide your registered voter email or official Voter ID.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setRecoverySent(true);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto shadow-xs">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Credential Recovery
        </h1>
        <p className="text-xs text-slate-600">
          Recover access to your voter profile or security PIN.
        </p>
      </div>

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        {recoverySent ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Recovery Token Dispatched</h3>
              <p className="text-xs text-slate-600">
                A simulated verification code has been issued for <span className="font-semibold text-slate-800">{identifier}</span>.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link to={`/reset-password?token=MOCK-SEC-${Math.floor(1000 + Math.random() * 9000)}`}>
                <Button variant="primary" className="w-full">
                  Proceed to Reset PIN & Password <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <button
                onClick={() => setRecoverySent(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Enter a different address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Registered Email or Official Voter ID"
              placeholder="voter@example.org or VS-984210-2026"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full shadow-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying Elector...' : 'Send Recovery Instructions'}
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Voter Login
          </Link>
        </div>
      </Card>
    </div>
  );
};
