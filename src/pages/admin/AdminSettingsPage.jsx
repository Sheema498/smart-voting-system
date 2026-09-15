import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  Settings,
  Cpu,
  Shield,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { systemConfig, updateSystemConfig } = useAdminAuth();

  const [formData, setFormData] = useState({
    platformTitle: systemConfig.platformTitle || 'VoteSphere National Democratic Exchange',
    cryptographicCipher: systemConfig.cryptographicCipher || 'SHA-256 + HMAC-256 Multi-Signature',
    maintenanceMode: !!systemConfig.maintenanceMode,
    allowPublicAudits: !!systemConfig.allowPublicAudits,
    voterRegistrationOpen: !!systemConfig.voterRegistrationOpen,
    requirePinOnCast: !!systemConfig.requirePinOnCast,
    autoCertifyWindowHours: systemConfig.autoCertifyWindowHours || 48
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSystemConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetSandbox = () => {
    if (window.confirm('Reset all demonstration ballots and revert to factory baseline data?')) {
      localStorage.removeItem('votesphere_votes');
      localStorage.removeItem('votesphere_voter_receipts');
      localStorage.removeItem('votesphere_admin_voters');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Parameters & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Govern platform security thresholds, cryptographic algorithms, and democratic operational rules.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
          <span>System parameters successfully updated and committed to audit ledger!</span>
        </div>
      )}

      <Card className="p-6 sm:p-8 bg-white space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Platform Legal Identifier"
              value={formData.platformTitle}
              onChange={(e) => setFormData({ ...formData, platformTitle: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Active Cryptographic Suite
              </label>
              <select
                value={formData.cryptographicCipher}
                onChange={(e) => setFormData({ ...formData, cryptographicCipher: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
              >
                <option value="SHA-256 + HMAC-256 Multi-Signature">
                  SHA-256 + HMAC-256 Multi-Signature (Certified)
                </option>
                <option value="RSA-4096 + SHA-512 Quantum-Resistant">
                  RSA-4096 + SHA-512 Quantum-Resistant Mode
                </option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Operational Flags
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Public Audit Ledger Access</p>
                  <p className="text-xs text-slate-500">
                    Allow anonymous electors to verify ballot hash receipts without logging in
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.allowPublicAudits}
                  onChange={(e) =>
                    setFormData({ ...formData, allowPublicAudits: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Open Voter Registration</p>
                  <p className="text-xs text-slate-500">
                    Permit new electors to self-register official voter credentials online
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.voterRegistrationOpen}
                  onChange={(e) =>
                    setFormData({ ...formData, voterRegistrationOpen: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Require 4-Digit PIN on Ballot Cast</p>
                  <p className="text-xs text-slate-500">
                    Enforce digital signature confirmation prior to generating cryptographic receipt
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requirePinOnCast}
                  onChange={(e) =>
                    setFormData({ ...formData, requirePinOnCast: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-rose-900">System Maintenance Freeze</p>
                  <p className="text-xs text-rose-600">
                    Lock ballot booths temporarily during electoral audit maintenance
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) =>
                    setFormData({ ...formData, maintenanceMode: e.target.checked })
                  }
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleResetSandbox}
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset Demo Sandbox
            </Button>

            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-1.5" /> Commit Parameters
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
