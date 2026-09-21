import React from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ConfirmActionModal({
  isOpen,
  onClose,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this operation?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'warning', // 'warning' | 'danger' | 'success'
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top Accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${
            type === 'danger'
              ? 'bg-red-500'
              : type === 'success'
              ? 'bg-[#315C3A]'
              : 'bg-[#D4A84F]'
          }`}
        />

        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${
              type === 'danger'
                ? 'bg-red-500/15 border-red-500/30 text-red-400'
                : type === 'success'
                ? 'bg-[#315C3A]/20 border-[#315C3A]/40 text-[#A7C481]'
                : 'bg-[#D4A84F]/15 border-[#D4A84F]/30 text-[#D4A84F]'
            }`}
          >
            {type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3.5 space-y-1.5 text-left">
          <h3 className="text-base font-bold text-[#F5F5F0]">{title}</h3>
          <p className="text-xs text-[#9FB1BC] leading-relaxed">{description}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1A2E3B] flex items-center justify-end gap-2.5 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] font-medium transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
              type === 'danger'
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
