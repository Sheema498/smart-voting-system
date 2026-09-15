import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { HelpCircle, Home, Vote, Users, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Visual 404 Badge */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-sm">
          <HelpCircle className="w-12 h-12 stroke-[1.5]" />
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-full shadow">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The civic page or ballot booth route you requested does not exist or has been relocated to an updated electoral registry.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>

          <Link to="/elections" className="w-full sm:w-auto">
            <Button variant="outline" fullWidth size="md" leftIcon={<Vote className="w-4 h-4" />}>
              Browse Elections
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-center gap-4">
          <Link to="/candidates" className="hover:text-brand-600">
            Candidate Directory
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-brand-600">
            About VoteSphere
          </Link>
        </div>

      </div>
    </div>
  );
};
