import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import {
  FILTER_DEPARTMENTS,
  FILTER_PRIORITIES,
  FILTER_STATUSES
} from '../../data/adminDashboardData';

export default function AdminFilters({
  selectedDepartment,
  onDepartmentChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  onResetFilters
}) {
  const isFiltered =
    selectedDepartment !== 'All Departments' ||
    selectedPriority !== 'All Priorities' ||
    selectedStatus !== 'All Statuses';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-4 rounded-xl border transition-colors bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs">
      <div className="flex items-center gap-2 text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
        <Filter className="w-3.5 h-3.5 text-[#008F63] dark:text-[#D4A84F]" />
        <span>Quick Filters:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-1 justify-start sm:justify-end">
        {/* Department Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#008F63] dark:focus:ring-[#D4A84F] cursor-pointer"
        >
          {FILTER_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#008F63] dark:focus:ring-[#D4A84F] cursor-pointer"
        >
          {FILTER_PRIORITIES.map((pri) => (
            <option key={pri} value={pri}>
              {pri}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#008F63] dark:focus:ring-[#D4A84F] cursor-pointer"
        >
          {FILTER_STATUSES.map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>

        {/* Reset Filters button if any active */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
