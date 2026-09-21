import React from 'react';
import { Calendar, ShieldCheck, Activity } from 'lucide-react';

export default function AdminWelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0D1B22] via-[#0D1B22]/90 to-[#07121A] border border-[#1A2E3B] p-5 sm:p-6 shadow-card-elevated">
      {/* Subtle abstract geometric/data background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, #D4A84F 1px, transparent 1px),
            linear-gradient(to right, rgba(49, 92, 58, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(49, 92, 58, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 24px 24px',
        }}
      />
      {/* Decorative gradient glow orb */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#315C3A]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F] text-[11px] font-semibold mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central Campus Oversight Active
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight">
            Good Evening, Administrator
          </h2>
          <p className="text-xs sm:text-sm text-[#9FB1BC] mt-1 max-w-xl">
            Here’s an overview of campus complaints, active tickets, and department resolution performance across all sectors.
          </p>
        </div>

        {/* Right date & status indicator */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07121A]/80 border border-[#1A2E3B] text-xs text-[#F5F5F0] shadow-sm">
            <Calendar className="w-4 h-4 text-[#D4A84F]" />
            <span className="font-medium">20 September 2026</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#315C3A]/15 border border-[#315C3A]/40 text-xs text-[#A7C481]">
            <Activity className="w-3.5 h-3.5 text-[#D4A84F] animate-pulse" />
            <span>Systems Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
