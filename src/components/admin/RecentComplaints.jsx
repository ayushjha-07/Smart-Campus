import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Pencil,
  MoreVertical,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function RecentComplaints({
  complaints,
  onViewDetails,
  onEditComplaint
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#00A875] border-emerald-200 dark:border-emerald-900/50';
      case 'in progress':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50';
      case 'under review':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/50';
      case 'pending':
      default:
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#D4A84F] border-amber-200 dark:border-amber-900/50';
    }
  };

  // Priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50';
      case 'high':
        return 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900/50';
      case 'medium':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#D4A84F] border-amber-200 dark:border-amber-900/50';
      case 'low':
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl border transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs overflow-hidden">
      {/* Table Header */}
      <div className="p-5 sm:px-6 flex items-center justify-between border-b border-[#DDE8E3] dark:border-[#1A2E3B]">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Recent Complaints
          </h3>
          <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            Real-time feed of campus tickets across student and staff sectors
          </p>
        </div>

        <Link
          to="/admin/complaints"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008F63] hover:text-[#00704E] dark:text-[#D4A84F] dark:hover:text-[#E5BF6E] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#DDE8E3] dark:border-[#1A2E3B] bg-[#F7F9F8]/60 dark:bg-[#07121A]/60 text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC]">
              <th className="py-3 px-4">Complaint ID</th>
              <th className="py-3 px-4">Complaint</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE8E3] dark:divide-[#1A2E3B] text-xs">
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-xs text-[#60717A] dark:text-[#9FB1BC]">
                  No complaints found matching selected filters.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#F7F9F8] dark:hover:bg-[#07121A]/60"
                >
                  {/* Complaint ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-[#008F63] dark:text-[#D4A84F]">
                    {item.id}
                  </td>

                  {/* Title */}
                  <td className="py-3.5 px-4 font-semibold text-[#071A2B] dark:text-[#F5F5F0] max-w-[220px] truncate">
                    {item.title}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-[#60717A] dark:text-[#9FB1BC]">
                    {item.category}
                  </td>

                  {/* Student */}
                  <td className="py-3.5 px-4 font-medium text-[#071A2B] dark:text-[#F5F5F0]">
                    {item.student}
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 font-medium text-[#60717A] dark:text-[#9FB1BC]">
                    {item.department}
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-[#60717A] dark:text-[#9FB1BC]">
                    {item.date}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onViewDetails?.(item)}
                        title="View Details"
                        className="p-1.5 rounded-lg border text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditComplaint?.(item)}
                        title="Edit Complaint"
                        className="p-1.5 rounded-lg border text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                        title="More Options"
                        className="p-1.5 rounded-lg border text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards View */}
      <div className="lg:hidden divide-y divide-[#DDE8E3] dark:divide-[#1A2E3B]">
        {complaints.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#60717A] dark:text-[#9FB1BC]">
            No complaints found matching selected filters.
          </div>
        ) : (
          complaints.map((item) => (
            <div key={item.id} className="p-4 space-y-2.5 transition-colors hover:bg-[#F7F9F8] dark:hover:bg-[#07121A]/60">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#008F63] dark:text-[#D4A84F]">
                  {item.id}
                </span>
                <span className="text-[11px] text-[#60717A] dark:text-[#9FB1BC]">
                  {item.date}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {item.title}
              </h4>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#60717A] dark:text-[#9FB1BC]">
                <span>{item.category}</span>
                <span>•</span>
                <span className="font-medium text-[#071A2B] dark:text-[#F5F5F0]">{item.student}</span>
                <span>•</span>
                <span>{item.department}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onViewDetails?.(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#008F63]/10 dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#D4A84F] border border-[#008F63]/30 dark:border-[#315C3A]/50"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
