import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  User, 
  GraduationCap, 
  Calendar, 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  CalendarDays, 
  ShieldCheck, 
  Shield, 
  Check, 
  Pencil, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  Sliders, 
  Globe, 
  Bell, 
  Lock, 
  Eye, 
  FileText, 
  AlertTriangle, 
  AlertCircle, 
  LogOut, 
  Trash2, 
  DoorClosed, 
  Home, 
  Sparkles,
  Save,
  X,
  Layers,
  BookOpen,
  Hash,
  PlusCircle,
  ClipboardList
} from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StudentAvatar from '../components/profile/StudentAvatar';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import DeleteAccountModal from '../components/profile/DeleteAccountModal';
import ManageSessionsModal from '../components/profile/ManageSessionsModal';
import EditEmergencyModal from '../components/profile/EditEmergencyModal';
import EditContactModal from '../components/profile/EditContactModal';
import ManagePrivacyModal from '../components/profile/ManagePrivacyModal';
import { 
  loadStudentProfile, 
  saveStudentProfile 
} from '../data/mockStudentData';
import { useApp } from '../context/useApp';
import campusAssets from '../assets/campusAssets';

export default function StudentProfile() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  // Master profile state
  const [profile, setProfile] = useState(() => loadStudentProfile());

  // Inline editing state for Personal Information
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    name: profile.name,
    studentId: profile.studentId,
    email: profile.email,
    phone: profile.phone,
    dob: profile.dob,
    gender: profile.gender,
  });

  // Modals state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Floating toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Profile | Smart Campus CGC University Mohali";
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const updateAndPersistProfile = (updated) => {
    setProfile(updated);
    saveStudentProfile(updated);
  };

  // Personal Information inline save
  const handleSavePersonal = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name: personalForm.name,
      studentId: personalForm.studentId,
      email: personalForm.email,
      phone: personalForm.phone,
      dob: personalForm.dob,
      gender: personalForm.gender,
    };
    updateAndPersistProfile(updated);
    setIsEditingPersonal(false);
    showToast('Personal information updated successfully.');
  };

  // Preference Toggle Handler
  const handleTogglePreference = (key) => {
    const updatedPrefs = {
      ...profile.preferences,
      [key]: !profile.preferences[key],
    };
    const updated = {
      ...profile,
      preferences: updatedPrefs,
    };
    updateAndPersistProfile(updated);
    showToast(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} updated.`);
  };

  // Emergency Contact Modal Save
  const handleSaveEmergency = (data) => {
    const updated = {
      ...profile,
      ...data,
      completionPercentage: 100, // Completing emergency contact finishes 100% profile completion!
      missingInfoTitle: null,
    };
    updateAndPersistProfile(updated);
    showToast('Emergency contact details updated.');
  };

  // Contact Info Modal Save
  const handleSaveContact = (data) => {
    const updated = {
      ...profile,
      ...data,
    };
    updateAndPersistProfile(updated);
    showToast('Contact and residence details updated.');
  };

  // Privacy Settings Save
  const handleSavePrivacy = (data) => {
    const updated = {
      ...profile,
      privacy: data,
    };
    updateAndPersistProfile(updated);
    showToast('Privacy preferences saved.');
  };

  // Logout Handler
  const handleLogout = () => {
    showToast('Logging out of student account...');
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  // Delete Account Handler
  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    showToast('Your student account has been scheduled for permanent removal.');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#10233D] dark:text-[#F5F7F5] transition-colors duration-200 flex antialiased selection:bg-[#078A5A] selection:text-white">
      
      {/* Fixed Left Sidebar with CGC Gate Entrance Background (280px width) */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
        
        {/* Sticky Dashboard Header */}
        <DashboardHeader
          onToggleMobile={() => setMobileSidebarOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
        />

        {/* Scrollable Profile Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 max-w-[1400px] w-full mx-auto">
          
          {/* ================================================== */}
          {/* 1. TOP BREADCRUMB & TITLE BANNER (HERO BACKGROUND) */}
          {/* ================================================== */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[195px] sm:min-h-[215px] flex items-center justify-between transition-all">
            
            {/* Real CGC Aerial Campus Photo (100% Opacity, Sharp, Real Photograph) */}
            <img
              src={campusAssets.aerialImage}
              alt="CGC University Mohali Aerial Campus"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 filter brightness-[1.0] contrast-[1.02]"
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

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 w-full">
              
              {/* Left Details */}
              <div className="space-y-2.5 max-w-xl">
                {/* Top Pill Badge: Smart Campus */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <span>Smart Campus</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    My <span className="text-[#10E894]">Profile</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs leading-relaxed max-w-lg">
                    Manage your personal information, academic details, preferences, and account security.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link
                    to="/student/complaints/new"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#078A5A] hover:bg-[#06734B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Complaint</span>
                  </Link>

                  <Link
                    to="/student/complaints"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10213A] bg-white hover:bg-slate-100 border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <ClipboardList className="w-4 h-4 text-[#10213A]" />
                    <span>View My Complaints</span>
                  </Link>
                </div>
              </div>

              {/* Right Side: Script Calligraphy Overlay */}
              <div className="hidden sm:block text-right select-none pr-3 sm:pr-4 shrink-0">
                <p className="font-serif italic text-2xl lg:text-3xl text-white font-medium tracking-tight leading-none drop-shadow-md">
                  Your Voice
                </p>
                <p className="font-serif italic text-2xl lg:text-3xl text-[#10E894] font-bold tracking-tight leading-none mt-1 drop-shadow-md">
                  A Better Campus
                </p>
                {/* Curved Underline Stroke */}
                <div className="flex justify-end">
                  <svg
                    className="w-32 sm:w-40 h-2.5 sm:h-3 text-[#10E894] mt-1"
                    viewBox="0 0 150 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 8.5C45 2.5 105 2.5 146 6.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* ================================================== */}
          {/* 2. PROFILE HERO CARD (AVATAR & CORE IDENTITY)       */}
          {/* ================================================== */}
          <div className="relative rounded-2xl bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors overflow-hidden">
            {/* Subtle Campus Texture Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 z-0">
              <img
                src={campusAssets.aerialImage}
                alt="Background overlay"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              
              {/* Left: Avatar + Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                {/* Student Portrait Avatar */}
                <StudentAvatar
                  onAvatarChange={() => showToast('Profile avatar photo upload dialog opened.')}
                  size="large"
                />

                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-[#10213A] dark:text-[#F5F7F5] tracking-tight">
                    {profile.name}
                  </h2>
                  <p className="text-xs sm:text-[13px] font-semibold text-[#687A91] dark:text-[#91A7A5]">
                    {profile.role}
                  </p>

                  {/* Metadata chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>{profile.program} ({profile.department.includes('Computer') ? 'CSE' : 'Eng'})</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#D8A93E]" />
                      <span>{profile.year}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] font-medium">
                      <Building className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>{profile.campus}</span>
                    </span>
                  </div>

                  {/* Student ID line */}
                  <div className="pt-1 text-xs font-mono text-[#687A91] dark:text-[#91A7A5]">
                    <span>Student ID: </span>
                    <span className="font-bold text-[#078A5A] dark:text-[#00B87A]">{profile.studentId}</span>
                  </div>
                </div>
              </div>

              {/* Right: Edit Profile Button */}
              <div className="self-start md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPersonal(true);
                    showToast('Personal information fields are now editable.');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-all shadow-md shadow-[#078A5A]/20 dark:shadow-[#00B87A]/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>

            </div>
          </div>

          {/* ================================================== */}
          {/* 3. PROFILE COMPLETION HORIZONTAL CARD               */}
          {/* ================================================== */}
          <div className="rounded-2xl bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Left: Trophy + Progress Bar */}
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A] shrink-0 shadow-2xs">
                  <Trophy className="w-5 h-5" />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                      Profile Completion
                    </h3>
                  </div>

                  <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                    Complete your profile to improve your Smart Campus experience.
                  </p>

                  {/* Progress bar line */}
                  <div className="flex items-center gap-3 pt-1 max-w-xl">
                    <div className="flex-1 h-2 rounded-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 overflow-hidden">
                      <div
                        className="h-full bg-[#078A5A] dark:bg-[#00B87A] rounded-full transition-all duration-500"
                        style={{ width: `${profile.completionPercentage}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#078A5A] dark:text-[#00B87A]">
                      {profile.completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Missing Information Notice + Complete Profile Button */}
              {profile.completionPercentage < 100 && (
                <div className="flex items-center justify-between sm:justify-end gap-3 p-2.5 sm:p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 shrink-0">
                  <div className="flex items-center gap-2 text-left">
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                        Missing Information
                      </span>
                      <span className="block text-xs font-medium text-[#10213A] dark:text-[#F5F7F5]">
                        {profile.missingInfoTitle || 'Emergency Contact'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEmergencyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#D8A93E] hover:bg-[#C9972E] text-[#10213A] transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <span>Complete Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* ================================================== */}
          {/* 4. TWO-COLUMN ROW: PERSONAL + ACADEMIC INFORMATION */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            
            {/* CARD 1: Personal Information */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    Personal Information
                  </h3>
                </div>

                {!isEditingPersonal ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingPersonal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-[#687A91] hover:text-[#078A5A] dark:text-[#91A7A5] dark:hover:text-[#00B87A] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingPersonal(false)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-[#687A91] hover:text-[#10213A] dark:text-[#91A7A5] dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

              {/* View / Edit Mode */}
              {!isEditingPersonal ? (
                <div className="space-y-3 text-xs">
                  {/* Full Name */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <User className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Full Name</span>
                    </div>
                    <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.name}
                    </span>
                  </div>

                  {/* Student ID */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Hash className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Student ID</span>
                    </div>
                    <span className="font-mono font-bold text-[#078A5A] dark:text-[#00B87A]">
                      {profile.studentId}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Mail className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Email</span>
                    </div>
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.email}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Phone className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Phone</span>
                    </div>
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.phone}
                    </span>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <CalendarDays className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Date of Birth</span>
                    </div>
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.dob}
                    </span>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <User className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Gender</span>
                    </div>
                    <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.gender}
                    </span>
                  </div>
                </div>
              ) : (
                /* Editable Form */
                <form onSubmit={handleSavePersonal} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Full Name</label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Student ID</label>
                      <input
                        type="text"
                        value={personalForm.studentId}
                        onChange={(e) => setPersonalForm({ ...personalForm, studentId: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Email</label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Phone</label>
                      <input
                        type="tel"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Date of Birth</label>
                      <input
                        type="text"
                        value={personalForm.dob}
                        onChange={(e) => setPersonalForm({ ...personalForm, dob: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5]">Gender</label>
                      <select
                        value={personalForm.gender}
                        onChange={(e) => setPersonalForm({ ...personalForm, gender: e.target.value })}
                        className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingPersonal(false)}
                      className="px-3 py-1.5 rounded-lg border text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#078A5A] text-white text-xs font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* CARD 2: Academic Information */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    Academic Information
                  </h3>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-[#687A91] dark:text-[#91A7A5]">
                  Official Record
                </span>
              </div>

              {/* Fields List */}
              <div className="space-y-3 text-xs">
                {/* Department */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Building className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Department</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5] text-right truncate max-w-[220px]">
                    {profile.department}
                  </span>
                </div>

                {/* Program */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <BookOpen className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Program</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.program}
                  </span>
                </div>

                {/* Year */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Calendar className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Year</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.year}
                  </span>
                </div>

                {/* Semester */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Layers className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Semester</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.semester}
                  </span>
                </div>

                {/* Enrollment Status */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Enrollment Status</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#078A5A] dark:bg-[#00B87A]" />
                    <span>Active</span>
                  </span>
                </div>

                {/* Campus */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <MapPin className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Campus</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.campus}
                  </span>
                </div>

                {/* Academic Year */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <CalendarDays className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Academic Year</span>
                  </div>
                  <span className="font-mono font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.academicYear}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* 5. TWO-COLUMN ROW: CONTACT + EMERGENCY CONTACT      */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            
            {/* CARD 3: Contact Information */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    Contact Information
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-[#687A91] hover:text-[#078A5A] dark:text-[#91A7A5] dark:hover:text-[#00B87A] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Fields List */}
              <div className="space-y-3 text-xs">
                {/* Email */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Mail className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.email}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Phone className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Phone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.phone}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                {/* Campus Address */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Building className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Campus Address</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.campusAddress}
                  </span>
                </div>

                {/* Hostel */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <Home className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Hostel</span>
                  </div>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.hostel}
                  </span>
                </div>

                {/* Room */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                    <DoorClosed className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                    <span>Room</span>
                  </div>
                  <span className="font-mono font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.room}
                  </span>
                </div>
              </div>

            </div>

            {/* CARD 4: Emergency Contact */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                      Emergency Contact
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEmergencyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-[#687A91] hover:text-[#078A5A] dark:text-[#91A7A5] dark:hover:text-[#00B87A] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Fields List */}
                <div className="space-y-3 text-xs">
                  {/* Name */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <User className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Name</span>
                    </div>
                    <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.emergencyName}
                    </span>
                  </div>

                  {/* Relationship */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Shield className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Relationship</span>
                    </div>
                    <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.emergencyRelation}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Phone className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Phone</span>
                    </div>
                    <span className="font-mono text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.emergencyPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Yellow Notice at bottom */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 flex items-center gap-2 text-amber-800 dark:text-amber-300 text-[11px] mt-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#D8A93E]" />
                <span>Keep your emergency contact updated for your safety.</span>
              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* 6. THREE-COLUMN ROW: SECURITY + PREFS + PRIVACY     */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            
            {/* CARD 5: Account Security */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                      Account Security
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>Secure</span>
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3 text-xs">
                  {/* Email Verification */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <span className="text-[#687A91] dark:text-[#91A7A5]">Email Verification</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Phone Verification */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <span className="text-[#687A91] dark:text-[#91A7A5]">Phone Verification</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Password */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[#687A91] dark:text-[#91A7A5]">Password</span>
                    <span className="font-mono text-[11px] text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.lastPasswordChange}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#DCE7E3] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-white/10 text-[#10213A] dark:text-[#F5F7F5] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer text-center"
                >
                  Change Password
                </button>

                <button
                  type="button"
                  onClick={() => setSessionsModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-white/10 text-[#10213A] dark:text-[#F5F7F5] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer text-center"
                >
                  Manage Login Sessions
                </button>
              </div>

            </div>

            {/* CARD 6: Preferences */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    Preferences
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  title="Toggle Light/Dark Theme"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-[#687A91] hover:text-[#078A5A] dark:text-[#91A7A5] dark:hover:text-[#00B87A] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Rows */}
              <div className="space-y-3 text-xs">
                {/* Theme */}
                <div className="flex items-center justify-between py-1 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Theme</span>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {theme === 'dark' ? 'Dark (Current)' : 'Light (Current)'}
                  </span>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between py-1 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Language</span>
                  <span className="font-semibold text-[#10213A] dark:text-[#F5F7F5]">
                    {profile.preferences.language}
                  </span>
                </div>

                {/* Notification Preferences Link */}
                <div className="flex items-center justify-between py-1 border-b border-[#DCE7E3]/60 dark:border-white/5">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Notification Preferences</span>
                  <Link
                    to="/student/notifications"
                    className="text-[#078A5A] dark:text-[#00B87A] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Manage Notifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Switch 1: Complaint Status Updates */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Complaint Status Updates</span>
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('complaintStatusUpdates')}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      profile.preferences.complaintStatusUpdates ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        profile.preferences.complaintStatusUpdates ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 2: Email Notifications */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Email Notifications</span>
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('emailNotifications')}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      profile.preferences.emailNotifications ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        profile.preferences.emailNotifications ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 3: Push Notifications */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Push Notifications</span>
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('pushNotifications')}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      profile.preferences.pushNotifications ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        profile.preferences.pushNotifications ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 4: Department Alerts */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Department Alerts</span>
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('departmentAlerts')}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      profile.preferences.departmentAlerts ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        profile.preferences.departmentAlerts ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 5: Critical Alerts */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Critical Alerts</span>
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('criticalAlerts')}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                      profile.preferences.criticalAlerts ? 'bg-[#078A5A] dark:bg-[#00B87A]' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        profile.preferences.criticalAlerts ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>

            {/* CARD 7: Privacy Settings */}
            <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl transition-colors space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                      Privacy Settings
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-[#687A91] hover:text-[#078A5A] dark:text-[#91A7A5] dark:hover:text-[#00B87A] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Rows */}
                <div className="space-y-3 text-xs">
                  {/* Profile Visibility */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Eye className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Profile Visibility</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg font-semibold bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.privacy.profileVisibility}
                    </span>
                  </div>

                  {/* Complaint Activity */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#DCE7E3]/60 dark:border-white/5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <FileText className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Complaint Activity</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg font-semibold bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5]">
                      {profile.privacy.complaintActivity}
                    </span>
                  </div>

                  {/* Notification History */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 text-[#687A91] dark:text-[#91A7A5]">
                      <Bell className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                      <span>Notification History</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[#078A5A] dark:text-[#00B87A]">
                      {profile.privacy.notificationHistory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#DCE7E3] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-white/10 text-[#10213A] dark:text-[#F5F7F5] border border-[#DCE7E3] dark:border-white/10 transition-colors cursor-pointer text-center"
                >
                  Manage Privacy
                </button>
              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* 7. BOTTOM CARD: ACCOUNT ACTIONS                     */}
          {/* ================================================== */}
          <div className="rounded-2xl bg-white dark:bg-[#0B2027] border border-rose-100 dark:border-rose-950/40 p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              {/* Header & Subtext */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-sm sm:text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                    Account Actions
                  </h3>
                </div>
                <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                  Deleting your account is permanent and cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-[#10242B] border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] transition-colors shadow-2xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>

                {/* Delete Account Button */}
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-700 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 transition-all shadow-2xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Account</span>
                </button>
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 text-xs font-semibold text-[#10213A] dark:text-[#F5F7F5] shadow-xl animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => showToast('Password updated securely.')}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteAccount}
      />

      {/* Manage Login Sessions Modal */}
      <ManageSessionsModal
        isOpen={sessionsModalOpen}
        onClose={() => setSessionsModalOpen(false)}
        sessions={profile.activeSessions}
        onTerminateOther={() => {
          const onlyCurrent = profile.activeSessions.filter((s) => s.current);
          updateAndPersistProfile({ ...profile, activeSessions: onlyCurrent });
          showToast('Signed out of all other remote device sessions.');
        }}
      />

      {/* Edit Emergency Contact Modal */}
      <EditEmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        initialData={{
          emergencyName: profile.emergencyName,
          emergencyRelation: profile.emergencyRelation,
          emergencyPhone: profile.emergencyPhone,
        }}
        onSave={handleSaveEmergency}
      />

      {/* Edit Contact / Residence Modal */}
      <EditContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialData={{
          campusAddress: profile.campusAddress,
          hostel: profile.hostel,
          room: profile.room,
          phone: profile.phone,
        }}
        onSave={handleSaveContact}
      />

      {/* Manage Privacy Modal */}
      <ManagePrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        initialPrivacy={profile.privacy}
        onSave={handleSavePrivacy}
      />

    </div>
  );
}
