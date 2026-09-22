import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader({
  onToggleMobile,
  searchQuery,
  onSearchChange,
  title = 'Admin Dashboard',
  subtitle = 'Monitor complaints, campus issues, departments and overall resolution performance.'
}) {
  const { theme, toggleTheme } = useApp();
  const { unreadCount } = useNotifications();
  const { currentUser, profilePhoto } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const isLight = theme === 'light';
  const displayBadge = unreadCount > 0 ? unreadCount : 5;
  const adminName = currentUser?.name || currentUser?.full_name || 'Administrator';

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b transition-colors bg-white/95 dark:bg-[#07121A]/95 border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          type="button"
          className="lg:hidden p-2 rounded-xl border transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-[#0D1B22] dark:hover:bg-[#13242E] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0]"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#008F63]/10 dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#D4A84F] border border-[#008F63]/25 dark:border-[#315C3A]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#D4A84F] animate-pulse" />
              Live Central
            </span>
          </div>
          <p className="hidden md:block text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] truncate max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Theme Toggle, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaints, ID, student..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-40 sm:w-56 lg:w-64 pl-8 pr-3 py-1.5 text-xs rounded-xl border transition-all bg-[#F7F9F8] dark:bg-[#0D1B22] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:ring-1 focus:ring-[#008F63] dark:focus:ring-[#D4A84F]"
          />
        </div>

        {/* Notifications Icon with Badge */}
        <button
          type="button"
          title="Notifications"
          className="relative p-2 rounded-xl border transition-colors bg-[#F7F9F8] hover:bg-slate-200 dark:bg-[#0D1B22] dark:hover:bg-[#13242E] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] cursor-pointer"
        >
          <Bell className="w-4 h-4 text-[#60717A] dark:text-[#9FB1BC]" />
          {displayBadge > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              {displayBadge}
            </span>
          )}
        </button>

        {/* Theme Toggle (Light / Dark) */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className="p-2 rounded-xl border transition-colors bg-[#F7F9F8] hover:bg-slate-200 dark:bg-[#0D1B22] dark:hover:bg-[#13242E] border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] cursor-pointer"
          aria-label="Toggle theme"
        >
          {isLight ? (
            <Moon className="w-4 h-4 text-[#071A2B]" />
          ) : (
            <Sun className="w-4 h-4 text-[#D4A84F]" />
          )}
        </button>

        {/* Admin Profile/Avatar Badge */}
        <div className="relative">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl border transition-colors cursor-pointer bg-[#F7F9F8] hover:bg-slate-100 dark:bg-[#0D1B22] dark:hover:bg-[#13242E] border-[#DDE8E3] dark:border-[#1A2E3B]"
          >
            <div className="w-7 h-7 rounded-full bg-[#008F63] dark:bg-[#315C3A] text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
              {adminName === 'Student' ? 'Admin' : adminName.split(' ')[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-[#60717A] dark:text-[#9FB1BC]" />
          </div>
        </div>
      </div>
    </header>
  );
}
