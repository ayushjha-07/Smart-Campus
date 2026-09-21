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
  X,
  ChevronRight
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';

export default function DashboardSidebar({ mobileOpen, onCloseMobile }) {
  const location = useLocation();

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
    <div className="relative flex flex-col h-full justify-between select-none overflow-hidden text-white bg-[#061219]">
      
      {/* 1. Authentic CGC University Gate Entrance Photograph (Preserved, sharp, uncropped) */}
      <img
        src={campusAssets.gateImage}
        alt="CGC University Mohali Entrance Gate"
        className="absolute inset-0 w-full h-full object-cover opacity-75 z-0 pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center 46%' }}
      />

      {/* 2. Subtle Dark Navy & Forest-Green Overlay with Smooth Top-to-Bottom Gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5, 17, 24, 0.88) 0%, rgba(6, 24, 25, 0.68) 40%, rgba(5, 18, 22, 0.76) 75%, rgba(4, 12, 18, 0.92) 100%)'
        }}
      />

      {/* 3. Top Section & Navigation (Clean, minimal, no large glass box covering the middle) */}
      <div className="relative z-10 overflow-y-auto overflow-x-hidden flex-1 flex flex-col p-4 scrollbar-thin">
        
        {/* Brand Logo & Institution Header */}
        <div className="text-center flex flex-col items-center relative mb-5 pt-1">
          
          {/* Close button for mobile drawer */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="absolute top-0 right-0 lg:hidden p-1.5 rounded-lg bg-black/40 border border-white/20 text-white/90"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Official CGC University Logo in a small clean transparent/glass area */}
          <div className="flex items-center justify-center p-2 rounded-2xl bg-white/[0.06] backdrop-blur-[4px] border border-white/10 shrink-0 mb-3 shadow-xs">
            <img
              src={campusAssets.logo}
              alt="Official CGC University Mohali Logo"
              className="h-16 sm:h-20 w-auto object-contain"
              loading="eager"
            />
          </div>

          {/* Institutional Branding Hierarchy */}
          <h1 className="text-base font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            CGC University
          </h1>
          <span className="text-xs font-semibold tracking-wider text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5">
            Mohali
          </span>

          <div className="w-12 h-px my-2.5 bg-white/20 shadow-xs" />

          <h2 className="text-sm font-black tracking-tight leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Smart <span className="text-[#10E894]">Campus</span>
          </h2>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#10E894] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5">
            COMPLAINT & ANALYTICS
          </span>
          <p className="text-[10px] italic font-medium text-white/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">
            Report. Track. Resolve. Improve.
          </p>
        </div>

        {/* Clean Vertical Navigation Panel (NO large translucent rectangle covering the section) */}
        <nav className="space-y-1.5 flex-1 py-1">
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
                    ? 'bg-[#079669] text-white shadow-md shadow-emerald-950/40 font-bold'
                    : 'text-white/90 hover:text-white hover:bg-white/[0.08] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : item.badge === 'New'
                          ? 'bg-[#D4A84F] text-[#07121A] font-black'
                          : 'bg-white/15 text-white font-bold'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Motivational Quote in Lower-Middle Section */}
        <div className="my-auto py-4 text-center select-none">
          <p className="font-serif italic text-sm sm:text-[15px] text-white/95 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            &ldquo;A Better Campus<br />A Brighter Tomorrow&rdquo;
          </p>
        </div>

      </div>

      {/* 4. Bottom Section: ACCOUNT & SUPPORT */}
      <div className="relative z-10 p-4 border-t border-white/15 space-y-2.5 bg-[#040D13]/40">
        <div className="px-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 drop-shadow-sm">
            ACCOUNT & SUPPORT
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
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/85 hover:text-white hover:bg-white/[0.08] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-white/80" />
                  <span>{item.name}</span>
                </div>
                {item.name === 'Help & Support' && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                )}
              </Link>
            );
          })}
        </div>

        {/* System Version & Online Indicator */}
        <div className="pt-2 px-2 text-[10px] flex items-center justify-between font-medium text-white/70 border-t border-white/10">
          <span>v2.4 Core System</span>
          <span className="inline-flex items-center gap-1.5 text-[#10E894] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10E894] animate-pulse" />
            Campus Online
          </span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar (280px width) */}
      <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-[280px] z-30 shadow-xl border-r border-white/10">
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
