import React from 'react';
import { Search, ChevronDown, X, RotateCcw } from 'lucide-react';

export default function NotificationFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  timeFilter,
  onTimeChange,
  onClearFilters,
  activeFilterCount,
}) {
  const statuses = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Unread', label: 'Unread' },
    { value: 'Read', label: 'Read' },
  ];

  const categories = [
    { value: 'All', label: 'All Categories' },
    { value: 'Complaint Updates', label: 'Complaint Updates' },
    { value: 'Announcements', label: 'Announcements' },
    { value: 'System', label: 'System' },
    { value: 'Department Updates', label: 'Department Updates' },
  ];

  const timeRanges = [
    { value: 'All', label: 'All Time' },
    { value: 'Today', label: 'Today' },
    { value: 'This Week', label: 'This Week' },
    { value: 'This Month', label: 'This Month' },
  ];

  return (
    <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-2xs dark:shadow-xl transition-colors">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687A91] dark:text-[#91A7A5]">
            <Search className="w-4 h-4 text-[#078A5A] dark:text-[#00B87A]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notifications by title, ID, or description..."
            className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#10213A] dark:text-[#F5F7F5] placeholder-[#687A91]/70 dark:placeholder-[#91A7A5]/70 outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#687A91] hover:text-[#10213A] dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3 Dropdown Selectors */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          {/* Status Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 focus:border-[#078A5A] dark:focus:border-[#00B87A] text-[#10213A] dark:text-[#F5F7F5] text-xs font-medium rounded-xl pl-3 pr-8 py-2 sm:py-2.5 outline-none cursor-pointer transition-all"
            >
              {statuses.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                  className="bg-white dark:bg-[#0B2027] text-[#10213A] dark:text-[#F5F7F5]"
                >
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#687A91] dark:text-[#91A7A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 focus:border-[#078A5A] dark:focus:border-[#00B87A] text-[#10213A] dark:text-[#F5F7F5] text-xs font-medium rounded-xl pl-3 pr-8 py-2 sm:py-2.5 outline-none cursor-pointer transition-all"
            >
              {categories.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  className="bg-white dark:bg-[#0B2027] text-[#10213A] dark:text-[#F5F7F5]"
                >
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#687A91] dark:text-[#91A7A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Time Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={timeFilter || 'All'}
              onChange={(e) => onTimeChange && onTimeChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 focus:border-[#078A5A] dark:focus:border-[#00B87A] text-[#10213A] dark:text-[#F5F7F5] text-xs font-medium rounded-xl pl-3 pr-8 py-2 sm:py-2.5 outline-none cursor-pointer transition-all"
            >
              {timeRanges.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  className="bg-white dark:bg-[#0B2027] text-[#10213A] dark:text-[#F5F7F5]"
                >
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#687A91] dark:text-[#91A7A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Clear Filters button if filters active */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              title="Reset all filters"
              className="p-2 sm:p-2.5 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 text-rose-700 dark:text-rose-300 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
