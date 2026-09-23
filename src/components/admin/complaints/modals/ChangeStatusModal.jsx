import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';
import { COMPLAINT_STATUSES } from '../../../../data/adminComplaintsData';
import { StatusBadge } from '../ComplaintBadges';

export default function ChangeStatusModal({
  isOpen,
  onClose,
  complaint,
  selectedCount = 1,
  isBulk = false,
  onUpdateStatus
}) {
  const [selectedStatus, setSelectedStatus] = useState('In Progress');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (complaint) {
      setSelectedStatus(complaint.status || 'In Progress');
      setReason('');
    }
  }, [complaint, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(selectedStatus, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E3] dark:border-[#243338]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {isBulk ? `Change Status (${selectedCount} Tickets)` : 'Change Complaint Status'}
              </h3>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
                Update ticket progress in lifecycle
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
                <StatusBadge status={complaint.status} />
              </div>
              <p className="font-medium text-[#071A2B] dark:text-[#F5F5F0] truncate text-xs">
                {complaint.title}
              </p>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-2">
              Select New Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COMPLAINT_STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedStatus === st
                      ? 'border-[#008F63] bg-[#008F63]/10 dark:border-[#00A875] dark:bg-[#00A875]/15'
                      : 'border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/40 dark:bg-[#07121A] hover:border-[#008F63]'
                  }`}
                >
                  <StatusBadge status={st} />
                  {selectedStatus === st && (
                    <Check className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Status Change Reason <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide reason or progress remarks..."
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
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Update Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
