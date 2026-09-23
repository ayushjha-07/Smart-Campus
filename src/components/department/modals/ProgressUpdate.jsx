import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquarePlus } from 'lucide-react';

export default function ProgressUpdate({ onPostUpdate, complaintId }) {
  const [updateText, setUpdateText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onPostUpdate(updateText.trim());
      setUpdateText('');
      setIsSubmitting(false);
    }, 200);
  };

  const sampleSuggestions = [
    'Maintenance team inspected the water pipeline.',
    'Replacement valve has been requested.',
    'Electrician dispatched to replace corridor fixtures.',
    'Housekeeping team conducted deep sanitation.'
  ];

  return (
    <div className="rounded-xl p-4 bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
          <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            Progress Update
          </h4>
        </div>
        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
          Appends directly to public timeline
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          rows={3}
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          placeholder="Describe the action taken…"
          className="w-full p-2.5 rounded-lg text-xs bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#008F63] dark:focus:border-[#00A875] focus:ring-1 focus:ring-[#008F63]/30 resize-none"
        />

        {/* Quick sample chips */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {sampleSuggestions.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => setUpdateText(sug)}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#60717A] dark:text-[#9FB1BC] hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:border-[#008F63]/40 transition-colors"
            >
              + {sug.slice(0, 32)}...
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!updateText.trim() || isSubmitting}
            className="px-4 py-2 rounded-lg bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] disabled:opacity-50 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Posting...' : 'Add Update'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
