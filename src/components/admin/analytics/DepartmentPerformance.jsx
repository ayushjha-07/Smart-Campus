import React, { useState } from 'react';
import { Building2, ArrowUpDown, ChevronRight, Clock } from 'lucide-react';

export default function DepartmentPerformance({ data, onViewDepartmentDetails }) {
  const [sortField, setSortField] = useState('total');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'avgResolution') {
      aVal = a.avgResolutionHours;
      bVal = b.avgResolutionHours;
    }
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
              Department Performance
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Complaint volume and resolution efficiency across operational divisions
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#07121A] border border-[#1A2E3B] text-xs text-[#9FB1BC]">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          8 Active Operational Units
        </span>
      </div>

      {/* Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1A2E3B] text-[11px] font-semibold text-[#71844A] uppercase tracking-wider">
              <th className="py-3 px-3">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-1 hover:text-[#F5F5F0] transition-colors"
                >
                  Department
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center">
                <button
                  onClick={() => handleSort('total')}
                  className="flex items-center justify-center gap-1 mx-auto hover:text-[#F5F5F0] transition-colors"
                >
                  Total
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center">Pending</th>
              <th className="py-3 px-3 text-center">In Progress</th>
              <th className="py-3 px-3 text-center">Resolved</th>
              <th className="py-3 px-3">
                <button
                  onClick={() => handleSort('resolutionRate')}
                  className="flex items-center gap-1 hover:text-[#F5F5F0] transition-colors"
                >
                  Resolution Rate
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('avgResolution')}
                  className="flex items-center justify-end gap-1 ml-auto hover:text-[#F5F5F0] transition-colors"
                >
                  Avg. Resolution
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2E3B]/60 text-xs">
            {sortedData.map((row) => (
              <tr
                key={row.department}
                className="hover:bg-[#13242E]/70 transition-colors group"
              >
                <td className="py-3.5 px-3 font-semibold text-[#F5F5F0] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#315C3A] group-hover:bg-[#D4A84F] transition-colors" />
                  {row.department}
                </td>
                <td className="py-3.5 px-3 text-center font-bold text-[#F5F5F0]">
                  {row.total}
                </td>
                <td className="py-3.5 px-3 text-center text-amber-400 font-medium">
                  {row.pending}
                </td>
                <td className="py-3.5 px-3 text-center text-[#3B82F6] font-medium">
                  {row.inProgress}
                </td>
                <td className="py-3.5 px-3 text-center text-[#10B981] font-medium">
                  {row.resolved}
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-[#F5F5F0] w-9 text-right text-xs">
                      {row.resolutionRate}%
                    </span>
                    <div className="flex-1 max-w-[120px] h-2 rounded-full bg-[#07121A] border border-[#1A2E3B] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${row.resolutionRate}%`,
                          backgroundColor:
                            row.resolutionRate >= 65
                              ? '#10B981'
                              : row.resolutionRate >= 50
                              ? '#D4A84F'
                              : '#EF4444'
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right text-[#9FB1BC] font-mono">
                  {row.avgResolutionHours} hrs
                </td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => onViewDepartmentDetails && onViewDepartmentDetails(row)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-[#D4A84F] hover:text-[#F5F5F0] bg-[#13242E] hover:bg-[#315C3A] border border-[#1A2E3B] hover:border-[#D4A84F]/50 transition-all shadow-sm"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (< 768px) */}
      <div className="md:hidden space-y-3">
        {sortedData.map((row) => (
          <div
            key={row.department}
            className="p-3.5 bg-[#07121A] border border-[#1A2E3B] rounded-xl space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#F5F5F0] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A84F]" />
                {row.department}
              </span>
              <span className="text-xs font-bold text-[#F5F5F0] bg-[#13242E] px-2 py-0.5 rounded border border-[#1A2E3B]">
                {row.total} Total
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 bg-[#0D1B22] rounded-lg border border-[#1A2E3B]/60">
              <div>
                <span className="text-[10px] text-[#9FB1BC] block">Pending</span>
                <span className="font-bold text-amber-400">{row.pending}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#9FB1BC] block">In Progress</span>
                <span className="font-bold text-[#3B82F6]">{row.inProgress}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#9FB1BC] block">Resolved</span>
                <span className="font-bold text-[#10B981]">{row.resolved}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#9FB1BC]">Resolution Rate</span>
                <span className="font-bold text-[#F5F5F0]">{row.resolutionRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#13242E] border border-[#1A2E3B] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.resolutionRate}%`,
                    backgroundColor: row.resolutionRate >= 60 ? '#10B981' : '#D4A84F'
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1A2E3B]/60 text-xs">
              <span className="text-[#9FB1BC] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#71844A]" />
                Avg: <strong className="text-[#F5F5F0]">{row.avgResolutionHours} hrs</strong>
              </span>

              <button
                onClick={() => onViewDepartmentDetails && onViewDepartmentDetails(row)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-[#D4A84F] hover:text-[#F5F5F0] bg-[#13242E]"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
