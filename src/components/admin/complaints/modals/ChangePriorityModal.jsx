import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import { PriorityBadge } from '../ComplaintBadges';

const priorityConfig = {
  Low: {
    color: '#71844A',
    desc: 'Minor issue, standard SLA of 72 hours',
  },
  Medium: {
    color: '#D4A84F',
    desc: 'Affects daily routine, SLA of 24-48 hours',
  },
  High: {
    color: '#F97316',
    desc: 'Major disruption, dispatch required within 12 hours',
  },
  Critical: {
    color: '#EF4444',
    desc: 'Safety or campus hazard, immediate emergency dispatch',
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
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (complaint) {
      setSelectedPriority(complaint.priority || 'Medium');
      setReason('');
    }
  }, [complaint, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePriority(selectedPriority, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E3] dark:border-[#243338]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {isBulk ? `Change Priority (${selectedCount} Tickets)` : 'Change Complaint Priority'}
              </h3>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
                Escalate or adjust operational triage level
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {!isBulk && complaint && (
            <div className="p-3 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#008F63] dark:text-[#D4A84F] font-bold">
                  {complaint.id}
                </span>
                <PriorityBadge priority={complaint.priority} />
              </div>
              <p className="font-medium text-[#071A2B] dark:text-[#F5F5F0] truncate text-xs">
                {complaint.title}
              </p>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-2">
              Select Priority Level
            </label>
            <div className="space-y-2">
              {['Low', 'Medium', 'High', 'Critical'].map((pr) => {
                const isSelected = selectedPriority.toUpperCase() === pr.toUpperCase();
                return (
                  <button
                    key={pr}
                    type="button"
                    onClick={() => setSelectedPriority(pr)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#008F63] bg-[#008F63]/10 dark:border-[#00A875] dark:bg-[#00A875]/15'
                        : 'border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/40 dark:bg-[#07121A] hover:border-[#008F63]'
                    }`}
                  >
                    <div>
                      <PriorityBadge priority={pr} />
                      <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] mt-1">
                        {priorityConfig[pr]?.desc}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Reason for Adjustment <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Justification for priority escalation or relaxation..."
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl p-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none resize-none placeholder-[#60717A]/60 dark:placeholder-[#9FB1BC]/60"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#DDE8E3] dark:border-[#243338] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Update Priority</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
