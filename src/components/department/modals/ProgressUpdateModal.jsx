import React, { useState } from 'react';
import { X, MessageSquarePlus, Send, Sparkles } from 'lucide-react';

const exampleChips = [
  'Maintenance team has inspected the affected area.',
  'Replacement parts have been requested.',
  'Repair work is currently in progress.',
  'Technicians on-site conducting safety checks.',
];

export default function ProgressUpdateModal({
  isOpen,
  onClose,
  complaint,
  onPostUpdate
}) {
  const [updateText, setUpdateText] = useState('');

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;
    onPostUpdate(complaint.id, updateText.trim());
    setUpdateText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A84F] to-[#315C3A]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4A84F]/15 border border-[#D4A84F]/30 text-[#D4A84F]">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">
                Add Progress Update
              </h3>
              <p className="text-xs text-[#9FB1BC]">
                Post a field progress note visible on student tracking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="p-2.5 rounded-lg bg-[#07121A] border border-[#1A2E3B] flex items-center justify-between">
            <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
            <span className="text-[#9FB1BC] truncate max-w-[240px]">{complaint.title}</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-medium text-[#F5F5F0]">
                Student-Facing Progress Message
              </label>
              <span className="text-[10px] text-[#A7C481] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4A84F]" />
                Adds to timeline
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="Write an update for the student..."
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg p-3 text-xs text-[#F5F5F0] focus:outline-none resize-none placeholder-[#9FB1BC]/50"
            />
          </div>

          {/* Quick Examples */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#71844A] block mb-1.5">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {exampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setUpdateText(chip)}
                  className="px-2 py-1 rounded bg-[#13242E] hover:bg-[#1A2E3B] text-[10px] text-[#9FB1BC] hover:text-[#F5F5F0] border border-[#1A2E3B] text-left transition-colors"
                >
                  "{chip}"
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
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
              disabled={!updateText.trim()}
              className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] font-semibold border border-[#315C3A] shadow-glow-green flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              Post Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
