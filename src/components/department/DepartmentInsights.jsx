import React from 'react';
import { Sparkles, TrendingUp, AlertOctagon, Info } from 'lucide-react';
import { DEPARTMENT_INSIGHTS } from '../../data/departmentMockData';

export default function DepartmentInsights() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Department Insights
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Automated operational observations
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D4A84F]/15 text-[#D4A84F] border border-[#D4A84F]/30 uppercase tracking-wider">
          Demo Analytics
        </span>
      </div>

      {/* 3 Insight Cards */}
      <div className="my-3 space-y-2.5">
        {DEPARTMENT_INSIGHTS.map((ins) => {
          const isCrit = ins.severity === 'critical';
          const isWarn = ins.severity === 'warning';

          return (
            <div
              key={ins.id}
              className={`p-3 rounded-xl border transition-all text-xs ${
                isCrit
                  ? 'bg-red-950/15 border-red-500/30 text-red-200'
                  : isWarn
                  ? 'bg-[#07121A]/70 border-[#D4A84F]/30 text-[#F5F5F0]'
                  : 'bg-[#07121A]/70 border-[#315C3A]/40 text-[#A7C481]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-semibold mb-1">
                <span className="text-[#9FB1BC] uppercase tracking-wider">
                  {ins.category}
                </span>
                {isCrit ? (
                  <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                ) : isWarn ? (
                  <Info className="w-3.5 h-3.5 text-[#D4A84F]" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 text-[#A7C481]" />
                )}
              </div>
              <p className="text-xs font-medium text-[#F5F5F0] leading-snug">
                {ins.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[10px] text-[#9FB1BC]/70 italic">
        Generated for prototype demonstration. Not derived from real university databases.
      </div>
    </div>
  );
}
