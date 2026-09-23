import React from 'react';
import {
  ClipboardList,
  RefreshCw,
  Send,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions({
  onViewComplaints,
  onOpenUpdate,
  onOpenNotify,
  onViewAnalytics
}) {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'View Assigned Complaints',
      subtitle: '42 Active tickets in queue',
      icon: ClipboardList,
      color: '#008F63',
      darkColor: '#00A875',
      bgColor: 'bg-[#008F63]/10 dark:bg-[#00A875]/15',
      handler: onViewComplaints || (() => navigate('/department/complaints'))
    },
    {
      title: 'Update Complaint',
      subtitle: 'Transition status & notes',
      icon: RefreshCw,
      color: '#3B82F6',
      darkColor: '#60A5FA',
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/15',
      handler: onOpenUpdate
    },
    {
      title: 'Notify Student',
      subtitle: 'Dispatch direct student alert',
      icon: Send,
      color: '#D4A84F',
      darkColor: '#D4A84F',
      bgColor: 'bg-[#D4A84F]/10 dark:bg-[#D4A84F]/15',
      handler: onOpenNotify
    },
    {
      title: 'View Analytics',
      subtitle: 'Resolution & SLA trends',
      icon: BarChart3,
      color: '#71844A',
      darkColor: '#8CA35C',
      bgColor: 'bg-[#71844A]/10 dark:bg-[#71844A]/15',
      handler: onViewAnalytics || (() => navigate('/department/analytics'))
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Quick Actions
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
            Common administrative workflows and tools
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.title}
              onClick={act.handler}
              className="rounded-2xl p-4 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs hover:border-[#008F63]/50 dark:hover:border-[#315C3A] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${act.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" style={{ color: act.color }} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                    {act.subtitle}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#60717A] dark:text-[#9FB1BC] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
