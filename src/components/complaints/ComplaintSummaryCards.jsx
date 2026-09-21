import React from 'react';
import { FileText, Clock, Cog, CheckCircle2 } from 'lucide-react';

export default function ComplaintSummaryCards({
  counts,
  total = 12,
  pending = 3,
  inProgress = 4,
  resolved = 5,
  activeFilter = 'All',
  onSelectFilter,
}) {
  const finalTotal = counts?.total ?? total;
  const finalPending = counts?.pending ?? pending;
  const finalInProgress = counts?.inProgress ?? inProgress;
  const finalResolved = counts?.resolved ?? resolved;

  const cards = [
    {
      id: 'All',
      label: 'TOTAL COMPLAINTS',
      value: String(finalTotal).padStart(2, '0'),
      desc: '3 submitted this month',
      icon: FileText,
      iconBoxBg: 'bg-emerald-50 text-[#087F5B] border-emerald-200 dark:bg-emerald-950/40 dark:text-[#16B978] dark:border-emerald-800/40',
      sparklineColor: '#087F5B',
      sparklineDarkColor: '#16B978',
      sparklinePath: 'M2 22 Q 18 24, 30 14 T 58 8',
      activeRing: 'ring-2 ring-[#087F5B]/30 border-[#087F5B] dark:ring-[#16B978]/30 dark:border-[#16B978]',
    },
    {
      id: 'Pending',
      label: 'PENDING',
      value: String(finalPending).padStart(2, '0'),
      desc: 'Awaiting review',
      icon: Clock,
      iconBoxBg: 'bg-amber-50 text-[#D9A62E] border-amber-200 dark:bg-amber-950/40 dark:text-[#D8A63C] dark:border-amber-800/40',
      sparklineColor: '#D9A62E',
      sparklineDarkColor: '#D8A63C',
      sparklinePath: 'M2 24 Q 18 26, 32 18 T 58 10',
      activeRing: 'ring-2 ring-[#D9A62E]/30 border-[#D9A62E] dark:ring-[#D8A63C]/30 dark:border-[#D8A63C]',
    },
    {
      id: 'In Progress',
      label: 'IN PROGRESS',
      value: String(finalInProgress).padStart(2, '0'),
      desc: 'Currently being handled',
      icon: Cog,
      iconBoxBg: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40',
      sparklineColor: '#2563EB',
      sparklineDarkColor: '#60A5FA',
      sparklinePath: 'M2 26 Q 20 28, 32 16 T 58 6',
      activeRing: 'ring-2 ring-blue-500/30 border-blue-500',
    },
    {
      id: 'Resolved',
      label: 'RESOLVED',
      value: String(finalResolved).padStart(2, '0'),
      desc: 'Successfully addressed',
      icon: CheckCircle2,
      iconBoxBg: 'bg-emerald-50 text-[#087F5B] border-emerald-200 dark:bg-emerald-950/40 dark:text-[#16B978] dark:border-emerald-800/40',
      sparklineColor: '#087F5B',
      sparklineDarkColor: '#16B978',
      sparklinePath: 'M2 24 Q 22 26, 36 14 T 58 8',
      activeRing: 'ring-2 ring-[#087F5B]/30 border-[#087F5B] dark:ring-[#16B978]/30 dark:border-[#16B978]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((c) => {
        const Icon = c.icon;
        const isActive = activeFilter === c.id;

        return (
          <button
            type="button"
            key={c.label}
            onClick={() => onSelectFilter && onSelectFilter(c.id)}
            className={`text-left bg-white dark:bg-[#0B1B22] border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-2xs dark:shadow-xl hover:shadow-md cursor-pointer relative overflow-hidden group h-full flex flex-col justify-between ${
              isActive
                ? c.activeRing
                : 'border-[#DDE6E2] dark:border-[#1C3A42] hover:border-[#087F5B]/40 dark:hover:border-[#16B978]/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3 w-full">
              {/* Left Icon in Soft Box */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${c.iconBoxBg}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Center Content */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#607080] dark:text-[#A8B5B1] block truncate">
                  {c.label}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#0B1736] dark:text-[#F5F7F5] font-mono tracking-tight block mt-0.5">
                  {c.value}
                </span>
                <p className="text-[11px] text-[#607080] dark:text-[#A8B5B1] mt-0.5 truncate">
                  {c.desc}
                </p>
              </div>

              {/* Right Mini Sparkline Trend Wave */}
              <div className="shrink-0 self-center hidden sm:block opacity-75 group-hover:opacity-100 transition-opacity">
                <svg className="w-14 h-8" viewBox="0 0 60 30" fill="none">
                  <path
                    d={c.sparklinePath}
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    className={
                      c.id === 'Pending'
                        ? 'text-[#D9A62E] dark:text-[#D8A63C]'
                        : c.id === 'In Progress'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-[#087F5B] dark:text-[#16B978]'
                    }
                  />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
