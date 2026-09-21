import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  BarChart3,
  Users,
  Bell,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import UniversityLogo from '../common/UniversityLogo';



export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Complaint Management', path: '/admin/complaints', icon: ClipboardList, count: 42 },
    { name: 'Departments', path: '/admin/departments', icon: Building2 },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, count: 5 },
    { name: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#07121A] border-r border-[#1A2E3B] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin Navigation Sidebar"
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#1A2E3B] bg-[#050A0C]/50 relative">
          <div className="w-full">
            <UniversityLogo variant="sidebar" subtitle="Admin Portal" linkTo="/admin/dashboard" />
          </div>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-md lg:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>


        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#71844A]">
            Core Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#315C3A]/25 text-[#F5F5F0] border border-[#315C3A]/60 shadow-[0_0_15px_-4px_rgba(49,92,58,0.4)]'
                      : 'text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#D4A84F]' : 'text-[#9FB1BC] group-hover:text-[#F5F5F0]'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.count && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-[#D4A84F] text-[#050A0C]'
                            : 'bg-[#13242E] text-[#D4A84F] border border-[#1A2E3B]'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-[#1A2E3B] bg-[#050A0C]/40 space-y-1">
          <button
            onClick={() => alert('Smart Campus Admin Support: Contact support@campus.edu or ext 4010')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#71844A]" />
            <span>Help & Support</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400/90 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
