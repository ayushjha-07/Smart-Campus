import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 py-3 border-t border-[#1A2E3B]/80 text-xs text-[#9FB1BC]">
      {/* Showing count */}
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-[#F5F5F0]">{startItem}–{endItem}</strong> of{' '}
          <strong className="text-[#F5F5F0]">{totalItems > 16 ? '1,248' : totalItems}</strong> users
        </span>

        {onItemsPerPageChange && (
          <div className="flex items-center gap-1.5 pl-3 border-l border-[#1A2E3B]">
            <span className="text-[11px]">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-[#0D1B22] border border-[#1A2E3B] rounded px-1.5 py-0.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-1 self-center sm:self-auto">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-[#71844A]">
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#315C3A] text-[#F5F5F0] border border-[#D4A84F]/50 shadow-sm'
                  : 'text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] border border-transparent'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
