import React from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Activity } from 'lucide-react';
import campusAssets from '../assets/campusAssets';

export default function Hero({ onOpenSubmitModal }) {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[#07121A] pointer-events-none" />
      
      {/* Subtle topographic / dot grid pattern */}
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />

      {/* Subtle ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#315C3A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-[#71844A]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#D4A84F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Very subtle architectural / grid green accent lines */}
      <div className="absolute top-24 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#315C3A]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#71844A]/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1B22]/90 border border-[#315C3A]/40 mb-6 backdrop-blur-sm shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#D4A84F] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A84F]">
                Institutional Governance Platform
              </span>
            </div>

            {/* Main Heading with Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F5F0] leading-[1.15] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A84F] via-[#E5BF6E] to-[#F5F5F0]">
                Smart Campus
              </span>{' '}
              <br />
              <span className="text-[#F5F5F0]">Complaint & Analytics System</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-semibold text-[#71844A] tracking-wide mb-5">
              Report. Track. Resolve. Improve.
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#9FB1BC] max-w-2xl leading-relaxed mb-8">
              A centralized digital platform that makes campus complaints simpler, smarter,
              and more transparent — from submission to resolution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenSubmitModal}
                className="group px-7 py-3.5 rounded-xl font-semibold text-[#F5F5F0] bg-gradient-to-r from-[#315C3A] to-[#3D7349] hover:from-[#3D7349] hover:to-[#71844A] border border-[#71844A]/60 shadow-lg shadow-[#315C3A]/30 hover:shadow-xl hover:shadow-[#315C3A]/40 transition-all duration-300 flex items-center justify-center gap-2.5 text-base"
              >
                <span>Submit a Complaint</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                className="px-7 py-3.5 rounded-xl font-semibold text-[#F5F5F0]/90 hover:text-[#F5F5F0] bg-[#0D1B22]/90 hover:bg-[#13242E] border border-white/10 hover:border-[#315C3A]/60 transition-all duration-300 flex items-center justify-center gap-2 text-base backdrop-blur-sm"
              >
                <span>Explore How It Works</span>
              </a>
            </div>

            {/* Feature Highlights beneath buttons */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#9FB1BC]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#71844A]" />
                <span>Zero Paperwork</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A84F]" />
                <span>Encrypted & Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#315C3A]" />
                <span>Automated Escalation</span>
              </div>
            </div>

          </div>

          {/* Right Column: Campus Photography & Status Overlays */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glowing frame */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#315C3A]/50 via-[#D4A84F]/30 to-[#71844A]/40 blur-md opacity-70 group-hover:opacity-100 transition duration-1000" />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0D1B22] shadow-2xl">
                <img
                  src={campusAssets.aerialImage}
                  alt="CGC University Mohali Aerial Campus"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out max-h-[460px]"
                  loading="eager"
                />

                {/* Subtle cinematic gradient overlay on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07121A] via-transparent to-transparent opacity-60" />

                {/* Floating Live Badge Top Right */}
                <div className="absolute top-4 right-4 bg-[#07121A]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-medium text-emerald-300">Live Campus Dispatch</span>
                </div>

                {/* Floating Interactive Sample Card Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D1B22]/90 backdrop-blur-md rounded-xl p-3.5 border border-[#315C3A]/40 shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4A84F]" />
                      <span className="text-xs font-mono font-semibold text-[#D4A84F]">SC-2026-1847</span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#315C3A]/40 text-[#71844A] border border-[#71844A]/30">
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F5F0] font-medium truncate">
                    Hostel Block B — Plumbing & Water Utilities
                  </p>
                  <p className="text-[10px] text-[#9FB1BC] mt-0.5">
                    Dispatched to Campus Facilities • ETA: 45 mins
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
