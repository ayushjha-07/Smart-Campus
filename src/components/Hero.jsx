import React from 'react';
import { ArrowRight, Play, Users, Building2, ShieldCheck, Leaf } from 'lucide-react';
import { campusAssets } from '../assets/campusAssets';

/**
 * Hero — Section 2 of the Smart Campus Landing Page
 * Faithfully matches Section 2 in the reference image (scratch_sec2.png):
 * - Left: "A SMARTER CAMPUS TOGETHER" pill badge,
 *         "Your Voice for a Better Campus" headline,
 *         Description paragraph,
 *         "Submit a Complaint →" & "▶ Watch Video" action buttons,
 *         and 3 platform stats: 10K+ Students, 50+ Departments, 100% Action Focused.
 * - Right: The authentic CGC University Mohali campus photograph under blue sky,
 *          lawns, trees, and "Clean Campus Bright Futures" calligraphy.
 */
export default function Hero({ onOpenSubmitModal }) {
  return (
    <section
      id="your-voice"
      className="relative w-full bg-[#FAFBF9] dark:bg-[#07121A] pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Anchor alias for #hero links */}
      <div id="hero" className="absolute -top-16 left-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Slogan, CTA & Stats */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5">
            
            {/* Pill Badge: A SMARTER CAMPUS TOGETHER */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] dark:bg-[#008F63]/20 border border-[#008F63]/25 text-[#008F63] dark:text-[#00B878] text-xs font-bold tracking-wider uppercase shadow-2xs">
              <Leaf className="w-3.5 h-3.5" />
              <span>A SMARTER CAMPUS TOGETHER</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#0B253A] dark:text-[#F5F5F0] leading-[1.08] tracking-tight">
                Your Voice for a
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#008F63] leading-[1.08] tracking-tight mt-1">
                Better Campus
              </h3>
            </div>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-[#536673] dark:text-[#9FB1BC] leading-relaxed max-w-lg font-normal">
              A digital platform to submit, track and resolve campus complaints — for a cleaner, safer and better CGC University Mohali.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenSubmitModal}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#008F63] hover:bg-[#007A54] shadow-md shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Submit a Complaint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#008F63] dark:text-[#00B878] bg-white dark:bg-[#0D1F2D] border border-[#008F63]/35 hover:border-[#008F63] transition-all flex items-center gap-2 shadow-2xs hover:bg-[#008F63]/5"
              >
                <Play className="w-4 h-4 fill-[#008F63] text-[#008F63]" />
                <span>Watch Video</span>
              </a>
            </div>

            {/* 3 Platform Stats Row matching reference */}
            <div className="pt-5 flex flex-wrap sm:flex-nowrap items-center gap-5 sm:gap-7 border-t border-[#E8EFEA] dark:border-white/10 w-full">
              {/* 10K+ Students */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B253A] dark:text-[#F5F5F0] leading-none">
                    10K+
                  </div>
                  <div className="text-xs text-[#536673] dark:text-[#9FB1BC] font-semibold mt-1">
                    Students
                  </div>
                </div>
              </div>

              {/* 50+ Departments */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B253A] dark:text-[#F5F5F0] leading-none">
                    50+
                  </div>
                  <div className="text-xs text-[#536673] dark:text-[#9FB1BC] font-semibold mt-1">
                    Departments
                  </div>
                </div>
              </div>

              {/* 100% Action Focused */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B253A] dark:text-[#F5F5F0] leading-none">
                    100%
                  </div>
                  <div className="text-xs text-[#536673] dark:text-[#9FB1BC] font-semibold mt-1">
                    Action Focused
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic CGC University Campus Photo with Calligraphy */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-black/70 border border-[#E2E9E6] dark:border-white/10 bg-white dark:bg-[#0A1822]">
              <img
                src={campusAssets.campusHeroSection2Art}
                alt="CGC University Mohali Campus — Clean Campus Bright Futures"
                className="w-full h-auto object-contain block select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
