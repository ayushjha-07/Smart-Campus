import React from 'react';
import { X, KeyRound, Mail, Send } from 'lucide-react';

export default function ResetPasswordModal({ isOpen, onClose, user, onConfirmReset }) {
  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    onConfirmReset(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">Reset User Password</h2>
              <p className="text-[11px] text-[#9FB1BC]">{user.name} ({user.email})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#F5F5F0] leading-relaxed">
            Send password reset instructions to this user?
          </p>

          <div className="p-3.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#D4A84F] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-[#9FB1BC] block">Target Email Address</span>
              <span className="text-xs font-mono text-[#F5F5F0] truncate block">{user.email}</span>
            </div>
          </div>

          <p className="text-[11px] text-[#9FB1BC] leading-relaxed">
            An encrypted one-time recovery token will be dispatched to the verified email address. The link will remain valid for 24 hours.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1A2E3B]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Send Reset Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
