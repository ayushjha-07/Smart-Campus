import React from 'react';
import { 
  FileEdit, 
  Sparkles, 
  Network, 
  Compass, 
  Bell, 
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

const iconMap = {
  FileEdit,
  Sparkles,
  Network,
  Compass,
  Bell,
  BarChart3,
};

export default function FeatureCard({ feature }) {
  const Icon = iconMap[feature.iconName] || Sparkles;

  return (
    <div className="group relative bg-white dark:bg-[#0D1B22]/90 hover:bg-[#FCFEFD] dark:hover:bg-[#13242E] border border-[#DDE8E3] dark:border-white/10 hover:border-[#008F63]/50 dark:hover:border-[#315C3A]/70 rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-md dark:shadow-xl flex flex-col justify-between">
      
      {/* Subtle top corner gradient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#008F63]/5 dark:from-[#315C3A]/10 to-transparent rounded-tr-[20px] pointer-events-none group-hover:from-[#008F63]/10 dark:group-hover:from-[#71844A]/20 transition-colors" />

      <div>
        {/* Top category & icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#EEF4F1] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#315C3A]/50 flex items-center justify-center text-[#008F63] dark:text-[#D4A84F] group-hover:scale-110 group-hover:border-[#008F63] dark:group-hover:border-[#D4A84F]/80 transition-all shadow-2xs">
            <Icon className="w-6 h-6 stroke-[1.75]" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#008F63] dark:text-[#71844A] px-2.5 py-1 rounded-full bg-[#EEF4F1] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-white/5">
            {feature.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-3 group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors flex items-center justify-between">
          <span>{feature.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#008F63] dark:text-[#D4A84F]" />
        </h3>

        {/* Description */}
        <p className="text-sm text-[#60717A] dark:text-[#9FB1BC] leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Card Footer accent line */}
      <div className="mt-6 pt-4 border-t border-[#DCE5E2] dark:border-white/5 flex items-center justify-between text-xs text-[#6B7C83] dark:text-[#9FB1BC]/60 font-medium">
        <span className="group-hover:text-[#008F63] dark:group-hover:text-[#71844A] transition-colors">Smart Campus Core Capability</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#315C3A] group-hover:bg-[#00A875] dark:group-hover:bg-[#D4A84F] transition-colors" />
      </div>
    </div>
  );
}
