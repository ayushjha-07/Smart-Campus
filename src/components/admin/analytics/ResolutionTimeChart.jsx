import React from 'react';
import { Timer, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ResolutionTimeChart({ breakdown }) {
  const overallDays = breakdown?.overall || '2.8 Days';
  const departments = breakdown?.departments || [];

  // Maximum value for scaling percentage bars (highest is 3.4 days, use 4.0 as scale max)
  const maxDays = 4.0;

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Average Resolution Time
          </h2>
          <span className="text-[11px] font-semibold text-[#008F63] dark:text-[#00A875]">
            Turnaround Benchmark
          </span>
        </div>
        <p className="text-xs text-[#60717A] dark:text-[#A8B3B0]">
          Department-level average duration from ticket creation to verification
        </p>

        {/* Overall Benchmark Banner */}
        <div className="my-4 p-3.5 rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] border border-[#DDE8E3] dark:border-[#243338] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#60717A] dark:text-[#A8B3B0]">
                Overall Campus Average
              </div>
              <div className="text-2xl font-black text-[#071A2B] dark:text-[#F5F5F0]">
                {overallDays}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              -14.5% vs Prev Period
            </span>
            <div className="text-[10px] text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
              Target: ≤ 3.0 Days
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Bar Breakdown */}
      <div className="space-y-2.5 my-2">
        {departments.map((dept) => {
          const percentage = Math.min(100, Math.round((dept.days / maxDays) * 100));

          return (
            <div key={dept.department} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
                  {dept.department}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#60717A] dark:text-[#A8B3B0]">
                    {dept.benchmark}
                  </span>
                  <span className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0] w-14 text-right">
                    {dept.days} days
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#EAF0ED] dark:bg-[#1A2E3B] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: dept.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Educational Note */}
      <div className="mt-4 pt-3 border-t border-[#DDE8E3] dark:border-[#243338] text-[11px] text-[#60717A] dark:text-[#A8B3B0] italic flex items-center gap-2">
        <CheckCircle className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875] shrink-0" />
        <span>Lower resolution time indicates faster complaint closure.</span>
      </div>
    </div>
  );
}
