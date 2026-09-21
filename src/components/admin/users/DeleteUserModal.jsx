import React, { useState } from 'react';
import { X, Trash2, AlertOctagon } from 'lucide-react';

export default function DeleteUserModal({ isOpen, onClose, user, onConfirmDelete }) {
  const [confirmInput, setConfirmInput] = useState('');

  if (!isOpen || !user) return null;

  const isConfirmed = confirmInput.trim() === 'DELETE';

  const handleDelete = () => {
    if (!isConfirmed) return;
    onConfirmDelete(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-red-500/40 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-red-950/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-red-300">Delete User Account</h2>
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
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 leading-relaxed text-[11px]">
            <p className="font-semibold mb-1">Destructive Action Warning:</p>
            <p>
              This will remove <strong>{user.name}</strong> from active university directory records. All authentication tokens will be revoked immediately.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-1.5">
              To confirm deletion, type <span className="font-mono text-red-400 font-bold">DELETE</span> below:
            </label>
            <input
              type="text"
              placeholder="DELETE"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              className="w-full bg-[#0D1B22] border border-[#1A2E3B] focus:border-red-500 rounded-lg px-3 py-2 text-xs text-[#F5F5F0] font-mono tracking-wider focus:outline-none"
            />
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
              disabled={!isConfirmed}
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
