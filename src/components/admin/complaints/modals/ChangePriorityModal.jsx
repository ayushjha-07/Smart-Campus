import React, { useState } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import { COMPLAINT_PRIORITIES } from '../../../../data/adminComplaintsData';

const priorityConfig = {
  LOW: {
    color: '#71844A',
    bg: 'rgba(113, 132, 74, 0.15)',
    border: '#71844A',
    desc: 'Minor issue, standard SLA of 72 hours',
  },
  MEDIUM: {
    color: '#D4A84F',
    bg: 'rgba(212, 168, 79, 0.15)',
    border: '#D4A84F',
    desc: 'Affects daily routine, SLA of 24-48 hours',
  },
  HIGH: {
    color: '#F97316',
    bg: 'rgba(249, 115, 22, 0.15)',
    border: '#F97316',
    desc: 'Major disruption, dispatch required within 12 hours',
  },
  CRITICAL: {
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.18)',
    border: '#EF4444',
    desc: 'Safety or campus hazard, immediate action required',
  },
};

export default function ChangePriorityModal({
  isOpen,
  onClose,
  complaint,
  selectedCount = 1,
  isBulk = false,
  onUpdatePriority
}) {
  const [selectedPriority, setSelectedPriority] = useState(
    complaint?.priority?.toUpperCase() || 'MEDIUM'
  );
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePriority(selectedPriority, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">
                {isBulk ? `Set Priority (${selectedCount} Tickets)` : 'Change Priority'}
              </h3>
              <p className="text-xs text-[#9FB1BC]">Update ticket triage urgency level</p>
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
                <span className="text-[11px] text-[#9FB1BC]">Current: {complaint.priority}</span>
              </div>
              <p className="font-medium text-[#F5F5F0] text-xs truncate">{complaint.title}</p>
            </div>
          )}

          {isBulk && (
            <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] text-xs text-[#9FB1BC]">
              Updating priority for <strong className="text-[#F5F5F0]">{selectedCount}</strong> selected complaints.
            </div>
          )}

          <div className="space-y-2">
            <label className="block font-medium text-[#F5F5F0]">
              Select New Priority
            </label>
            <div className="grid grid-cols-1 gap-2">
              {COMPLAINT_PRIORITIES.map((level) => {
                const conf = priorityConfig[level];
                const isSelected = selectedPriority === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedPriority(level)}
                    className={`flex items-start justify-between p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#D4A84F] bg-[#13242E] shadow-sm'
                        : 'border-[#1A2E3B] bg-[#07121A] hover:bg-[#13242E]/70'
                    }`}
                  >
                    <div>
                      <span
                        className="text-xs font-bold tracking-wider px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: conf.bg,
                          color: conf.color,
                          border: `1px solid ${conf.border}40`,
                        }}
                      >
                        {level}
                      </span>
                      <p className="text-[11px] text-[#9FB1BC] mt-1">{conf.desc}</p>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
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

          <div>
            <label className="block font-medium text-[#9FB1BC] mb-1">
              Priority Adjustment Reason <span className="text-[10px] text-[#9FB1BC]/60">(Optional)</span>
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Escalated due to student welfare concerns..."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none placeholder-[#9FB1BC]/50"
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
              Update Priority
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
