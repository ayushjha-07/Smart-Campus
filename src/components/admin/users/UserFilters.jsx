import React, { useState } from 'react';
import { Search, RotateCcw, Check, Calendar } from 'lucide-react';
import { ROLES, DEPARTMENTS_LIST, STATUSES, YEARS } from '../../../data/userManagementMockData';

export default function UserFilters({ filters, onApplyFilters, onClearFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleClear = () => {
    const defaults = {
      search: '',
      role: 'All Roles',
      department: 'All Departments',
      status: 'All',
      year: 'All',
      sort: 'Newest'
    };
    setLocalFilters(defaults);
    onClearFilters(defaults);
  };

  const isFiltered =
    localFilters.search !== '' ||
    localFilters.role !== 'All Roles' ||
    localFilters.department !== 'All Departments' ||
    localFilters.status !== 'All' ||
    localFilters.year !== 'All' ||
    localFilters.sort !== 'Newest';

  return (
    <div className="bg-[#0D1B22]/90 border border-[#1A2E3B] rounded-xl p-4 shadow-lg backdrop-blur-sm space-y-3">
      <form onSubmit={handleApply}>
        {/* Top Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Query (5 Cols) */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search name, email, ID..."
              value={localFilters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#07121A] border border-[#1A2E3B] rounded-lg text-xs text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F] transition-colors"
            />
          </div>

          {/* Role Filter (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={localFilters.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value="All Roles">All Roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Department Filter (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={localFilters.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value="All Departments">All Departments</option>
              {DEPARTMENTS_LIST.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status Filter (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={localFilters.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={localFilters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
              <option value="Name A-Z">Sort: Name A-Z</option>
              <option value="Name Z-A">Sort: Name Z-A</option>
            </select>
          </div>
        </div>

        {/* Secondary Row for Year & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-[#1A2E3B]/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#9FB1BC] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#71844A]" />
              Filter by Academic Year:
            </span>
            <select
              value={localFilters.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="bg-[#07121A] border border-[#1A2E3B] rounded-md px-2 py-1 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              <option value="All">All Years</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {isFiltered && (
              <span className="px-2 py-0.5 rounded-full bg-[#315C3A]/30 text-[#D4A84F] text-[10px] font-bold border border-[#315C3A]">
                Filters Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] border border-transparent hover:border-[#1A2E3B] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] border border-[#D4A84F]/40 text-xs font-semibold shadow-sm transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
