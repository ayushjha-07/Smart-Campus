import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft, LayoutDashboard } from 'lucide-react';

import UniversityLogo from '../components/common/UniversityLogo';

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex flex-col justify-between font-sans selection:bg-[#315C3A] selection:text-[#D4A84F] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-[#1A2E3B]/80 bg-[#07121A]/80 backdrop-blur-md z-10">
        <UniversityLogo variant="navbar" />


        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[#9FB1BC] hover:text-[#F5F5F0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to previous</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full text-center p-8 sm:p-10 rounded-2xl bg-[#0D1B22] border border-[#1A2E3B] shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6 text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-semibold tracking-wider text-red-400/90 block mb-1">
            Error 403 • Forbidden
          </span>

          <h1 className="text-2xl font-bold text-[#F5F5F0] mb-2 font-serif">
            Access Restricted
          </h1>

          <p className="text-xs sm:text-sm text-[#9FB1BC] mb-6 leading-relaxed">
            You don't have permission to view this page. This section requires elevated institutional privileges or an administrative role.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#1A2E3B]">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#07121A] hover:bg-[#13242E] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] transition-colors shadow-sm"
            >
              <Home className="w-4 h-4 text-[#71844A]" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/student/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#315C3A] hover:bg-[#3d7248] text-xs font-semibold text-[#F5F5F0] border border-[#D4A84F]/40 shadow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4A84F]" />
              <span>Go to Dashboard</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#9FB1BC]/60 border-t border-[#1A2E3B]/60">
        Smart Campus Complaint & Analytics System • &copy; 2026
      </footer>
    </div>
  );
}
