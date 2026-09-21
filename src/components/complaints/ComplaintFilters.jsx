import React from 'react';
import { 
  Search, 
  RotateCcw, 
  ArrowUpDown, 
  X,
  Calendar,
  Layers,
  Flame,
  Activity,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function ComplaintFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  dateFilter,
  onDateChange,
  sortBy,
  onSortChange,
  onClearFilters,
  activeFilterCount,
}) {
  const statuses = [
    'All',
    'In Progress',
    'Under Review',
    'Resolved',
    'Assigned',
    'Submitted',
  ];

  const priorities = ['All', 'Low', 'Medium', 'High'];

  const categories = [
    'All',
    'Water Supply',
    'IT / Wi-Fi',
    'Infrastructure',
    'Cleanliness',
    'Electricity',
    'Transport',
    'Academic',
    'Hostel',
  ];

  const dateOptions = ['All Time', 'Today', 'This Week', 'This Month'];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'priority-high', label: 'Highest Priority' },
    { id: 'priority-low', label: 'Lowest Priority' },
  ];

  return (
    <div className="bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] rounded-2xl p-5 shadow-2xs dark:shadow-xl space-y-4 transition-colors">
      
      {/* Section Header: Icon + Title & Subtitle */}
      <div className="flex items-center gap-3 pb-3 border-b border-[#DDE6E2] dark:border-[#1C3A42]">
        <div className="w-10 h-10 rounded-xl bg-[#087F5B] dark:bg-[#16B978] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B1736] dark:text-[#F5F7F5] tracking-tight">
            All Complaints
          </h2>
          <p className="text-xs text-[#607080] dark:text-[#A8B5B1]">
            View and track every complaint submitted through Smart Campus.
          </p>
        </div>
      </div>

      {/* Filter Toolbar: Desktop 1-Row / Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-2.5 items-center">
        
        {/* 1. Search Bar (Takes 4 cols on desktop) */}
        <div className="lg:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#087F5B] dark:text-[#16B978]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by ID, title, or description..."
            className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] focus:bg-white dark:focus:bg-[#0B1B22] rounded-xl pl-9 pr-8 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] placeholder-[#607080]/60 dark:placeholder-[#A8B5B1]/50 outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-[#0B1736] dark:hover:text-[#F5F7F5]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. Status Dropdown (Takes 2 cols) */}
        <div className="lg:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#087F5B] dark:text-[#16B978]">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] rounded-xl pl-8 pr-7 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] outline-none cursor-pointer appearance-none shadow-2xs"
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-white dark:bg-[#0B1B22] text-[#0B1736] dark:text-[#F5F7F5]">
                {s === 'All' ? 'All Status' : s}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#607080] dark:text-[#A8B5B1] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Priority Dropdown (Takes 2 cols) */}
        <div className="lg:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#D9A62E] dark:text-[#D8A63C]">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] rounded-xl pl-8 pr-7 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] outline-none cursor-pointer appearance-none shadow-2xs"
          >
            {priorities.map((p) => (
              <option key={p} value={p} className="bg-white dark:bg-[#0B1B22] text-[#0B1736] dark:text-[#F5F7F5]">
                {p === 'All' ? 'All Priority' : p}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#607080] dark:text-[#A8B5B1] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Category Dropdown (Takes 2 cols) */}
        <div className="lg:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#087F5B] dark:text-[#16B978]">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] rounded-xl pl-8 pr-7 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] outline-none cursor-pointer appearance-none shadow-2xs"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-white dark:bg-[#0B1B22] text-[#0B1736] dark:text-[#F5F7F5]">
                {c === 'All' ? 'All Category' : c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#607080] dark:text-[#A8B5B1] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 5. Date / Time Dropdown (Takes 1 col / 2 cols) */}
        <div className="lg:col-span-1 relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#D9A62E] dark:text-[#D8A63C]">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] rounded-xl pl-7 pr-6 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] outline-none cursor-pointer appearance-none shadow-2xs"
          >
            {dateOptions.map((d) => (
              <option key={d} value={d} className="bg-white dark:bg-[#0B1B22] text-[#0B1736] dark:text-[#F5F7F5]">
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#607080] dark:text-[#A8B5B1] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 6. Sort Dropdown + Reset Button (Takes 1 col / 2 cols) */}
        <div className="lg:col-span-1 flex items-center gap-1.5">
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] focus:border-[#087F5B] dark:focus:border-[#16B978] rounded-xl pl-2.5 pr-6 py-2 text-xs text-[#0B1736] dark:text-[#F5F7F5] outline-none cursor-pointer appearance-none shadow-2xs"
              title="Sort orders"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-white dark:bg-[#0B1B22] text-[#0B1736] dark:text-[#F5F7F5]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="w-3 h-3 text-[#607080] dark:text-[#A8B5B1] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              title="Clear active filters"
              className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
