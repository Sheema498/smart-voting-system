import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  Bell,
  CheckCheck,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ArrowRight,
  Inbox
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const [filter, setFilter] = useState('all'); // 'all', 'unread'

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'reminder':
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-brand-500 shrink-0" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Civic Bulletins</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Electoral Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time updates regarding voter eligibility, ballot booth openings, reminders, and certified returns.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                leftIcon={<CheckCheck className="w-4 h-4" />}
              >
                Mark All as Read
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Bulletins ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'unread'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`border transition-all p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                notif.read ? 'bg-white border-slate-200' : 'bg-brand-50/30 border-brand-200 ring-1 ring-brand-500/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm font-bold ${notif.read ? 'text-slate-800' : 'text-slate-900'}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {notif.message}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>

                    {notif.link && (
                      <Link
                        to={notif.link}
                        onClick={() => markAsRead(notif.id)}
                        className="font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                      >
                        {notif.actionText || 'Take Action'} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions: Mark read / Delete */}
              <div className="flex items-center gap-2 sm:shrink-0 justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition-colors"
                    title="Mark as read"
                    aria-label="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete notification"
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications in your inbox'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When new ballots open or election updates are certified, you will receive notifications here.
          </p>
          {filter === 'unread' && (
            <Button variant="outline" size="sm" onClick={() => setFilter('all')}>
              View All Bulletins
            </Button>
          )}
        </div>
      )}

    </div>
  );
};
