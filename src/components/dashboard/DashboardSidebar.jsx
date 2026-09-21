import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Bell, 
  User, 
  HelpCircle, 
  LogOut, 
  X
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import { useApp } from '../../context/useApp';

export default function DashboardSidebar({ mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const { theme } = useApp();
  const isLight = theme === 'light';

  const mainNavItems = [
    {
      name: 'Dashboard',
      href: '/student/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Submit Complaint',
      href: '/student/complaints/new',
      icon: PlusCircle,
      badge: 'New',
    },
    {
      name: 'My Complaints',
      href: '/student/complaints',
      icon: ClipboardList,
      badge: '5',
    },
    {
      name: 'Notifications',
      href: '/student/notifications',
      icon: Bell,
      badge: '2',
    },
    {
      name: 'Profile',
      href: '/student/profile',
      icon: User,
      badge: null,
    },
  ];

  const secondaryNavItems = [
    {
      name: 'Help & Support',
      href: '#help',
      icon: HelpCircle,
    },
    {
      name: 'Logout',
      href: '/login',
      icon: LogOut,
    },
  ];

  const sidebarBody = (
    <div className={`relative flex flex-col h-full justify-between select-none overflow-hidden transition-colors ${
      isLight ? 'bg-white text-[#10213A]' : 'bg-[#050D12] text-[#F5F7F5]'
    }`}>
      
      {/* 1. Subtle Authentic CGC Gate Entrance Photograph Backdrop */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 pointer-events-none z-0 ${
          isLight ? 'opacity-10 mix-blend-multiply' : 'opacity-20'
        }`}
        style={{ backgroundImage: `url(${campusAssets.gateImage})` }}
      />

      {/* 2. Top Section & Navigation */}
      <div className="relative z-10 overflow-y-auto overflow-x-hidden flex-1 flex flex-col p-4 scrollbar-thin">
        
        {/* Brand Logo & Institution Header Card */}
        <div className={`p-4 rounded-2xl border text-center flex flex-col items-center relative mb-3 transition-colors ${
          isLight 
            ? 'bg-white/95 border-[#DDE6E2] shadow-xs' 
            : 'bg-[#0B171D]/90 border-white/10 shadow-xl'
        }`}>
          
          {/* Close button for mobile drawer */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className={`absolute top-3 right-3 lg:hidden p-1.5 rounded-lg border ${
                isLight ? 'bg-slate-100 border-[#DDE6E2] text-[#607080]' : 'bg-black/40 border-white/20 text-white/80'
              }`}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Exact Official CGC University Logo with crisp white badge */}
          <div className={`rounded-xl p-2 bg-white shadow-md flex items-center justify-center shrink-0 mb-2.5 border ${
            isLight ? 'border-[#DDE6E2]' : 'border-white/15'
          }`}>
            <img
              src={campusAssets.logo}
              alt="Official CGC University Mohali Logo"
              className="h-14 sm:h-16 w-auto object-contain"
              loading="eager"
            />
          </div>

          {/* Institutional Branding Hierarchy */}
          <h1 className={`text-base font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-[#10213A]' : 'text-white'
          }`}>
            CGC University
          </h1>
          <span className={`text-xs font-semibold tracking-wider uppercase mt-0.5 ${
            isLight ? 'text-[#607080]' : 'text-[#D4A84F]'
          }`}>
            Mohali
          </span>

          <div className={`w-12 h-px my-2 ${
            isLight ? 'bg-[#DDE6E2]' : 'bg-white/20'
          }`} />

          <h2 className={`text-sm font-black tracking-tight leading-tight ${
            isLight ? 'text-[#10213A]' : 'text-white'
          }`}>
            Smart <span className={isLight ? 'text-[#078A5A]' : 'text-[#19C784]'}>Campus</span>
          </h2>
          <span className={`text-[9px] font-extrabold uppercase tracking-widest mt-0.5 ${
            isLight ? 'text-[#078A5A]' : 'text-[#19C784]'
          }`}>
            COMPLAINT & ANALYTICS
          </span>
          <p className={`text-[9px] font-medium tracking-wider mt-1 ${
            isLight ? 'text-[#607080]' : 'text-slate-300'
          }`}>
            Report. Track. Resolve. Improve.
          </p>
        </div>

        {/* Primary Navigation Items */}
        <nav className="space-y-1.5 flex-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.href ||
              (item.href === '/student/complaints' &&
                location.pathname.startsWith('/student/complaints') &&
                !location.pathname.startsWith('/student/complaints/new'));

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#078A5A] dark:bg-[#0F8F63] text-white shadow-md shadow-emerald-950/20 font-bold'
                    : isLight
                      ? 'text-[#607080] hover:text-[#10213A] hover:bg-slate-100/90'
                      : 'text-[#9AA9A6] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-white'
                        : isLight
                          ? 'text-[#078A5A] group-hover:text-[#10213A]'
                          : 'text-[#19C784] group-hover:text-white'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : isLight
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-[#D4A84F] text-[#050D12] font-black'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Motivational Banner at Lower Sidebar */}
        <div className={`mt-3 p-3 rounded-xl border text-center transition-colors ${
          isLight ? 'bg-slate-50/80 border-[#DDE6E2]' : 'bg-[#0B171D]/80 border-white/10'
        }`}>
          <p className={`text-xs font-serif italic leading-snug ${
            isLight ? 'text-[#10213A]' : 'text-white/95'
          }`}>
            “A Better Campus<br />A Brighter Tomorrow”
          </p>
          <div className="h-0.5 w-8 mx-auto mt-1.5 rounded-full bg-[#D4A84F]" />
        </div>

      </div>

      {/* 3. Bottom Section: Account & Support */}
      <div className={`relative z-10 p-4 border-t space-y-2.5 transition-colors ${
        isLight ? 'border-[#DDE6E2] bg-white' : 'border-white/10 bg-[#050D12]'
      }`}>
        <div className="px-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${
            isLight ? 'text-[#607080]' : 'text-slate-400'
          }`}>
            Account & Support
          </span>
        </div>

        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isLight
                    ? 'text-[#607080] hover:text-[#10213A] hover:bg-slate-100'
                    : 'text-[#9AA9A6] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isLight ? 'text-[#078A5A]' : 'text-[#19C784]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* System Version & Online Indicator */}
        <div className={`pt-1.5 px-2 text-[10px] flex items-center justify-between font-medium ${
          isLight ? 'text-[#607080]' : 'text-slate-400'
        }`}>
          <span>v2.4 Core System</span>
          <span className="inline-flex items-center gap-1.5 text-[#078A5A] dark:text-[#19C784] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#078A5A] dark:bg-[#19C784] animate-pulse" />
            Campus Online
          </span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar (280px width) */}
      <aside className={`hidden lg:block fixed top-0 bottom-0 left-0 w-[280px] z-30 shadow-md transition-colors ${
        isLight ? 'border-r border-[#DDE6E2]' : 'border-r border-white/10'
      }`}>
        {sidebarBody}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn"
            onClick={onCloseMobile}
          />
          <div className="relative w-[280px] max-w-[85%] h-full z-10 shadow-2xl animate-slideRight">
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
}
