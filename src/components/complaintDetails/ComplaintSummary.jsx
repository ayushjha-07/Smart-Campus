import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  UserCheck, 
  Tag
} from 'lucide-react';
import ComplaintPriorityBadge from '../complaints/ComplaintPriorityBadge';
import ComplaintStatusBadge from '../complaints/ComplaintStatusBadge';

export default function ComplaintSummary({ complaint }) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-7 shadow-xs dark:shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#168A5B]/5 dark:bg-[#D4A84F]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top title and status header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#DDE7E2] dark:border-white/5 pb-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono font-bold text-[#168A5B] dark:text-[#D4A84F] bg-slate-50 dark:bg-[#07121A] px-2.5 py-1 rounded-lg border border-[#DDE7E2] dark:border-[#D4A84F]/30">
              {complaint.id}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-[11px] text-[#14213D] dark:text-[#F5F5F0]">
              <Tag className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
              {complaint.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-snug">
            {complaint.title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3B0]">
            <MapPin className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#71844A] shrink-0" />
            <span>{complaint.location}</span>
          </div>
        </div>

        {/* Priority & Status Badges */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0">
          <ComplaintStatusBadge status={complaint.status} />
          <ComplaintPriorityBadge priority={complaint.priority} />
        </div>
      </div>

      {/* Structured Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 text-xs">
        {/* Submitted */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
            <Calendar className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
            <span>Submitted</span>
          </div>
          <div className="font-medium text-[#14213D] dark:text-[#F5F5F0] font-mono text-[11px]">
            {complaint.submittedDate}
          </div>
        </div>

        {/* Last Updated */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
            <Clock className="w-3 h-3 text-[#D4A84F]" />
            <span>Last Updated</span>
          </div>
          <div className="font-medium text-[#14213D] dark:text-[#F5F5F0] font-mono text-[11px]">
            {complaint.lastUpdated}
          </div>
        </div>

        {/* Assigned Department */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
            <Building2 className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
            <span>Assigned Department</span>
          </div>
          <div className="font-medium text-[#14213D] dark:text-[#F5F5F0]">
            {complaint.department}
          </div>
        </div>

        {/* Assigned Staff */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
            <UserCheck className="w-3 h-3 text-[#D4A84F]" />
            <span>Assigned Staff</span>
          </div>
          <div className="font-medium text-[#14213D] dark:text-[#F5F5F0] flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#168A5B] dark:bg-[#315C3A] border border-[#D4A84F]/40 text-white dark:text-[#F5F5F0] text-[9px] font-bold flex items-center justify-center">
              {complaint.staffAvatar || 'RK'}
            </div>
            <span>{complaint.assignedStaff}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
