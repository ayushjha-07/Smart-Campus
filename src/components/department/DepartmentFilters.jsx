import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

export default function DepartmentFilters({
  search = '',
  setSearch,
  statusFilter = 'All Status',
  setStatusFilter,
  priorityFilter = 'All Priority',
  setPriorityFilter,
  categoryFilter = 'All Categories',
  setCategoryFilter,
  dateFilter = 'All Dates',
  setDateFilter,
  onResetFilters,
  totalResults = 0
}) {
  const statusOptions = ['All Status', 'Pending', 'Under Review', 'In Progress', 'Resolved'];
  const priorityOptions = ['All Priority', 'Low', 'Medium', 'High', 'Critical'];
  const categoryOptions = [
    'All Categories',
    'Water Supply',
    'Electricity',
    'Cleanliness',
    'Infrastructure',
    'IT / Wi-Fi',
    'Maintenance'
  ];
  const dateOptions = ['All Dates', 'Today', 'This Week', 'This Month'];

  const hasActiveFilters =
    search.trim() !== '' ||
    statusFilter !== 'All Status' ||
    priorityFilter !== 'All Priority' ||
    categoryFilter !== 'All Categories' ||
    dateFilter !== 'All Dates';

  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs space-y-3">
      {/* Top Search Bar & Result Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#60717A] dark:text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaint ID, title, student, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] rounded-xl text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#008F63] dark:focus:border-[#D4A84F] focus:ring-1 focus:ring-[#008F63]/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
          <span className="text-[#60717A] dark:text-[#9FB1BC]">
            Showing <strong className="text-[#071A2B] dark:text-[#F5F5F0]">{totalResults}</strong> matching complaints
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="p-1.5 px-2.5 rounded-lg bg-[#008F63]/10 hover:bg-[#008F63]/20 dark:bg-[#00A875]/20 dark:hover:bg-[#00A875]/30 text-[#008F63] dark:text-[#00A875] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdown Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 text-xs">
        {/* Status Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A] mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F5F0]/80 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:border-[#008F63] dark:focus:border-[#D4A84F] cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A] mb-1">
            Priority
          </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F5F0]/80 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:border-[#008F63] dark:focus:border-[#D4A84F] cursor-pointer"
          >
            {priorityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A] mb-1">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F5F0]/80 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:border-[#008F63] dark:focus:border-[#D4A84F] cursor-pointer"
          >
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A] mb-1">
            Date Range
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F5F0]/80 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:border-[#008F63] dark:focus:border-[#D4A84F] cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
