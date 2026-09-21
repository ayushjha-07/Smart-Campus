import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function ResolveComplaintModal({
  isOpen,
  onClose,
  complaint,
  onConfirmResolve
}) {
  const [resolutionMessage, setResolutionMessage] = useState(
    'Work completed, verified operational by department technician.'
  );

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmResolve(complaint.id, resolutionMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#315C3A]" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#315C3A]/20 border border-[#315C3A]/50 text-[#A7C481]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">
                Resolve Complaint?
              </h3>
              <p className="text-xs text-[#9FB1BC]">
                Finalize resolution and notify student
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
              <span className="text-[11px] text-[#9FB1BC]">{complaint.student}</span>
            </div>
            <p className="font-medium text-[#F5F5F0] text-xs truncate">{complaint.title}</p>
          </div>

          <p className="text-xs text-[#9FB1BC] leading-relaxed">
            Are you sure you want to mark this complaint as resolved? This will close the active ticket and update the department resolution metrics.
          </p>

          <div>
            <label className="block font-medium text-[#F5F5F0] mb-1.5">
              Resolution Message
            </label>
            <textarea
              rows={3}
              required
              value={resolutionMessage}
              onChange={(e) => setResolutionMessage(e.target.value)}
              placeholder="Provide a resolution summary for the student..."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#315C3A] rounded-lg p-3 text-xs text-[#F5F5F0] focus:outline-none resize-none placeholder-[#9FB1BC]/50"
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
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A7C481]" />
              Confirm Resolution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
