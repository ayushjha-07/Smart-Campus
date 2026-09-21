import React from 'react';
import cgcAerialCampusHd from '../../assets/cgc_aerial_campus_hd.jpg';
import cgcLogo from '../../assets/cgc_logo.png';

export default function LoginVisual() {
  return (
    <div className="relative hidden lg:flex lg:w-[55%] min-h-screen bg-[#07121A] overflow-hidden items-center justify-center p-12">
      {/* Background Campus Image with subtle zoom */}
      <img
        src={cgcAerialCampusHd}
        alt="CGC University Mohali Aerial Campus"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05]"
      />

      {/* Dark Navy + Forest Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#07121A] via-[#07121A]/85 to-[#315C3A]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07121A] via-transparent to-[#07121A]/40" />

      {/* Subtle Topographic / Grid Pattern */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      {/* Subtle Architectural Green and Gold Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#315C3A]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4A84F]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Content Placed Over Image */}
      <div className="relative z-10 max-w-lg text-left space-y-6">
        
        {/* Institutional Badge with CGC Logo */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#07121A]/85 border border-[#315C3A]/60 backdrop-blur-md shadow-lg">
          <img src={cgcLogo} alt="CGC University" className="h-5 w-auto object-contain shrink-0" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#D4A84F]">
            CGC University Mohali
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl xl:text-5xl font-extrabold text-[#F5F5F0] tracking-tight leading-tight">
          Modern Governance <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A84F] via-[#E5BF6E] to-[#F5F5F0]">
            For A Connected Campus
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl font-semibold text-[#71844A] tracking-wide">
          Report. Track. Resolve. Improve.
        </p>

        {/* Small text */}
        <p className="text-sm text-[#A8B3B0] leading-relaxed max-w-md pt-2">
          One platform for smarter campus complaint management.
        </p>

        {/* Subtle Decorative Feature Metrics */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-[#F5F5F0]/80">
          <div className="p-3 rounded-xl bg-[#0D1B22]/70 border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-[#D4A84F] block">Resolution Time</span>
            <span className="text-base font-extrabold text-[#F5F5F0]">Real-Time SLA</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D1B22]/70 border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-[#71844A] block">Accountability</span>
            <span className="text-base font-extrabold text-[#F5F5F0]">100% Transparent</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Green Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#315C3A] to-transparent" />
    </div>
  );
}
