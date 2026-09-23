import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  BarChart3,
  User,
  HelpCircle,
  LogOut,
  X,
  Wrench
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import { useAuth } from '../../context/AuthContext';
import { DEFAULT_DEPARTMENT_STAFF } from '../../data/departmentDashboardData';

export default function DepartmentSidebar({ mobileOpen, setMobileOpen, activeComplaintsCount = 42 }) {
  const navigate = useNavigate();
  const { logout, currentUser, profilePhoto } = useAuth();

  // Dynamic user data resolution (ensures never hardcoding Ayush)
  const staffName = currentUser?.name || currentUser?.full_name || DEFAULT_DEPARTMENT_STAFF.name;
  const staffDepartment = currentUser?.department || DEFAULT_DEPARTMENT_STAFF.department;

  const navItems = [
    { name: 'Dashboard', path: '/department/dashboard', icon: LayoutDashboard },
    { name: 'Assigned Complaints', path: '/department/complaints', icon: ClipboardList, badge: String(activeComplaintsCount) },
    { name: 'Notifications', path: '/department/notifications', icon: Bell, badge: '4' },
    { name: 'Analytics', path: '/department/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/department/profile', icon: User },
    { name: 'Help & Support', path: '/student/help-support', icon: HelpCircle }
  ];

  const handleLogout = () => {
    logout?.();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Fixed Responsive Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-white dark:bg-[#07121A] border-r border-[#DDE8E3] dark:border-[#1A2E3B] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        aria-label="Department Portal Sidebar"
      >
        {/* Brand Top Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#DDE8E3] dark:border-[#1A2E3B] bg-[#F7F9F8]/60 dark:bg-[#050A0C]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0D1B22] p-1.5 border border-[#DDE8E3] dark:border-white/10 shadow-xs flex items-center justify-center shrink-0">
              <img
                src={campusAssets.logo}
                alt="CGC University Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#071A2B] dark:text-white">
                  CGC University
                </span>
              </div>
              <h1 className="text-sm font-extrabold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
                Smart <span className="text-[#008F63] dark:text-[#00A875]">Campus</span>
              </h1>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#D4A84F]">
                Department Portal
              </span>
            </div>
          </div>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#13242E] rounded-lg lg:hidden transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
            Department Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#008F63]/10 dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#F5F5F0] border border-[#008F63]/30 dark:border-[#315C3A]/60 shadow-xs font-bold'
                      : 'text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#0D1B22] border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#008F63] dark:text-[#D4A84F]'
                            : 'text-[#60717A] dark:text-[#9FB1BC] group-hover:text-[#071A2B] dark:group-hover:text-[#F5F5F0]'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-[#008F63] text-white dark:bg-[#D4A84F] dark:text-[#050A0C]'
                            : 'bg-slate-100 dark:bg-[#13242E] text-[#60717A] dark:text-[#D4A84F] border border-[#DDE8E3] dark:border-[#1A2E3B]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom: Staff Profile Section */}
        <div className="p-3.5 border-t border-[#DDE8E3] dark:border-[#1A2E3B] bg-[#F7F9F8]/60 dark:bg-[#050A0C]/50 space-y-2.5">
          <div className="flex items-center gap-3 px-2 py-1">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#008F63] dark:bg-[#315C3A] text-white font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 border border-white/20 shadow-xs">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Staff Avatar" className="w-full h-full object-cover" />
              ) : (
                <Wrench className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Profile Info */}
            <div className="min-w-0 flex-1 leading-tight">
              <span className="block text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] truncate" title={staffName}>
                {staffName}
              </span>
              <span className="block text-[11px] font-semibold text-[#D4A84F] truncate mt-0.5" title={staffDepartment}>
                {staffDepartment}
              </span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
