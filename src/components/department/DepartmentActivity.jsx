import React from 'react';
import { History, Clock } from 'lucide-react';
import { DEPARTMENT_RECENT_ACTIVITY } from '../../data/departmentMockData';

export default function DepartmentActivity() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Recent Activity
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Live department dispatch events
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#71844A]">Today</span>
      </div>

      {/* Activity Timeline List */}
      <div className="my-3 space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-[#1A2E3B] pl-1">
        {DEPARTMENT_RECENT_ACTIVITY.map((act) => (
          <div key={act.id} className="relative flex items-start gap-2.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#315C3A] ring-2 ring-[#0D1B22] mt-1 shrink-0" />
            <div className="flex-1 bg-[#07121A]/60 p-2.5 rounded-lg border border-[#1A2E3B]/70">
              <div className="flex items-center justify-between text-[10px] text-[#9FB1BC] mb-0.5">
                <span className="font-mono text-[#D4A84F] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {act.time}
                </span>
                <span className="uppercase text-[9px] font-bold text-[#71844A]">
                  {act.type}
                </span>
              </div>
              <p className="text-xs text-[#F5F5F0] leading-snug">
                {act.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] text-[#9FB1BC] flex items-center justify-between">
        <span>Logged into department ledger</span>
        <span className="text-[#D4A84F] font-mono">Live</span>
      </div>
    </div>
  );
}
