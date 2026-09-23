import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  Paperclip,
  CheckCircle2,
  RefreshCw,
  User,
  ShieldCheck,
  Tag,
  Building2,
  AlertTriangle,
  Flame,
  Download
} from 'lucide-react';
import ProgressUpdate from './ProgressUpdate';
import StudentNotification from './StudentNotification';

export default function ComplaintDetailsDrawer({
  isOpen,
  onClose,
  complaint,
  onUpdateStatus,
  onPostProgressUpdate,
  onSendStudentNotification,
  onOpenResolve
}) {
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || 'In Progress');

  React.useEffect(() => {
    if (complaint) {
      setSelectedStatus(complaint.status);
    }
  }, [complaint]);

  if (!isOpen || !complaint) return null;

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (selectedStatus === 'Resolved') {
      onOpenResolve(complaint);
    } else {
      onUpdateStatus(complaint.id, selectedStatus);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">Critical</span>;
      case 'High':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">High</span>;
      case 'Medium':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4A84F]/10 text-[#B88728] dark:text-[#D4A84F] border border-[#D4A84F]/25">Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#71844A]/10 text-[#71844A] dark:text-[#A7C481] border border-[#71844A]/25">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#315C3A]/20 text-[#315C3A] dark:text-[#71844A] border border-[#315C3A]/30">Resolved</span>;
      case 'In Progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#008F63]/10 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/25">In Progress</span>;
      case 'Under Review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Under Review</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Pending</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white dark:bg-[#0C1518] border-l border-[#DDE8E3] dark:border-[#243338] shadow-2xl flex flex-col justify-between">
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-6 border-b border-[#DDE8E3] dark:border-[#243338] flex items-center justify-between bg-[#F5F5F0]/50 dark:bg-[#07121A]/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-black text-[#008F63] dark:text-[#D4A84F]">
                  {complaint.id}
                </span>
                {getPriorityBadge(complaint.priority)}
                {getStatusBadge(complaint.status)}
              </div>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Submitted: {complaint.submittedFull || complaint.submitted}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#60717A] dark:text-[#9FB1BC] hover:bg-slate-100 dark:hover:bg-[#13242E] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
            {/* Title & Metadata Grid */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
                {complaint.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-xs">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">Student</span>
                  <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block truncate">
                    {complaint.student}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">Student ID</span>
                  <span className="font-mono font-semibold text-[#008F63] dark:text-[#D4A84F] mt-0.5 block truncate">
                    {complaint.studentId}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">Category</span>
                  <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block truncate">
                    {complaint.category}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">Location</span>
                  <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#71844A] shrink-0" />
                    <span className="truncate">{complaint.location}</span>
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">Department</span>
                  <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block truncate">
                    {complaint.department || 'Hostel Department'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#60717A] dark:text-[#71844A]">SLA Due</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 mt-0.5 block truncate">
                    {complaint.due || 'Standard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
                Description
              </h4>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#07121A]/60 border border-[#DDE8E3] dark:border-[#243338] text-xs leading-relaxed text-[#071A2B] dark:text-[#F5F5F0]">
                {complaint.description || 'No detailed description provided.'}
              </div>
            </div>

            {/* Attachments */}
            {complaint.attachments && complaint.attachments.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
                  Attachment
                </h4>
                <div className="space-y-2">
                  {complaint.attachments.map((att, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg bg-[#008F63]/10 dark:bg-[#00A875]/20 flex items-center justify-center text-[#008F63] dark:text-[#00A875] shrink-0 font-mono text-[10px] font-bold">
                          IMG
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] block truncate">
                            {att.name}
                          </span>
                          <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
                            {att.size} • Attached by student
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading attachment: ${att.name}`)}
                        className="p-1.5 rounded-lg text-[#60717A] dark:text-[#9FB1BC] hover:text-[#008F63] dark:hover:text-[#D4A84F] transition-colors"
                        title="Download Attachment"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Analysis Card */}
            <div className="rounded-xl p-4 bg-gradient-to-br from-[#EAF7F1]/80 via-white to-[#F5F5F0] dark:from-[#0C1A1C] dark:via-[#0E1F21] dark:to-[#07121A] border border-[#008F63]/30 dark:border-[#00A875]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#008F63]/15 dark:bg-[#00A875]/20 flex items-center justify-center text-[#008F63] dark:text-[#00A875]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                    AI Analysis
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#D4A84F]/20 text-[#B88728] dark:text-[#D4A84F] border border-[#D4A84F]/30">
                  Demo AI Analysis
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
                  <span className="text-[10px] font-bold text-[#60717A] dark:text-[#71844A] block">AI Priority</span>
                  <span className="font-extrabold text-orange-600 dark:text-orange-400">
                    {complaint.aiAnalysis?.priority || complaint.priority}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
                  <span className="text-[10px] font-bold text-[#60717A] dark:text-[#71844A] block">Confidence</span>
                  <span className="font-extrabold text-[#008F63] dark:text-[#00A875]">
                    {complaint.aiAnalysis?.confidence || 94}%
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338] text-xs">
                <span className="text-[10px] font-bold text-[#60717A] dark:text-[#71844A] block mb-0.5">
                  Suggested Action:
                </span>
                <p className="font-medium text-[#071A2B] dark:text-[#F5F5F0]">
                  {complaint.aiAnalysis?.suggestedAction || 'Review water supply infrastructure and test main inlet valve.'}
                </p>
              </div>
            </div>

            {/* Status Update Quick Form */}
            <div className="rounded-xl p-4 bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                    Update Complaint Status
                  </h4>
                </div>
                <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
                  Current: <strong>{complaint.status}</strong>
                </span>
              </div>

              <form onSubmit={handleStatusSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none focus:border-[#008F63] cursor-pointer"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Update Status</span>
                </button>
              </form>
            </div>

            {/* Progress Update Component */}
            <ProgressUpdate
              complaintId={complaint.id}
              onPostUpdate={(msg) => onPostProgressUpdate(complaint.id, msg)}
            />

            {/* Notify Student Component */}
            <StudentNotification
              studentName={complaint.student}
              onSendNotification={(msg) => onSendStudentNotification(complaint.id, msg)}
            />

            {/* Complaint Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
                Complaint Audit Timeline
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8E3] dark:before:bg-[#243338]">
                {(complaint.timeline || []).map((tl, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0C1518] border-2 border-[#008F63] dark:border-[#D4A84F] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#D4A84F]" />
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A]/60 border border-[#DDE8E3]/60 dark:border-[#243338]/60 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                        <span>{tl.title}</span>
                        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] font-normal">
                          {tl.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] leading-relaxed">
                        {tl.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="p-4 sm:p-5 border-t border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/40 dark:bg-[#07121A]/60 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] transition-colors cursor-pointer"
            >
              Close
            </button>

            {complaint.status !== 'Resolved' ? (
              <button
                onClick={() => onOpenResolve(complaint)}
                className="px-5 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Resolved</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ticket Closed & Resolved</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
