import React from 'react';
import { History, Activity, Calendar, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { ANALYTICS_ACTIVITY_DATA } from '../../../data/analyticsMockData';

export default function AnalyticsActivity() {
  const iconMap = {
    Configuration: History,
    Report: FileCheck,
    Review: ShieldCheck,
    'AI Insight': Activity,
    'Data Sync': CheckCircle2
  };

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base font-bold text-[#F5F5F0]">
              Recent Analytics Activity
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Audit trail of administrative queries, reports, and AI pattern updates
          </p>
        </div>

        <span className="text-[11px] text-[#71844A] bg-[#07121A] px-2.5 py-1 rounded-lg border border-[#1A2E3B]">
          Last 48 Hours
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1A2E3B]">
        {ANALYTICS_ACTIVITY_DATA.map((item) => {
          const Icon = iconMap[item.tag] || Activity;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#07121A] border border-[#315C3A] group-hover:border-[#D4A84F] flex items-center justify-center transition-colors shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]" />
              </div>

              {/* Event Content */}
              <div className="bg-[#07121A] border border-[#1A2E3B] rounded-lg p-3 hover:border-[#315C3A] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-[#F5F5F0] group-hover:text-[#D4A84F] transition-colors flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#71844A]" />
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#9FB1BC] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#71844A]" />
                    {item.time}
                  </span>
                </div>

                <p className="text-[11px] text-[#9FB1BC]">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-[#1A2E3B]/60 text-[10px]">
                  <span className="text-[#71844A]">Logged by: <strong className="text-[#F5F5F0]">{item.actor}</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#1A2E3B]" />
                  <span className="px-1.5 py-0.2 rounded bg-[#13242E] text-[#9FB1BC]">{item.tag}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
