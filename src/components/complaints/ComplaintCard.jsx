import React from 'react';
import { Tag, MapPin, Calendar, Clock } from 'lucide-react';
import ComplaintPriorityBadge from './ComplaintPriorityBadge';
import ComplaintStatusBadge from './ComplaintStatusBadge';
import ComplaintActions from './ComplaintActions';

export default function ComplaintCard({ complaint, onCopySuccess, onViewResolution }) {
  return (
    <div className="bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] hover:border-[#087F5B]/40 dark:hover:border-[#16B978]/50 rounded-2xl p-4 shadow-2xs dark:shadow-xl transition-all duration-200 space-y-3">
      {/* Header: ID + Priority Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono text-xs font-bold text-[#087F5B] dark:text-[#16B978]">
            {complaint.id}
          </span>
          <h3 className="text-sm font-bold text-[#0B1736] dark:text-[#F5F7F5] mt-0.5 line-clamp-1">
            {complaint.title}
          </h3>
        </div>
        <div className="shrink-0 flex items-center gap-1.5">
          <ComplaintPriorityBadge priority={complaint.priority} />
        </div>
      </div>

      {/* Location & Category */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#607080] dark:text-[#A8B5B1]">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F9F8] dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] text-[11px] font-medium text-[#0B1736] dark:text-[#F5F7F5]">
          <Tag className="w-3 h-3 text-[#087F5B] dark:text-[#16B978]" />
          {complaint.category}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#607080] dark:text-[#A8B5B1]">
          <MapPin className="w-3 h-3 text-[#087F5B] dark:text-[#16B978] shrink-0" />
          <span className="truncate max-w-[190px]">{complaint.location}</span>
        </span>
      </div>

      {/* Description Snippet */}
      {complaint.description && (
        <p className="text-xs text-[#607080] dark:text-[#A8B5B1] line-clamp-2 leading-relaxed">
          {complaint.description}
        </p>
      )}

      {/* Dates row */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DDE6E2] dark:border-[#1C3A42] text-[11px]">
        <div className="flex items-center gap-1 text-[#607080] dark:text-[#A8B5B1]">
          <Calendar className="w-3 h-3 text-[#087F5B] dark:text-[#16B978]" />
          <span>Sub: <span className="font-mono text-[#0B1736] dark:text-[#F5F7F5] font-medium">{complaint.submittedDate}</span></span>
        </div>
        <div className="flex items-center gap-1 text-[#607080] dark:text-[#A8B5B1] justify-end">
          <Clock className="w-3 h-3 text-[#D9A62E] dark:text-[#D8A63C]" />
          <span>Upd: <span className="font-mono text-[#0B1736] dark:text-[#F5F7F5] font-medium">{complaint.lastUpdated}</span></span>
        </div>
      </div>

      {/* Footer: Status badge & Action buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-[#DDE6E2] dark:border-[#1C3A42]">
        <ComplaintStatusBadge status={complaint.status} />
        <ComplaintActions
          complaint={complaint}
          onCopySuccess={onCopySuccess}
          onViewResolution={onViewResolution}
        />
      </div>
    </div>
  );
}
