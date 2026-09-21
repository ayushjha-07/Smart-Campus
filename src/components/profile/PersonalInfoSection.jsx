import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Lock, 
  AlertCircle, 
  Building2, 
  ShieldAlert 
} from 'lucide-react';

export default function PersonalInfoSection({
  profile,
  onChange,
  onSave,
  hasChanges,
  isSaving,
}) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-[#168A5B]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Personal & Academic Details
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              University enrolled identity and contact records
            </p>
          </div>
        </div>

        {hasChanges && (
          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-500/30 animate-pulse">
            Unsaved Changes
          </span>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="space-y-6"
      >
        {/* Academic & Identity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <User className="w-3 h-3 text-[#168A5B]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Student ID (Locked) */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#D4A84F]" />
                <span>Student Roll ID</span>
              </span>
              <span className="text-[9px] text-[#94A3B8] dark:text-[#A8B3B0] lowercase">Institutional ID</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={profile.studentId || ''}
                disabled
                className="w-full bg-[#F1F5F9] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#14213D] dark:text-[#CBD5E1] font-semibold opacity-90 cursor-not-allowed outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* University Email (Locked) */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#168A5B]" />
                <span>University Email</span>
              </span>
              <span className="text-[9px] text-[#94A3B8] dark:text-[#A8B3B0] lowercase">Institutional</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={profile.email || ''}
                disabled
                className="w-full bg-[#F1F5F9] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#14213D] dark:text-[#CBD5E1] opacity-90 cursor-not-allowed outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#D4A84F]" />
              <span>Contact Mobile Phone</span>
            </label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Branch / Department */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#168A5B]" />
              <span>Branch of Study</span>
            </label>
            <input
              type="text"
              value={profile.branch || ''}
              onChange={(e) => onChange('branch', e.target.value)}
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Academic Department */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#168A5B]" />
              <span>Faculty / School</span>
            </label>
            <input
              type="text"
              value={profile.department || ''}
              onChange={(e) => onChange('department', e.target.value)}
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Academic Year & Semester */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#168A5B]" />
              <span>Year & Semester</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={profile.year || ''}
                onChange={(e) => onChange('year', e.target.value)}
                placeholder="3rd Year"
                className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3 py-2 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
              />
              <input
                type="text"
                value={profile.semester || ''}
                onChange={(e) => onChange('semester', e.target.value)}
                placeholder="Semester 5"
                className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3 py-2 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Degree & Batch */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#D4A84F]" />
              <span>Degree Program</span>
            </label>
            <input
              type="text"
              value={profile.degree || ''}
              onChange={(e) => onChange('degree', e.target.value)}
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Current CGPA */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0] flex items-center justify-between">
              <span>Cumulative CGPA</span>
              <span className="text-[#168A5B] font-bold font-mono">Good Standing</span>
            </label>
            <input
              type="text"
              value={profile.cgpa || ''}
              disabled
              className="w-full bg-[#F1F5F9] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#168A5B] opacity-90 cursor-not-allowed outline-none"
            />
          </div>

        </div>

        {/* Emergency Contact Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#14213D] dark:text-[#F5F5F0]">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Emergency Guardian Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
                Guardian Name
              </label>
              <input
                type="text"
                value={profile.emergencyContactName || ''}
                onChange={(e) => onChange('emergencyContactName', e.target.value)}
                className="w-full bg-white dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] rounded-xl px-3 py-2 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
                Relationship
              </label>
              <input
                type="text"
                value={profile.emergencyContactRelation || ''}
                onChange={(e) => onChange('emergencyContactRelation', e.target.value)}
                className="w-full bg-white dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] rounded-xl px-3 py-2 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
                Emergency Phone
              </label>
              <input
                type="text"
                value={profile.emergencyContactPhone || ''}
                onChange={(e) => onChange('emergencyContactPhone', e.target.value)}
                className="w-full bg-white dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] rounded-xl px-3 py-2 text-xs font-mono text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer info & Save CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#DDE7E2] dark:border-white/10 text-xs text-[#64748B] dark:text-[#A8B3B0]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#168A5B]" />
            <span>Institutional details require campus registrar verification to modify.</span>
          </div>

          <button
            type="submit"
            disabled={!hasChanges || isSaving}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] hover:bg-[#127049] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-xs"
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}
