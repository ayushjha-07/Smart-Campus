import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { CRITICAL_COMPLAINTS_DATA } from '../../../data/analyticsData';

export default function CriticalComplaints() {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'Assigned':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Critical Complaints
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
              3 High Priority
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-1">
            Urgent safety and infrastructure tickets requiring fast-track administrative oversight
          </p>
        </div>

        {/* View All Button */}
        <button
          type="button"
          onClick={() => navigate('/admin/complaints?priority=Critical')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#F7F9F8] dark:bg-white/5 hover:bg-[#EAF0ED] dark:hover:bg-white/10 text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] transition-colors self-start sm:self-auto"
        >
          <span>View All Critical Complaints</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#DDE8E3] dark:border-[#243338]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F9F8] dark:bg-[#050A0C] border-b border-[#DDE8E3] dark:border-[#243338] text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#A8B3B0]">
              <th className="py-3 px-4">Complaint ID</th>
              <th className="py-3 px-4">Issue</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE8E3]/60 dark:divide-[#243338]/60 text-xs">
            {CRITICAL_COMPLAINTS_DATA.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate('/admin/complaints')}
                className="hover:bg-[#F7F9F8]/70 dark:hover:bg-white/2 cursor-pointer transition-colors"
              >
                {/* ID */}
                <td className="py-3 px-4 font-mono font-bold text-[#008F63] dark:text-[#00A875]">
                  {item.id}
                </td>

                {/* Issue */}
                <td className="py-3 px-4 font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
                  {item.issue}
                </td>

                {/* Department */}
                <td className="py-3 px-4 text-[#60717A] dark:text-[#A8B3B0]">
                  {item.department}
                </td>

                {/* Priority */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/30">
                    <AlertTriangle className="w-3 h-3" />
                    {item.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Age */}
                <td className="py-3 px-4 text-[#60717A] dark:text-[#A8B3B0] font-medium">
                  {item.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
