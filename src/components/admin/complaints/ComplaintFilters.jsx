import React from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  X,
  ChevronDown
} from 'lucide-react';
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_DEPARTMENTS,
  COMPLAINT_STATUSES,
  COMPLAINT_PRIORITIES
} from '../../../data/adminComplaintsData';

export default function ComplaintFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  deptFilter,
  setDeptFilter,
  dateFilter,
  setDateFilter,
  onResetFilters,
  totalResults = 0
}) {
  const isFiltered =
    Boolean(search) ||
    statusFilter !== 'All Status' ||
    priorityFilter !== 'All Priority' ||
    categoryFilter !== 'All Categories' ||
    deptFilter !== 'All Departments' ||
    dateFilter !== 'All Dates';

  return (
    <div className="rounded-xl p-4 sm:p-5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs space-y-4">
      {/* Top Bar: Search + Filter status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#60717A] dark:text-[#9FB1BC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaint ID, title, student or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#008F63] dark:focus:border-[#00A875]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] p-1"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-[#60717A] dark:text-[#9FB1BC] font-medium">
            Showing <strong className="text-[#071A2B] dark:text-[#F5F5F0] font-mono">{totalResults}</strong> matching complaints
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/25 flex items-center gap-1.5 transition-colors font-semibold text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 text-xs">
        {/* Status Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00A875] focus:outline-none cursor-pointer transition-colors"
            >
              <option value="All Status">All Status</option>
              {COMPLAINT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Priority Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] mb-1">
            Priority
          </label>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00A875] focus:outline-none cursor-pointer transition-colors"
            >
              <option value="All Priority">All Priority</option>
              {COMPLAINT_PRIORITIES.map((pr) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] mb-1">
            Category
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00A875] focus:outline-none cursor-pointer transition-colors"
            >
              <option value="All Categories">All Categories</option>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] mb-1">
            Department
          </label>
          <div className="relative">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00A875] focus:outline-none cursor-pointer transition-colors"
            >
              <option value="All Departments">All Departments</option>
              {COMPLAINT_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Date Dropdown */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] mb-1">
            Date
          </label>
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00A875] focus:outline-none cursor-pointer transition-colors"
            >
              <option value="All Dates">All Dates</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
