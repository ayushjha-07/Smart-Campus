import React, { useState } from 'react';
import { Search, Building2, CheckCircle2, Users, AlertCircle, Plus } from 'lucide-react';
import DepartmentCard from './DepartmentCard';
import DepartmentPerformance from './DepartmentPerformance';
import { DEPARTMENT_SUMMARY_STATS } from '../../../data/userManagementMockData';

export default function DepartmentTab({
  departments,
  onOpenAddDepartment,
  onViewDetails,
  onEditDepartment,
  onViewComplaints,
  onViewStaff,
  onDeactivateDepartment
}) {
  const [search, setSearch] = useState('');

  const filteredDepartments = departments.filter((d) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      (d.code && d.code.toLowerCase().includes(q)) ||
      (d.head && d.head.toLowerCase().includes(q)) ||
      (d.categories && d.categories.some((c) => c.toLowerCase().includes(q)))
    );
  });

  const iconMap = {
    total_depts: Building2,
    active_depts: CheckCircle2,
    staff_members: Users,
    open_complaints: AlertCircle
  };

  return (
    <div className="space-y-6">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {DEPARTMENT_SUMMARY_STATS.map((stat) => {
          const Icon = iconMap[stat.id] || Building2;
          return (
            <div
              key={stat.id}
              className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-4 flex flex-col justify-between hover:border-[#315C3A] transition-all hover:shadow-[0_4px_16px_-4px_rgba(49,92,58,0.2)] group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-[#9FB1BC] truncate group-hover:text-[#F5F5F0]">
                  {stat.title}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    borderColor: `${stat.color}40`,
                    color: stat.color
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="my-1">
                <span className="text-2xl font-bold text-[#F5F5F0] tracking-tight">
                  {stat.value}
                </span>
              </div>

              <div className="pt-2 border-t border-[#1A2E3B]/60 text-[10px] text-[#9FB1BC]">
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter / Search Bar & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0D1B22]/90 border border-[#1A2E3B] rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search departments by name, head, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#07121A] border border-[#1A2E3B] rounded-lg text-xs text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F]"
          />
        </div>

        <button
          type="button"
          onClick={onOpenAddDepartment}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#25462c] border border-[#D4A84F]/50 text-xs font-semibold text-[#F5F5F0] hover:border-[#D4A84F] shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>New Department</span>
        </button>
      </div>

      {/* Department Cards Grid (3 Cols on Desktop, 2 on Tablet, 1 on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            dept={dept}
            onViewDetails={onViewDetails}
            onEditDepartment={onEditDepartment}
            onViewComplaints={onViewComplaints}
            onViewStaff={onViewStaff}
            onDeactivateDepartment={onDeactivateDepartment}
          />
        ))}
      </div>

      {/* Department Performance Table at the bottom */}
      <DepartmentPerformance />
    </div>
  );
}
