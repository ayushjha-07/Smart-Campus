import React from 'react';
import { Layers, Bell, ClipboardList, Laptop, Megaphone } from 'lucide-react';

export default function NotificationTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: 'all', label: 'All', icon: Layers, count: counts.all },
    { id: 'unread', label: 'Unread', icon: Bell, count: counts.unread },
    { id: 'complaints', label: 'Complaints', icon: ClipboardList, count: counts.complaints },
    { id: 'system', label: 'System', icon: Laptop, count: counts.system },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, count: counts.announcements },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#078A5A] dark:bg-[#00B87A] text-white shadow-md shadow-[#078A5A]/20 dark:shadow-[#00B87A]/25 border border-transparent'
                : 'bg-white dark:bg-[#0B2027] text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-[#F5F7F5] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                isActive ? 'text-white' : 'text-[#078A5A] dark:text-[#00B87A]'
              }`}
            />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F0F4F2] dark:bg-white/10 text-[#687A91] dark:text-[#91A7A5]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
