import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Paperclip,
  Upload,
  AlertTriangle
} from 'lucide-react';

export default function ResolutionModal({
  isOpen,
  onClose,
  complaint,
  onConfirmResolve
}) {
  const [resolutionNote, setResolutionNote] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmResolve(
        complaint.id,
        resolutionNote.trim() || 'Work completed successfully and tested by staff.',
        attachmentName || null
      );
      setResolutionNote('');
      setAttachmentName('');
      setIsSubmitting(false);
      onClose();
    }, 200);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#DDE8E3] dark:border-[#243338]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 flex items-center justify-center text-[#008F63] dark:text-[#00A875]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
                Mark as Resolved
              </h3>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
                Complaint ID: <strong className="font-mono text-[#008F63] dark:text-[#D4A84F]">{complaint.id}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#60717A] dark:text-[#9FB1BC] hover:bg-slate-100 dark:hover:bg-[#13242E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Question */}
        <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25">
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            Are you sure you want to mark this complaint as resolved?
          </p>
          <p className="text-[11px] text-emerald-700/90 dark:text-emerald-400/90 mt-1">
            "{complaint.title}" will transition to Resolved status (100% progress) and the student will be notified.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Resolution Note */}
          <div>
            <label className="block text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Resolution Note <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Describe the solution applied and operational verification..."
              className="w-full p-2.5 rounded-xl text-xs bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#008F63] dark:focus:border-[#00A875] focus:ring-1 focus:ring-[#008F63]/30 resize-none"
            />
          </div>

          {/* Optional Attachment */}
          <div>
            <label className="block text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Optional Attachment (e.g. proof of fix, inspection report)
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-dashed border-[#DDE8E3] dark:border-[#243338] hover:border-[#008F63] cursor-pointer transition-colors text-xs">
              <div className="flex items-center gap-2 text-[#60717A] dark:text-[#9FB1BC]">
                <Upload className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
                <span className="truncate">{attachmentName || 'Upload completion proof image/doc (Max 5MB)'}</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
              <span className="px-2 py-0.5 rounded bg-white dark:bg-[#0C1518] text-[10px] font-bold text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338]">
                Browse
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Resolving...' : 'Confirm Resolution'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
