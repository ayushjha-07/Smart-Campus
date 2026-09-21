import React from 'react';
import {
  Sparkles,
  TrendingUp,
  MapPin,
  Activity,
  AlertOctagon,
  Info
} from 'lucide-react';
import { AI_INSIGHTS_DATA } from '../../data/adminMockData';

const iconMap = {
  TrendingUp,
  MapPin,
  Activity,
  AlertOctagon,
};

const severityStyles = {
  warning: { border: '#D4A84F', badgeBg: 'rgba(212, 168, 79, 0.15)', badgeText: '#E5BF6E' },
  alert: { border: '#F97316', badgeBg: 'rgba(249, 115, 22, 0.15)', badgeText: '#FDBA74' },
  info: { border: '#315C3A', badgeBg: 'rgba(49, 92, 58, 0.25)', badgeText: '#A7C481' },
  critical: { border: '#EF4444', badgeBg: 'rgba(239, 68, 68, 0.2)', badgeText: '#FCA5A5' },
};

export default function AIInsights() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated">
      {/* Header */}
      <div className="pb-4 border-b border-[#1A2E3B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/25 border border-[#315C3A]/60 text-[#D4A84F] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4A84F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
                AI-Powered Insights
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#D4A84F]/15 text-[#D4A84F] border border-[#D4A84F]/30">
                Pattern Engine
              </span>
            </div>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Automated observations from complaint data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#9FB1BC]">
          <Info className="w-3.5 h-3.5 text-[#71844A]" />
          <span>Demo pattern detections</span>
        </div>
      </div>

      {/* 4 Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {AI_INSIGHTS_DATA.map((insight) => {
          const Icon = iconMap[insight.iconName] || Activity;
          const style = severityStyles[insight.severity] || severityStyles.info;

          return (
            <div
              key={insight.id}
              className="relative group p-4 rounded-xl bg-[#07121A]/80 border border-[#1A2E3B] hover:border-[#315C3A] transition-all duration-200 flex flex-col justify-between"
            >
              {/* Subtle accent corner strip */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: style.border }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: style.badgeBg,
                      color: style.badgeText,
                    }}
                  >
                    {insight.category}
                  </span>

                  <div className="p-1 rounded bg-[#13242E] text-[#9FB1BC]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4A84F] transition-colors leading-snug">
                  {insight.title}
                </h4>

                <p className="text-xs text-[#9FB1BC] mt-1.5 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              {/* Metric indicator */}
              <div className="mt-3 pt-2.5 border-t border-[#1A2E3B]/70 flex items-center justify-between text-[11px]">
                <span className="text-[#9FB1BC]">Observed Signal</span>
                <span className="font-mono font-semibold text-[#F5F5F0]">
                  {insight.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
