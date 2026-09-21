import React from 'react';
import { Wrench, AlertCircle, Calendar } from 'lucide-react';
import { DEPARTMENT_STAFF_PROFILE } from '../../data/departmentMockData';

export default function DepartmentWelcome({ activeWorkload = 12 }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0D1B22] via-[#0D1B22]/90 to-[#07121A] border border-[#1A2E3B] p-5 sm:p-6 shadow-card-elevated">
      {/* Subtle abstract geometric/data background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 25%, #D4A84F 1px, transparent 1px),
            linear-gradient(to right, rgba(49, 92, 58, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(49, 92, 58, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 24px 24px',
        }}
      />
      {/* Decorative gradient blur orb */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#315C3A]/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F] text-[11px] font-semibold mb-2.5">
            <Wrench className="w-3.5 h-3.5" />
            Maintenance Operations Center
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight">
            Good Evening, {DEPARTMENT_STAFF_PROFILE.name.split(' ')[0]}
          </h2>
          <p className="text-xs sm:text-sm text-[#9FB1BC] mt-1 max-w-xl">
            Here’s the latest activity and complaint workload for the {DEPARTMENT_STAFF_PROFILE.department} Department.
          </p>
        </div>

        {/* Right Info Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07121A]/80 border border-[#1A2E3B] text-xs text-[#F5F5F0]">
            <span className="text-[#9FB1BC]">Department:</span>
            <span className="font-semibold text-[#D4A84F]">{DEPARTMENT_STAFF_PROFILE.department}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#315C3A]/15 border border-[#315C3A]/40 text-xs text-[#A7C481]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span className="text-[#9FB1BC]">Current workload:</span>
            <span className="font-bold text-[#F5F5F0] font-mono">{activeWorkload} active complaints</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#07121A]/60 border border-[#1A2E3B] text-xs text-[#9FB1BC]">
            <Calendar className="w-3.5 h-3.5 text-[#71844A]" />
            <span>20 Sep 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
