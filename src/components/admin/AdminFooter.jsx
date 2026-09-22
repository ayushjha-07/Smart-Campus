import React from 'react';
import campusAssets from '../../assets/campusAssets';

export default function AdminFooter() {
  return (
    <footer className="border-t transition-colors border-[#DDE8E3] dark:border-[#1A2E3B] bg-white/90 dark:bg-[#050A0C]/80 px-4 sm:px-8 py-5 mt-10 text-xs text-[#60717A] dark:text-[#9FB1BC]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img
            src={campusAssets.logo}
            alt="CGC University"
            className="h-10 sm:h-11 w-auto object-contain shrink-0"
          />

          <div>
            <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
              CGC University • Smart Campus Complaint & Analytics
            </span>

            <span className="hidden md:inline text-[#008F63] dark:text-[#71844A] ml-2">
              • “Report. Track. Resolve. Improve.”
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-md font-semibold bg-[#F7F9F8] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] text-[#008F63] dark:text-[#D4A84F]">
            Administrator Panel
          </span>
          <span className="text-[#60717A]/70 dark:text-[#9FB1BC]/60 font-mono">
            v2.4.0 (Enterprise)
          </span>
        </div>
      </div>
    </footer>
  );
}
