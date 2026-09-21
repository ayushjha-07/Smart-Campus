import React from 'react';
import { X, Ban, CheckCircle2 } from 'lucide-react';

export default function SuspendUserModal({ isOpen, onClose, user, onConfirmSuspend }) {
  if (!isOpen || !user) return null;

  const isCurrentlySuspended = user.status === 'Suspended';

  const handleConfirm = () => {
    onConfirmSuspend(user.id, isCurrentlySuspended ? 'Active' : 'Suspended');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isCurrentlySuspended
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
            }`}>
              {isCurrentlySuspended ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">
                {isCurrentlySuspended ? 'Reactivate Account' : 'Suspend Account'}
              </h2>
              <p className="text-[11px] text-[#9FB1BC]">{user.name} ({user.code || user.id})</p>
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
            {isCurrentlySuspended
              ? 'Reactivate this account and restore full portal privileges?'
              : 'Suspend this account?'}
          </p>

          <div className="p-3.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl text-[#9FB1BC] leading-relaxed text-[11px]">
            {isCurrentlySuspended
              ? 'The user will immediately regain authentication access to lodge complaints, view notices, and track progress.'
              : 'The user will no longer be able to access Smart Campus until the account is reactivated.'}
          </div>

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
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                isCurrentlySuspended
                  ? 'bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] border border-[#D4A84F]/40'
                  : 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{isCurrentlySuspended ? 'Reactivate Account' : 'Suspend Account'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
