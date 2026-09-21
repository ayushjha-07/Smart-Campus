import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTASection({ onOpenSubmitModal }) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07121A]">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1B22]/50 to-[#07121A] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#315C3A]/20 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0D1B22] to-[#07121A] border border-[#315C3A]/40 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden">
          
          {/* Subtle decorative grid */}
          <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

          {/* Top emblem */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#07121A] border border-[#D4A84F]/40 shadow-xl mb-8 group hover:scale-105 transition-transform">
            <ShieldCheck className="w-8 h-8 text-[#D4A84F]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F0] tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
            Build a Better Campus Together.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-xl text-[#9FB1BC] max-w-2xl mx-auto mb-10 leading-relaxed">
            Give every complaint a clear path from submission to resolution.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenSubmitModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#F5F5F0] bg-gradient-to-r from-[#315C3A] to-[#3D7349] hover:from-[#3D7349] hover:to-[#71844A] border border-[#71844A]/60 shadow-xl shadow-[#315C3A]/30 hover:shadow-2xl hover:shadow-[#315C3A]/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Submit a Complaint</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#F5F5F0]/90 hover:text-[#F5F5F0] bg-[#07121A] hover:bg-[#13242E] border border-white/10 hover:border-[#315C3A]/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
            </a>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#9FB1BC]/70">
            <span>• Verified Institutional SSL</span>
            <span>• 100% Student Data Privacy</span>
            <span>• Real-Time Administrative SLA Tracking</span>
          </div>

        </div>
      </div>
    </section>
  );
}
