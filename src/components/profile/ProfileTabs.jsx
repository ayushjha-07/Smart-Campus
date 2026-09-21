import React from 'react';
import { User, Home, Shield, Activity } from 'lucide-react';

export default function ProfileTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'personal',
      label: 'Personal & Academic',
      icon: User,
      description: 'Contact details, branch, and student ID',
    },
    {
      id: 'residence',
      label: 'Hostel & Residence',
      icon: Home,
      description: 'Room allocation, warden, and dining mess',
    },
    {
      id: 'security',
      label: 'Security & Access',
      icon: Shield,
      description: 'Password, 2FA, and active sessions',
    },
    {
      id: 'activity',
      label: 'Activity & History',
      icon: Activity,
      description: 'Service requests and audit records',
    },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#DDE7E2] dark:border-white/10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#168A5B] text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-white dark:hover:bg-[#0D1B22]/90 bg-transparent border border-transparent hover:border-[#DDE7E2] dark:hover:border-white/10'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4A84F]' : 'text-[#64748B] dark:text-[#A8B3B0]'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
