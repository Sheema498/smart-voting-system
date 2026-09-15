import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Settings,
  KeyRound,
  Shield,
  Bell,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { isValidPin } from '../utils/validators';

export const SettingsPage = () => {
  const { user } = useAuth();

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinMessage, setPinMessage] = useState(null);

  const [notifications, setNotifications] = useState({
    electionOpen: true,
    electionClose: true,
    resultCertified: true,
    civicNewsletter: false
  });

  const [displayPrefs, setDisplayPrefs] = useState({
    highContrast: false,
    reducedMotion: false,
    autoSaveBallots: true
  });

  const handlePinChange = (e) => {
    e.preventDefault();
    if (!currentPin) {
      setPinMessage({ type: 'error', text: 'Please enter your current 4-digit PIN.' });
      return;
    }
    if (!isValidPin(newPin)) {
      setPinMessage({ type: 'error', text: 'New PIN must be exactly 4 numeric digits.' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinMessage({ type: 'error', text: 'New PIN and confirmation do not match.' });
      return;
    }

    setPinMessage({ type: 'success', text: 'Balloting security PIN updated successfully.' });
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>Voter Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Account & Security Settings
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Manage your cryptographic credentials, 4-digit voting PIN, communication alerts, and interface accessibility options.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Security PIN Box */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 sm:p-8 bg-white space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Update Balloting Security PIN</h3>
                <p className="text-xs text-slate-500">
                  Required to sign and cast official democratic ballots. Default demo PIN: <code>1234</code>.
                </p>
              </div>
            </div>

            {pinMessage && (
              <div
                className={`p-4 rounded-xl flex items-center text-xs ${
                  pinMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {pinMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 mr-2 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-rose-600" />
                )}
                <span>{pinMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePinChange} className="space-y-4">
              <Input
                label="Current 4-Digit PIN"
                type="password"
                maxLength={4}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="••••"
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="New 4-Digit PIN"
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="••••"
                  required
                />
                <Input
                  label="Confirm New PIN"
                  type="password"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="••••"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary">
                  Update Security PIN
                </Button>
              </div>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6 sm:p-8 bg-white space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Electoral Notifications</h3>
                <p className="text-xs text-slate-500">
                  Select which democratic milestones trigger alerts to your voter feed.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-900">Election Opening Alerts</p>
                  <p className="text-xs text-slate-500">Receive alerts when a new election in your district opens</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.electionOpen}
                  onChange={(e) =>
                    setNotifications({ ...notifications, electionOpen: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-900">24-Hour Closing Countdown</p>
                  <p className="text-xs text-slate-500">Remind me when uncast ballots are within 24 hours of deadline</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.electionClose}
                  onChange={(e) =>
                    setNotifications({ ...notifications, electionClose: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-900">Certified Results Dispatch</p>
                  <p className="text-xs text-slate-500">Notify when official winners and audit tallies are certified</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.resultCertified}
                  onChange={(e) =>
                    setNotifications({ ...notifications, resultCertified: e.target.checked })
                  }
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
              </label>
            </div>
          </Card>
        </div>

        {/* Sidebar: Preferences & Information */}
        <div className="space-y-6">
          <Card className="p-6 bg-slate-900 text-white space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Identity Protection</span>
            </div>
            <h4 className="text-base font-bold">Client-Side Isolation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your security PIN is never transmitted in plain text or saved to any external database. It signs your ballot locally within the browser context.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              Session Node: <code>US-WEST-NODE-04</code>
            </div>
          </Card>

          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center space-x-2 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interface & Experience</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={displayPrefs.autoSaveBallots}
                  onChange={(e) =>
                    setDisplayPrefs({ ...displayPrefs, autoSaveBallots: e.target.checked })
                  }
                  className="rounded text-primary-600"
                />
                <span>Auto-save draft ballots during selection</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={displayPrefs.highContrast}
                  onChange={(e) =>
                    setDisplayPrefs({ ...displayPrefs, highContrast: e.target.checked })
                  }
                  className="rounded text-primary-600"
                />
                <span>Enable high-contrast mode</span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
