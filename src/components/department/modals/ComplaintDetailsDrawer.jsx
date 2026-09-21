import React from 'react';
import {
  X,
  FileText,
  User,
  MapPin,
  Clock,
  Sparkles,
  RefreshCw,
  MessageSquarePlus,
  StickyNote,
  CheckCircle2,
  Lock
} from 'lucide-react';

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

export default function ComplaintDetailsDrawer({
  isOpen,
  onClose,
  complaint,
  onOpenUpdateStatus,
  onOpenProgressUpdate,
  onOpenInternalNote,
  onOpenResolve
}) {
  if (!isOpen || !complaint) return null;

  const prio = priorityBadges[complaint.priority] || priorityBadges.MEDIUM;
  const stat = statusBadges[complaint.status] || statusBadges.Pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-[#315C3A] via-[#D4A84F] to-[#71844A]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A2E3B] flex items-center justify-between bg-[#07121A]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#315C3A]/20 border border-[#315C3A]/50 text-[#D4A84F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs scrollbar-thin">
          {/* Title & Description */}
          <div className="p-4 rounded-xl bg-[#07121A] border border-[#1A2E3B] space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              {complaint.title}
            </h3>
            <p className="text-xs text-[#9FB1BC] leading-relaxed">
              {complaint.description || 'Water supply has been interrupted in Hostel Block B since this morning. Several rooms are currently affected.'}
            </p>
          </div>

          {/* Student & Location Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1">
                <User className="w-3 h-3" /> Student Information
              </span>
              <div className="font-bold text-[#F5F5F0]">{complaint.student}</div>
              <div className="font-mono text-[11px] text-[#9FB1BC]">
                {complaint.studentId || 'SC-STU-2026-014'}
              </div>
              <div className="text-[11px] text-[#9FB1BC]">
                Category: <span className="text-[#F5F5F0] font-medium">{complaint.category}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07121A]/70 border border-[#1A2E3B] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#71844A] flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Campus Location
              </span>
              <div className="font-bold text-[#F5F5F0]">{complaint.location}</div>
              <div className="text-[11px] text-[#9FB1BC]">
                Assigned Unit: <span className="text-[#D4A84F] font-semibold">{complaint.department}</span>
              </div>
              <div className="text-[11px] text-[#A7C481] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Assigned: {complaint.assignedAt || 'Recent'}</span>
              </div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#315C3A]/15 via-[#0D1B22] to-[#07121A] border border-[#315C3A]/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A84F]" />
                <span className="font-bold text-[#F5F5F0] text-xs">
                  AI Complaint Classification
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#315C3A]/30 text-[#A7C481]">
                  Demo Triage
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#D4A84F]">
                Confidence: {complaint.aiConfidence ?? 92}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
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
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-[#9FB1BC]">Keywords:</span>
              {(complaint.keywords || ['water', 'supply', 'hostel', 'interruption']).map((kw) => (
                <span
                  key={kw}
                  className="px-1.5 py-0.2 rounded bg-[#13242E] text-[10px] text-[#9FB1BC] border border-[#1A2E3B]"
                >
                  #{kw}
                </span>
              ))}
            </div>

            <p className="text-[10px] text-[#9FB1BC]/70 italic">
              Demonstration data only. Do not claim that an actual AI model is running.
            </p>
          </div>

          {/* Latest Update Banner */}
          {complaint.latestUpdate && (
            <div className="p-3 rounded-xl bg-[#07121A] border-l-4 border-[#D4A84F] border-t border-r border-b border-[#1A2E3B]">
              <span className="text-[10px] uppercase font-bold text-[#D4A84F] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Latest Department Update
              </span>
              <p className="text-xs text-[#F5F5F0] mt-1">{complaint.latestUpdate}</p>
            </div>
          )}

          {/* Timeline & Notes Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Timeline */}
            <div className="p-3.5 rounded-xl bg-[#07121A]/80 border border-[#1A2E3B]">
              <h4 className="font-bold text-[#F5F5F0] text-xs flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#9FB1BC]" />
                Complaint Timeline
              </h4>

              <div className="space-y-2.5 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-[#1A2E3B] pl-1">
                {(complaint.timeline || [
                  { time: '10:32 AM', title: 'Submitted', desc: 'Complaint registered.' },
                  { time: '10:40 AM', title: 'Under Review', desc: 'Auto-triaged by system.' },
                  { time: '11:05 AM', title: 'Assigned to Maintenance', desc: 'Shift Lead alerted.' },
                  { time: '12:45 PM', title: 'In Progress', desc: 'Technician on-site.' },
                  { time: 'Pending', title: 'Resolution', desc: 'Work underway.' }
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

            {/* Internal Staff Notes */}
            <div className="p-3.5 rounded-xl bg-[#07121A]/80 border border-[#1A2E3B] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="font-bold text-[#F5F5F0] text-xs flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#D4A84F]" />
                    Internal Department Notes
                  </h4>
                  <button
                    onClick={() => onOpenInternalNote(complaint)}
                    className="text-[11px] text-[#D4A84F] hover:underline font-semibold"
                  >
                    + Add Note
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                  {complaint.internalNotes && complaint.internalNotes.length > 0 ? (
                    complaint.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2 rounded-lg bg-[#13242E] border border-[#1A2E3B] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#9FB1BC]">
                          <span className="font-semibold text-[#F5F5F0]">{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-xs text-[#9FB1BC]">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-2.5 rounded-lg bg-[#13242E]/40 text-[11px] text-[#9FB1BC] text-center">
                      No internal notes recorded yet.
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-[#9FB1BC]/70 pt-2 border-t border-[#1A2E3B] mt-2 block">
                Private to Maintenance Department staff members.
              </span>
            </div>
          </div>
        </div>

        {/* Staff Action Panel Footer */}
        <div className="p-4 border-t border-[#1A2E3B] bg-[#07121A]/90 flex flex-wrap items-center justify-end gap-2.5">
          <button
            onClick={() => onOpenUpdateStatus(complaint)}
            className="px-3.5 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Update Status</span>
          </button>

          <button
            onClick={() => onOpenProgressUpdate(complaint)}
            className="px-3.5 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#D4A84F] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Add Progress Update</span>
          </button>

          <button
            onClick={() => onOpenInternalNote(complaint)}
            className="px-3.5 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#9FB1BC] hover:text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>Add Internal Note</span>
          </button>

          <button
            onClick={() => onOpenResolve(complaint)}
            disabled={complaint.status === 'Resolved'}
            className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] border border-[#315C3A] flex items-center gap-1.5 transition-all shadow-glow-green disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#A7C481]" />
            <span>Mark Resolved</span>
          </button>
        </div>
      </div>
    </div>
  );
}
