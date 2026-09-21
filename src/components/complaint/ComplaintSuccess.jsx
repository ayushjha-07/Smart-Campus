import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, ListOrdered, Compass } from 'lucide-react';

export default function ComplaintSuccess({
  complaintId = 'SC-2026-1848',
  priority = 'HIGH',
  title,
  category = 'General',
  department = 'Maintenance',
  confidence = 88
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="max-w-lg w-full bg-white border border-[#DDE7E2] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-scaleUp">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#16A36A] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
        </div>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#168A5B] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ticket Dispatched</span>
          </div>

          <h3 className="text-2xl font-extrabold text-[#14213D] tracking-tight">
            Complaint Submitted Successfully
          </h3>

          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed max-w-md mx-auto">
            Your complaint has been analyzed and routed to the appropriate department.
          </p>
        </div>

        {/* Ticket Reference Summary Card */}
        <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DDE7E2] text-left space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
              Complaint ID
            </span>
            <span className="font-mono text-sm font-bold text-[#168A5B]">
              {complaintId}
            </span>
          </div>

          {title && (
            <div className="text-xs text-[#14213D] font-medium truncate">
              &ldquo;{title}&rdquo;
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div>
              <span className="block text-[10px] text-[#64748B]">Category</span>
              <span className="font-semibold text-[#14213D] truncate block">{category}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#64748B]">Priority</span>
              <span className="font-bold text-[#D4A84F]">{priority}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#64748B]">Department</span>
              <span className="font-semibold text-[#168A5B] truncate block">{department}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#64748B]">Confidence</span>
              <span className="font-mono text-[#168A5B] font-bold">{confidence}%</span>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to={`/student/complaints/${complaintId}`}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#168A5B] text-white hover:bg-[#0B5D3B] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Compass className="w-4 h-4" />
            <span>Track Complaint</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </Link>

          <Link
            to="/student/complaints"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[#14213D] bg-white hover:bg-[#F8FAF9] border border-[#DDE7E2] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <ListOrdered className="w-4 h-4 text-[#168A5B]" />
            <span>View My Complaints</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
