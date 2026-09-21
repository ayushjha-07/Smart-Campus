import React from 'react';
import { Layers } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { keyFeatures } from '../data/landingData';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Background accents */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#008F63]/5 dark:bg-[#71844A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00A875]/5 dark:bg-[#315C3A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/50 text-[#008F63] dark:text-[#D4A84F] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            Everything Needed for a Smarter Campus
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
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
