import React from 'react';
import { Clock, Cpu, Activity, LineChart } from 'lucide-react';
import { quickStats } from '../data/landingData';

const statIcons = {
  'stat-1': Clock,
  'stat-2': Cpu,
  'stat-3': Activity,
  'stat-4': LineChart,
};

export default function Stats() {
  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#0D1B22]/90 backdrop-blur-xl border border-[#DDE8E3] dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 dark:shadow-2xl transition-colors duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE5E2] dark:divide-white/10">
          {quickStats.map((stat, idx) => {
            const IconComponent = statIcons[stat.id] || Activity;
            return (
              <div
                key={stat.id}
                className={`flex flex-col items-start ${
                  idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                } group`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="p-2 rounded-lg bg-[#EEF4F1] dark:bg-[#315C3A]/20 border border-[#DDE8E3] dark:border-[#315C3A]/40 text-[#008F63] dark:text-[#D4A84F] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#008F63] dark:text-[#71844A] px-2 py-0.5 rounded bg-[#EEF4F1] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-white/5">
                    {stat.badge}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors">
                    {stat.value}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#071A2B] dark:text-[#F5F5F0]/90 mt-0.5">
                    {stat.label}
                  </h2>
                  <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-1 line-clamp-2 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-[#DCE5E2] dark:border-white/5 flex items-center justify-between text-[11px] text-[#6B7C83] dark:text-[#9FB1BC]/70 font-medium">
          <span>* Product capability standards configured for academic institutions.</span>
          <span className="hidden sm:inline">Encrypted Digital Infrastructure</span>
        </div>
      </div>
    </section>
  );
}
