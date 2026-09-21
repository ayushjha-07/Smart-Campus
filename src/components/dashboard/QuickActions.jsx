import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  FilePlus2, 
  Search, 
  Bell, 
  ChevronRight
} from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      id: 'submit',
      title: '+ Submit Complaint',
      description: 'File a new campus grievance with instant department routing',
      badge: 'FAST TRACK',
      link: '/student/complaints/new',
      icon: FilePlus2,
      badgeStyle: 'bg-emerald-50 border-emerald-200 text-[#168A5B]',
      iconBoxStyle: 'bg-emerald-50 border-emerald-200 text-[#168A5B]',
      titleHover: 'group-hover:text-[#168A5B]',
    },
    {
      id: 'track',
      title: 'Track Complaints',
      description: 'Monitor milestone progress and real-time status on your active tickets',
      badge: 'LIVE STATUS',
      link: '/student/complaints',
      icon: Search,
      badgeStyle: 'bg-amber-50 border-amber-200 text-amber-800',
      iconBoxStyle: 'bg-amber-50 border-amber-200 text-amber-700',
      titleHover: 'group-hover:text-amber-800',
    },
    {
      id: 'notifications',
      title: 'View Notifications',
      description: 'Review resolution notes, official announcements and admin notices',
      badge: '3 UNREAD',
      link: '/student/notifications',
      icon: Bell,
      badgeStyle: 'bg-purple-50 border-purple-200 text-purple-700',
      iconBoxStyle: 'bg-purple-50 border-purple-200 text-purple-700',
      titleHover: 'group-hover:text-purple-700',
    }
  ];

  return (
    <div className="w-full space-y-4 pt-1">
      
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-[#D4A84F] shrink-0">
          <Zap className="w-4 h-4 fill-[#D4A84F]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-tight">
            Quick Actions
          </h2>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5">
            High-frequency student service shortcuts
          </p>
        </div>
      </div>

      {/* 3 Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {actions.map((act) => {
          const Icon = act.icon;

          return (
            <Link
              key={act.id}
              to={act.link}
              className="rounded-2xl bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B]/50 dark:hover:border-[#168A5B]/60 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xs dark:shadow-xl hover:shadow-md transition-all duration-200 group min-h-[190px]"
            >
              {/* Top Row: Large Icon in Rounded Square + Status Badge */}
              <div className="flex items-start justify-between relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 shadow-2xs ${act.iconBoxStyle}`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border shadow-2xs ${act.badgeStyle}`}>
                  {act.badge}
                </span>
              </div>

              {/* Middle Section: Title & Description */}
              <div className="my-4 relative z-10">
                <h3 className={`text-lg font-bold text-[#14213D] dark:text-[#F5F5F0] tracking-tight transition-colors duration-200 ${act.titleHover}`}>
                  {act.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-1.5 leading-relaxed">
                  {act.description}
                </p>
              </div>

              {/* Bottom Row: Launch Action link + Circular Arrow Button */}
              <div className="pt-2.5 border-t border-[#DDE7E2] dark:border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] group-hover:text-[#14213D] dark:group-hover:text-[#F5F5F0] transition-colors">
                  Launch Action
                </span>

                <div className="w-8 h-8 rounded-full border border-[#DDE7E2] dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-center text-[#64748B] dark:text-[#A8B3B0] group-hover:bg-[#168A5B] group-hover:text-white group-hover:border-[#168A5B] transition-all duration-200 shadow-2xs">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

            </Link>
          );
        })}
      </div>

    </div>
  );
}
