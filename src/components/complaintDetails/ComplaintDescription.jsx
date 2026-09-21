import React from 'react';
import { AlignLeft, Quote } from 'lucide-react';

export default function ComplaintDescription({ description }) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
        <AlignLeft className="w-4 h-4 text-[#168A5B] dark:text-[#71844A]" />
        <span>Complaint Description</span>
      </div>

      <div className="relative p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 text-[#14213D] dark:text-[#F5F5F0] text-sm leading-relaxed">
        <Quote className="w-6 h-6 text-[#168A5B]/20 dark:text-[#315C3A]/30 absolute top-3 right-3 pointer-events-none" />
        <p className="font-normal text-sm sm:text-base leading-relaxed text-[#14213D] dark:text-[#F5F5F0]/95 pr-6">
          {description || 'No detailed description provided for this complaint.'}
        </p>
      </div>
    </div>
  );
}
