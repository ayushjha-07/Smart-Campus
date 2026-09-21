import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ShieldCheck, 
  GraduationCap, 
  Calendar, 
  Camera, 
  Save, 
  LogOut 
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';

export default function ProfileHeader({
  profile,
  hasChanges,
  isSaving,
  onSave,
  onAvatarChange,
}) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3B0]">
        <Link to="/student/dashboard" className="hover:text-[#14213D] dark:hover:text-[#F5F5F0] transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#168A5B]" />
        <span className="text-[#168A5B] font-semibold">Student Profile</span>
      </nav>

      {/* Profile Wide Banner Card with CGC Aerial Campus Background */}
      <div className="relative rounded-3xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 shadow-xl overflow-hidden transition-colors min-h-[190px] flex items-center">
        
        {/* Full-Bleed Real CGC Aerial Campus Photograph */}
        <img
          src={campusAssets.aerialImage}
          alt="CGC University Mohali Campus"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter brightness-[1.0] contrast-[1.02] z-0"
        />
        {/* Master Directional Contrast Gradient for Text Readability:
            - Left 45%: strong dark navy/black overlay (~82-84% opacity)
            - Middle 45%: smooth transition to transparent (down to ~18-20% opacity)
            - Right 10%: almost completely transparent, keeping CGC University building sharp & bright
        */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.85) 0%, rgba(5, 13, 18, 0.80) 40%, rgba(5, 13, 18, 0.40) 65%, rgba(5, 13, 18, 0.12) 85%, rgba(5, 13, 18, 0.0) 100%)'
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, rgba(5, 13, 18, 0.70) 0%, rgba(5, 13, 18, 0.20) 28%, transparent 55%)'
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Core Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            {/* Avatar Square with upload badge */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-[#168A5B] shadow-2xs group-hover:border-[#168A5B] transition-colors">
                {profile.avatarInitials || 'AJ'}
              </div>

              <button
                type="button"
                onClick={onAvatarChange}
                title="Change avatar photo"
                className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-[#168A5B] hover:bg-[#127049] border border-white text-white shadow-md transition-all group-hover:scale-110 cursor-pointer"
                aria-label="Upload photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Student Names & Badges */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#14213D] dark:text-[#F5F5F0] tracking-tight">
                  {profile.name}
                </h1>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-semibold text-[#168A5B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{profile.enrollmentStatus || 'Active / Verified'}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] dark:text-[#A8B3B0]">
                <span className="font-mono text-[#168A5B] font-bold bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-white/10">
                  #{profile.studentId}
                </span>

                <span className="flex items-center gap-1 text-[#14213D] dark:text-[#F5F5F0] font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#168A5B]" />
                  <span>{profile.branch}</span>
                </span>

                <span className="flex items-center gap-1 font-mono text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
                  <Calendar className="w-3 h-3 text-[#D4A84F]" />
                  <span>{profile.year} ({profile.semester})</span>
                </span>
              </div>

              {/* Institution Tag */}
              <div className="flex items-center gap-2 pt-0.5">
                <div className="bg-white px-1 py-0.5 rounded border border-slate-200">
                  <img src={campusAssets.logo} alt="CGC Mohali" className="h-3.5 w-auto object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#14213D] dark:text-[#F5F5F0]">
                  CGC University Mohali
                </span>
                <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0] uppercase tracking-wider">
                  • Department of Computer Science
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#DDE7E2] dark:border-white/10">
            {hasChanges && (
              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] hover:bg-[#127049] text-white transition-all shadow-2xs hover:-translate-y-0.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            )}

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#041118]/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-[#DDE7E2] dark:border-white/10 hover:border-rose-200 dark:hover:border-rose-500/30 text-[#64748B] dark:text-[#A8B3B0] hover:text-rose-700 dark:hover:text-rose-400 transition-colors shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
