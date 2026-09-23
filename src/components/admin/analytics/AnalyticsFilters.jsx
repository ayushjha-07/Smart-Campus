import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';

export default function AnalyticsFilters({ filters, onFilterChange, onResetFilters }) {
  const departments = [
    'All Departments',
    'Hostel',
    'Maintenance',
    'IT Support',
    'Academics',
    'Security',
    'Transport',
    'Library',
    'Cafeteria',
  ];

  const categories = [
    'All Categories',
    'Infrastructure',
    'Water Supply',
    'Electricity',
    'Cleanliness',
    'IT / Wi-Fi',
    'Transport',
    'Security',
    'Academic',
    'Hostel',
    'Food',
  ];

  const priorities = ['All Priorities', 'Low', 'Medium', 'High', 'Critical'];

  const statuses = [
    'All Status',
    'Pending',
    'Under Review',
    'Assigned',
    'In Progress',
    'Resolved',
  ];

  const dateRanges = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'This Academic Year',
  ];

  const isFiltered =
    filters.dateRange !== 'Last 30 Days' ||
    filters.department !== 'All Departments' ||
    filters.category !== 'All Categories' ||
    filters.priority !== 'All Priorities' ||
    filters.status !== 'All Status';

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-3.5 sm:p-4 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Label & Active Count */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
          <span>Filter Telemetry:</span>
          {isFiltered && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
              Active Filters
            </span>
          )}
        </div>

        {/* Dropdowns Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 flex-1">
          {/* Date Range */}
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 text-xs font-medium rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Filter Date Range"
            >
              {dateRanges.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          </div>

          {/* Department */}
          <div className="relative">
            <select
              value={filters.department}
              onChange={(e) => onFilterChange('department', e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 text-xs font-medium rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Filter Department"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 text-xs font-medium rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Filter Category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          </div>

          {/* Priority */}
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 text-xs font-medium rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Filter Priority"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 text-xs font-medium rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Filter Status"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          </div>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#F7F9F8] dark:bg-white/5 text-[#60717A] dark:text-[#A8B3B0] hover:text-[#071A2B] dark:hover:text-white border border-[#DDE8E3] dark:border-[#243338] transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
