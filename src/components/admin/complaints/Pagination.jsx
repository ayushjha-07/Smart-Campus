import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 py-3 text-xs text-[#9FB1BC]">
      {/* Left items summary & page size */}
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-[#F5F5F0] font-mono">{startItem}–{endItem}</strong> of{' '}
          <strong className="text-[#F5F5F0] font-mono">{totalItems}</strong> complaints
        </span>

        <div className="flex items-center gap-1.5 pl-2 border-l border-[#1A2E3B]">
          <span className="text-[11px] text-[#9FB1BC]">Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-[#07121A] border border-[#1A2E3B] rounded px-2 py-1 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
            aria-label="Select number of complaints per page"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 self-center sm:self-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-[#F5F5F0] hover:bg-[#13242E] disabled:opacity-30 disabled:hover:bg-[#0D1B22] disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 py-1 text-[#9FB1BC]">
                ...
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return (
            <button
              key={`page-${p}`}
              onClick={() => onPageChange(p)}
              className={`min-w-[30px] h-[30px] rounded-lg text-xs font-semibold transition-colors ${
                isCurrent
                  ? 'bg-[#315C3A] text-[#F5F5F0] border border-[#315C3A] shadow-sm'
                  : 'bg-[#0D1B22] border border-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E]'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-[#F5F5F0] hover:bg-[#13242E] disabled:opacity-30 disabled:hover:bg-[#0D1B22] disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
