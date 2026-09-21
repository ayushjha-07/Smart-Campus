import React from 'react';
import { Award, Clock, Activity, CheckCircle2, TrendingUp } from 'lucide-react';
import { DEPARTMENT_PERFORMANCE_METRICS } from '../../data/departmentMockData';

export default function DepartmentPerformance() {
  const { resolutionRate, averageResolution, activeComplaints, resolvedThisMonth } =
    DEPARTMENT_PERFORMANCE_METRICS;

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Department Performance
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Maintenance efficiency benchmarks
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#315C3A]/20 text-[#A7C481] border border-[#315C3A]/40 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-[#D4A84F]" /> +4.2% MoM
        </span>
      </div>

      {/* Progress Bar & Rate */}
      <div className="my-4 p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9FB1BC]">Monthly Resolution Rate</span>
          <span className="font-mono font-bold text-sm text-[#D4A84F]">
            {resolutionRate}%
          </span>
        </div>
        <div className="w-full bg-[#13242E] h-2.5 rounded-full overflow-hidden border border-[#1A2E3B]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#315C3A] via-[#71844A] to-[#D4A84F] transition-all duration-500"
            style={{ width: `${resolutionRate}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#9FB1BC]/70 pt-0.5">
          <span>Target SLA: 60%</span>
          <span>Target Gap: -8%</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-[#07121A]/70 border border-[#1A2E3B] text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#9FB1BC] mb-1">
            <Clock className="w-3 h-3 text-[#D4A84F]" />
            <span>Avg. Time</span>
          </div>
          <span className="font-mono font-bold text-[#F5F5F0]">{averageResolution}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#07121A]/70 border border-[#1A2E3B] text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#9FB1BC] mb-1">
            <Activity className="w-3 h-3 text-blue-400" />
            <span>Active</span>
          </div>
          <span className="font-mono font-bold text-blue-300">{activeComplaints}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#07121A]/70 border border-[#1A2E3B] text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#9FB1BC] mb-1">
            <CheckCircle2 className="w-3 h-3 text-[#A7C481]" />
            <span>Resolved</span>
          </div>
          <span className="font-mono font-bold text-[#A7C481]">{resolvedThisMonth}</span>
        </div>
      </div>
    </div>
  );
}
