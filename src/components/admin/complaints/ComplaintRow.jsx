import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Eye,
  UserCheck,
  RefreshCw,
  Edit,
  Trash2,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from './ComplaintBadges';

export default function ComplaintRow({
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
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr
      className={`border-b border-[#DDE8E3] dark:border-[#243338]/60 transition-colors text-xs group ${
        isSelected
          ? 'bg-[#008F63]/8 dark:bg-[#00A875]/10'
          : 'hover:bg-[#F5F5F0]/70 dark:hover:bg-[#13242E]/50'
      }`}
    >
      {/* Checkbox */}
      <td className="py-3 px-2 w-8 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(complaint.id)}
          className="w-4 h-4 rounded border-[#DDE8E3] dark:border-[#243338] bg-white dark:bg-[#07121A] text-[#008F63] dark:text-[#00A875] focus:ring-0 cursor-pointer accent-[#008F63]"
          aria-label={`Select complaint ${complaint.id}`}
        />
      </td>

      {/* Complaint ID */}
      <td className="py-3 px-2 font-mono font-bold whitespace-nowrap text-[#008F63] dark:text-[#D4A84F]">
        <button
          onClick={() => onViewDetails(complaint)}
          className="hover:underline font-bold focus:outline-none"
        >
          {complaint.id}
        </button>
      </td>

      {/* Complaint Title & Location */}
      <td className="py-3 px-2 max-w-[170px]">
        <div
          onClick={() => onViewDetails(complaint)}
          className="font-bold text-[#071A2B] dark:text-[#F5F5F0] truncate group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] cursor-pointer transition-colors"
          title={complaint.title}
        >
          {complaint.title}
        </div>
        <div className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] truncate mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#71844A] shrink-0" />
          <span className="truncate">{complaint.location || 'Campus'}</span>
        </div>
      </td>

      {/* Student */}
      <td className="py-3 px-2 whitespace-nowrap">
        <div className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">{complaint.student}</div>
        <div className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">{complaint.studentId || 'Student'}</div>
      </td>

      {/* Category */}
      <td className="py-3 px-1.5 whitespace-nowrap">
        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F5F5F0] dark:bg-[#13242E] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338]">
          {complaint.category}
        </span>
      </td>

      {/* Department */}
      <td className="py-3 px-1.5 whitespace-nowrap font-medium text-[#071A2B] dark:text-[#F5F5F0]">
        {complaint.department}
      </td>

      {/* Priority */}
      <td className="py-3 px-1.5 whitespace-nowrap">
        <PriorityBadge priority={complaint.priority} />
      </td>

      {/* Status */}
      <td className="py-3 px-1.5 whitespace-nowrap">
        <StatusBadge status={complaint.status} />
      </td>

      {/* Submitted Date */}
      <td className="py-3 px-1.5 whitespace-nowrap text-[#60717A] dark:text-[#9FB1BC] font-medium">
        {complaint.submittedDate || complaint.submittedAt?.split(',')[0] || '22 Sep 2026'}
      </td>

      {/* Assigned To */}
      <td className="py-3 px-1.5 whitespace-nowrap">
        {complaint.assignedTo && complaint.assignedTo !== 'Unassigned' ? (
          <span className="inline-flex items-center gap-1 font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
            {complaint.assignedTo}
          </span>
        ) : (
          <span className="text-[11px] font-medium italic text-[#60717A] dark:text-[#9FB1BC]">
            Unassigned
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="py-3 px-2 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 relative">
          {/* Quick View Button */}
          <button
            onClick={() => onViewDetails(complaint)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#008F63]/10 dark:bg-[#13242E] dark:hover:bg-[#00A875]/20 text-[#60717A] hover:text-[#008F63] dark:text-[#9FB1BC] dark:hover:text-[#00A875] transition-colors"
            title="View Details"
            aria-label="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Three-Dot Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] transition-colors"
              title="More Actions"
              aria-label="More Actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xl py-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onViewDetails(complaint);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-medium text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onAssign(complaint);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-medium text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center gap-2"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
                  <span>Assign</span>
                </button>
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
      </td>
    </tr>
  );
}
