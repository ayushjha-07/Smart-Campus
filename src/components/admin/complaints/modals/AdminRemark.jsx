import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function AdminRemark({ onSaveRemark }) {
  const [remark, setRemark] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!remark.trim()) return;
    onSaveRemark(remark.trim());
    setRemark('');
  };

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#071A2B] dark:text-[#F5F5F0]">
          Add Admin Remark
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={3}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Write an internal/admin note…"
          className="w-full p-3 rounded-lg text-xs leading-relaxed bg-[#F5F5F0]/60 dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#008F63] dark:focus:border-[#00A875] resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!remark.trim()}
            className="px-4 py-2 rounded-lg bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Save Remark</span>
          </button>
        </div>
      </form>
    </div>
  );
}
