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
    { name: 'Home', href: '#hero', active: true },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#07121A]/95 backdrop-blur-md border-b border-[#E2E9E6] dark:border-[#315C3A]/25 py-2.5 shadow-xs dark:shadow-black/40'
          : 'bg-white dark:bg-[#07121A] border-b border-[#E8EFEA] dark:border-white/5 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official CGC University Logo / Emblem */}
          <UniversityLogo variant="navbar" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-all duration-200 ${
                  link.active
                    ? 'text-[#008F63] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#008F63] after:rounded-full'
                    : 'text-[#536673] hover:text-[#008F63] dark:text-[#9FB1BC] dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Segmented Light / Dark Toggle matching reference image */}
            <div
              onClick={toggleTheme}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTheme()}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
              className="flex items-center p-1 bg-[#EEF2EF] dark:bg-[#132630] rounded-full cursor-pointer select-none transition-colors border border-[#DCE4DF] dark:border-white/10"
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  isLight
                    ? 'bg-white text-[#008F63] shadow-xs'
                    : 'text-[#60717A] dark:text-[#8E9FA8]'
                }`}
              >
                <Sun className={`w-3.5 h-3.5 ${isLight ? 'text-[#E59819]' : 'text-current'}`} />
                <span>Light</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  !isLight
                    ? 'bg-[#07121A] text-white shadow-xs'
                    : 'text-[#60717A] dark:text-[#8E9FA8]'
                }`}
              >
                <span>Dark</span>
                <Moon className={`w-3.5 h-3.5 ${!isLight ? 'text-[#00B878]' : 'text-current'}`} />
              </div>
            </div>

            {/* Login Outline Button */}
            <Link
              to="/login"
              className="px-4 py-1.5 text-sm font-bold text-[#008F63] hover:text-[#007A54] border border-[#008F63]/35 hover:border-[#008F63] rounded-lg transition-all duration-200 hover:bg-[#008F63]/5"
            >
              Login
            </Link>

            {/* Get Started Solid Button */}
            <Link
              to="/register"
              className="px-4 py-1.5 text-sm font-bold text-white bg-[#008F63] hover:bg-[#007A54] rounded-lg shadow-xs transition-all duration-200 flex items-center gap-1.5 hover:shadow-md"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 text-[#183047] dark:text-[#F5F5F0] hover:border-[#008F63] transition-colors"
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
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-medium text-slate-700 dark:text-[#F5F5F0]/90 hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-medium text-slate-700 dark:text-[#F5F5F0]/90 hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              )
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
