import React from 'react';
import { BarChart3, ExternalLink, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENT_PERFORMANCE_TABLE } from '../../../data/userManagementMockData';

export default function DepartmentPerformance() {
  const navigate = useNavigate();
  const [sortField, setSortField] = React.useState('staff');
  const [sortDir, setSortDir] = React.useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedData = [...DEPARTMENT_PERFORMANCE_TABLE].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base font-bold text-[#F5F5F0]">
              Department Performance
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Workload distribution, open backlog, and resolution efficiency
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/analytics')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all self-start sm:self-auto"
        >
          <span>View Analytics</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4A84F]" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#1A2E3B] bg-[#050A0C]/50 text-[11px] font-semibold text-[#71844A] uppercase tracking-wider">
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-1 hover:text-[#F5F5F0]"
                >
                  Department
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSort('staff')}
                  className="flex items-center justify-center gap-1 mx-auto hover:text-[#F5F5F0]"
                >
                  Staff
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSort('openComplaints')}
                  className="flex items-center justify-center gap-1 mx-auto hover:text-[#F5F5F0]"
                >
                  Open Backlog
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSort('resolved')}
                  className="flex items-center justify-center gap-1 mx-auto hover:text-[#F5F5F0]"
                >
                  Resolved
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('resolutionRate')}
                  className="flex items-center gap-1 hover:text-[#F5F5F0]"
                >
                  Resolution Rate
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-right">Avg. Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2E3B]/60">
            {sortedData.map((row) => (
              <tr key={row.department} className="hover:bg-[#13242E]/70 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#F5F5F0] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#315C3A]" />
                  {row.department}
                </td>
                <td className="py-3 px-3 text-center font-bold text-[#F5F5F0]">
                  {row.staff}
                </td>
                <td className="py-3 px-3 text-center text-amber-400 font-medium">
                  {row.openComplaints}
                </td>
                <td className="py-3 px-3 text-center text-[#10B981] font-medium">
                  {row.resolved}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#F5F5F0] w-9 text-right text-xs">
                      {row.resolutionRate}%
                    </span>
                    <div className="w-28 h-2 rounded-full bg-[#07121A] border border-[#1A2E3B] overflow-hidden">
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
                <td className="py-3 px-3 text-right text-[#9FB1BC] font-mono">
                  {row.avgResolution}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
