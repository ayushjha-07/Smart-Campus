import React from 'react';
import { AlertTriangle, Clock, ArrowRight, Flame } from 'lucide-react';

export default function OverdueAlert({
  criticalCount = 2,
  urgentTickets = [],
  onReviewNow
}) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-transparent dark:from-amber-950/20 dark:via-red-950/20 dark:to-transparent border border-amber-300 dark:border-amber-800/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Icon & Message */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 dark:bg-amber-500/25 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
              {criticalCount} complaints require immediate attention
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
              Action Needed
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            1 critical dining hall RO chiller overdue (&gt;24 hrs) and 1 high-priority domestic water outage.
          </p>
        </div>
      </div>

      {/* Right: Quick Ticket Chips & Review Button */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/80 dark:bg-[#07121A] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
            <Flame className="w-3 h-3 text-red-500" />
            SC-2026-1829 (Overdue)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/80 dark:bg-[#07121A] text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
            <Clock className="w-3 h-3 text-amber-500" />
            SC-2026-1847 (Due Today)
          </span>
        </div>

        <button
          onClick={onReviewNow}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-[#07121A] dark:text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <span>Review Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
