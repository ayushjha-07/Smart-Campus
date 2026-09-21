import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import UniversityLogo from './common/UniversityLogo';
import { useApp } from '../context/useApp';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const isLight = theme === 'light';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#07121A]/90 backdrop-blur-md border-b border-[#DDE5E1] dark:border-[#315C3A]/25 py-3 shadow-md shadow-black/10 dark:shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official CGC University Logo / Emblem */}
          <UniversityLogo variant="navbar" />


          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#0D1B22]/70 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-[#F5F5F0]/80 hover:text-[#F5F5F0] hover:bg-[#315C3A]/30 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Light / Dark Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-[#DDE5E1] text-[#D4A84F] shadow-2xs'
                  : 'bg-[#0D1B22] hover:bg-[#132630] border-white/10 text-[#D4A84F]'
              }`}
            >
              {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isLight
                  ? 'text-[#07121A] hover:bg-slate-100'
                  : 'text-[#F5F5F0]/85 hover:text-[#F5F5F0] hover:bg-[#0D1B22]'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="relative group overflow-hidden px-5 py-2 text-sm font-semibold text-white rounded-lg bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00B878] dark:hover:bg-[#009e66] shadow-md shadow-emerald-950/20 transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg bg-[#0D1B22] border border-white/10 text-[#F5F5F0] hover:border-[#315C3A] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#07121A]/95 backdrop-blur-xl border-b border-[#DDE5E1] dark:border-[#315C3A]/30 px-5 pt-3 pb-6 space-y-3 animate-fadeIn text-[#07121A] dark:text-white">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-700 dark:text-[#F5F5F0]/90 hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full py-2.5 px-3 rounded-lg border border-[#DDE5E1] dark:border-white/10 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#0D1B22]"
            >
              <span>Appearance</span>
              <span className="flex items-center gap-1.5 text-xs text-[#D4A84F]">
                {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
              </span>
            </button>

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium text-slate-800 dark:text-[#F5F5F0] bg-slate-100 dark:bg-[#0D1B22] rounded-lg border border-slate-200 dark:border-white/10"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#008F63] dark:bg-[#00B878] rounded-lg shadow-sm flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
