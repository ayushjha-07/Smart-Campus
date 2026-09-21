import React from 'react';
import {
  X,
  FileText,
  User,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const priorityColors = {
  LOW: { bg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481', border: '#71844A' },
  MEDIUM: { bg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E', border: '#D4A84F' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.15)', text: '#FCA5A5', border: '#EF4444' },
};

const statusColors = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function AdminComplaintDetailsModal({
  isOpen,
  onClose,
  complaint,
  onOpenAssign,
  onOpenPriority,
  onOpenStatus
}) {
  if (!isOpen || !complaint) return null;

  const prio = priorityColors[complaint.priority] || priorityColors.MEDIUM;
  const stat = statusColors[complaint.status] || statusColors.Pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-[#315C3A] via-[#D4A84F] to-[#71844A]" />

        {/* Header */}
        <div className="p-5 border-b border-[#1A2E3B] flex items-center justify-between bg-[#07121A]/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/50 text-[#D4A84F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#D4A84F]">
                  {complaint.id}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: prio.bg,
                    color: prio.text,
                    border: `1px solid ${prio.border}40`,
                  }}
                >
                  {complaint.priority}
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: stat.bg,
                    color: stat.text,
                    border: `1px solid ${stat.border}40`,
                  }}
                >
                  {complaint.status}
                </span>
              </div>
              <p className="text-xs text-[#9FB1BC] mt-0.5">
                Submitted {complaint.submittedDate || complaint.submitted}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs scrollbar-thin">
          {/* Title & Description */}
          <div className="p-4 rounded-lg bg-[#07121A] border border-[#1A2E3B]">
            <h4 className="text-sm font-bold text-[#F5F5F0] mb-1.5">{complaint.title}</h4>
            <p className="text-xs text-[#9FB1BC] leading-relaxed">
              {complaint.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Key Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Student Info */}
            <div className="p-3 rounded-lg bg-[#07121A]/70 border border-[#1A2E3B] flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#D4A84F] mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9FB1BC] uppercase font-semibold block">
                  Reporting Student
                </span>
                <span className="font-semibold text-[#F5F5F0] text-xs block">
                  {complaint.student}
                </span>
                {complaint.studentEmail && (
                  <span className="text-[11px] text-[#71844A] block">
                    {complaint.studentEmail} • {complaint.studentRoll}
                  </span>
                )}
              </div>
            </div>

            {/* Location Info */}
            <div className="p-3 rounded-lg bg-[#07121A]/70 border border-[#1A2E3B] flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#71844A] mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9FB1BC] uppercase font-semibold block">
                  Location / Zone
                </span>
                <span className="font-semibold text-[#F5F5F0] text-xs block">
                  {complaint.location || 'Main Campus'}
                </span>
                <span className="text-[11px] text-[#9FB1BC]">
                  Department: <strong className="text-[#F5F5F0]">{complaint.department}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* AI Assessment Panel */}
          <div className="p-3.5 rounded-lg bg-[#315C3A]/10 border border-[#315C3A]/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4A84F]" />
              <span className="font-bold text-[#F5F5F0] text-xs">
                AI Triage Classification
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#315C3A]/30 text-[#A7C481] ml-auto">
                Demonstration
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#07121A]/80 p-2 rounded border border-[#1A2E3B]">
                <span className="text-[#9FB1BC] block">Automated Category:</span>
                <span className="font-semibold text-[#F5F5F0]">
                  {complaint.aiCategory || 'General Infrastructure'}
                </span>
              </div>
              <div className="bg-[#07121A]/80 p-2 rounded border border-[#1A2E3B]">
                <span className="text-[#9FB1BC] block">Calculated Urgency:</span>
                <span className="font-semibold text-[#D4A84F]">
                  {complaint.aiPriority || complaint.priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Latest Update Banner */}
          {complaint.latestUpdate && (
            <div className="p-3 rounded-lg bg-[#07121A] border-l-2 border-[#D4A84F] border-t border-r border-b border-[#1A2E3B]">
              <span className="text-[10px] uppercase font-bold text-[#D4A84F] block">
                Latest Field Update
              </span>
              <p className="text-xs text-[#F5F5F0] mt-0.5">{complaint.latestUpdate}</p>
            </div>
          )}

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5 text-[#9FB1BC]" />
              <span className="font-bold text-[#F5F5F0] text-xs">Event Timeline</span>
            </div>
            <div className="space-y-2 border-l border-[#1A2E3B] ml-2 pl-3">
              {(complaint.timeline || [
                { time: complaint.submitted, title: 'Complaint Registered', desc: 'Logged into portal.' }
              ]).map((evt, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-[#315C3A] ring-2 ring-[#0D1B22]" />
                  <div className="text-[11px] flex items-center gap-2">
                    <span className="font-mono text-[#D4A84F]">{evt.time}</span>
                    <span className="font-semibold text-[#F5F5F0]">{evt.title}</span>
                  </div>
                  <p className="text-[11px] text-[#9FB1BC] mt-0.5">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[#1A2E3B] bg-[#07121A]/80 flex flex-wrap items-center justify-between gap-2">
          <Link
            to={`/student/complaints/${complaint.id}`}
            className="text-xs text-[#9FB1BC] hover:text-[#D4A84F] flex items-center gap-1.5"
            title="Open tracking page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Tracker
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAssign(complaint);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-medium text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
              Assign Dept
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenPriority(complaint);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-medium text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Priority
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenStatus(complaint);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-medium text-[#F5F5F0] border border-[#315C3A] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D4A84F]" />
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
