import React from 'react';
import cgcLogo from '../../assets/cgc_logo.png';

export default function AdminFooter() {
  return (
    <footer className="border-t border-[#1A2E3B] bg-[#050A0C]/80 px-4 sm:px-8 py-5 mt-10 text-xs text-[#9FB1BC] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img src={cgcLogo} alt="CGC University" className="h-10 sm:h-11 w-auto object-contain shrink-0" />

          <div>
            <span className="font-bold text-[#F5F5F0]">
              CGC University • Smart Campus Complaint & Analytics
            </span>

            <span className="hidden md:inline text-[#71844A] ml-2">
              • “Report. Track. Resolve. Improve.”
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-[#0D1B22] border border-[#1A2E3B] text-[#D4A84F] font-semibold">
            Administrator Panel
          </span>
          <span className="text-[#9FB1BC]/60">v2.4.0 (Enterprise)</span>
        </div>
      </div>
    </footer>
  );
}
