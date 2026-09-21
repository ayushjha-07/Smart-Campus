import React from 'react';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import UniversityLogo from './common/UniversityLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { name: 'Home', href: '#hero' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="about" className="bg-[#EEF4F1] dark:bg-[#040B10] border-t border-[#DDE8E3] dark:border-white/10 pt-16 pb-12 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DCE5E2] dark:border-white/10">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-6 space-y-4">
            <UniversityLogo variant="footer" />

            <p className="text-base font-bold text-[#008F63] dark:text-[#71844A]">
              Report. Track. Resolve. Improve.
            </p>

            <p className="text-sm text-[#60717A] dark:text-[#9FB1BC] max-w-md leading-relaxed">
              Smart Campus Complaint & Analytics System — an institutional-grade platform modernizing campus governance and student welfare through intelligent workflows and real-time transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#071A2B] dark:text-[#D4A84F]">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#60717A] hover:text-[#008F63] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Contact Info */}
          <div id="contact" className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#071A2B] dark:text-[#D4A84F]">
              Campus Helpdesk
            </h4>
            <div className="space-y-2.5 text-sm text-[#60717A] dark:text-[#9FB1BC]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#008F63] dark:text-[#71844A] shrink-0" />
                <span>Administrative Block 2, Central Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008F63] dark:text-[#71844A] shrink-0" />
                <span>grievance@smartcampus.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#008F63] dark:text-[#71844A] shrink-0" />
                <span>Toll-Free Helpline: 1800-CAMPUS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7C83] dark:text-[#9FB1BC]/70 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Smart Campus Complaint & Analytics System. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#008F63] dark:text-[#71844A] font-semibold">Report. Track. Resolve. Improve.</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 hover:border-[#008F63] text-[#071A2B] dark:text-[#F5F5F0] transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
