import React from 'react';
import { Users, GraduationCap, Briefcase, Shield, CheckCircle2 } from 'lucide-react';
import { USER_SUMMARY_STATS } from '../../../data/userManagementMockData';

export default function UserSummaryCards() {
  const iconMap = {
    total: Users,
    students: GraduationCap,
    staff: Briefcase,
    admins: Shield,
    active: CheckCircle2
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
      {USER_SUMMARY_STATS.map((stat) => {
        const Icon = iconMap[stat.id] || Users;

        return (
          <div
            key={stat.id}
            className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-4 flex flex-col justify-between hover:border-[#315C3A] transition-all hover:shadow-[0_4px_16px_-4px_rgba(49,92,58,0.2)] group"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-[#9FB1BC] truncate group-hover:text-[#F5F5F0] transition-colors">
                {stat.title}
              </span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${stat.color}15`,
                  borderColor: `${stat.color}40`,
                  color: stat.color
                }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="my-1">
              <span className="text-2xl font-bold text-[#F5F5F0] tracking-tight">
                {stat.value}
              </span>
            </div>

            <div className="pt-2 border-t border-[#1A2E3B]/60 text-[10px] text-[#9FB1BC]">
              {stat.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
