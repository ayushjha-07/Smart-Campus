import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Tag } from 'lucide-react';
import ComplaintStatusBadge from '../complaints/ComplaintStatusBadge';

export default function RelatedComplaints({ relatedComplaints = [] }) {
  if (!relatedComplaints || relatedComplaints.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#168A5B] dark:text-[#71844A]" />
          <h4 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Related Complaints
          </h4>
        </div>
        <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0]/60">
          Similar facility issues in this campus sector
        </span>
      </div>

      {/* Grid of Related Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {relatedComplaints.map((item) => (
          <Link
            key={item.id}
            to={`/student/complaints/${item.id}`}
            className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/80 hover:bg-slate-100 dark:hover:bg-[#13242E] border border-[#DDE7E2] dark:border-white/5 hover:border-[#168A5B] dark:hover:border-[#315C3A] transition-all duration-200 group space-y-2.5 block"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-[#168A5B] dark:text-[#D4A84F] group-hover:text-[#127049] dark:group-hover:text-[#E5BF6E]">
                #{item.id}
              </span>
              <ComplaintStatusBadge status={item.status} />
            </div>

            <h5 className="text-xs sm:text-sm font-semibold text-[#14213D] dark:text-[#F5F5F0] group-hover:text-[#168A5B] dark:group-hover:text-[#D4A84F] transition-colors line-clamp-1">
              {item.title}
            </h5>

            <div className="flex items-center justify-between pt-1 border-t border-[#DDE7E2] dark:border-white/5 text-xs text-[#64748B] dark:text-[#A8B3B0]">
              <span className="inline-flex items-center gap-1 text-[11px]">
                <Tag className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#168A5B] dark:text-[#D4A84F] font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
