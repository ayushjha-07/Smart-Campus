import React from 'react';
import campusAssets from '../../assets/campusAssets';

export default function RegisterVisual() {
  return (
    <div className="relative hidden lg:flex lg:w-[45%] min-h-screen bg-[#07121A] overflow-hidden items-center justify-center p-12">
      {/* Background Campus Image */}
      <img
        src={campusAssets.aerialImage}
        alt="CGC University Mohali Aerial Campus"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
      />

      {/* Dark Navy + Forest Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#07121A] via-[#07121A]/85 to-[#315C3A]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07121A] via-transparent to-[#07121A]/50" />

      {/* Subtle Topographic / Grid Pattern */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#315C3A]/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#D4A84F]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-md text-left space-y-6">
        
        {/* Institutional Badge with CGC Logo */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#07121A]/85 border border-[#315C3A]/60 backdrop-blur-md shadow-lg">
          <img src={campusAssets.logo} alt="CGC University" className="h-5 w-auto object-contain shrink-0" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#D4A84F]">
            CGC University Mohali
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl xl:text-4xl font-extrabold text-[#F5F5F0] tracking-tight leading-tight">
          One platform for a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A84F] via-[#E5BF6E] to-[#F5F5F0]">
            smarter campus.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-sm text-[#A8B3B0] leading-relaxed">
          Create your account and become part of a more transparent, connected and responsive campus community.
        </p>

        {/* Benefits Quick List */}
        <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#F5F5F0]/85">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]" />
            <span>Instant digital complaint submission & tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#71844A]" />
            <span>Direct department dispatch and resolution accountability</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315C3A]" />
            <span>Encrypted campus-wide student data privacy</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Green Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#315C3A] to-transparent" />
    </div>
  );
}
