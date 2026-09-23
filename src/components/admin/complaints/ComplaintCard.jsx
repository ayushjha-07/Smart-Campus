import React, { useState } from 'react';
import {
  Eye,
  UserCheck,
  MoreVertical,
  Calendar,
  Building2,
  MapPin,
  RefreshCw,
  Edit,
  Trash2,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from './ComplaintBadges';

export default function ComplaintCard({
  complaint,
  isSelected,
  onToggleSelect,
  onViewDetails,
  onAssign,
  onChangeStatus,
  onChangePriority,
  onAddRemark,
  onDelete
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`rounded-xl p-4 bg-white dark:bg-[#0C1518] border transition-all ${
        isSelected
          ? 'border-[#008F63] bg-[#008F63]/5 dark:border-[#00A875] dark:bg-[#00A875]/10'
          : 'border-[#DDE8E3] dark:border-[#243338] shadow-2xs'
      }`}
    >
      {/* Top Header: Checkbox, ID, Date, Priority */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(complaint.id)}
            className="w-4 h-4 rounded border-[#DDE8E3] dark:border-[#243338] bg-white dark:bg-[#07121A] text-[#008F63] dark:text-[#00A875] focus:ring-0 cursor-pointer accent-[#008F63]"
            aria-label={`Select complaint ${complaint.id}`}
          />
          <span className="font-mono font-bold text-xs text-[#008F63] dark:text-[#D4A84F]">
            {complaint.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      {/* Main Info */}
      <div className="py-3">
        <h4
          onClick={() => onViewDetails(complaint)}
          className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0] hover:text-[#008F63] dark:hover:text-[#D4A84F] cursor-pointer transition-colors"
        >
          {complaint.title}
        </h4>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-[#60717A] dark:text-[#9FB1BC]">
          <span>Student: <strong className="text-[#071A2B] dark:text-[#F5F5F0]">{complaint.student}</strong></span>
          <span>Dept: <strong className="text-[#071A2B] dark:text-[#F5F5F0]">{complaint.department}</strong></span>
          <span>Date: <strong>{complaint.submittedDate || complaint.submittedAt?.split(',')[0]}</strong></span>
        </div>
        {complaint.assignedTo && complaint.assignedTo !== 'Unassigned' && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#008F63] dark:text-[#00A875] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Assigned to: {complaint.assignedTo}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2.5 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(complaint)}
            className="px-3 py-1.5 rounded-lg bg-[#008F63]/10 hover:bg-[#008F63]/20 dark:bg-[#00A875]/20 dark:hover:bg-[#00A875]/30 text-[#008F63] dark:text-[#00A875] text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          <button
            onClick={() => onAssign(complaint)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span>Assign</span>
          </button>
        </div>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#60717A] dark:text-[#9FB1BC]"
            aria-label="More actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 bottom-full mb-1 w-44 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xl py-1.5 z-40 text-left">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onChangeStatus(complaint);
                }}
                className="w-full px-3 py-2 text-left text-xs font-medium text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                <span>Change Status</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onChangePriority(complaint);
                }}
                className="w-full px-3 py-2 text-left text-xs font-medium text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center gap-2"
              >
                <Edit className="w-3.5 h-3.5 text-amber-500" />
                <span>Edit Priority</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAddRemark(complaint);
                }}
                className="w-full px-3 py-2 text-left text-xs font-medium text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                <span>Admin Remark</span>
              </button>
              <div className="my-1 border-t border-[#DDE8E3] dark:border-[#1A2E3B]" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(complaint.id);
                }}
                className="w-full px-3 py-2 text-left text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
