import React from 'react';
import { FileText, EyeOff, Clock, AlertCircle } from 'lucide-react';
import { problemPoints } from '../data/landingData';

const iconMap = {
  FileText: FileText,
  EyeOff: EyeOff,
  Clock: Clock,
};

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[#07121A] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#315C3A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1B22] border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Challenge Today</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-tight mb-4">
            Campus Complaints Shouldn't Get Lost.
          </h2>
          
          <p className="text-base sm:text-lg text-[#9FB1BC] max-w-2xl mx-auto">
            Traditional complaint processes can be slow, fragmented, and difficult to track.
          </p>
        </div>

        {/* 3 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemPoints.map((item) => {
            const Icon = iconMap[item.iconName] || FileText;
            return (
              <div
                key={item.id}
                className="group relative bg-[#0D1B22]/80 hover:bg-[#13242E]/90 border border-white/10 hover:border-red-500/30 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-900/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-red-400/80 px-2.5 py-1 rounded-md bg-red-950/20 border border-red-900/30">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F0] mb-3 group-hover:text-red-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9FB1BC] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-xs text-[#9FB1BC]/60">
                  <span>Traditional friction point</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
