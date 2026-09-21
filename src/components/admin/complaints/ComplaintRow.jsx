import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Eye,
  Building2,
  AlertTriangle,
  RefreshCw,
  FileText,
  CheckCircle2,
  MapPin
} from 'lucide-react';

const priorityBadges = {
  LOW: { bg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481', border: '#71844A' },
  MEDIUM: { bg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E', border: '#D4A84F' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.18)', text: '#FCA5A5', border: '#EF4444' },
};

const statusBadges = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Submitted': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function ComplaintRow({
  complaint,
  isSelected,
  onToggleSelect,
  onViewDetails,
  onAssignDept,
  onChangePriority,
  onChangeStatus,
  onAddNote,
  onMarkResolved
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

  const prio = priorityBadges[complaint.priority] || priorityBadges.MEDIUM;
  const stat = statusBadges[complaint.status] || statusBadges.Pending;

  return (
    <tr
      className={`border-b border-[#1A2E3B]/70 transition-colors text-xs group ${
        isSelected ? 'bg-[#315C3A]/10' : 'hover:bg-[#13242E]/50'
      }`}
    >
      {/* Checkbox */}
      <td className="py-3 px-3.5 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(complaint.id)}
          className="w-4 h-4 rounded border-[#1A2E3B] bg-[#07121A] text-[#D4A84F] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#315C3A]"
          aria-label={`Select complaint ${complaint.id}`}
        />
      </td>

      {/* Complaint Details (ID, Title, Location) */}
      <td className="py-3 px-3 max-w-[280px]">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#D4A84F] whitespace-nowrap">
            {complaint.id}
          </span>
          {complaint.attachments?.length > 0 && (
            <span className="text-[10px] px-1 rounded bg-[#13242E] text-[#9FB1BC] border border-[#1A2E3B]">
              Attachment
            </span>
          )}
        </div>
        <div
          onClick={() => onViewDetails(complaint)}
          className="font-semibold text-[#F5F5F0] truncate group-hover:text-[#D4A84F] cursor-pointer transition-colors mt-0.5"
          title={complaint.title}
        >
          {complaint.title}
        </div>
        <div className="text-[11px] text-[#9FB1BC] truncate mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#71844A] shrink-0" />
          <span className="truncate">{complaint.location || 'Campus'}</span>
        </div>
      </td>

      {/* Student (Name, Student ID) */}
      <td className="py-3 px-3 whitespace-nowrap">
        <div className="font-medium text-[#F5F5F0]">{complaint.student}</div>
        <div className="text-[10px] font-mono text-[#9FB1BC] mt-0.5">
          {complaint.studentId || 'SC-STU-REG'}
        </div>
      </td>

      {/* Category */}
      <td className="py-3 px-3 whitespace-nowrap">
        <span className="inline-block px-2 py-0.5 rounded bg-[#07121A] text-[#9FB1BC] border border-[#1A2E3B] text-[11px]">
          {complaint.category}
        </span>
      </td>

      {/* Department */}
      <td className="py-3 px-3 whitespace-nowrap">
        <span className="inline-block px-2 py-0.5 rounded bg-[#13242E] text-[#F5F5F0] font-medium text-[11px]">
          {complaint.department}
        </span>
      </td>

      {/* Priority */}
      <td className="py-3 px-2.5 text-center whitespace-nowrap">
        <span
          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
          style={{
            backgroundColor: prio.bg,
            color: prio.text,
            border: `1px solid ${prio.border}40`,
          }}
        >
          {complaint.priority}
        </span>
      </td>

      {/* Status */}
      <td className="py-3 px-2.5 text-center whitespace-nowrap">
        <span
          className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
          style={{
            backgroundColor: stat.bg,
            color: stat.text,
            border: `1px solid ${stat.border}40`,
          }}
        >
          {complaint.status}
        </span>
      </td>

      {/* Submitted Date */}
      <td className="py-3 px-3 whitespace-nowrap text-[11px]">
        <div className="text-[#F5F5F0]">{complaint.submittedAt?.split(',')[0] || '20 Sep'}</div>
        <div className="text-[#9FB1BC] text-[10px]">{complaint.submittedRelative || 'Recent'}</div>
      </td>

      {/* Updated Time */}
      <td className="py-3 px-3 whitespace-nowrap text-[11px] text-[#9FB1BC]">
        {complaint.updatedAt || 'Just now'}
      </td>

      {/* Actions (3-dot Menu) */}
      <td className="py-3 px-3 text-right relative whitespace-nowrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1.5 rounded-lg text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
          aria-label="Row Actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Action Menu Popover */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-2 mt-1 w-48 bg-[#07121A] border border-[#1A2E3B] rounded-xl shadow-2xl py-1 z-50 text-xs text-left animate-in fade-in duration-100"
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                onViewDetails(complaint);
              }}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-[#71844A]" />
              View Details
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onAssignDept(complaint);
              }}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
              Assign Department
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onChangePriority(complaint);
              }}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Change Priority
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onChangeStatus(complaint);
              }}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              Change Status
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onAddNote(complaint);
              }}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#9FB1BC]" />
              Add Internal Note
            </button>
            <div className="my-1 border-t border-[#1A2E3B]" />
            <button
              onClick={() => {
                setMenuOpen(false);
                onMarkResolved(complaint);
              }}
              disabled={complaint.status === 'Resolved'}
              className="w-full px-3 py-2 text-[#A7C481] hover:bg-[#315C3A]/30 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark Resolved
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
