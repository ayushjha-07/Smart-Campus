import React from 'react';

export function PriorityBadge({ priority = 'Medium' }) {
  const norm = String(priority).toUpperCase();
  switch (norm) {
    case 'LOW':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#71844A]/15 text-[#71844A] dark:text-[#A7C481] border border-[#71844A]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#71844A] dark:bg-[#A7C481] mr-1" />
          Low
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#D4A84F]/15 text-[#B88728] dark:text-[#E5BF6E] border border-[#D4A84F]/35">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F] mr-1" />
          Medium
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1" />
          High
        </span>
      );
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/35 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1" />
          Critical
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-400/20">
          {priority}
        </span>
      );
  }
}

export function StatusBadge({ status = 'Pending' }) {
  const s = String(status).trim();
  switch (s) {
    case 'Pending':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />
          Pending
        </span>
      );
    case 'Under Review':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1" />
          Under Review
        </span>
      );
    case 'Assigned':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1" />
          Assigned
        </span>
      );
    case 'In Progress':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#008F63]/15 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#00A875] mr-1" />
          In Progress
        </span>
      );
    case 'Resolved':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#315C3A]/20 text-[#315C3A] dark:text-[#71844A] border border-[#315C3A]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315C3A] dark:bg-[#71844A] mr-1" />
          Resolved
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1" />
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-400/20">
          {status}
        </span>
      );
  }
}
