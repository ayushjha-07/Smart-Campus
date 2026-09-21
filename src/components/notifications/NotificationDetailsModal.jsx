import React from 'react';
import { X, Info, Calendar, Building2 } from 'lucide-react';

export default function NotificationDetailsModal({
  isOpen,
  notification,
  onClose,
}) {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 relative animate-scaleUp text-[#10213A] dark:text-[#F5F7F5]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E3] dark:border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#078A5A] dark:text-[#00B87A]">
                {notification.category}
              </span>
              <h3 className="text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                {notification.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-[#687A91] dark:text-[#91A7A5] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#078A5A] dark:text-[#00B87A]" />
              <span>Received</span>
            </span>
            <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
              {notification.timestamp} {notification.date && `• ${notification.date}`}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-[#687A91] dark:text-[#91A7A5] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#D8A93E]" />
              <span>Issuing Unit</span>
            </span>
            <span className="font-medium text-[#10213A] dark:text-[#F5F7F5] truncate block">
              {notification.department || 'Campus Digital Administration'}
            </span>
          </div>
        </div>

        {/* Message Body */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
            Notice Details
          </span>
          <div className="p-4 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 text-xs sm:text-sm text-[#10213A] dark:text-[#F5F7F5] leading-relaxed whitespace-pre-wrap">
            {notification.description}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
}
