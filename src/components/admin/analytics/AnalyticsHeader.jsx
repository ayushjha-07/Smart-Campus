import React from 'react';
import { Calendar, ChevronDown, BarChart2 } from 'lucide-react';
import ExportReportMenu from './ExportReportMenu';

export default function AnalyticsHeader({
  dateRange,
  onDateRangeChange,
  filters,
  onShowToast,
}) {
  const dateOptions = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'This Academic Year',
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#DDE8E3] dark:border-[#243338]">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Analytics & Insights
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/20 dark:border-[#00A875]/30">
            <BarChart2 className="w-3 h-3" />
            Live Intelligence
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
          Understand campus complaints, identify trends, and make data-driven decisions.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Date Filter Dropdown */}
        <div className="relative inline-flex items-center">
          <Calendar className="w-3.5 h-3.5 absolute left-3 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="appearance-none pl-8 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#0C1518] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] shadow-2xs hover:border-[#008F63] focus:outline-hidden focus:ring-2 focus:ring-[#008F63]/30 transition-colors cursor-pointer"
            aria-label="Filter Date Range"
          >
            {dateOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-[#0C1518] text-[#071A2B] dark:text-[#F5F5F0]">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
        </div>

        {/* Export Report Dropdown Menu */}
        <ExportReportMenu filters={filters} onShowToast={onShowToast} />
      </div>
    </div>
  );
}
