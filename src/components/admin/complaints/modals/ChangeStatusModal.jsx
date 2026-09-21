import React, { useState } from 'react';
import { X, RefreshCw, Check, CheckCircle2 } from 'lucide-react';
import { COMPLAINT_STATUSES } from '../../../../data/adminComplaintsData';

const statusStyles = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function ChangeStatusModal({
  isOpen,
  onClose,
  complaint,
  selectedCount = 1,
  isBulk = false,
  onUpdateStatus
}) {
  const [selectedStatus, setSelectedStatus] = useState(
    complaint?.status || 'In Progress'
  );
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const isResolving = selectedStatus === 'Resolved';

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(selectedStatus, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-[#315C3A] to-[#D4A84F]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">
                {isBulk ? `Update Status (${selectedCount} Tickets)` : 'Change Status'}
              </h3>
              <p className="text-xs text-[#9FB1BC]">Update resolution lifecycle state</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {!isBulk && complaint && (
            <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
                <span className="text-[11px] text-[#9FB1BC]">Current: {complaint.status}</span>
              </div>
              <p className="font-medium text-[#F5F5F0] text-xs truncate">{complaint.title}</p>
            </div>
          )}

          {isBulk && (
            <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] text-xs text-[#9FB1BC]">
              Transitioning lifecycle status for <strong className="text-[#F5F5F0]">{selectedCount}</strong> selected complaints.
            </div>
          )}

          <div className="space-y-2">
            <label className="block font-medium text-[#F5F5F0]">
              Select New Status
            </label>
            <div className="grid grid-cols-1 gap-2">
              {COMPLAINT_STATUSES.map((status) => {
                const style = statusStyles[status] || statusStyles['Pending'];
                const isSelected = selectedStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#D4A84F] bg-[#13242E] shadow-sm'
                        : 'border-[#1A2E3B] bg-[#07121A] hover:bg-[#13242E]/70'
                    }`}
                  >
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded"
                      style={{
                        backgroundColor: style.bg,
                        color: style.text,
                        border: `1px solid ${style.border}40`,
                      }}
                    >
                      {status}
                    </span>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#D4A84F] bg-[#D4A84F] text-[#07121A]'
                          : 'border-[#9FB1BC]/40'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resolve Warning Alert if becoming Resolved */}
          {isResolving && (
            <div className="p-3 rounded-lg bg-[#315C3A]/15 border border-[#315C3A]/50 flex items-start gap-2.5 text-[11px] text-[#A7C481]">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4A84F] mt-0.5" />
              <div>
                <strong className="block text-[#F5F5F0]">Confirmation Note</strong>
                Marking this complaint as <strong>Resolved</strong> will notify the student and prompt them for feedback rating.
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium text-[#9FB1BC] mb-1">
              Resolution Note / Status Message <span className="text-[10px] text-[#9FB1BC]/60">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., Technicians replaced the faulty valve and verified pressure."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg p-2.5 text-xs text-[#F5F5F0] focus:outline-none resize-none placeholder-[#9FB1BC]/50"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#1A2E3B] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] font-semibold border border-[#315C3A] shadow-glow-green flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
