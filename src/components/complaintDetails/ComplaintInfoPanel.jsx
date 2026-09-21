import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Activity, 
  UserCheck, 
  Shield, 
  Mail, 
  Phone 
} from 'lucide-react';
import ComplaintPriorityBadge from '../complaints/ComplaintPriorityBadge';
import ComplaintStatusBadge from '../complaints/ComplaintStatusBadge';

export default function ComplaintInfoPanel({ complaint, onOpenContactModal }) {
  const {
    priority = 'HIGH',
    department = 'Maintenance Department',
    location = 'Hostel Block B',
    submittedDate = '20 Sep 2026',
    status = 'In Progress',
    resolutionProgress = 75,
    assignedStaff = 'Rajesh Kumar',
    staffRole = 'Facilities Lead',
    staffAvatar = 'RK',
    departmentPhone = '+91 (080) 2854-9102',
  } = complaint;

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-2xl backdrop-blur-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
          <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Complaint Information
          </h4>
        </div>
        <span className="font-mono text-[10px] text-[#64748B] dark:text-[#A8B3B0]/60">
          ID: {complaint.id}
        </span>
      </div>

      {/* Quick Specs List */}
      <div className="space-y-3.5 text-xs">
        {/* Current Status */}
        <div className="flex items-center justify-between py-1 border-b border-[#DDE7E2] dark:border-white/5">
          <span className="text-[#64748B] dark:text-[#A8B3B0]">Current Status</span>
          <ComplaintStatusBadge status={status} />
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between py-1 border-b border-[#DDE7E2] dark:border-white/5">
          <span className="text-[#64748B] dark:text-[#A8B3B0]">Priority Level</span>
          <ComplaintPriorityBadge priority={priority} />
        </div>

        {/* Department */}
        <div className="flex items-center justify-between py-1 border-b border-[#DDE7E2] dark:border-white/5">
          <span className="text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#71844A]" />
            <span>Department</span>
          </span>
          <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0] text-right">
            {department}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-between py-1 border-b border-[#DDE7E2] dark:border-white/5">
          <span className="text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#71844A]" />
            <span>Location</span>
          </span>
          <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0] text-right truncate max-w-[150px]">
            {location}
          </span>
        </div>

        {/* Submitted */}
        <div className="flex items-center justify-between py-1 border-b border-[#DDE7E2] dark:border-white/5">
          <span className="text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#71844A]" />
            <span>Submitted</span>
          </span>
          <span className="font-mono text-[#14213D] dark:text-[#F5F5F0] text-right text-[11px]">
            {submittedDate}
          </span>
        </div>

        {/* Resolution Progress */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#A8B3B0]">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#D4A84F]" />
              <span>Resolution Progress</span>
            </span>
            <span className="font-mono font-bold text-[#168A5B] dark:text-[#D4A84F]">
              {resolutionProgress}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-[#07121A] rounded-full overflow-hidden border border-[#DDE7E2] dark:border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#168A5B] via-[#71844A] to-[#D4A84F] rounded-full"
              style={{ width: `${resolutionProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Assigned Staff Mini Card */}
      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/60">
          <UserCheck className="w-3 h-3 text-[#D4A84F]" />
          <span>Assigned Handler</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#168A5B] dark:bg-[#315C3A] border border-[#D4A84F]/40 text-white dark:text-[#F5F5F0] font-bold text-xs flex items-center justify-center shrink-0">
            {staffAvatar}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-xs text-[#14213D] dark:text-[#F5F5F0] truncate">
              {assignedStaff}
            </div>
            <div className="text-[10px] text-[#168A5B] dark:text-[#71844A] truncate">
              {staffRole}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenContactModal}
          className="w-full mt-2 py-2 rounded-xl bg-white dark:bg-[#0D1B22] hover:bg-[#F5F8F6] dark:hover:bg-[#13242E] border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] dark:hover:border-[#315C3A] text-[#14213D] dark:text-[#F5F5F0] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <Mail className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#D4A84F]" />
          <span>Message Department</span>
        </button>
      </div>

      {/* Emergency Helpline Note */}
      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-[#315C3A]/10 border border-emerald-200 dark:border-[#315C3A]/30 text-[11px] text-[#64748B] dark:text-[#A8B3B0] space-y-1">
        <span className="font-bold text-[#168A5B] dark:text-[#D4A84F] block">Need urgent campus help?</span>
        <p className="flex items-center gap-1 text-[#14213D] dark:text-[#F5F5F0]">
          <Phone className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
          <span className="font-mono">{departmentPhone}</span>
        </p>
      </div>
    </div>
  );
}
