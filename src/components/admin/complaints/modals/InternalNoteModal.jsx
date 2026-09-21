import React, { useState } from 'react';
import { X, MessageSquare, Check } from 'lucide-react';

export default function InternalNoteModal({ isOpen, onClose, complaint, onSaveNote }) {
  const [noteText, setNoteText] = useState('');

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSaveNote(complaint.id, noteText.trim());
    setNoteText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A84F] to-[#71844A]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4A84F]/15 border border-[#D4A84F]/30 text-[#D4A84F]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">Add Internal Note</h3>
              <p className="text-xs text-[#9FB1BC]">Administrative and department log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
              <span className="text-[11px] text-[#9FB1BC]">{complaint.department}</span>
            </div>
            <p className="font-medium text-[#F5F5F0] text-xs truncate">{complaint.title}</p>
          </div>

          <div>
            <label className="block font-medium text-[#F5F5F0] mb-1.5">
              Internal Note
            </label>
            <textarea
              rows={4}
              required
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write an internal note for administrators or department staff..."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg p-3 text-xs text-[#F5F5F0] focus:outline-none resize-none placeholder-[#9FB1BC]/50"
            />
          </div>

          <div className="text-[11px] text-[#9FB1BC]">
            Notes are confidential and will be visible only to administrative staff.
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#1A2E3B] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!noteText.trim()}
              className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] font-semibold border border-[#315C3A] shadow-glow-green flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
