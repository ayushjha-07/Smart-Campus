import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  ArrowRight, 
  AlertCircle, 
  Check, 
  Info, 
  Users,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function LatestNotifications() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  const notifications = [
    {
      id: 'notif-1',
      title: 'Status Update: SC-2026-1842',
      description: 'Electrician team is triaging circuit board in Lab 2.',
      time: '5 hours ago',
      link: '/student/complaints/SC-2026-1842',
      icon: AlertCircle,
      accentColor: '#EF4444',
      iconBox: 'bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444]',
      cardBg: isLight
        ? 'bg-red-50/60 border-red-200/90 hover:border-[#EF4444]'
        : 'bg-[#0A2028]/85 border-[#EF4444]/35 hover:border-[#EF4444]/65',
    },
    {
      id: 'notif-2',
      title: 'Complaint SC-2026-1845 Resolved',
      description: 'Your report regarding Library AC chiller has been resolved.',
      time: '5 hours ago',
      link: '/student/complaints/SC-2026-1845',
      icon: Check,
      accentColor: '#18B878',
      iconBox: 'bg-[#18B878]/20 border-[#18B878]/40 text-[#18B878]',
      cardBg: isLight
        ? 'bg-emerald-50/60 border-emerald-200/90 hover:border-[#18B878]'
        : 'bg-[#0A2028]/85 border-[#18B878]/35 hover:border-[#18B878]/65',
    },
    {
      id: 'notif-3',
      title: 'New Comment Added',
      description: 'Maintenance team added a comment on SC-2026-1839.',
      time: '8 hours ago',
      link: '/student/complaints/SC-2026-1839',
      icon: Info,
      accentColor: '#3B82F6',
      iconBox: 'bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#3B82F6]',
      cardBg: isLight
        ? 'bg-blue-50/60 border-blue-200/90 hover:border-[#3B82F6]'
        : 'bg-[#0A2028]/85 border-[#3B82F6]/35 hover:border-[#3B82F6]/65',
    },
    {
      id: 'notif-4',
      title: 'Complaint Assigned',
      description: 'SC-2026-1841 has been assigned to Infrastructure Department.',
      time: '1 day ago',
      link: '/student/complaints/SC-2026-1841',
      icon: Users,
      accentColor: '#D4A84F',
      iconBox: 'bg-[#D4A84F]/20 border-[#D4A84F]/40 text-[#D4A84F]',
      cardBg: isLight
        ? 'bg-amber-50/60 border-amber-200/90 hover:border-[#D4A84F]'
        : 'bg-[#0A2028]/85 border-[#D4A84F]/35 hover:border-[#D4A84F]/65',
    },
  ];

  return (
    <div className={`w-full rounded-[20px] p-5 sm:p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
      isLight 
        ? 'bg-white border border-slate-200 text-slate-900' 
        : 'bg-[#071A22] border border-[#0E2F3B] text-[#F5F5F0]'
    }`}>
      
      {/* Header Row */}
      <div className={`flex items-center justify-between pb-4 border-b gap-3 ${
        isLight ? 'border-slate-100' : 'border-white/10'
      }`}>
        <div className="flex items-center gap-3.5">
          {/* Coral/Red Bell Icon in Rounded Square matching reference */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/35 text-[#EF4444] flex items-center justify-center shrink-0 shadow-sm">
            <Bell className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl font-bold tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-[#F5F5F0]'
            }`}>
              Latest Notifications
            </h2>
            <p className="text-xs text-[#94A3A8] mt-0.5">
              Automated departmental alerts
            </p>
          </div>
        </div>

        {/* Top-Right Quick Link: View All -> */}
        <Link
          to="/student/notifications"
          className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
            isLight
              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              : 'bg-[#041118]/80 hover:bg-[#0A2028] border-white/10 hover:border-[#EF4444]/40 text-slate-300 hover:text-white'
          }`}
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Notification Cards Stacked */}
      <div className="mt-5 space-y-3 flex-1 flex flex-col justify-between">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.link}
              className={`rounded-xl p-2.5 sm:p-3 border flex items-center justify-between gap-3 shadow-sm transition-all duration-200 group hover:-translate-y-0.5 ${item.cardBg}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Notification Icon */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border shadow-xs ${item.iconBox}`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className={`text-xs sm:text-[13px] font-semibold truncate transition-colors ${
                    isLight ? 'text-slate-800 group-hover:text-black' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#94A3A8] mt-0.5 truncate leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Timestamp Right */}
              <div className="shrink-0 text-right ml-2">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#94A3A8] whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Note Strip inside Notifications Card matching reference screenshot */}
      <div className={`mt-3.5 rounded-xl p-2.5 sm:p-3 border flex items-center justify-between overflow-hidden relative ${
        isLight
          ? 'bg-amber-50/70 border-amber-200/80 text-amber-900'
          : 'bg-gradient-to-r from-[#0C1F1A] via-[#091A16] to-[#071A22] border-[#D4A84F]/25 text-slate-300'
      }`}>
        {/* Left Side: Lightbulb + Italic Message */}
        <div className="flex items-center gap-2 relative z-10">
          <Lightbulb className="w-4 h-4 text-[#D4A84F] shrink-0" />
          <span className="italic text-[11px] sm:text-xs text-slate-300">
            Stay informed, stay involved — together for a better campus!
          </span>
        </div>

        {/* Right Side: Subtle golden wave SVG decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-40 overflow-hidden">
          <svg viewBox="0 0 100 40" fill="none" className="w-full h-full text-[#D4A84F]">
            <path d="M0 35 C30 10, 70 30, 100 15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 38 C40 18, 80 32, 100 20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
      </div>

    </div>
  );
}
