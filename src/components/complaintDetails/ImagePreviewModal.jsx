import React from 'react';
import { X, Download, Image as ImageIcon } from 'lucide-react';

export default function ImagePreviewModal({ isOpen, attachment, onClose, onDownload }) {
  if (!isOpen || !attachment || !attachment.url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-[#315C3A] rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <ImageIcon className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
            <span className="font-mono font-bold text-[#14213D] dark:text-[#F5F5F0]">
              {attachment.name || 'hostel-water-issue.jpg'}
            </span>
            <span className="text-[#64748B] dark:text-[#A8B3B0]/60">
              ({attachment.size || '1.8 MB'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#168A5B] dark:bg-[#315C3A] hover:bg-[#127049] dark:hover:bg-[#3d7047] text-white border border-[#D4A84F]/40 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#07121A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High Resolution Image */}
        <div className="max-h-[70vh] overflow-hidden rounded-2xl border border-[#DDE7E2] dark:border-white/10 bg-slate-900 dark:bg-[#050A0C] flex items-center justify-center">
          <img
            src={attachment.url}
            alt={attachment.name || 'Complaint supporting evidence preview'}
            className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
          />
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#A8B3B0]/70 pt-1">
          <span>Uploaded during complaint submission</span>
          <span className="font-mono text-[#168A5B] dark:text-[#71844A]">Verified student photo evidence</span>
        </div>
      </div>
    </div>
  );
}
