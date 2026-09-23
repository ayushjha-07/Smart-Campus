import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  MapPin,
  Clock,
  ArrowRight,
  Flame,
  AlertCircle,
  CheckCircle2,
  FileSearch,
  RotateCcw
} from 'lucide-react';

export default function AssignedComplaints({
  complaints = [],
  onViewComplaint,
  onResetFilters
}) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4A84F]/10 text-[#B88728] dark:text-[#D4A84F] border border-[#D4A84F]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]" />
            Medium
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#71844A]/10 text-[#71844A] dark:text-[#A7C481] border border-[#71844A]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#71844A]" />
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Under Review
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#008F63]/10 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#00A875]" />
            In Progress
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#315C3A]/15 text-[#315C3A] dark:text-[#71844A] border border-[#315C3A]/30">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getDueBadge = (due) => {
    if (due === 'Overdue') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-red-600 dark:text-red-400">
          <Flame className="w-3 h-3 text-red-500" />
          Overdue
        </span>
      );
    }
    if (due === 'Today') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
          <Clock className="w-3 h-3 text-amber-500" />
          Today
        </span>
      );
    }
    if (due === 'Tomorrow') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
          Tomorrow
        </span>
      );
    }
    if (due === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          Completed
        </span>
      );
    }
    return (
      <span className="text-[11px] text-[#60717A] dark:text-[#9FB1BC]">
        {due}
      </span>
    );
  };

  if (complaints.length === 0) {
    return (
      <div className="rounded-2xl p-10 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-center shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] flex items-center justify-center mx-auto mb-3">
          <FileSearch className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0]">
          No assigned complaints found
        </h3>
        <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-1 max-w-sm mx-auto">
          No tickets match your active filter settings. Clear filters to see all department assignments.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs overflow-hidden">
      {/* Table Header Strip */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/40 dark:bg-[#07121A]/60">
        <div>
          <h3 className="text-base font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Assigned Complaints
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            Real-time queue of complaints assigned to your department roster
          </p>
        </div>

        <Link
          to="/department/complaints"
          className="text-xs font-bold text-[#008F63] hover:text-[#007A54] dark:text-[#D4A84F] dark:hover:text-[#F5F5F0] inline-flex items-center gap-1.5 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 text-[#60717A] dark:text-[#9FB1BC] uppercase font-bold text-[10px] tracking-wider">
              <th className="py-3 px-3 whitespace-nowrap">Complaint ID</th>
              <th className="py-3 px-3">Complaint</th>
              <th className="py-3 px-2 whitespace-nowrap">Category</th>
              <th className="py-3 px-2 whitespace-nowrap">Priority</th>
              <th className="py-3 px-2 whitespace-nowrap">Status</th>
              <th className="py-3 px-2 whitespace-nowrap">Submitted</th>
              <th className="py-3 px-2 whitespace-nowrap">Due</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE8E3]/60 dark:divide-[#243338]/60">
            {complaints.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#F5F5F0]/60 dark:hover:bg-[#13242E]/50 transition-colors group cursor-pointer"
                onClick={() => onViewComplaint(item)}
              >
                {/* Complaint ID */}
                <td className="py-3.5 px-3 font-mono font-bold whitespace-nowrap text-[#008F63] dark:text-[#D4A84F]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewComplaint(item);
                    }}
                    className="hover:underline font-bold focus:outline-none"
                  >
                    {item.id}
                  </button>
                </td>

                {/* Complaint Title & Location */}
                <td className="py-3.5 px-3 max-w-[240px]">
                  <div className="font-bold text-[#071A2B] dark:text-[#F5F5F0] truncate group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors" title={item.title}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] truncate mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#71844A] shrink-0" />
                    <span>{item.location || 'Hostel Campus'}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#F5F5F0] dark:bg-[#13242E] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338]">
                    {item.category}
                  </span>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  {getPriorityBadge(item.priority)}
                </td>

                {/* Status */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>

                {/* Submitted */}
                <td className="py-3.5 px-2 whitespace-nowrap text-[#60717A] dark:text-[#9FB1BC] font-medium">
                  {item.submitted}
                </td>

                {/* Due */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  {getDueBadge(item.due)}
                </td>

                {/* Action */}
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewComplaint(item);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#008F63]/10 dark:bg-[#13242E] dark:hover:bg-[#00A875]/20 text-[#60717A] hover:text-[#008F63] dark:text-[#9FB1BC] dark:hover:text-[#00A875] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden p-3 space-y-3">
        {complaints.map((item) => (
          <div
            key={item.id}
            onClick={() => onViewComplaint(item)}
            className="rounded-xl p-3.5 bg-[#F5F5F0]/40 dark:bg-[#07121A]/60 border border-[#DDE8E3] dark:border-[#243338] space-y-2 cursor-pointer hover:border-[#008F63]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-[#008F63] dark:text-[#D4A84F]">
                {item.id}
              </span>
              <div className="flex items-center gap-1.5">
                {getPriorityBadge(item.priority)}
                {getStatusBadge(item.status)}
              </div>
            </div>

            <div className="font-bold text-xs text-[#071A2B] dark:text-[#F5F5F0]">
              {item.title}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#60717A] dark:text-[#9FB1BC] pt-1 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#71844A]" />
                <span className="truncate max-w-[140px]">{item.location}</span>
              </div>
              <div>{getDueBadge(item.due)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
