import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  UserCheck, 
  Phone, 
  Mail, 
  Utensils, 
  Wrench, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export default function ResidenceSection({ profile }) {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [reason, setReason] = useState('');

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferModalOpen(false);
      setReason('');
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-[#168A5B]">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Campus Residence & Hostel Details
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              Current living accommodations, hall warden, and dining mess allocations
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#168A5B] bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20 font-semibold">
          Semester 5 Allocation
        </span>
      </div>

      {/* Grid: Room & Block Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Hostel Block */}
        <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
            <Home className="w-3 h-3 text-[#168A5B]" />
            <span>Assigned Hostel Block</span>
          </span>
          <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
            {profile.hostelBlock || 'Hostel Block B (Kaveri Hall)'}
          </h4>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
            Undergraduate Boys Residential Quad
          </p>
        </div>

        {/* Room & Bed */}
        <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D4A84F]" />
            <span>Room & Bed Allotment</span>
          </span>
          <h4 className="text-sm font-bold text-[#168A5B] font-mono">
            {profile.roomNumber || 'Room 204'} • {profile.bedNumber || 'Bed #2'}
          </h4>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
            Double Occupancy • East Wing Facing
          </p>
        </div>

        {/* Dining Mess */}
        <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
            <Utensils className="w-3 h-3 text-[#168A5B]" />
            <span>Mess Facility Allocation</span>
          </span>
          <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
            {profile.messPlan || 'Central Dining Mess 1'}
          </h4>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
            Meal Plan Valid Through December 2026
          </p>
        </div>
      </div>

      {/* Warden & Hall Supervision Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#14213D] dark:text-[#F5F5F0]">
            <UserCheck className="w-4 h-4 text-[#168A5B]" />
            <span>Hostel Warden & Administration</span>
          </div>
          <span className="text-[10px] text-[#168A5B] uppercase font-bold">
            Administrative Staff
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0] block mb-0.5">Warden In-Charge</span>
            <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0]">{profile.wardenName || 'Dr. K. S. Verma'}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0] block mb-0.5">Office Phone</span>
            <a href={`tel:${profile.wardenContact}`} className="font-mono text-[#168A5B] hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#168A5B]" />
              <span>{profile.wardenContact || '+91 (080) 2854-9188'}</span>
            </a>
          </div>

          <div>
            <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0] block mb-0.5">Email</span>
            <a href={`mailto:${profile.wardenEmail}`} className="font-mono text-[#14213D] dark:text-[#F5F5F0] hover:text-[#168A5B] flex items-center gap-1 truncate">
              <Mail className="w-3 h-3 text-[#168A5B]" />
              <span className="truncate">{profile.wardenEmail || 'warden.blockb@smartcampus.edu'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Residence Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Report Room Issue */}
        <Link
          to="/student/complaints/new"
          className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 hover:bg-emerald-50/40 dark:hover:bg-emerald-500/10 border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] transition-all duration-200 flex items-center justify-between group text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[#168A5B] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#14213D] dark:text-[#F5F5F0] block">Report Hostel Maintenance</span>
              <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]">Water, electrical, fan, or furniture issues</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#168A5B] group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Room Transfer Request */}
        <button
          type="button"
          onClick={() => setTransferModalOpen(true)}
          className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 hover:bg-emerald-50/40 dark:hover:bg-emerald-500/10 border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] transition-all duration-200 flex items-center justify-between group text-xs text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[#D4A84F] flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#14213D] dark:text-[#F5F5F0] block">Request Room Relocation</span>
              <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]">Apply for inter-block or single room change</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#168A5B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Room Transfer Request Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-[#14213D] dark:text-[#F5F5F0]">
            <div className="flex items-start justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[#168A5B] flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">Room Relocation Request</h3>
                  <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">Hostel Affairs Council Protocol</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTransferModalOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {transferSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#168A5B] mx-auto" />
                <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">Application Forwarded!</h4>
                <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
                  Your room transfer petition has been forwarded to the Chief Hostel Warden for mid-term review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 flex items-start gap-2 text-[#64748B] dark:text-[#A8B3B0]">
                  <Info className="w-4 h-4 text-[#D4A84F] shrink-0 mt-0.5" />
                  <span>
                    Room changes are subject to vacancy in requested blocks and medical / academic merit criteria.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
                    Reason for Relocation Request
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Provide specific details (e.g. medical reason, peer study group, noise factors)..."
                    rows={4}
                    required
                    className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl p-3.5 text-xs text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#64748B] outline-none resize-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DDE7E2] dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setTransferModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] hover:bg-[#127049] text-white shadow-xs transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
