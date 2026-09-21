import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Construction,
  LayoutDashboard,
  ClipboardList,
  Building2,
  BarChart3,
  Users,
  Bell,
  FileSpreadsheet,
  Settings
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const routeDetails = {
  '/admin/complaints': {
    title: 'Complaint Management Console',
    desc: 'Advanced triage, SLA tracking, batch reassignment, and student communication hub.',
    icon: ClipboardList,
    phase: 'Planned Module',
  },
  '/admin/departments': {
    title: 'Department Administration',
    desc: 'Manage campus divisions, shift leads, technician rosters, and routing rules.',
    icon: Building2,
    phase: 'Planned Module',
  },
  '/admin/analytics': {
    title: 'Executive Campus Analytics',
    desc: 'Deep-dive metrics, historical heatmaps, resolution benchmarks, and student satisfaction index.',
    icon: BarChart3,
    phase: 'Planned Module',
  },
  '/admin/users': {
    title: 'User & Access Directory',
    desc: 'Manage administrative roles, department leads, staff credentials, and student permissions.',
    icon: Users,
    phase: 'Planned Module',
  },
  '/admin/notifications': {
    title: 'Notification & Broadcast Center',
    desc: 'Campus-wide emergency broadcasts, SMS/Email gateway alerts, and automated ticket triggers.',
    icon: Bell,
    phase: 'Planned Module',
  },
  '/admin/reports': {
    title: 'Compliance & Audit Reporting',
    desc: 'Generate PDF/CSV audit summaries for university accreditation and executive review.',
    icon: FileSpreadsheet,
    phase: 'Planned Module',
  },
  '/admin/settings': {
    title: 'System & Security Settings',
    desc: 'Configure SLA thresholds, AI classification sensitivity, and backup schedules.',
    icon: Settings,
    phase: 'Planned Module',
  },
  '/admin/help': {
    title: 'Administrative Help & Documentation',
    desc: 'System operation guides, dispatch escalation workflows, and institutional support resources.',
    icon: Construction,
    phase: 'Support Center',
  },
};

export default function AdminPlaceholder() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentInfo = routeDetails[location.pathname] || {
    title: 'Admin Module',
    desc: 'This administration view is part of the planned Smart Campus roadmap.',
    icon: Construction,
    phase: 'Upcoming Release',
  };

  const Icon = currentInfo.icon;

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader onToggleMobile={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="max-w-lg w-full text-center p-8 rounded-2xl bg-[#0D1B22] border border-[#1A2E3B] shadow-card-elevated">
            <div className="w-16 h-16 rounded-2xl bg-[#315C3A]/20 border border-[#315C3A] text-[#D4A84F] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#13242E] text-[#D4A84F] border border-[#1A2E3B]">
              {currentInfo.phase}
            </span>

            <h2 className="text-xl font-bold text-[#F5F5F0] mt-3">
              {currentInfo.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#9FB1BC] mt-2 leading-relaxed">
              {currentInfo.desc}
            </p>

            <div className="mt-6 pt-5 border-t border-[#1A2E3B] flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/admin/dashboard"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] flex items-center justify-center gap-2 transition-all shadow-glow-green"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D4A84F]" />
                <span>Return to Live Dashboard</span>
              </Link>
            </div>
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
