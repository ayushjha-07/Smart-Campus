import React from 'react';
import { Tag, MapPin } from 'lucide-react';
import ComplaintPriorityBadge from './ComplaintPriorityBadge';
import ComplaintStatusBadge from './ComplaintStatusBadge';
import ComplaintActions from './ComplaintActions';

export default function ComplaintTable({ complaints, onCopySuccess, onViewResolution }) {
  return (
    <div className="hidden md:block bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] rounded-2xl overflow-hidden shadow-2xs dark:shadow-xl transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#0B1736] dark:text-[#F5F7F5] whitespace-nowrap">
          <thead>
            <tr className="bg-[#F7F9F8] dark:bg-[#10242B] border-b border-[#DDE6E2] dark:border-[#1C3A42] text-[11px] font-bold uppercase tracking-wider text-[#607080] dark:text-[#A8B5B1]">
              <th className="py-3.5 px-4 font-bold">Complaint ID</th>
              <th className="py-3.5 px-4 font-bold">Complaint</th>
              <th className="py-3.5 px-4 font-bold">Category</th>
              <th className="py-3.5 px-4 font-bold">Priority</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold">Submitted</th>
              <th className="py-3.5 px-4 font-bold">Last Updated</th>
              <th className="py-3.5 px-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE6E2] dark:divide-[#1C3A42]">
            {complaints.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 dark:hover:bg-[#10242B]/70 transition-colors group"
              >
                {/* 1. Complaint ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-[#087F5B] dark:text-[#16B978]">
                  {item.id}
                </td>

                {/* 2. Complaint Title & Location */}
                <td className="py-3.5 px-4 max-w-[280px]">
                  <span className="font-semibold text-[#0B1736] dark:text-[#F5F7F5] block truncate group-hover:text-[#087F5B] dark:group-hover:text-[#16B978] transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#607080] dark:text-[#A8B5B1] flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 text-[#087F5B] dark:text-[#16B978] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                </td>

                {/* 3. Category */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] text-[11px] font-medium text-[#0B1736] dark:text-[#F5F7F5]">
                    <Tag className="w-3 h-3 text-[#087F5B] dark:text-[#16B978]" />
                    {item.category}
                  </span>
                </td>

                {/* 4. Priority */}
                <td className="py-3.5 px-4">
                  <ComplaintPriorityBadge priority={item.priority} />
                </td>

                {/* 5. Status */}
                <td className="py-3.5 px-4">
                  <ComplaintStatusBadge status={item.status} />
                </td>

                {/* 6. Submitted */}
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#607080] dark:text-[#A8B5B1]">
                  {item.submittedDate}
                </td>

                {/* 7. Last Updated */}
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#607080] dark:text-[#A8B5B1]">
                  {item.lastUpdated}
                </td>

                {/* 8. Action */}
                <td className="py-3.5 px-4 text-right">
                  <ComplaintActions
                    complaint={item}
                    onCopySuccess={onCopySuccess}
                    onViewResolution={onViewResolution}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
