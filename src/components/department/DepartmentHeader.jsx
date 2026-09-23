import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Check,
  ChevronDown,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { formatTimeAgo } from '../../utils/date';
import { DEFAULT_DEPARTMENT_STAFF } from '../../data/departmentDashboardData';

export default function DepartmentHeader({
  onToggleMobile,
  searchQuery = '',
  onSearchChange,
  title = 'Department Dashboard',
  subtitle = 'Manage and resolve complaints assigned to your department.'
}) {
  const { theme, toggleTheme, openSearch } = useApp();
  const { currentUser, profilePhoto } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef(null);

  // Dynamic user data resolution (ensures never hardcoding Ayush)
  const staffName = currentUser?.name || currentUser?.full_name || DEFAULT_DEPARTMENT_STAFF.name;
  const staffDepartment = currentUser?.department || DEFAULT_DEPARTMENT_STAFF.department;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#07121A]/95 backdrop-blur-md border-b border-[#DDE8E3] dark:border-[#1A2E3B] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Drawer Trigger & Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="p-2 text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg lg:hidden transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight flex items-center gap-2">
            {title}
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#008F63]/10 dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#D4A84F] border border-[#008F63]/25 dark:border-[#315C3A]/60">
              <Wrench className="w-3 h-3 text-[#008F63] dark:text-[#D4A84F]" />
              Staff Console
            </span>
          </h1>
          <p className="hidden sm:block text-xs text-[#60717A] dark:text-[#9FB1BC] truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Theme, Staff Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-[#60717A] dark:text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaints, student, ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-48 lg:w-64 pl-9 pr-8 py-1.5 text-xs bg-slate-50 dark:bg-[#0D1B22] border rounded-lg text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none transition-all ${
              searchFocused
                ? 'border-[#008F63] dark:border-[#D4A84F] ring-1 ring-[#008F63]/30 dark:ring-[#D4A84F]/30 w-64 lg:w-72'
                : 'border-[#DDE8E3] dark:border-[#1A2E3B] hover:border-[#008F63]/50 dark:hover:border-[#315C3A]'
            }`}
          />
          <button
            type="button"
            onClick={openSearch}
            title="Open Command Palette (Ctrl+K)"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-[#60717A] dark:text-[#9FB1BC]/70 hover:text-[#008F63] dark:hover:text-[#D4A84F]"
          >
            ⌘K
          </button>
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={openSearch}
          className="md:hidden p-2 text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors"
          aria-label="Open Command Palette"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors border border-transparent hover:border-[#DDE8E3] dark:hover:border-[#1A2E3B]"
            aria-label={`View department notifications (${unreadCount} unread)`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 dark:bg-[#D4A84F] text-white dark:text-[#07121A] text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] rounded-xl shadow-2xl p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDE8E3] dark:border-[#1A2E3B]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">Department Alerts</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#008F63]/10 dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#D4A84F] text-[10px] px-1.5 py-0.2 rounded font-bold">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      markAllAsRead();
                      setShowNotifications(false);
                    }}
                    className="text-[11px] text-[#008F63] dark:text-[#D4A84F] hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#DDE8E3] dark:divide-[#1A2E3B] max-h-64 overflow-y-auto my-1 scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-[#60717A] dark:text-[#9FB1BC]">
                    No department alerts at this time
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.is_read) markAsRead(n.id);
                      }}
                      className={`py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-[#13242E] rounded transition-colors cursor-pointer ${
                        !n.is_read ? 'bg-emerald-50/50 dark:bg-[#07121A]/50 border-l-2 border-l-[#008F63] dark:border-l-[#D4A84F]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${n.priority === 'CRITICAL' ? 'text-red-500' : n.priority === 'WARNING' ? 'text-amber-500' : 'text-[#071A2B] dark:text-[#F5F5F0]'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
                          {formatTimeAgo(n.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#60717A] dark:text-[#A8B3B0] mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-[#DDE8E3] dark:border-[#1A2E3B] text-center">
                <Link
                  to="/department/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#008F63] dark:text-[#D4A84F] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-[#60717A] dark:text-[#9FB1BC] hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:bg-slate-100 dark:hover:bg-[#0D1B22] rounded-lg transition-colors border border-transparent hover:border-[#DDE8E3] dark:hover:border-[#1A2E3B]"
          aria-label="Toggle visual theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4A84F]" /> : <Moon className="w-4 h-4 text-[#008F63]" />}
        </button>

        <div className="h-6 w-px bg-[#DDE8E3] dark:bg-[#1A2E3B] mx-0.5" />

        {/* Staff Profile Pill */}
        <Link
          to="/department/profile"
          className="flex items-center gap-2 pl-1 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-[#008F63] dark:bg-[#315C3A] text-white flex items-center justify-center text-xs font-bold shadow-xs overflow-hidden border border-[#DDE8E3] dark:border-white/10">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Staff Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{staffName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-none truncate max-w-[120px]">
              {staffName}
            </span>
            <span className="text-[10px] text-[#60717A] dark:text-[#71844A] font-semibold leading-tight mt-0.5 truncate max-w-[120px]">
              {staffDepartment}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC] hidden sm:block" />
        </Link>
      </div>
    </header>
  );
}
