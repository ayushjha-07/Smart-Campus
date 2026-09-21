import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ComplaintPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const currentCount = Math.min(pageSize, totalItems);

  // Generate page numbers array (1, 2, 3...)
  const pages = [];
  for (let i = 1; i <= Math.max(totalPages, 3); i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 px-1 text-xs text-[#607080] dark:text-[#A8B5B1]">
      {/* Items range description matching prompt: "Showing 6 of 12 complaints" */}
      <div>
        Showing <span className="font-mono text-[#0B1736] dark:text-[#F5F7F5] font-semibold">{currentCount}</span> of{' '}
        <span className="font-mono text-[#087F5B] dark:text-[#16B978] font-bold">{totalItems}</span> complaints
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DDE6E2] dark:border-[#1C3A42] bg-white dark:bg-[#10242B] text-[#0B1736] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-[#152e37] hover:border-[#087F5B] dark:hover:border-[#16B978] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#087F5B] dark:text-[#16B978]" />
          <span>Previous</span>
        </button>

        {/* Page numbers: 1, 2, 3 */}
        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#087F5B] border border-[#087F5B] text-white shadow-2xs dark:bg-[#087F5B] dark:border-[#16B978]'
                    : 'bg-white dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] text-[#607080] dark:text-[#A8B5B1] hover:text-[#0B1736] dark:hover:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-[#152e37]'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DDE6E2] dark:border-[#1C3A42] bg-white dark:bg-[#10242B] text-[#0B1736] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-[#152e37] hover:border-[#087F5B] dark:hover:border-[#16B978] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#087F5B] dark:text-[#16B978]" />
        </button>
      </div>
    </div>
  );
}
