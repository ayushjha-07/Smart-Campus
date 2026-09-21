import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wrench,
  LayoutDashboard,
  ClipboardList,
  LoaderCircle,
  CheckCircle2,
  Bell,
  BarChart3,
  User
} from 'lucide-react';
import DepartmentSidebar from '../../components/department/DepartmentSidebar';
import DepartmentHeader from '../../components/department/DepartmentHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const departmentModules = {
  '/department/complaints': {
    title: 'Assigned Complaints Roster',
    desc: 'Full directory of all active and historical tickets routed to the Maintenance Department.',
    icon: ClipboardList,
    count: '42 Tickets',
  },
  '/department/in-progress': {
    title: 'Active Work In Progress',
    desc: 'Complaints currently being serviced by on-duty maintenance technicians.',
    icon: LoaderCircle,
    count: '12 Active',
  },
  '/department/resolved': {
    title: 'Resolved Complaint Archives',
    desc: 'Completed maintenance work logs, parts replacement receipts, and resolution verifications.',
    icon: CheckCircle2,
    count: '22 Resolved',
  },
  '/department/notifications': {
    title: 'Maintenance Alert Center',
    desc: 'Urgent hazard dispatches, SLA escalation warnings, and student replies.',
    icon: Bell,
    count: '4 New',
  },
  '/department/analytics': {
    title: 'Maintenance Efficiency Analytics',
    desc: 'SLA compliance charts, recurring fixture breakdown heatmaps, and technician utilization rates.',
    icon: BarChart3,
    count: 'Live Metrics',
  },
  '/department/profile': {
    title: 'Staff Profile & Shift Roster',
    desc: 'Duty shift schedules, contact information, and equipment assignment records for Rohit Sharma (EMP-MNT-024).',
    icon: User,
    count: 'EMP-MNT-024',
  },
  '/department/help': {
    title: 'Department Field Guide & SOPs',
    desc: 'Standard operating procedures, emergency hazard response, and maintenance workflow protocols.',
    icon: Wrench,
    count: 'Documentation',
  },
};

export default function DepartmentPlaceholder() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const moduleInfo = departmentModules[location.pathname] || {
    title: 'Department Module',
    desc: 'This section is part of the planned department operations roadmap.',
    icon: Wrench,
    count: 'Upcoming Module',
  };

  const Icon = moduleInfo.icon;

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans">
      {/* Sidebar */}
      <DepartmentSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <DepartmentHeader onToggleMobile={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="max-w-lg w-full text-center p-8 rounded-2xl bg-[#0D1B22] border border-[#1A2E3B] shadow-card-elevated">
            <div className="w-16 h-16 rounded-2xl bg-[#315C3A]/20 border border-[#315C3A] text-[#D4A84F] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#13242E] text-[#D4A84F] border border-[#1A2E3B]">
              {moduleInfo.count}
            </span>

            <h2 className="text-xl font-bold text-[#F5F5F0] mt-3">
              {moduleInfo.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#9FB1BC] mt-2 leading-relaxed">
              {moduleInfo.desc}
            </p>

            <div className="mt-6 pt-5 border-t border-[#1A2E3B] flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/department/dashboard"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] flex items-center justify-center gap-2 transition-all shadow-glow-green"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D4A84F]" />
                <span>Return to Live Department Dashboard</span>
              </Link>
            </div>
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
