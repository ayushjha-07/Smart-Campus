import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  ChevronDown, 
  AlertCircle, 
  Shield, 
  Check, 
  Target 
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import { useApp } from '../../context/useApp';

export default function PriorityDistribution() {
  const { theme } = useApp();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('This Month');

  const filterOptions = ['This Week', 'This Month', 'This Semester', 'All Time'];

  const priorities = [
    {
      label: 'Critical',
      count: 0,
      percentage: '0%',
      barFillPercent: 0,
      icon: AlertCircle,
      iconBadgeBg: 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30',
      barGradient: 'bg-rose-500',
    },
    {
      label: 'High',
      count: 1,
      percentage: '50%',
      barFillPercent: 50,
      icon: Shield,
      iconBadgeBg: 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30',
      barGradient: 'bg-amber-500',
    },
    {
      label: 'Medium',
      count: 1,
      percentage: '50%',
      barFillPercent: 50,
      icon: Shield,
      iconBadgeBg: 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30',
      barGradient: 'bg-blue-500',
    },
    {
      label: 'Low',
      count: 0,
      percentage: '0%',
      barFillPercent: 0,
      icon: Check,
      iconBadgeBg: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30',
      barGradient: 'bg-emerald-500',
    },
  ];

  return (
    <div className="relative rounded-2xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 p-5 sm:p-6 shadow-2xs dark:shadow-xl overflow-hidden flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
      
      {/* CGC University Mohali Entrance Gate in Background */}
      <div className="absolute right-0 top-0 w-[50%] h-[75%] pointer-events-none overflow-hidden opacity-15">
        <img
          src={campusAssets.gateImage}
          alt="CGC University Mohali Gate"
          className="w-full h-full object-cover object-left-top filter contrast-110 brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0D1B22] dark:via-[#0D1B22]/80 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-[#0D1B22]/50 dark:to-[#0D1B22]" />
      </div>

      {/* Header Row */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3.5">
          {/* Gold Bar Chart Icon */}
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center shadow-2xs shrink-0">
            <BarChart3 className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-tight">
              Priority Distribution
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5">
              Severity categorization index
            </p>
          </div>
        </div>

        {/* Top-Right Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-slate-50 dark:bg-[#041118]/60 hover:bg-slate-100 dark:hover:bg-[#041118] border border-[#DDE7E2] dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#14213D] dark:text-[#F5F5F0] flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#168A5B]" />
            <span className="font-medium">{selectedFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-[#A8B3B0]" />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-[#071820] border border-[#DDE7E2] dark:border-white/10 shadow-xl py-1 z-30 animate-fadeIn">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(opt);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    selectedFilter === opt
                      ? 'text-[#168A5B] font-bold bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area: 4 Horizontal Progress Bars */}
      <div className="my-5 space-y-3.5 relative z-10 flex-1 justify-center flex flex-col">
        <div className="space-y-3">
          {priorities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3">
                
                {/* Icon Badge */}
                <div className={`w-6 h-6 rounded-lg ${item.iconBadgeBg} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                {/* Priority Label */}
                <span className="text-xs font-semibold text-[#14213D] dark:text-[#F5F5F0] w-14 shrink-0">
                  {item.label}
                </span>

                {/* Horizontal Progress Bar */}
                <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${item.barGradient}`}
                    style={{ width: `${item.barFillPercent}%` }}
                  />
                </div>

                {/* Numeric Count & Percentage */}
                <div className="flex items-center gap-2 w-14 justify-end shrink-0">
                  <span className="text-xs font-bold font-mono text-[#14213D] dark:text-[#F5F5F0]">
                    {item.count}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A8B3B0]">
                    {item.percentage}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="pt-3.5 border-t border-[#DDE7E2] dark:border-white/10 flex items-center justify-between relative z-10 text-xs text-[#64748B] dark:text-[#A8B3B0]">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#168A5B]" />
          <span>Balanced SLA Dispatch Matrix</span>
        </div>
        <span className="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/30">
          Optimal
        </span>
      </div>

    </div>
  );
}
