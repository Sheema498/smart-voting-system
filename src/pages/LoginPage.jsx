import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Logo } from '../components/common/Logo';
import {
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { login, isAuthenticated, demoCredentials, user } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from?.pathname || '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(voterId, password, rememberMe);
      setIsLoading(false);

      if (result.success) {
        showToast('Authentication Successful', result.message, 'success');
        const redirectPath = location.state?.from?.pathname || '/dashboard';
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.error);
        showToast('Login Failed', result.error, 'danger');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setVoterId(demoCredentials.voterId);
    setPassword(demoCredentials.password);
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center">
          <Logo size="lg" showTagline={true} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Voter Authentication Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
          Sign in with your verified Digital Voter ID to access your ballot booth and electoral dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          
          {/* Demo Credentials Quick-Fill Banner */}
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Demo Voter Credentials
              </span>
              <span className="text-[10px] bg-brand-200/70 text-brand-800 font-semibold px-2 py-0.5 rounded-full">
                1-Click Access
              </span>
            </div>
            <p className="text-xs text-brand-700 leading-relaxed">
              This platform uses client-side simulated authentication. You can quickly auto-fill test credentials.
            </p>
            <div className="text-[11px] font-mono text-slate-600 space-y-0.5 bg-white/80 p-2 rounded-lg border border-brand-100">
              <p><strong>Voter ID:</strong> {demoCredentials.voterId}</p>
              <p><strong>Password:</strong> {demoCredentials.password}</p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleQuickFill}
            >
              Fill Demo Credentials
            </Button>
          </div>

          {/* Form Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Voter ID or Email Address"
              id="voter-id"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              placeholder="e.g. VS-94820-2026 or email"
              required
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs text-slate-600">Remember credentials</span>
              </label>

              <span className="text-xs text-slate-400">Default PIN: 1234</span>
            </div>

            <Button
              type="submit"
              variant="trust"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Bottom Link to Register */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600 space-y-1">
            <p>
              Not registered in this voting cycle?{' '}
              <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                Register as a New Voter
              </Link>
            </p>
          </div>

        </Card>

        {/* Security Assurance Notice */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted simulated session • Zero remote tracking</span>
        </div>
      </div>
    </div>
  );
};
