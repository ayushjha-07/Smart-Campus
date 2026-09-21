import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { campusAssets } from '../assets/campusAssets';

export default function CTASection({ onOpenSubmitModal }) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#008F63]/5 dark:bg-[#315C3A]/20 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] bg-white dark:bg-gradient-to-b dark:from-[#0D1B22] dark:to-[#07121A] border border-[#DDE8E3] dark:border-[#315C3A]/40 p-8 sm:p-14 lg:p-16 text-center shadow-xl shadow-slate-200/50 dark:shadow-2xl overflow-hidden transition-colors">
          
          {/* Subtle Campus Aerial Image in CTA background */}
          <img
            src={campusAssets.landingBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-5 dark:opacity-10 pointer-events-none filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-[#07121A] dark:via-[#07121A]/80 dark:to-transparent pointer-events-none" />

          {/* Top emblem */}
          <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EEF4F1] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#D4A84F]/40 shadow-md mb-8 group hover:scale-105 transition-transform text-[#008F63] dark:text-[#D4A84F]">
            <ShieldCheck className="w-8 h-8 stroke-[2]" />
          </div>

          {/* Headline */}
          <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
            Build a Better Campus Together.
          </h2>

          {/* Description */}
          <p className="relative z-10 text-base sm:text-xl text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Give every complaint a clear path from submission to resolution.
          </p>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenSubmitModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-[#008F63] hover:bg-[#007A54] border border-[#00A875]/60 shadow-lg shadow-[#008F63]/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit a Complaint</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#071A2B] dark:text-[#F5F5F0] bg-[#EEF4F1] dark:bg-[#07121A] hover:bg-[#E2EAE6] dark:hover:bg-[#13242E] border border-[#DDE8E3] dark:border-white/10 transition-all duration-300 flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore Platform</span>
            </a>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 mt-12 pt-8 border-t border-[#DCE5E2] dark:border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#6B7C83] dark:text-[#9FB1BC]/70 font-medium">
            <span>• Verified Institutional SSL</span>
            <span>• 100% Student Data Privacy</span>
            <span>• Real-Time Administrative SLA Tracking</span>
          </div>

        </div>
      </div>
    </section>
  );
}
