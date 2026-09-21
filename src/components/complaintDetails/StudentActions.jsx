import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Mail, 
  MessageSquarePlus, 
  PlusCircle 
} from 'lucide-react';

export default function StudentActions({
  onTrackStatus,
  onOpenContactModal,
  onOpenAddInfoModal,
}) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-xl backdrop-blur-xl space-y-4">
      <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
        Student Actions
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Track Status */}
        <button
          type="button"
          onClick={onTrackStatus}
          className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A] hover:bg-slate-100 dark:hover:bg-[#13242E] border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] dark:hover:border-[#315C3A] text-[#14213D] dark:text-[#F5F5F0] text-xs font-semibold transition-all hover:-translate-y-0.5 shadow-2xs"
        >
          <Activity className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
          <span>Track Status</span>
        </button>

        {/* Contact Department */}
        <button
          type="button"
          onClick={onOpenContactModal}
          className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A] hover:bg-slate-100 dark:hover:bg-[#13242E] border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] dark:hover:border-[#315C3A] text-[#14213D] dark:text-[#F5F5F0] text-xs font-semibold transition-all hover:-translate-y-0.5 shadow-2xs"
        >
          <Mail className="w-4 h-4 text-[#168A5B] dark:text-[#71844A]" />
          <span>Contact Department</span>
        </button>

        {/* Add Information */}
        <button
          type="button"
          onClick={onOpenAddInfoModal}
          className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A] hover:bg-slate-100 dark:hover:bg-[#13242E] border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] dark:hover:border-[#315C3A] text-[#14213D] dark:text-[#F5F5F0] text-xs font-semibold transition-all hover:-translate-y-0.5 shadow-2xs"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#168A5B] dark:text-[#D4A84F]" />
          <span>Add Information</span>
        </button>

        {/* Report Another Issue */}
        <Link
          to="/student/complaints/new"
          className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#168A5B] dark:bg-[#315C3A] hover:bg-[#127049] dark:hover:bg-[#3d7047] border border-[#D4A84F]/40 text-white text-xs font-bold transition-all hover:-translate-y-0.5 shadow-md shadow-[#168A5B]/20"
        >
          <PlusCircle className="w-4 h-4 text-[#D4A84F]" />
          <span>Report Another Issue</span>
        </Link>
      </div>
    </div>
  );
}
