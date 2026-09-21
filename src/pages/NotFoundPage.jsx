import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, Shield, ArrowLeft } from 'lucide-react';
import UniversityLogo from '../components/common/UniversityLogo';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#315C3A]/15 rounded-full blur-3xl pointer-events-none" />

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

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full text-center p-8 sm:p-10 rounded-2xl bg-[#0D1B22] border border-[#1A2E3B] shadow-2xl">
          <span className="text-6xl sm:text-7xl font-extrabold font-serif text-[#D4A84F] tracking-wider block mb-2">
            404
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] mb-2">
            Page not found.
          </h1>

          <p className="text-xs sm:text-sm text-[#9FB1BC] mb-6 leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another quadrant of the campus portal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#1A2E3B]">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#07121A] hover:bg-[#13242E] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] transition-colors shadow-sm"
            >
              <Home className="w-4 h-4 text-[#71844A]" />
              <span>Go Home</span>
            </Link>

            <Link
              to="/student/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#315C3A] hover:bg-[#3d7248] text-xs font-semibold text-[#F5F5F0] border border-[#D4A84F]/40 shadow-sm transition-all"
            >
              <Compass className="w-4 h-4 text-[#D4A84F]" />
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
