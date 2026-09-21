import React, { useState } from 'react';
import { X, MessageSquarePlus, Send } from 'lucide-react';

export default function AdditionalInformationModal({
  isOpen,
  complaintId,
  onClose,
  onSubmitUpdate,
}) {
  const [additionalNote, setAdditionalNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!additionalNote.trim()) return;
    onSubmitUpdate(additionalNote.trim());
    setAdditionalNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-[#315C3A] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-[#315C3A]/20 border border-emerald-200 dark:border-[#315C3A]/40 flex items-center justify-center text-[#168A5B] dark:text-[#D4A84F]">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
                Add Information
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
                Supplemental update for ticket #{complaintId}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#07121A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70 block">
              Additional Details or Observations
            </label>
            <textarea
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Add additional information... (e.g. Technician arrived at 12:30 PM, tested valve, pressure restored on left wing only)"
              rows={4}
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] dark:focus:border-[#D4A84F] rounded-2xl p-3.5 text-xs text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#A8B3B0]/50 outline-none resize-none transition-colors"
            />
            <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]/60">
              This will be added to the live status audit log of this complaint.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DDE7E2] dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!additionalNote.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] dark:bg-[#D4A84F] hover:bg-[#127049] dark:hover:bg-[#E5BF6E] text-white dark:text-[#07121A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
