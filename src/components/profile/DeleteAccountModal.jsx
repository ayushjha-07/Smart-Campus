import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteAccountModal({ isOpen, onClose, onConfirmDelete }) {
  const [confirmationInput, setConfirmationInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const isConfirmed = confirmationInput.trim() === 'DELETE';

  const handleDelete = () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onConfirmDelete && onConfirmDelete();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0B2027] border border-rose-200 dark:border-rose-900/40 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 relative animate-scaleUp text-[#10213A] dark:text-[#F5F7F5]">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-700 dark:text-rose-400">
                Delete Student Account
              </h3>
              <span className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                Permanent and irreversible action
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Message */}
        <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 text-xs text-[#10213A] dark:text-[#F5F7F5] leading-relaxed space-y-2">
          <p className="font-semibold text-rose-700 dark:text-rose-400">
            Warning: This action will permanently remove:
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-[#687A91] dark:text-[#91A7A5]">
            <li>All submitted complaints and dispute logs</li>
            <li>Academic verification badges and student ID record</li>
            <li>Notification history and system preferences</li>
          </ul>
        </div>

        {/* Confirmation Requirement */}
        <div className="space-y-1.5 text-xs">
          <label className="block text-[11px] font-semibold text-[#687A91] dark:text-[#91A7A5]">
            To confirm deletion, please type <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">DELETE</span> below:
          </label>
          <input
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            placeholder="Type DELETE"
            className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DCE7E3] dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:hover:bg-rose-600 text-white transition-all shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Account'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
