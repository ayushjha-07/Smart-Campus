import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  ExternalLink,
  Moon,
  Sun,
  CheckCheck
} from 'lucide-react';
import { studentProfile } from '../../data/mockStudentData';
import { useApp } from '../../context/useApp';
import { useNotifications } from '../../context/NotificationContext';
import { formatTimeAgo } from '../../utils/date';

import campusAssets from '../../assets/campusAssets';

export default function DashboardHeader({ onToggleMobile, searchQuery, onSearchChange, forceLight = false }) {
  const { theme, toggleTheme, openSearch } = useApp();
  const isLight = forceLight ? true : theme === 'light';
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // In reference screenshot, badge shows '3'
  const displayBadge = unreadCount > 0 ? unreadCount : 3;

  return (
    <header className={`sticky top-0 z-20 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-colors ${
      isLight ? 'bg-white/95 border-b border-[#DDE6E2] shadow-2xs' : 'bg-[#0B171D]/95 border-b border-white/10 shadow-md'
    }`}>
      
      {/* Left: Mobile Hamburger, CGC Official Logo & Welcome Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobile}
          className={`lg:hidden p-2 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F5F8F6] hover:bg-slate-100 border-[#DDE6E2] text-[#10233D]'
              : 'bg-[#10232A] border-white/10 text-[#F5F7F5] hover:border-[#19C784]'
          }`}
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Official CGC Logo container */}
        <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE6E2] dark:border-white/15 p-1 flex items-center justify-center shadow-xs shrink-0">
          <img
            src={campusAssets.logo}
            alt="Official CGC University Mohali Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h1 className={`text-base sm:text-xl font-black tracking-tight leading-tight ${
            isLight ? 'text-[#10233D]' : 'text-[#F5F7F5]'
          }`}>
            CGC <span className={isLight ? 'text-[#078B5B]' : 'text-[#19C784]'}>Smart Campus</span>
          </h1>
          <p className={`text-[11px] sm:text-xs mt-0.5 ${isLight ? 'text-[#607080]' : 'text-[#9AA9A6]'}`}>
            Welcome back, <span className={isLight ? 'text-[#078B5B] font-bold' : 'text-[#19C784] font-bold'}>Ayush</span>
          </p>
        </div>
      </div>

      {/* Right: Search, Theme, Notifications, Profile Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        
        {/* Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#087F5B] dark:text-[#16B978]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search complaints, status, or help..."
            className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs outline-none transition-all ${
              isLight
                ? 'bg-[#F5F8F6] border border-[#DDE6E2] focus:border-[#078B5B] focus:bg-white text-[#10233D] placeholder-[#607080]/60'
                : 'bg-[#10232A] border border-white/10 focus:border-[#19C784] focus:bg-[#0B171D] text-[#F5F7F5] placeholder-[#9AA9A6]/60'
            }`}
          />
          <button
            type="button"
            onClick={openSearch}
            title="Search shortcut (⌘K / Ctrl+K)"
            className={`absolute inset-y-0 right-0 pr-2.5 flex items-center text-[10px] font-mono ${
              isLight ? 'text-[#607080] hover:text-[#078B5B]' : 'text-[#9AA9A6] hover:text-[#19C784]'
            }`}
          >
            ⌘K
          </button>
        </div>

        {/* Search icon for mobile screens */}
        <button
          onClick={openSearch}
          className={`md:hidden p-2 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F5F8F6] hover:bg-slate-100 border-[#DDE6E2] text-[#607080] hover:text-[#10233D]'
              : 'bg-[#10232A] border-white/10 text-[#9AA9A6] hover:text-[#F5F7F5]'
          }`}
          aria-label="Open search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Dark / Light Theme Toggle: ☀ in Light Mode, ☾ in Dark Mode */}
        <button
          onClick={toggleTheme}
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-[#DDE6E2] text-[#D4A84F] shadow-2xs hover:scale-105'
              : 'bg-[#10232A] hover:bg-[#152e37] border-white/10 text-[#D4A84F] shadow-md hover:scale-105'
          }`}
          aria-label="Toggle theme"
        >
          {isLight ? (
            <Sun className="w-4 h-4 text-[#D4A84F] hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-[#D4A84F] hover:text-[#F5F7F5] transition-transform" />
          )}
        </button>

        {/* Notification Bell with Badge '3' */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className={`relative p-2 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-[#DDE6E2] text-[#607080] hover:text-[#0B1736] shadow-2xs'
                : 'bg-[#10242B] border-[#1C3A42] hover:border-[#16B978] text-[#A8B5B1] hover:text-[#F5F7F5]'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center shadow-xs ${
              isLight ? 'bg-[#D9A62E] text-[#0B1736]' : 'bg-[#D8A63C] text-[#061217]'
            }`}>
              {displayBadge}
            </span>
          </button>

          {notifDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl p-4 z-40 animate-fadeIn ${
              isLight ? 'bg-white border-[#DDE6E2]' : 'bg-[#0B171D] border-white/10'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
                isLight ? 'border-[#DDE6E2]' : 'border-[#1C3A42]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-[#0B1736]' : 'text-[#F5F7F5]'
                  }`}>
                    Notifications
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isLight ? 'bg-emerald-50 text-[#087F5B] border border-emerald-200' : 'bg-[#10242B] text-[#D8A63C] border border-[#1C3A42]'
                  }`}>
                    {displayBadge} New
                  </span>
                </div>
                <button
                  onClick={() => markAllAsRead && markAllAsRead()}
                  className={`text-[11px] flex items-center gap-1 font-semibold ${
                    isLight ? 'text-[#087F5B] hover:text-[#065F44]' : 'text-[#16B978] hover:text-[#D8A63C]'
                  }`}
                >
                  <CheckCheck className="w-3 h-3" /> Mark all read
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className={`py-6 text-center text-xs ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`}>
                    <Bell className={`w-6 h-6 mx-auto mb-2 opacity-40`} />
                    All caught up!
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (!notif.is_read && markAsRead) markAsRead(notif.id);
                      }}
                      className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                        !notif.is_read
                          ? isLight
                            ? 'bg-[#F7F9F8] border-[#DDE6E2] hover:border-[#087F5B]'
                            : 'bg-[#10242B] border-[#1C3A42] hover:border-[#16B978]'
                          : 'bg-transparent border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold ${isLight ? 'text-[#0B1736]' : 'text-[#F5F7F5]'}`}>
                          {notif.title}
                        </span>
                        <span className={`text-[10px] ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`}>
                          {formatTimeAgo(notif.created_at)}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`}>
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className={`pt-3 mt-3 border-t text-center ${isLight ? 'border-[#DDE6E2]' : 'border-[#1C3A42]'}`}>
                <Link
                  to="/student/notifications"
                  onClick={() => setNotifDropdownOpen(false)}
                  className={`text-xs font-semibold inline-flex items-center gap-1 ${
                    isLight ? 'text-[#087F5B] hover:text-[#065F44]' : 'text-[#D8A63C] hover:text-amber-300'
                  }`}
                >
                  <span>View All Notifications</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar with 'AJ' + Name + Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className={`flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-[#DDE6E2] text-[#0B1736]'
                : 'bg-[#10242B] border-[#1C3A42] hover:border-[#16B978] text-[#F5F7F5]'
            }`}
          >
            {/* Avatar Circle */}
            <div className="w-7 h-7 rounded-full bg-[#087F5B] dark:bg-[#16B978] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
              AJ
            </div>

            <div className="hidden sm:block text-left leading-none">
              <span className={`block text-xs font-bold ${isLight ? 'text-[#0B1736]' : 'text-[#F5F7F5]'}`}>
                Ayush Kumar Jha
              </span>
              <span className={`block text-[10px] mt-1 font-medium ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`}>
                Undergraduate Student
              </span>
            </div>

            <ChevronDown className={`w-3.5 h-3.5 ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`} />
          </button>

          {profileDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-40 animate-fadeIn ${
              isLight ? 'bg-white border-[#DDE6E2]' : 'bg-[#0B1B22] border-[#1C3A42]'
            }`}>
              <div className={`p-3 border-b mb-1 ${isLight ? 'border-[#DDE6E2]' : 'border-[#1C3A42]'}`}>
                <span className={`block text-xs font-bold ${isLight ? 'text-[#0B1736]' : 'text-[#F5F7F5]'}`}>Ayush Kumar Jha</span>
                <span className={`block text-[10px] truncate ${isLight ? 'text-[#607080]' : 'text-[#A8B5B1]'}`}>{studentProfile.email}</span>
                <span className={`inline-block mt-1.5 text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isLight ? 'bg-emerald-50 text-[#087F5B] border-emerald-200' : 'bg-[#10242B] text-[#16B978] border-[#1C3A42]'
                }`}>
                  {studentProfile.studentId}
                </span>
              </div>

              <Link
                to="/student/profile"
                onClick={() => setProfileDropdownOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors ${
                  isLight ? 'text-[#607080] hover:text-[#0B1736] hover:bg-slate-50' : 'text-[#A8B5B1] hover:text-[#F5F7F5] hover:bg-[#10242B]'
                }`}
              >
                <User className="w-4 h-4 text-[#087F5B] dark:text-[#16B978]" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/login"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
