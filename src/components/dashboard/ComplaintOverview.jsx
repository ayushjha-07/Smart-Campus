import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  ChevronDown, 
  Check, 
  ArrowUpRight, 
  Lightbulb, 
  Sprout 
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import { useApp } from '../../context/useApp';

export default function ComplaintOverview() {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('This Month');

  const filterOptions = ['This Week', 'This Month', 'This Semester', 'All Time'];

  // Donut geometry (radius = 65, circumference = 2 * PI * 65 ≈ 408.4)
  const radius = 65;
  const circumference = 2 * Math.PI * radius; // 408.4
  const halfCircumference = circumference / 2; // 204.2

  return (
    <div className="relative rounded-2xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 p-5 sm:p-6 shadow-2xs dark:shadow-xl overflow-hidden flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
      
      {/* CGC University Aerial Campus Building in Background */}
      <div className="absolute right-0 top-0 w-[50%] h-[65%] pointer-events-none overflow-hidden opacity-15">
        <img
          src={campusAssets.aerialImage}
          alt="CGC University Mohali Campus"
          className="w-full h-full object-cover object-left-top filter contrast-110 brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0D1B22] dark:via-[#0D1B22]/80 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-[#0D1B22]/50 dark:to-[#0D1B22]" />
      </div>

      {/* Header Row */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3.5">
          {/* Glowing Green File Icon */}
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#168A5B] border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center shadow-2xs shrink-0">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-tight">
              Complaint Overview
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5">
              Current lifecycle distribution
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

      {/* Main Content Area: Donut Chart + Status Rows + Resolution Rate Panel */}
      <div className="my-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10 flex-1">
        
        {/* Left: Donut Chart */}
        <div className="sm:col-span-5 flex justify-center items-center">
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 160 160"
            >
              {/* Background faint ring track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={isLight ? '#E2E8F0' : '#1F3440'}
                strokeWidth="18"
              />

              {/* Resolved 50% Arc (Emerald Green) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#168A5B"
                strokeWidth="18"
                strokeDasharray={`${halfCircumference} ${circumference}`}
                strokeDashoffset="0"
              />

              {/* Pending 50% Arc (Amber Gold) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#D4A84F"
                strokeWidth="18"
                strokeDasharray={`${halfCircumference} ${circumference}`}
                strokeDashoffset={`-${halfCircumference}`}
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
              <FileText className="w-4 h-4 text-[#168A5B]" strokeWidth={2} />
              <span className="text-3xl font-black text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-none mt-1 font-mono">
                2
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-[#64748B] dark:text-[#A8B3B0] uppercase mt-0.5">
                TOTAL
              </span>
            </div>
          </div>
        </div>

        {/* Right: Three Status Values & Resolution Rate Panel */}
        <div className="sm:col-span-7 space-y-3.5">
          
          {/* Status Breakdown Table */}
          <div className="space-y-2">
            {/* Row 1: Pending */}
            <div className="flex items-center justify-between text-xs py-0.5 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A84F]" />
                <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0]">Pending</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-bold text-[#14213D] dark:text-[#F5F5F0] text-sm w-4 text-center font-mono">1</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-xs w-9 text-right font-mono">50%</span>
              </div>
            </div>

            {/* Row 2: In Progress */}
            <div className="flex items-center justify-between text-xs py-0.5 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="font-medium text-[#64748B] dark:text-[#A8B3B0]">In Progress</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-bold text-[#64748B] dark:text-[#A8B3B0] text-sm w-4 text-center font-mono">0</span>
                <span className="font-medium text-[#64748B] dark:text-[#A8B3B0] text-xs w-9 text-right font-mono">0%</span>
              </div>
            </div>

            {/* Row 3: Resolved */}
            <div className="flex items-center justify-between text-xs py-0.5 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#168A5B]" />
                <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0]">Resolved</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-bold text-[#14213D] dark:text-[#F5F5F0] text-sm w-4 text-center font-mono">1</span>
                <span className="font-bold text-[#168A5B] text-xs w-9 text-right font-mono">50%</span>
              </div>
            </div>
          </div>

          {/* Premium Resolution Rate Panel */}
          <div className="p-3 sm:p-3.5 rounded-2xl shadow-2xs flex items-center justify-between gap-3 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#168A5B] text-white flex items-center justify-center shadow-2xs shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 leading-none">
                  Resolution Rate
                </span>
                <span className="block text-2xl font-black tracking-tight leading-none mt-1 font-mono text-[#14213D] dark:text-[#F5F5F0]">
                  50%
                </span>
                <span className="block text-[10px] mt-1 text-[#64748B] dark:text-[#A8B3B0]">
                  1 of 2 complaints resolved
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center text-xs font-black text-[#168A5B]">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+12%</span>
              </span>
              <span className="block text-[10px] mt-0.5 text-[#64748B] dark:text-[#A8B3B0]">
                from last month
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer Row: Inspirational Quote */}
      <div className="pt-3.5 border-t border-[#DDE7E2] dark:border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#D4A84F] shrink-0" />
          <div>
            <span className="text-xs sm:text-sm font-serif italic text-[#14213D] dark:text-[#F5F5F0]">
              “Every complaint resolved builds a better campus.”
            </span>
            <div className="h-0.5 w-10 bg-[#D4A84F] mt-0.5 rounded-full" />
          </div>
        </div>

        {/* Minimal Ascending Data Bars */}
        <div className="flex items-end gap-1 opacity-40">
          <div className="w-1.5 h-3 bg-[#168A5B] rounded-sm" />
          <div className="w-1.5 h-4.5 bg-[#168A5B] rounded-sm" />
          <div className="w-1.5 h-6 bg-[#168A5B] rounded-sm" />
          <div className="w-1.5 h-8 bg-[#168A5B] rounded-sm relative">
            <Sprout className="w-3.5 h-3.5 text-[#168A5B] absolute -top-3.5 -left-1" />
          </div>
        </div>
      </div>

    </div>
  );
}
