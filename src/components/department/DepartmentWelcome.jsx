import React from 'react';
import { Building2, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEFAULT_DEPARTMENT_STAFF } from '../../data/departmentDashboardData';

export default function DepartmentWelcome({
  departmentName = 'Hostel Department',
  activeWorkload = 42
}) {
  const { currentUser } = useAuth();

  // Dynamic user name (NEVER hardcodes Ayush)
  const staffName = currentUser?.name || currentUser?.full_name || DEFAULT_DEPARTMENT_STAFF.name;
  const staffDepartment = currentUser?.department || departmentName;

  const todayStr = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white via-[#F5F5F0] to-[#EAF7F1] dark:from-[#0C1518] dark:via-[#0F1E24] dark:to-[#071720] border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-xs transition-all">
      {/* Decorative campus background accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#008F63]/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Department Information */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/25 dark:border-[#00A875]/40">
              <Building2 className="w-3.5 h-3.5" />
              <span>{staffDepartment}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Department System Operational</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Good to see you, <span className="text-[#008F63] dark:text-[#D4A84F]">{staffName}</span>!
          </h2>

          <p className="text-xs sm:text-sm text-[#60717A] dark:text-[#9FB1BC]">
            Here’s an overview of complaints assigned to your department.
          </p>
        </div>

        {/* Right: Date & Active Queue Summary */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xs text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
              Institutional Calendar
            </span>
            <span className="text-xs font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
              {todayStr}
            </span>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#008F63]/10 dark:bg-[#315C3A]/30 border border-[#008F63]/30 dark:border-[#315C3A]/60 shadow-xs flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-[#008F63] dark:text-[#D4A84F]" />
            <div className="leading-tight">
              <span className="text-lg font-black text-[#008F63] dark:text-[#D4A84F]">
                {activeWorkload}
              </span>
              <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC]">
                Active In-Queue
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
