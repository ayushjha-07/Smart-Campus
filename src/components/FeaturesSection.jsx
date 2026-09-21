import React from 'react';
import { Layers } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { keyFeatures } from '../data/landingData';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#07121A]">
      {/* Background accents */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#71844A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#315C3A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1B22] border border-[#315C3A]/50 text-[#D4A84F] text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-tight mb-4">
            Everything Needed for a Smarter Campus
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1BC] max-w-2xl mx-auto">
            Engineered specifically for higher-education ecosystems to replace fragmented spreadsheets, slow paper queues, and disconnected offices.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keyFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
