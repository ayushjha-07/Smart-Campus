import React from 'react';
import {
  FileText,
  Clock,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { SUMMARY_STATS } from '../../../data/adminComplaintsData';

export default function ComplaintStats({ counts = {} }) {
  const cards = [
    {
      id: 'total',
      title: 'Total Complaints',
      value: counts.total ? counts.total.toLocaleString() : SUMMARY_STATS.total.toLocaleString(),
      change: '+12.5%',
      period: 'this month',
      trend: 'up',
      icon: FileText,
      iconColor: 'text-[#008F63] dark:text-[#00A875]',
      iconBg: 'bg-[#008F63]/10 dark:bg-[#00A875]/20',
      borderAccent: 'border-l-4 border-l-[#008F63] dark:border-l-[#00A875]',
    },
    {
      id: 'pending',
      title: 'Pending',
      value: counts.pending ? counts.pending.toLocaleString() : SUMMARY_STATS.pending.toLocaleString(),
      change: '-4.2%',
      period: 'from last week',
      trend: 'down',
      icon: Clock,
      iconColor: 'text-amber-500 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-400/20',
      borderAccent: 'border-l-4 border-l-amber-500 dark:border-l-amber-400',
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      value: counts.inProgress ? counts.inProgress.toLocaleString() : SUMMARY_STATS.inProgress.toLocaleString(),
      change: '+8.7%',
      period: 'this month',
      trend: 'up',
      icon: LoaderCircle,
      iconColor: 'text-blue-500 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-400/20',
      borderAccent: 'border-l-4 border-l-blue-500 dark:border-l-blue-400',
    },
    {
      id: 'resolved',
      title: 'Resolved',
      value: counts.resolved ? counts.resolved.toLocaleString() : SUMMARY_STATS.resolved.toLocaleString(),
      change: '+15.3%',
      period: 'this month',
      trend: 'up',
      icon: CheckCircle2,
      iconColor: 'text-[#315C3A] dark:text-[#71844A]',
      iconBg: 'bg-[#315C3A]/10 dark:bg-[#71844A]/20',
      borderAccent: 'border-l-4 border-l-[#315C3A] dark:border-l-[#71844A]',
    },
    {
      id: 'critical',
      title: 'Critical',
      value: counts.critical ? counts.critical.toLocaleString() : SUMMARY_STATS.critical.toLocaleString(),
      change: 'Requires attention',
      period: '',
      trend: 'alert',
      icon: AlertTriangle,
      iconColor: 'text-red-500 dark:text-red-400',
      iconBg: 'bg-red-500/10 dark:bg-red-400/20',
      borderAccent: 'border-l-4 border-l-red-500 dark:border-l-red-400',
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`relative rounded-xl p-4 sm:p-4.5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${card.borderAccent}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#60717A] dark:text-[#9FB1BC] block">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] mt-1 tracking-tight font-sans">
                  {card.value}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center gap-1.5 text-[11px]">
              {card.trend === 'up' && (
                <span className="inline-flex items-center gap-0.5 font-bold text-[#008F63] dark:text-[#00A875]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {card.change}
                </span>
              )}
              {card.trend === 'down' && (
                <span className="inline-flex items-center gap-0.5 font-bold text-amber-600 dark:text-amber-400">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {card.change}
                </span>
              )}
              {card.trend === 'alert' && (
                <span className="inline-flex items-center gap-1 font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                  <AlertTriangle className="w-3 h-3" />
                  {card.change}
                </span>
              )}
              {card.period && (
                <span className="text-[#60717A] dark:text-[#9FB1BC] font-medium truncate">
                  {card.period}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
