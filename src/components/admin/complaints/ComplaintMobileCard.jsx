import React, { useState } from 'react';
import {
  MoreVertical,
  Building2,
  AlertTriangle,
  RefreshCw,
  FileText,
  CheckCircle2,
  MapPin,
  Clock
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

export default function ComplaintMobileCard({
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
  const [showMoreActions, setShowMoreActions] = useState(false);

  const prio = priorityBadges[complaint.priority] || priorityBadges.MEDIUM;
  const stat = statusBadges[complaint.status] || statusBadges.Pending;

  return (
    <div
      className={`p-4 rounded-xl border transition-all text-xs space-y-2.5 ${
        isSelected
          ? 'bg-[#315C3A]/15 border-[#315C3A]'
          : 'bg-[#07121A]/70 border-[#1A2E3B] hover:border-[#315C3A]/50'
      }`}
    >
      {/* Top Header: Checkbox, ID, and Badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(complaint.id)}
            className="w-4 h-4 rounded border-[#1A2E3B] bg-[#07121A] text-[#D4A84F] focus:ring-0 cursor-pointer accent-[#315C3A]"
            aria-label={`Select complaint ${complaint.id}`}
          />
          <span className="font-mono font-bold text-[#D4A84F] text-xs">
            {complaint.id}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider"
            style={{
              backgroundColor: prio.bg,
              color: prio.text,
              border: `1px solid ${prio.border}40`,
            }}
          >
            {complaint.priority}
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
            style={{
              backgroundColor: stat.bg,
              color: stat.text,
              border: `1px solid ${stat.border}40`,
            }}
          >
            {complaint.status}
          </span>
        </div>
      </div>

      {/* Complaint Title & Location */}
      <div>
        <h4
          onClick={() => onViewDetails(complaint)}
          className="font-bold text-[#F5F5F0] text-xs hover:text-[#D4A84F] cursor-pointer transition-colors"
        >
          {complaint.title}
        </h4>
        <div className="text-[11px] text-[#9FB1BC] mt-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#71844A]" />
            {complaint.location || 'Campus'}
          </span>
          <span className="text-[#F5F5F0] font-medium">{complaint.department}</span>
        </div>
      </div>

      {/* Meta Bar: Student & Time */}
      <div className="pt-2 border-t border-[#1A2E3B]/60 flex items-center justify-between text-[11px] text-[#9FB1BC]">
        <span>Student: <strong className="text-[#F5F5F0]">{complaint.student}</strong></span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#9FB1BC]" />
          {complaint.submittedRelative || 'Recent'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-[#1A2E3B]/60 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(complaint)}
          className="flex-1 py-1.5 rounded-lg bg-[#315C3A]/25 hover:bg-[#315C3A]/40 text-[#D4A84F] font-semibold border border-[#315C3A]/60 text-center transition-colors"
        >
          View Details
        </button>

        <button
          onClick={() => setShowMoreActions(!showMoreActions)}
          className="p-1.5 rounded-lg bg-[#13242E] text-[#9FB1BC] hover:text-[#F5F5F0] border border-[#1A2E3B]"
          aria-label="More actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Actions on Mobile */}
      {showMoreActions && (
        <div className="p-2 rounded-lg bg-[#050A0C] border border-[#1A2E3B] grid grid-cols-2 gap-1.5 animate-in fade-in duration-100">
          <button
            onClick={() => {
              setShowMoreActions(false);
              onAssignDept(complaint);
            }}
            className="p-2 rounded bg-[#13242E] text-[#F5F5F0] hover:bg-[#1A2E3B] flex items-center gap-1.5 text-[11px]"
          >
            <Building2 className="w-3 h-3 text-[#D4A84F]" />
            Assign Dept
          </button>
          <button
            onClick={() => {
              setShowMoreActions(false);
              onChangePriority(complaint);
            }}
            className="p-2 rounded bg-[#13242E] text-[#F5F5F0] hover:bg-[#1A2E3B] flex items-center gap-1.5 text-[11px]"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Priority
          </button>
          <button
            onClick={() => {
              setShowMoreActions(false);
              onChangeStatus(complaint);
            }}
            className="p-2 rounded bg-[#13242E] text-[#F5F5F0] hover:bg-[#1A2E3B] flex items-center gap-1.5 text-[11px]"
          >
            <RefreshCw className="w-3 h-3 text-blue-400" />
            Status
          </button>
          <button
            onClick={() => {
              setShowMoreActions(false);
              onAddNote(complaint);
            }}
            className="p-2 rounded bg-[#13242E] text-[#F5F5F0] hover:bg-[#1A2E3B] flex items-center gap-1.5 text-[11px]"
          >
            <FileText className="w-3 h-3 text-[#9FB1BC]" />
            Add Note
          </button>
          <button
            onClick={() => {
              setShowMoreActions(false);
              onMarkResolved(complaint);
            }}
            disabled={complaint.status === 'Resolved'}
            className="col-span-2 p-2 rounded bg-[#315C3A]/25 text-[#A7C481] hover:bg-[#315C3A]/40 flex items-center justify-center gap-1.5 text-[11px] disabled:opacity-40"
          >
            <CheckCircle2 className="w-3 h-3" />
            Mark Resolved
          </button>
        </div>
      )}
    </div>
  );
}
