import React from 'react';
import {
  ClipboardList,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertTriangle,
  AlertOctagon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function MetricCards({ metrics }) {
  const iconMap = {
    total: ClipboardList,
    resolved: CheckCircle2,
    rate: TrendingUp,
    avg_time: Clock,
    high_priority: AlertTriangle,
    critical: AlertOctagon
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] text-[#9FB1BC] px-1">
        <span className="font-semibold uppercase tracking-wider text-[#71844A]">
          Key Performance Indicators (Demo Benchmarks)
        </span>
        <span className="text-[10px] text-[#9FB1BC]/70 italic">
          Values dynamically reflect selected scope
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {metrics.map((card) => {
          const Icon = iconMap[card.id] || ClipboardList;
          const isPositive = card.trend === 'up';
          const isNegative = card.trend === 'down';

          return (
            <div
              key={card.id}
              className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-4 flex flex-col justify-between hover:border-[#315C3A] transition-all hover:shadow-[0_4px_20px_-4px_rgba(49,92,58,0.15)] group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-[#9FB1BC] truncate group-hover:text-[#F5F5F0] transition-colors">
                  {card.title}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${card.color}15`,
                    borderColor: `${card.color}40`,
                    color: card.color
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="my-1">
                <div className="text-2xl font-bold text-[#F5F5F0] tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1A2E3B]/60 text-[11px]">
                <span className="text-[#9FB1BC] truncate text-[10px]">
                  {card.subtitle}
                </span>

                {card.change && (
                  <span
                    className={`inline-flex items-center gap-0.5 font-semibold text-[10px] px-1.5 py-0.5 rounded ${
                      isPositive
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : isNegative
                        ? 'text-[#D4A84F] bg-[#D4A84F]/10'
                        : 'text-[#9FB1BC] bg-[#13242E]'
                    }`}
                  >
                    {isPositive && <ArrowUpRight className="w-2.5 h-2.5" />}
                    {isNegative && <ArrowDownRight className="w-2.5 h-2.5" />}
                    {card.change}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
