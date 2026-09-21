import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Check,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { useNotifications } from '../../context/NotificationContext';
import { formatTimeAgo } from '../../utils/date';

export default function AdminHeader({
  onToggleMobile,
  onGlobalSearch,
  title = 'Admin Dashboard',
  subtitle = 'Monitor, manage, and improve campus complaint resolution.'
}) {
  const { theme, toggleTheme, openSearch } = useApp();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef(null);

  // Close notifications dropdown on outside click

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onGlobalSearch) {
      onGlobalSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#07121A]/95 backdrop-blur-md border-b border-[#1A2E3B] px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="p-2 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] rounded-lg lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#F5F5F0] tracking-tight flex items-center gap-2">
            {title}
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#315C3A]/25 text-[#D4A84F] border border-[#315C3A]/60">
              Live University Panel
            </span>
          </h1>
          <p className="hidden sm:block text-xs text-[#9FB1BC] truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Theme, Admin Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <Search className="w-4 h-4 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tickets, students, IDs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onGlobalSearch) onGlobalSearch(e.target.value);
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-48 lg:w-64 pl-9 pr-8 py-1.5 text-xs bg-[#0D1B22] border rounded-lg text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none transition-all ${
              searchFocused
                ? 'border-[#D4A84F] ring-1 ring-[#D4A84F]/30 w-72'
                : 'border-[#1A2E3B] hover:border-[#315C3A]'
            }`}
          />
          <button
            type="button"
            onClick={openSearch}
            title="Open Command Palette (Ctrl+K)"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-[#9FB1BC]/70 hover:text-[#D4A84F]"
          >
            ⌘K
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button
          onClick={openSearch}
          className="md:hidden p-2 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] rounded-lg transition-colors border border-transparent hover:border-[#1A2E3B]"
            aria-label={`View notifications (${unreadCount} unread)`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4A84F] text-[#07121A] text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#1A2E3B]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#F5F5F0]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#315C3A]/30 text-[#D4A84F] text-[10px] px-1.5 py-0.2 rounded font-bold">
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
                    className="text-[11px] text-[#71844A] hover:text-[#D4A84F] flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#1A2E3B] max-h-64 overflow-y-auto my-1 scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-[#9FB1BC]">
                    No notifications available
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.is_read) markAsRead(n.id);
                      }}
                      className={`py-2.5 px-2 hover:bg-[#13242E] rounded transition-colors cursor-pointer ${
                        !n.is_read ? 'bg-[#07121A]/40 border-l-2 border-l-[#D4A84F]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${n.priority === 'CRITICAL' ? 'text-red-400' : n.priority === 'WARNING' ? 'text-amber-300' : 'text-[#F5F5F0]'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#9FB1BC]">
                          {formatTimeAgo(n.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9FB1BC] mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>


              <div className="pt-2 border-t border-[#1A2E3B] text-center">
                <Link
                  to="/admin/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#D4A84F] hover:underline inline-flex items-center gap-1"
                >
                  Open notification center <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-[#9FB1BC] hover:text-[#D4A84F] hover:bg-[#0D1B22] rounded-lg transition-colors border border-transparent hover:border-[#1A2E3B]"
          aria-label="Toggle visual theme"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 text-[#D4A84F]" /> : <Sun className="w-4 h-4 text-[#D4A84F]" />}
        </button>

        <div className="h-6 w-px bg-[#1A2E3B] mx-0.5" />

        {/* Admin Avatar & Meta */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#315C3A] to-[#1A2E3B] border border-[#D4A84F]/50 flex items-center justify-center text-[#D4A84F] text-xs font-bold shadow-sm">
            CA
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#F5F5F0] leading-none">
              Campus Administrator
            </span>
            <span className="text-[10px] text-[#71844A] font-medium leading-tight mt-0.5">
              Administrator
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#9FB1BC] hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
