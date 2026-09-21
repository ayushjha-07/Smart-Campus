import React from 'react';
import { History, User, MessageSquare } from 'lucide-react';
import ComplaintStatusBadge from '../complaints/ComplaintStatusBadge';

export default function StatusHistory({ statusHistory = [] }) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#168A5B] dark:text-[#71844A]" />
          <h4 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Status History
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#64748B] dark:text-[#A8B3B0]/60">
          {statusHistory.length} chronological audit entries
        </span>
      </div>

      {/* Desktop Table View (>= sm) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs text-[#64748B] dark:text-[#A8B3B0]">
          <thead>
            <tr className="border-b border-[#DDE7E2] dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]/60">
              <th className="py-2.5 px-3">Date & Time</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Updated By</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE7E2] dark:divide-white/5">
            {statusHistory.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-slate-50 dark:hover:bg-[#13242E]/50 transition-colors">
                <td className="py-3 px-3 font-mono text-[11px] text-[#14213D] dark:text-[#F5F5F0]/80 whitespace-nowrap">
                  {item.dateTime}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <ComplaintStatusBadge status={item.status} />
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#14213D] dark:text-[#F5F5F0]">
                    <User className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
                    {item.updatedBy}
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-[#64748B] dark:text-[#A8B3B0]">
                  {item.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (< sm) */}
      <div className="sm:hidden space-y-2.5">
        {statusHistory.map((item, index) => (
          <div
            key={item.id || index}
            className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
                {item.dateTime}
              </span>
              <ComplaintStatusBadge status={item.status} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#14213D] dark:text-[#F5F5F0] font-medium">
              <User className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
              <span>{item.updatedBy}</span>
            </div>

            <div className="p-2 rounded-xl bg-white dark:bg-[#050A0C] border border-[#DDE7E2] dark:border-white/5 flex items-start gap-2 text-xs text-[#64748B] dark:text-[#A8B3B0]">
              <MessageSquare className="w-3.5 h-3.5 text-[#D4A84F] shrink-0 mt-0.5" />
              <span>{item.remarks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
