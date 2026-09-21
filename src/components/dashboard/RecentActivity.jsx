import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  FileText, 
  Search, 
  Check, 
  FolderCheck 
} from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function RecentActivity() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  const activities = [
    {
      id: 'act-1',
      time: 'TODAY • 10:42 AM',
      text: 'Complaint SC-2026-1847 assigned to Maintenance Department.',
      badge: 'SC-2026-1847',
      link: '/student/complaints/SC-2026-1847',
      icon: FolderCheck,
      type: 'Assignment',
      accentColor: '#D4A84F',
      dotStyle: 'bg-[#D4A84F] text-[#071A22] shadow-[0_0_12px_rgba(212,168,79,0.7)]',
      cardBg: isLight
        ? 'bg-amber-50/60 border-amber-200/90 hover:border-[#D4A84F]'
        : 'bg-[#0A2028]/85 border-[#D4A84F]/30 hover:border-[#D4A84F]/60',
      iconBox: 'bg-[#D4A84F]/15 border-[#D4A84F]/35 text-[#D4A84F]',
      timeColor: 'text-[#D4A84F]',
    },
    {
      id: 'act-2',
      time: 'TODAY • 09:15 AM',
      text: 'Complaint SC-2026-1839 moved to Under Review.',
      badge: 'SC-2026-1839',
      link: '/student/complaints/SC-2026-1839',
      icon: Search,
      type: 'Under Review',
      accentColor: '#3B82F6',
      dotStyle: 'bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.7)]',
      cardBg: isLight
        ? 'bg-blue-50/60 border-blue-200/90 hover:border-[#3B82F6]'
        : 'bg-[#0A2028]/85 border-[#3B82F6]/30 hover:border-[#3B82F6]/60',
      iconBox: 'bg-[#3B82F6]/15 border-[#3B82F6]/35 text-[#3B82F6]',
      timeColor: 'text-[#3B82F6]',
    },
    {
      id: 'act-3',
      time: 'YESTERDAY • 04:30 PM',
      text: 'Complaint SC-2026-1828 marked as Resolved.',
      badge: 'SC-2026-1828',
      link: '/student/complaints/SC-2026-1828',
      icon: Check,
      type: 'Resolved',
      accentColor: '#18B878',
      dotStyle: 'bg-[#18B878] text-[#071A22] shadow-[0_0_12px_rgba(24,184,120,0.7)]',
      cardBg: isLight
        ? 'bg-emerald-50/60 border-emerald-200/90 hover:border-[#18B878]'
        : 'bg-[#0A2028]/85 border-[#18B878]/30 hover:border-[#18B878]/60',
      iconBox: 'bg-[#18B878]/15 border-[#18B878]/35 text-[#18B878]',
      timeColor: 'text-[#18B878]',
    },
    {
      id: 'act-4',
      time: 'YESTERDAY • 01:20 PM',
      text: 'New complaint SC-2026-1847 submitted.',
      badge: 'SC-2026-1847',
      link: '/student/complaints/SC-2026-1847',
      icon: FileText,
      type: 'Submitted',
      accentColor: '#7C4DFF',
      dotStyle: 'bg-[#7C4DFF] text-white shadow-[0_0_12px_rgba(124,77,255,0.7)]',
      cardBg: isLight
        ? 'bg-purple-50/60 border-purple-200/90 hover:border-[#7C4DFF]'
        : 'bg-[#0A2028]/85 border-[#7C4DFF]/30 hover:border-[#7C4DFF]/60',
      iconBox: 'bg-[#7C4DFF]/15 border-[#7C4DFF]/35 text-[#A78BFA]',
      timeColor: 'text-[#A78BFA]',
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
          {/* Green Clock Icon in Rounded Square matching reference */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#103328]/80 border border-[#18B878]/35 text-[#18B878] flex items-center justify-center shrink-0 shadow-sm">
            <Clock className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl font-bold tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-[#F5F5F0]'
            }`}>
              Recent Activity
            </h2>
            <p className="text-xs text-[#94A3A8] mt-0.5">
              Chronological audit record of complaint events
            </p>
          </div>
        </div>

        {/* Top-Right Quick Link: View All -> */}
        <Link
          to="/student/complaints"
          className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
            isLight
              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              : 'bg-[#041118]/80 hover:bg-[#0A2028] border-white/10 hover:border-[#18B878]/40 text-slate-300 hover:text-white'
          }`}
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative mt-5 mb-1 flex-1 flex flex-col justify-between">
        
        {/* Continuous Left Vertical Timeline Gradient Line */}
        <div className="absolute left-[13px] sm:left-[15px] top-4 bottom-5 w-0.5 bg-gradient-to-b from-[#D4A84F]/60 via-[#3B82F6]/50 via-[#18B878]/50 to-[#7C4DFF]/60 pointer-events-none" />

        {/* 4 Activity Items */}
        <div className="space-y-3 relative z-10">
          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="relative flex items-center gap-3 sm:gap-3.5 pl-0">
                
                {/* Timeline Circular Event Node */}
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                  isLight ? 'border-white' : 'border-[#071A22]'
                } ${item.dotStyle}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
                </div>

                {/* Event Card */}
                <Link
                  to={item.link}
                  className={`flex-1 rounded-xl p-2.5 sm:p-3 border flex items-center justify-between gap-3 shadow-sm transition-all duration-200 group hover:-translate-y-0.5 ${item.cardBg}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rounded square icon box inside card */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border shadow-xs ${item.iconBox}`}>
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    {/* Timestamp & Text */}
                    <div className="min-w-0">
                      <span className={`block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase ${item.timeColor}`}>
                        {item.time}
                      </span>
                      <p className={`text-xs sm:text-[13px] font-normal truncate mt-0.5 transition-colors ${
                        isLight ? 'text-slate-800 group-hover:text-black' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {item.text}
                      </p>
                    </div>
                  </div>

                  {/* Complaint ID Badge */}
                  <div className="shrink-0 ml-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-600 group-hover:border-slate-400'
                        : 'bg-[#041118]/90 border-white/10 text-[#94A3A8] group-hover:text-[#F5F5F0] group-hover:border-white/20'
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                </Link>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
