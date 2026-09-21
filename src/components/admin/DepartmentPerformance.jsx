import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { DEPARTMENT_PERFORMANCE_DATA } from '../../data/adminMockData';

export default function DepartmentPerformance({ performanceData = null }) {
  const items = performanceData && performanceData.length > 0
    ? performanceData.map(d => ({
        department: d.name || d.department,
        total: d.assigned ?? d.total ?? 0,
        pending: Math.max(0, (d.assigned ?? 0) - (d.resolved ?? 0)),
        resolved: d.resolved ?? 0,
        rate: Math.round(d.resolution_rate ?? d.rate ?? 0)
      }))
    : DEPARTMENT_PERFORMANCE_DATA;

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-4 border-b border-[#1A2E3B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Department Performance
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Efficiency benchmarks & resolution completion rate
            </p>
          </div>
        </div>

        <Link
          to="/admin/departments"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4A84F] hover:underline"
        >
          <span>View Department Analytics</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Performance List / Table */}
      <div className="divide-y divide-[#1A2E3B] my-2 text-xs">
        {items.map((dept) => {
          // Color indicator based on rate
          const isHigh = dept.rate >= 75;
          const isMid = dept.rate >= 65 && dept.rate < 75;

          const barColor = isHigh ? '#315C3A' : isMid ? '#D4A84F' : '#F97316';
          const textColor = isHigh ? '#A7C481' : isMid ? '#E5BF6E' : '#FDBA74';

          return (
            <div
              key={dept.department}
              className="py-3 px-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#13242E]/40 rounded-lg transition-colors"
            >
              {/* Left Dept Name & Mini Stats */}
              <div className="w-full sm:w-1/3">
                <span className="font-semibold text-[#F5F5F0] text-xs">
                  {dept.department}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-[#9FB1BC] mt-0.5">
                  <span>Total: <strong className="text-[#F5F5F0]">{dept.total}</strong></span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Clock className="w-3 h-3" /> {dept.pending}
                  </span>
                  <span className="flex items-center gap-1 text-[#A7C481]">
                    <CheckCircle2 className="w-3 h-3" /> {dept.resolved}
                  </span>
                </div>
              </div>

              {/* Progress Bar & Rate */}
              <div className="w-full sm:w-2/3 flex items-center gap-3">
                <div className="flex-1 bg-[#07121A] h-2.5 rounded-full overflow-hidden border border-[#1A2E3B]/80 relative">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dept.rate}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
                <div className="w-14 text-right">
                  <span className="font-mono font-bold text-xs" style={{ color: textColor }}>
                    {dept.rate}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Meta Note */}
      <div className="pt-3 border-t border-[#1A2E3B] flex items-center justify-between text-[11px] text-[#9FB1BC]">
        <span>Target university SLA: &gt;70% within 24 hours</span>
        <span className="text-[#A7C481] font-medium">6 of 8 Meeting Benchmark</span>
      </div>
    </div>
  );
}
