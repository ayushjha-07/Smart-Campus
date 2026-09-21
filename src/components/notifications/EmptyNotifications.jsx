import React from 'react';
import { Bell, RotateCcw } from 'lucide-react';

export default function EmptyNotifications({ isFiltered, onClearFilters }) {
  return (
    <div className="bg-white dark:bg-[#0B2027] border border-dashed border-[#DDE7E2] dark:border-white/15 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xs dark:shadow-xl animate-fadeIn transition-colors">
      {/* Icon */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center mx-auto text-[#078A5A] dark:text-[#00B87A] shadow-2xs">
        <Bell className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-[#10213A] dark:text-[#F5F7F5]">
          {isFiltered ? 'No matching notifications found' : 'No notifications found'}
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#91A7A5] max-w-sm mx-auto leading-relaxed">
          {isFiltered
            ? "We couldn't find any notifications matching your active search keywords or filter criteria."
            : "You're all caught up! There are no outstanding departmental notices or alerts for your account."}
        </p>
      </div>

      {/* Clear Button */}
      {isFiltered && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-all shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters & Reset</span>
          </button>
        </div>
      )}
    </div>
  );
}
