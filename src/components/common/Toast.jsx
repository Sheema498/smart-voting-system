import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotifications();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          alert: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          danger: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-200 bg-white',
          alert: 'border-amber-200 bg-white',
          danger: 'border-rose-200 bg-white',
          info: 'border-brand-200 bg-white'
        };

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg
              transition-all duration-200 transform translate-y-0
              ${borders[toast.type] || borders.info}
            `}
            role="status"
          >
            {icons[toast.type] || icons.info}

            <div className="flex-1 min-w-0 pt-0.5">
              {toast.title && (
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {toast.title}
                </p>
              )}
              {toast.message && (
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
