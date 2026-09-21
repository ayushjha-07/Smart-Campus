import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import UniversityLogo from './common/UniversityLogo';

export default function Navbar() {
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
          ? 'bg-[#07121A]/90 backdrop-blur-md border-b border-[#315C3A]/25 py-3 shadow-lg shadow-black/40'
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

          {/* Desktop Right CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[#F5F5F0]/85 hover:text-[#F5F5F0] hover:bg-[#0D1B22] rounded-lg border border-transparent hover:border-white/10 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="relative group overflow-hidden px-5 py-2 text-sm font-semibold text-[#F5F5F0] rounded-lg bg-gradient-to-r from-[#315C3A] to-[#3D7349] hover:from-[#3D7349] hover:to-[#71844A] border border-[#71844A]/50 shadow-md shadow-[#315C3A]/25 transition-all duration-300 hover:shadow-lg hover:shadow-[#315C3A]/40 flex items-center gap-1.5"
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
        <div className="md:hidden bg-[#07121A]/95 backdrop-blur-xl border-b border-[#315C3A]/30 px-5 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-[#F5F5F0]/90 hover:text-[#D4A84F] hover:bg-[#0D1B22] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium text-[#F5F5F0] bg-[#0D1B22] rounded-lg border border-white/10 hover:border-white/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#F5F5F0] bg-gradient-to-r from-[#315C3A] to-[#71844A] rounded-lg border border-[#71844A]/40 shadow-sm flex items-center justify-center gap-2"
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
