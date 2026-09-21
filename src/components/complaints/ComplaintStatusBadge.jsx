import React from 'react';

export default function ComplaintStatusBadge({ status }) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Resolved':
        return {
          style: 'bg-emerald-50 text-[#087F5B] border-emerald-200 dark:bg-emerald-950/40 dark:text-[#16B978] dark:border-emerald-800/40',
          dot: 'bg-[#087F5B] dark:bg-[#16B978]',
        };
      case 'In Progress':
        return {
          style: 'bg-emerald-50 text-[#087F5B] border-emerald-200 dark:bg-emerald-950/40 dark:text-[#16B978] dark:border-emerald-800/40',
          dot: 'bg-[#087F5B] dark:bg-[#16B978] animate-pulse',
        };
      case 'Under Review':
        return {
          style: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40',
          dot: 'bg-blue-600 dark:bg-blue-400',
        };
      case 'Assigned':
        return {
          style: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-[#D8A63C] dark:border-amber-800/40',
          dot: 'bg-amber-500 dark:bg-amber-400',
        };
      case 'Rejected':
        return {
          style: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40',
          dot: 'bg-rose-500',
        };
      case 'Submitted':
      default:
        return {
          style: 'bg-[#F7F9F8] text-[#607080] border-[#DDE6E2] dark:bg-[#10242B] dark:text-[#A8B5B1] dark:border-[#1C3A42]',
          dot: 'bg-slate-400 dark:bg-slate-500',
        };
    }
  };

  const { style, dot } = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shadow-2xs ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
      <span>{status || 'Submitted'}</span>
    </span>
  );
}
