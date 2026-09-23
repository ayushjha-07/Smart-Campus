import React from 'react';
import {
  X,
  FileText,
  User,
  MapPin,
  Clock,
  Building2,
  Paperclip,
  ShieldCheck,
  UserCheck,
  RefreshCw,
  Edit,
  ExternalLink
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../ComplaintBadges';
import AIAnalysisPanel from './AIAnalysisPanel';
import ComplaintTimeline from './ComplaintTimeline';
import AdminRemark from './AdminRemark';

export default function ComplaintDetailsDrawer({
  isOpen,
  onClose,
  complaint,
  onAssign,
  onChangeStatus,
  onChangePriority,
  onSaveRemark
}) {
  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl h-screen bg-white dark:bg-[#0C1518] border-l border-[#DDE8E3] dark:border-[#243338] shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#DDE8E3] dark:border-[#243338] flex items-center justify-between bg-[#F5F5F0]/60 dark:bg-[#07121A]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-extrabold text-[#008F63] dark:text-[#D4A84F]">
                  {complaint.id}
                </span>
                <PriorityBadge priority={complaint.priority} />
                <StatusBadge status={complaint.status} />
              </div>
              <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                Submitted on {complaint.submittedAt || complaint.submittedDate || '22 Sep 2026, 10:32 AM'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#13242E] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {/* Title & Student Meta */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              {complaint.title}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F5F5F0]/50 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Student Name
                </span>
                <span className="font-bold text-xs text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block">
                  {complaint.student}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Student ID
                </span>
                <span className="font-mono font-bold text-xs text-[#008F63] dark:text-[#00A875] mt-0.5 block">
                  {complaint.studentId || 'SC-STU-2026-014'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Category
                </span>
                <span className="font-bold text-xs text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block">
                  {complaint.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Location
                </span>
                <span className="font-bold text-xs text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#71844A]" />
                  {complaint.location || 'Hostel Block B'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Department
                </span>
                <span className="font-bold text-xs text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block">
                  {complaint.department}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] block">
                  Assigned Staff
                </span>
                <span className="font-bold text-xs text-[#008F63] dark:text-[#00A875] mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {complaint.assignedTo || 'Unassigned'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC]">
              Description
            </span>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-xs leading-relaxed text-[#071A2B] dark:text-[#F5F5F0]">
              {complaint.description || 'Water supply has been unavailable in Hostel Block B since morning. Several students are affected.'}
            </div>
          </div>

          {/* Attachments Preview if available */}
          {complaint.attachments && complaint.attachments.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC] flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" />
                Attachments ({complaint.attachments.length})
              </span>
              <div className="flex flex-wrap gap-2.5">
                {complaint.attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#F5F5F0]/80 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-xs"
                  >
                    <div className="w-8 h-8 rounded bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] flex items-center justify-center font-bold text-[10px]">
                      IMG
                    </div>
                    <div>
                      <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] block text-xs">
                        {att.name}
                      </span>
                      <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
                        {att.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis Panel */}
          <AIAnalysisPanel complaint={complaint} />

          {/* Admin Remark Component */}
          <AdminRemark
            onSaveRemark={(text) => {
              if (onSaveRemark) onSaveRemark(complaint.id, text);
            }}
          />

          {/* Complaint Timeline */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#DDE8E3] dark:border-[#243338]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#071A2B] dark:text-[#F5F5F0]">
                Complaint Audit Timeline
              </span>
              <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
                Real-time lifecycle tracking
              </span>
            </div>
            <ComplaintTimeline timeline={complaint.timeline} />
          </div>
        </div>

        {/* Footer Quick Controls */}
        <div className="p-4 border-t border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAssign(complaint)}
              className="px-3 py-1.5 rounded-lg bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Assign Staff</span>
            </button>
            <button
              onClick={() => onChangeStatus(complaint)}
              className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/25 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Status</span>
            </button>
            <button
              onClick={() => onChangePriority(complaint)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/25 flex items-center gap-1.5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Change Priority</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
