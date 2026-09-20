import React from 'react';
import { Bell, Check, Info, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'assessment':
        return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
      case 'action':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-700" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Campus Notifications
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {notifications.filter((n) => !n.read).length} Unread
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No active campus notifications.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 flex items-start gap-3 transition-colors ${
                n.read ? 'bg-white opacity-70' : 'bg-emerald-50/20'
              }`}
            >
              <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-2xs mt-0.5 flex-shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-semibold text-slate-800 truncate">
                    {n.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  {n.message}
                </p>
                {!n.read && (
                  <button
                    onClick={() => onMarkRead(n.id)}
                    className="mt-1.5 text-[10px] text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
        <button
          onClick={onClose}
          className="text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
