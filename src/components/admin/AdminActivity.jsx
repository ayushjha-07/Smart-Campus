import React from 'react';
import {
  History,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  FilePlus,
  Clock
} from 'lucide-react';
import { RECENT_ACTIVITY_DATA } from '../../data/adminMockData';

const iconMap = {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  FilePlus,
  Clock,
};

export default function AdminActivity() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-4 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Recent Admin Activity
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Live audit trail of administrative events
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#71844A]">Today</span>
      </div>

      {/* Timeline List */}
      <div className="my-3 space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-px before:bg-[#1A2E3B]">
        {RECENT_ACTIVITY_DATA.map((item) => {
          const Icon = iconMap[item.icon] || Clock;

          return (
            <div key={item.id} className="relative flex items-start gap-3 text-xs pl-1">
              {/* Timeline marker with icon */}
              <div className="w-7 h-7 rounded-full bg-[#07121A] border border-[#315C3A]/70 flex items-center justify-center text-[#D4A84F] z-10 shrink-0 shadow-sm">
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Action content */}
              <div className="flex-1 bg-[#07121A]/60 p-2.5 rounded-lg border border-[#1A2E3B]/70 hover:border-[#315C3A]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#9FB1BC] font-semibold">
                    {item.time}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#71844A] font-bold">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-[#F5F5F0] mt-1 leading-snug">
                  {item.action}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 text-[11px] text-[#9FB1BC] flex items-center justify-between">
        <span>Logged via Administrative Audit Subsystem</span>
        <span className="text-[#D4A84F] font-mono text-[10px]">Synced</span>
      </div>
    </div>
  );
}
