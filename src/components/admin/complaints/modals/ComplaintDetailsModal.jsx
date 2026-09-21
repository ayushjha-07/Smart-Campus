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
  MessageSquare,
  Mail,
  Paperclip,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const priorityBadges = {
  LOW: { bg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481', border: '#71844A' },
  MEDIUM: { bg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E', border: '#D4A84F' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.18)', text: '#FCA5A5', border: '#EF4444' },
};

const statusBadges = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function ComplaintDetailsModal({
  isOpen,
  onClose,
  complaint,
  onOpenAssign,
  onOpenPriority,
  onOpenStatus,
  onOpenAddNote,
  onContactStudent
}) {
  if (!isOpen || !complaint) return null;

  const prio = priorityBadges[complaint.priority] || priorityBadges.MEDIUM;
  const stat = statusBadges[complaint.status] || statusBadges.Pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-[#315C3A] via-[#D4A84F] to-[#71844A]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A2E3B] flex items-center justify-between bg-[#07121A]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#315C3A]/20 border border-[#315C3A]/50 text-[#D4A84F] shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-[#D4A84F]">
                  {complaint.id}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wider"
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
                Submitted on {complaint.submittedAt || '20 September 2026, 10:32 AM'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs scrollbar-thin">
          {/* Title & Description Card */}
          <div className="p-4 rounded-xl bg-[#07121A] border border-[#1A2E3B] space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              {complaint.title}
            </h3>
            <p className="text-xs text-[#9FB1BC] leading-relaxed">
              {complaint.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Key Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Student Card */}
            <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1">
                <User className="w-3 h-3" /> Student
              </span>
              <div className="font-bold text-[#F5F5F0] text-xs">{complaint.student}</div>
              <div className="font-mono text-[11px] text-[#9FB1BC]">
                {complaint.studentId || 'SC-STU-2026-014'}
              </div>
            </div>

            {/* Department Card */}
            <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Assigned Dept
              </span>
              <div className="font-bold text-[#F5F5F0] text-xs">{complaint.department}</div>
              <div className="text-[11px] text-[#9FB1BC]">Category: {complaint.category}</div>
            </div>

            {/* Location Card */}
            <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </span>
              <div className="font-bold text-[#F5F5F0] text-xs truncate">
                {complaint.location || 'Hostel Block B'}
              </div>
              <div className="text-[11px] text-[#9FB1BC]">Campus Zone</div>
            </div>
          </div>

          {/* Attachment Preview Section */}
          <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B]">
            <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1.5 mb-2">
              <Paperclip className="w-3.5 h-3.5" /> Attachments
            </span>

            {complaint.attachments && complaint.attachments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {complaint.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#13242E] border border-[#1A2E3B] text-xs"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-[#D4A84F]" />
                    <span className="font-medium text-[#F5F5F0]">{att.name}</span>
                    <span className="text-[10px] text-[#9FB1BC]">({att.size})</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#13242E]/50 text-[11px] text-[#9FB1BC]">
                <Paperclip className="w-3.5 h-3.5 text-[#9FB1BC]/60" />
                <span>No media attachments uploaded with this complaint.</span>
              </div>
            )}
          </div>

          {/* AI Analysis Panel */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#315C3A]/15 via-[#0D1B22] to-[#07121A] border border-[#315C3A]/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A84F]" />
                <h4 className="font-bold text-[#F5F5F0] text-xs sm:text-sm">
                  AI Complaint Classification
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#315C3A]/30 text-[#A7C481] border border-[#315C3A]/50 font-semibold">
                  Demo Triage
                </span>
              </div>

              <span className="text-[11px] font-mono text-[#D4A84F]">
                Confidence: {complaint.aiConfidence ?? 92}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[#07121A]/80 border border-[#1A2E3B]">
                <span className="text-[10px] text-[#9FB1BC] block">Detected Category</span>
                <span className="font-semibold text-[#F5F5F0]">
                  {complaint.aiCategory || complaint.category}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#07121A]/80 border border-[#1A2E3B]">
                <span className="text-[10px] text-[#9FB1BC] block">Detected Priority</span>
                <span className="font-semibold text-[#D4A84F]">
                  {complaint.aiPriority || complaint.priority}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#07121A]/80 border border-[#1A2E3B] col-span-2">
                <span className="text-[10px] text-[#9FB1BC] block mb-1">Keywords</span>
                <div className="flex flex-wrap gap-1">
                  {(complaint.keywords || ['water', 'supply', 'hostel', 'interruption']).map((kw) => (
                    <span
                      key={kw}
                      className="px-1.5 py-0.2 rounded bg-[#13242E] text-[10px] text-[#9FB1BC] border border-[#1A2E3B]"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#9FB1BC]/70 italic">
              Demonstration data only. Do not claim that a real AI model is running.
            </p>
          </div>

          {/* Latest Update Banner */}
          {complaint.latestUpdate && (
            <div className="p-3.5 rounded-xl bg-[#07121A] border-l-4 border-[#D4A84F] border-t border-r border-b border-[#1A2E3B]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#D4A84F]">
                <Clock className="w-3.5 h-3.5" />
                Latest Field Update
              </div>
              <p className="text-xs text-[#F5F5F0] mt-1">{complaint.latestUpdate}</p>
            </div>
          )}

          {/* Timeline & Internal Notes Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Timeline */}
            <div className="p-4 rounded-xl bg-[#07121A]/80 border border-[#1A2E3B]">
              <h4 className="font-bold text-[#F5F5F0] text-xs flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-[#9FB1BC]" />
                Complaint Timeline
              </h4>

              <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-[#1A2E3B] pl-1">
                {(complaint.timeline || [
                  { time: '10:32 AM', title: 'Submitted', desc: 'Complaint registered.' },
                  { time: '10:40 AM', title: 'Under Review', desc: 'Validating assignment.' },
                  { time: '11:05 AM', title: 'Assigned to Maintenance', desc: 'Lead technician alerted.' },
                  { time: '12:45 PM', title: 'In Progress', desc: 'Technician on-site.' },
                  { time: 'Pending', title: 'Expected Resolution', desc: 'Work underway.' }
                ]).map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-2.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#315C3A] ring-2 ring-[#0D1B22] mt-1 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#D4A84F] text-[11px] font-bold">
                          {step.time}
                        </span>
                        <span className="font-semibold text-[#F5F5F0]">{step.title}</span>
                      </div>
                      <p className="text-[11px] text-[#9FB1BC] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="p-4 rounded-xl bg-[#07121A]/80 border border-[#1A2E3B] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[#F5F5F0] text-xs flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4A84F]" />
                    Internal Staff Notes
                  </h4>
                  <button
                    onClick={() => onOpenAddNote(complaint)}
                    className="text-[11px] text-[#D4A84F] hover:underline font-semibold"
                  >
                    + Add Note
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {complaint.internalNotes && complaint.internalNotes.length > 0 ? (
                    complaint.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2.5 rounded-lg bg-[#13242E] border border-[#1A2E3B] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#9FB1BC]">
                          <span className="font-semibold text-[#F5F5F0]">{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-xs text-[#9FB1BC]">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-[#13242E]/40 text-[11px] text-[#9FB1BC] text-center">
                      No internal notes recorded yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#1A2E3B] text-[10px] text-[#9FB1BC]">
                Visible exclusively to campus administrative personnel.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Panel Footer */}
        <div className="p-4 border-t border-[#1A2E3B] bg-[#07121A]/90 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <Link
              to={`/student/complaints/${complaint.id}`}
              className="text-xs text-[#9FB1BC] hover:text-[#D4A84F] flex items-center gap-1.5"
              title="Open public complaint tracking page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Tracker</span>
            </Link>

            <button
              onClick={() => onContactStudent(complaint)}
              className="text-xs text-[#9FB1BC] hover:text-[#F5F5F0] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] border border-[#1A2E3B] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Contact Student</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenAssign(complaint)}
              className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
              Assign Dept
            </button>

            <button
              onClick={() => onOpenPriority(complaint)}
              className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Priority
            </button>

            <button
              onClick={() => onOpenStatus(complaint)}
              className="px-3 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] border border-[#315C3A] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#A7C481]" />
              Change Status
            </button>

            <button
              onClick={() => onOpenAddNote(complaint)}
              className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#9FB1BC] hover:text-[#F5F5F0] border border-[#1A2E3B] transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
