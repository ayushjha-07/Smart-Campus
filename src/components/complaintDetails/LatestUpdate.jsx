import React from 'react';
import { MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export default function LatestUpdate({ latestUpdate, staffName = 'Rajesh Kumar', staffRole = 'Maintenance Staff' }) {
  if (!latestUpdate) return null;

  const {
    text = 'Maintenance team has been notified and is currently checking the water supply line in Hostel Block B.',
    updatedAt = '20 September 2026, 12:45 PM',
    staffAvatar = 'RK',
  } = latestUpdate;

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-[#315C3A]/50 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4 relative overflow-hidden">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#168A5B]/5 dark:bg-[#315C3A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
          <h4 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Latest Update
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>Verified Staff Note</span>
        </span>
      </div>

      {/* Remarks Content Card */}
      <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-3">
        <p className="text-xs sm:text-sm text-[#14213D] dark:text-[#F5F5F0] leading-relaxed font-normal">
          "{text}"
        </p>

        {/* Staff & Timestamp Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#DDE7E2] dark:border-white/5 text-xs text-[#64748B] dark:text-[#A8B3B0]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#168A5B] dark:bg-[#315C3A] border border-[#D4A84F]/40 text-white dark:text-[#F5F5F0] font-bold text-xs flex items-center justify-center shadow-sm">
              {staffAvatar}
            </div>
            <div>
              <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0] block leading-tight">
                {latestUpdate.staffName || staffName}
              </span>
              <span className="text-[10px] text-[#168A5B] dark:text-[#71844A]">
                {latestUpdate.role || staffRole}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px] text-[#64748B] dark:text-[#A8B3B0]/70">
            <Clock className="w-3 h-3 text-[#D4A84F]" />
            <span>Updated: {updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
