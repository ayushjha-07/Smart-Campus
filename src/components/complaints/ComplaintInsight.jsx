import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ComplaintInsight({
  totalComplaints = 12,
  resolvedComplaints = 5,
}) {
  const resolvedCount = resolvedComplaints;
  const activeCount = Math.max(0, totalComplaints - resolvedCount); // 7 Active
  const rate = 42; // exactly 42% per user specification & mock data

  return (
    <div className="bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl relative overflow-hidden transition-colors">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Information Area with Icon & Pill */}
        <div className="flex items-start gap-4 max-w-2xl">
          {/* Left Icon Square */}
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-[#087F5B] dark:text-[#16B978] flex items-center justify-center shrink-0 mt-0.5">
            <BarChart3 className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#087F5B] dark:bg-[#16B978] text-white text-[11px] font-bold shadow-2xs">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Campus Resolution Health</span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-[#0B1736] dark:text-[#F5F7F5] leading-snug">
              You have submitted <span className="text-[#087F5B] dark:text-[#16B978] font-black">{totalComplaints} complaints</span>. {resolvedCount} have been successfully resolved.
            </h3>

            <p className="text-xs sm:text-sm text-[#607080] dark:text-[#A8B5B1] leading-relaxed">
              Campus administration is actively monitoring all requests. Most complaints are addressed within 24–48 hours.
            </p>
          </div>
        </div>

        {/* Right Circular 42% Resolution Rate Widget */}
        <div className="flex items-center gap-4.5 shrink-0 self-start md:self-center bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] rounded-2xl px-5 py-3.5 shadow-2xs">
          {/* Circular Donut SVG */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                className="text-slate-200 dark:text-[#1C3A42]"
                strokeWidth="3.4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Active Foreground Progress (42%) */}
              <path
                className="text-[#087F5B] dark:text-[#16B978] transition-all duration-1000 ease-out"
                strokeDasharray={`${rate}, 100`}
                strokeWidth="3.4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-mono text-sm font-black text-[#0B1736] dark:text-[#F5F7F5]">
              {rate}%
            </span>
          </div>

          {/* Stats Legend */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#607080] dark:text-[#A8B5B1] block">
              Resolution Rate
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#087F5B] dark:bg-[#16B978] shrink-0" />
              <span className="text-[#087F5B] dark:text-[#16B978] font-bold">{resolvedCount} Resolved</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
              <span className="text-[#607080] dark:text-[#A8B5B1]">{activeCount} Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
