import React from 'react';
import { Layers, AlertCircle, ChevronDown } from 'lucide-react';

const COMPLAINT_CATEGORIES = [
  'Hostel',
  'Infrastructure',
  'Electricity',
  'Water Supply',
  'Cleanliness',
  'Academic',
  'Transport',
  'Security',
  'IT / Wi-Fi',
  'Library',
  'Food / Cafeteria',
  'Other',
];

export default function ComplaintCategory({ value, onChange, error }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
          Category <span className="text-[#E5484D]">*</span>
        </label>
        <span className="text-[10px] font-semibold text-[#168A5B]">Auto-routes to department</span>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#168A5B]">
          <Layers className="w-4 h-4" />
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[#F8FAF9] dark:bg-[#041118]/60 border ${
            error
              ? 'border-[#E5484D] focus:border-[#E5484D] ring-1 ring-[#E5484D]/20'
              : 'border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:ring-1 focus:ring-[#168A5B]/20'
          } rounded-xl pl-10 pr-9 py-2.5 text-sm text-[#14213D] dark:text-[#F5F5F0] focus:bg-white dark:focus:bg-[#041118] outline-none transition-all appearance-none cursor-pointer`}
        >
          <option value="" disabled className="text-[#94A3B8] dark:text-[#64748B] dark:bg-[#0D1B22]">
            Select complaint category
          </option>
          {COMPLAINT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="text-[#14213D] dark:text-[#F5F5F0] dark:bg-[#0D1B22]">
              {cat}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#64748B] dark:text-[#A8B3B0]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-[#E5484D] flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
