import React, { useState } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';

const statusList = [
  'Pending',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
];

export default function UpdateStatusModal({
  isOpen,
  onClose,
  complaint,
  onUpdateStatus
}) {
  const [selectedStatus, setSelectedStatus] = useState(
    complaint?.status || 'In Progress'
  );
  const [message, setMessage] = useState('');

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(complaint.id, selectedStatus, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-[#315C3A]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">
                Update Complaint Status
              </h3>
              <p className="text-xs text-[#9FB1BC]">
                Set department workflow lifecycle stage
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
              <span className="text-[11px] text-[#9FB1BC]">Current: {complaint.status}</span>
            </div>
            <p className="font-medium text-[#F5F5F0] text-xs truncate">{complaint.title}</p>
          </div>

          <div>
            <label className="block font-medium text-[#F5F5F0] mb-1.5">
              Select New Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2.5 text-xs text-[#F5F5F0] focus:outline-none"
            >
              {statusList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-[#9FB1BC] mb-1.5">
              Progress Description <span className="text-[10px] text-[#9FB1BC]/60">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the latest progress..."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg p-3 text-xs text-[#F5F5F0] focus:outline-none resize-none placeholder-[#9FB1BC]/50"
            />
          </div>

          {/* Footer */}
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
