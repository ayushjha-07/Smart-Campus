import React from 'react';
import { X, Ban, AlertTriangle } from 'lucide-react';

export default function DeactivateDepartmentModal({ isOpen, onClose, dept, onConfirmDeactivate }) {
  if (!isOpen || !dept) return null;

  const isInactive = dept.status === 'Inactive';

  const handleConfirm = () => {
    onConfirmDeactivate(dept.id, isInactive ? 'Active' : 'Inactive');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">
                {isInactive ? 'Reactivate Department' : 'Deactivate Department'}
              </h2>
              <p className="text-[11px] text-[#9FB1BC]">{dept.name} ({dept.code || dept.id})</p>
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
            {isInactive
              ? `Reactivate the ${dept.name} division and restore automatic complaint dispatch?`
              : `Deactivate the ${dept.name} division?`}
          </p>

          <div className="p-3.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl text-amber-300/90 leading-relaxed text-[11px] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p>
              {isInactive
                ? 'Department staff will resume ticket assignment notifications immediately.'
                : 'New complaints will not be automatically routed to a deactivated department. Active pending tickets will require manual administrative reassignment.'}
            </p>
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
                isInactive
                  ? 'bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] border border-[#D4A84F]/40'
                  : 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{isInactive ? 'Reactivate' : 'Deactivate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
