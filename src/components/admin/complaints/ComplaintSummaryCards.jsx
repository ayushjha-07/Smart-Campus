import React from 'react';
import {
  FileText,
  Clock,
  Search,
  LoaderCircle,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function ComplaintSummaryCards({ counts = {} }) {
  const cards = [
    {
      id: 'total',
      title: 'Total Complaints',
      value: counts.total ?? 248,
      trend: '+12.5% this month',
      trendType: 'positive',
      icon: FileText,
      color: '#D4A84F',
      bgColor: 'rgba(212, 168, 79, 0.12)',
      borderAccent: '#D4A84F',
    },
    {
      id: 'pending',
      title: 'Pending',
      value: counts.pending ?? 42,
      trend: '8 require attention',
      trendType: 'warning',
      icon: Clock,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
      borderAccent: '#F59E0B',
    },
    {
      id: 'underReview',
      title: 'Under Review',
      value: counts.underReview ?? 18,
      trend: 'Triage in progress',
      trendType: 'neutral',
      icon: Search,
      color: '#A855F7',
      bgColor: 'rgba(168, 85, 247, 0.12)',
      borderAccent: '#A855F7',
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      value: counts.inProgress ?? 67,
      trend: '27 assigned today',
      trendType: 'neutral',
      icon: LoaderCircle,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.12)',
      borderAccent: '#3B82F6',
    },
    {
      id: 'resolved',
      title: 'Resolved',
      value: counts.resolved ?? 139,
      trend: '56% resolution rate',
      trendType: 'positive',
      icon: CheckCircle2,
      color: '#315C3A',
      bgColor: 'rgba(49, 92, 58, 0.18)',
      borderAccent: '#315C3A',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-4 transition-all duration-200 hover:border-[#315C3A] hover:-translate-y-0.5 shadow-sm"
          >
            {/* Top colored accent indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
              style={{ backgroundColor: card.borderAccent }}
            />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium text-[#9FB1BC] uppercase tracking-wider block">
                  {card.title}
                </span>
                <div className="text-2xl font-bold text-[#F5F5F0] mt-1 tracking-tight font-sans">
                  {card.value}
                </div>
              </div>

              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center border shadow-inner"
                style={{
                  backgroundColor: card.bgColor,
                  borderColor: `${card.color}35`,
                  color: card.color,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1A2E3B]/60 flex items-center gap-1.5 text-[11px]">
              {card.trendType === 'positive' && (
                <TrendingUp className="w-3 h-3 text-[#71844A]" />
              )}
              {card.trendType === 'warning' && (
                <AlertTriangle className="w-3 h-3 text-amber-400" />
              )}
              {card.trendType === 'neutral' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
              <span
                className={
                  card.trendType === 'positive'
                    ? 'text-[#A7C481]'
                    : card.trendType === 'warning'
                    ? 'text-amber-400 font-medium'
                    : 'text-[#9FB1BC]'
                }
              >
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
