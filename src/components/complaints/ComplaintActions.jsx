import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MoreVertical, 
  ArrowRight, 
  Copy, 
  Check, 
  Eye, 
  CheckCircle, 
  Activity 
} from 'lucide-react';

export default function ComplaintActions({ complaint, onCopySuccess, onViewResolution }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaint.id);
    setCopied(true);
    if (onCopySuccess) onCopySuccess(complaint.id);
    setTimeout(() => setCopied(false), 2000);
    setMenuOpen(false);
  };

  return (
    <div className="relative flex items-center justify-end gap-2">
      {/* Primary "View Details →" Button */}
      <Link
        to={`/student/complaints/${complaint.id}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#087F5B] hover:text-white bg-emerald-50/90 hover:bg-[#087F5B] border border-emerald-200/90 hover:border-[#087F5B] dark:bg-[#10242B] dark:text-[#16B978] dark:border-[#1C3A42] dark:hover:bg-[#16B978] dark:hover:text-[#061217] transition-all duration-150 shadow-2xs group"
      >
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Three-Dot Popover Menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="More actions"
          className="p-1.5 rounded-lg bg-white dark:bg-[#10242B] border border-[#DDE6E2] dark:border-[#1C3A42] hover:bg-slate-50 dark:hover:bg-[#152e37] text-[#607080] dark:text-[#A8B5B1] hover:text-[#0B1736] dark:hover:text-[#F5F7F5] transition-colors cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop click-away */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] shadow-xl p-1.5 z-40 animate-fadeIn text-left text-xs">
              <Link
                to={`/student/complaints/${complaint.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#0B1736] dark:text-[#F5F7F5] hover:bg-[#F7F9F8] dark:hover:bg-[#10242B] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#087F5B] dark:text-[#16B978]" />
                <span>View Details</span>
              </Link>

              <Link
                to={`/student/complaints/${complaint.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#0B1736] dark:text-[#F5F7F5] hover:bg-[#F7F9F8] dark:hover:bg-[#10242B] transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-[#D9A62E] dark:text-[#D8A63C]" />
                <span>Track Complaint</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyId}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#607080] dark:text-[#A8B5B1] hover:text-[#0B1736] dark:hover:text-[#F5F7F5] hover:bg-[#F7F9F8] dark:hover:bg-[#10242B] transition-colors text-left cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#087F5B] dark:text-[#16B978]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#607080] dark:text-[#A8B5B1]" />
                )}
                <span>{copied ? 'Copied!' : 'Copy Complaint ID'}</span>
              </button>

              {complaint.status === 'Resolved' && complaint.resolutionNote && (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (onViewResolution) onViewResolution(complaint);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#087F5B] dark:text-[#16B978] hover:bg-emerald-50 dark:hover:bg-[#10242B] transition-colors text-left border-t border-[#DDE6E2] dark:border-[#1C3A42] mt-1 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#087F5B] dark:text-[#16B978]" />
                  <span>View Resolution</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
