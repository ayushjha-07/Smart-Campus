import React from 'react';
import { Activity } from 'lucide-react';

export default function ResolutionProgress({ progress = 75, status = 'In Progress' }) {
  const isResolved = status === 'Resolved' || progress === 100;

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#315C3A]/20 border border-emerald-200 dark:border-[#315C3A]/40 flex items-center justify-center text-[#168A5B] dark:text-[#D4A84F]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Resolution Progress
            </h4>
            <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              {isResolved
                ? 'All maintenance milestones completed'
                : 'Active maintenance tracking'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-lg sm:text-xl font-extrabold text-[#168A5B] dark:text-[#D4A84F]">
            {progress}%
          </span>
          <span className="text-xs text-[#168A5B] dark:text-[#71844A] font-semibold uppercase tracking-wider">
            {isResolved ? 'Completed' : 'Estimated'}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-100 dark:bg-[#07121A] rounded-full overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-0.5 relative">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${
              isResolved
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-[#168A5B]'
                : 'bg-gradient-to-r from-[#168A5B] via-[#71844A] to-[#D4A84F]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Informative text below */}
        <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#A8B3B0] pt-1">
          <p className="flex items-center gap-1.5 text-[#14213D] dark:text-[#F5F5F0]/90 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#168A5B] dark:bg-[#D4A84F] animate-ping inline-block shrink-0" />
            <span>
              {isResolved
                ? 'This complaint has been verified and marked resolved.'
                : 'Your complaint is currently being worked on.'}
            </span>
          </p>
          <span className="font-mono text-[11px] text-[#64748B] dark:text-[#A8B3B0]/60 hidden sm:inline">
            Status: {status}
          </span>
        </div>
      </div>
    </div>
  );
}
