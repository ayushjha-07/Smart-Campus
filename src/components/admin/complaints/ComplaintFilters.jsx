import React from 'react';
import {
  Search,
  Filter,
  X,
  Calendar,
  ArrowUpDown,
  Building2,
  Tag,
  AlertCircle
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
  deptFilter,
  setDeptFilter,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  const isFiltered =
    Boolean(search) ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    deptFilter !== 'ALL' ||
    categoryFilter !== 'ALL' ||
    dateFilter !== 'ALL_TIME';

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-4 shadow-sm space-y-3">
      {/* Top row: Search input & Active indicators */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaint ID, title, student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg text-xs text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9FB1BC] hover:text-[#F5F5F0]"
              aria-label="Clear search text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results summary & Clear Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-[#9FB1BC]">
            Showing <strong className="text-[#F5F5F0] font-mono">{totalResults}</strong> matching complaints
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#D4A84F] hover:text-[#E5BF6E] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors font-medium text-xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {/* Status Dropdown */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Filter by status"
            >
              <option value="ALL">All Statuses</option>
              {COMPLAINT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Filter className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Priority Dropdown */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Priority
          </label>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Filter by priority"
            >
              <option value="ALL">All Priorities</option>
              {COMPLAINT_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <AlertCircle className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Department
          </label>
          <div className="relative">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Filter by department"
            >
              <option value="ALL">All Departments</option>
              {COMPLAINT_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Building2 className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Category
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Filter by category"
            >
              <option value="ALL">All Categories</option>
              {COMPLAINT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Tag className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Date
          </label>
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Filter by date submitted"
            >
              <option value="ALL_TIME">All Time</option>
              <option value="TODAY">Today (20 Sep)</option>
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="LAST_30_DAYS">Last 30 Days</option>
            </select>
            <Calendar className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sort Order */}
        <div className="relative">
          <label className="text-[10px] uppercase font-semibold text-[#71844A] block mb-1">
            Sort
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] focus:border-[#D4A84F] text-[#F5F5F0] rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer truncate transition-colors"
              aria-label="Sort complaints order"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Highest Priority</option>
              <option value="updated">Recently Updated</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
