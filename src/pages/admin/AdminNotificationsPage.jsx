import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AuditService } from '../../services/auditService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Bell, Send, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';

export const AdminNotificationsPage = () => {
  const { notifications, addNotification } = useNotifications();
  const { adminUser } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'election',
    type: 'info',
    actionText: 'View Election',
    link: '/elections'
  });

  const [isDispatched, setIsDispatched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    addNotification({
      title: formData.title,
      message: formData.message,
      category: formData.category,
      type: formData.type,
      actionText: formData.actionText,
      link: formData.link
    });

    await AuditService.logEvent({
      action: 'BROADCAST_ALERT_ISSUED',
      actor: adminUser?.name || 'Administrator',
      severity: formData.type === 'warning' ? 'warning' : 'info',
      details: { title: formData.title, category: formData.category, audience: 'ALL_REGISTERED_VOTERS' }
    });

    setIsDispatched(true);
    setFormData({
      title: '',
      message: '',
      category: 'election',
      type: 'info',
      actionText: 'View Election',
      link: '/elections'
    });

    setTimeout(() => setIsDispatched(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Broadcast Announcements
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Dispatch official alerts, deadline reminders, and certification bulletins to all voter dashboards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="md:col-span-2 p-6 sm:p-8 bg-white space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Compose Electoral Bulletin</h3>
              <p className="text-xs text-slate-500">
                Pushes directly into all registered electors' notification centers.
              </p>
            </div>
          </div>

          {isDispatched && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
              <span>Broadcast successfully dispatched to all voter inboxes!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Announcement Title *"
              placeholder="e.g. 24-Hour Final Call: Municipal General Election Polls Closing"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                >
                  <option value="election">Election Update</option>
                  <option value="system">System Notification</option>
                  <option value="security">Security & Audit</option>
                  <option value="deadline">Urgent Deadline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Severity / Visual Style
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                >
                  <option value="info">Informational (Blue)</option>
                  <option value="success">Success / Certified (Green)</option>
                  <option value="warning">Urgent / Warning (Amber)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Message Content *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail the announcement, relevant deadlines, and instructions for electors..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Action Button Text"
                value={formData.actionText}
                onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                placeholder="e.g. Vote Now"
              />
              <Input
                label="Target Route Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="e.g. /voting or /results"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="primary">
                <Send className="w-4 h-4 mr-1.5" /> Dispatch to All Voters
              </Button>
            </div>
          </form>
        </Card>

        {/* Sidebar: Sent History */}
        <Card className="p-6 bg-white space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Broadcasts</h3>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] line-clamp-2">{n.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
