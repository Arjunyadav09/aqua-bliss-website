import React from 'react';
import { NotificationItem } from '../types';
import { X, Bell, Check, Tag, Info, ShoppingBag } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-sky-600" />;
      default:
        return <Info className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 z-10 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">Notifications</h3>
              <p className="text-xs text-slate-500">Updates, offers & delivery alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-colors flex gap-3 ${
                item.read
                  ? 'bg-white border-slate-100 text-slate-600'
                  : 'bg-sky-50/60 border-sky-100 text-slate-900'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
