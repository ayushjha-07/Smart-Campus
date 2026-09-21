import React, { useState } from 'react';
import { Filter, RotateCcw, Check, Calendar, Building2, Tag, AlertCircle } from 'lucide-react';
import { FILTER_OPTIONS } from '../../../data/analyticsMockData';

export default function AnalyticsFilters({
  filters,
  onApplyFilters,
  onResetFilters
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      dateRange: 'Last 7 Days',
      department: 'All Departments',
      category: 'All Categories',
      priority: 'All'
    };
    setLocalFilters(defaultFilters);
    onResetFilters(defaultFilters);
  };

  const isFiltered =
    localFilters.dateRange !== 'Last 7 Days' ||
    localFilters.department !== 'All Departments' ||
    localFilters.category !== 'All Categories' ||
    localFilters.priority !== 'All';

  return (
    <div className="bg-[#0D1B22]/90 border border-[#1A2E3B] rounded-xl p-4 shadow-lg backdrop-blur-sm">
      <form onSubmit={handleApply}>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1A2E3B]/80 text-xs">
          <div className="flex items-center gap-2 text-[#F5F5F0] font-semibold">
            <Filter className="w-4 h-4 text-[#D4A84F]" />
            <span>Analytical Scope & Filters</span>
            {isFiltered && (
              <span className="px-2 py-0.5 rounded-full bg-[#315C3A]/40 text-[#D4A84F] text-[10px] font-bold border border-[#315C3A]">
                Filters Active
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#9FB1BC] hidden sm:inline">
            Refines visualizations across trends, categories & departmental queues
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Date Range */}
          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#71844A]" />
              Date Range
            </label>
            <select
              value={localFilters.dateRange}
              onChange={(e) => handleChange('dateRange', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30 transition-colors"
            >
              {FILTER_OPTIONS.dateRanges.map((range) => (
                <option key={range} value={range} className="bg-[#07121A] text-[#F5F5F0]">
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#315C3A]" />
              Department
            </label>
            <select
              value={localFilters.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30 transition-colors"
            >
              {FILTER_OPTIONS.departments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#07121A] text-[#F5F5F0]">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D4A84F]" />
              Category
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30 transition-colors"
            >
              {FILTER_OPTIONS.categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#07121A] text-[#F5F5F0]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Priority
            </label>
            <select
              value={localFilters.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30 transition-colors"
            >
              {FILTER_OPTIONS.priorities.map((p) => (
                <option key={p} value={p} className="bg-[#07121A] text-[#F5F5F0]">
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-[#1A2E3B]/60">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors border border-transparent hover:border-[#1A2E3B]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] border border-[#D4A84F]/40 text-xs font-semibold shadow-sm transition-colors"
          >
            <Check className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span>Apply Filters</span>
          </button>
        </div>
      </form>
    </div>
  );
}
