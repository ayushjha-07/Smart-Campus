import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, RotateCcw, PlusCircle } from 'lucide-react';

export default function ComplaintEmptyState({ isFiltered, onClearFilters }) {
  return (
    <div className="bg-white dark:bg-[#0B1B22] border border-dashed border-[#DDE6E2] dark:border-[#1C3A42] rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto space-y-4 shadow-2xs dark:shadow-xl animate-fadeIn">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mx-auto text-[#087F5B] dark:text-[#16B978] shadow-2xs">
        <SearchX className="w-8 h-8" />
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-[#0B1736] dark:text-[#F5F7F5]">
          {isFiltered ? 'No matching complaints found' : 'No complaints recorded yet'}
        </h3>
        <p className="text-xs text-[#607080] dark:text-[#A8B5B1] max-w-sm mx-auto leading-relaxed">
          {isFiltered
            ? 'We couldn’t find any complaints matching your active search keywords or filter criteria. Try adjusting or resetting them.'
            : 'You haven’t submitted any campus service issues or requests yet. Tap below to log your first ticket.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {isFiltered ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#087F5B] hover:bg-[#065F44] text-white transition-all shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters & Reset</span>
          </button>
        ) : (
          <Link
            to="/student/complaints/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#087F5B] hover:bg-[#065F44] text-white transition-all shadow-2xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit First Complaint</span>
          </Link>
        )}
      </div>
    </div>
  );
}
