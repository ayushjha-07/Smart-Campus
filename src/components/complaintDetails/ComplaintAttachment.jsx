import React from 'react';
import { Paperclip, Eye, Download, Image as ImageIcon, FileQuestion } from 'lucide-react';

export default function ComplaintAttachment({ attachment, onViewImage, onDownloadImage }) {
  const hasImage = attachment && attachment.hasImage && attachment.url;

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70">
          <Paperclip className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
          <span>Supporting Evidence</span>
        </div>
        {hasImage && (
          <span className="text-[10px] font-mono text-[#168A5B] dark:text-[#71844A] bg-emerald-50 dark:bg-[#07121A] px-2 py-0.5 rounded-full border border-emerald-200 dark:border-white/5">
            1 Attachment Attached
          </span>
        )}
      </div>

      {hasImage ? (
        <div className="space-y-3">
          {/* Image Thumbnail Container */}
          <div 
            onClick={onViewImage}
            className="group relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 bg-slate-100 dark:bg-[#050A0C] cursor-pointer"
          >
            <img
              src={attachment.url}
              alt={attachment.name || 'Complaint supporting evidence'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-[#F5F5F0]">
              <span className="px-3 py-1.5 rounded-xl bg-black/70 border border-white/20 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                <Eye className="w-3.5 h-3.5 text-[#D4A84F]" />
                Click to expand
              </span>
            </div>
          </div>

          {/* Meta Info & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#315C3A]/20 border border-emerald-200 dark:border-[#315C3A]/40 flex items-center justify-center text-[#168A5B] dark:text-[#D4A84F] shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="font-mono font-medium text-[#14213D] dark:text-[#F5F5F0] truncate">
                  {attachment.name || 'hostel-water-issue.jpg'}
                </div>
                <div className="text-[10px] text-[#64748B] dark:text-[#A8B3B0]/60">
                  {attachment.size || '1.8 MB'} • Uploaded with complaint
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onViewImage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0D1B22] hover:bg-[#F5F8F6] dark:hover:bg-[#13242E] text-[#14213D] dark:text-[#F5F5F0] border border-[#DDE7E2] dark:border-white/10 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-[#168A5B] dark:text-[#71844A]" />
                <span>View Image</span>
              </button>

              <button
                type="button"
                onClick={onDownloadImage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#168A5B] dark:bg-[#315C3A] hover:bg-[#127049] dark:hover:bg-[#3d7047] text-white border border-[#D4A84F]/40 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#D4A84F]" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/60 border border-dashed border-[#DDE7E2] dark:border-white/10 text-center space-y-2">
          <FileQuestion className="w-8 h-8 text-[#94A3B8] dark:text-[#A8B3B0]/40 mx-auto" />
          <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]/70">
            No supporting image was attached.
          </p>
        </div>
      )}
    </div>
  );
}
