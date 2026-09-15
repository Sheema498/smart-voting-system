import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Shield, CheckCircle2, Lock, Heart, Globe2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-125">
              <Logo size="md" showTagline={true} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              VoteSphere is an accessible, verified digital democratic platform designed for community councils, student unions, and civic organizations. Ensuring cryptographically verifiable election integrity with 100% voter privacy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Knowledge Ballot Privacy</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                <span>SHA-256 Audit Trail</span>
              </div>
            </div>
          </div>

          {/* Col 2: Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/elections" className="text-slate-400 hover:text-white transition-colors">
                  All Elections
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-slate-400 hover:text-white transition-colors">
                  Candidate Directory
                </Link>
              </li>
              <li>
                <Link to="/voting" className="text-slate-400 hover:text-white transition-colors">
                  Voting Hub
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-slate-400 hover:text-white transition-colors">
                  Live Election Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Voter Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Voter Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                  Voter Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
                  Registration Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Voter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-400 hover:text-white transition-colors">
                  Credential Profile
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="text-slate-400 hover:text-white transition-colors">
                  Electoral Bulletins
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Integrity
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link to="/about#security" className="text-slate-400 hover:text-white transition-colors">
                  Cryptographic Protocol
                </Link>
              </li>
              <li>
                <Link to="/about#accessibility" className="text-slate-400 hover:text-white transition-colors">
                  Accessibility Standards
                </Link>
              </li>
              <li>
                <Link to="/about#faq" className="text-slate-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 VoteSphere Civic Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Electoral Ledger Online
            </span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>Client-Side Zero-Trace</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
