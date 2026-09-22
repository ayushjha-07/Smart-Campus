import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminWelcome from '../../components/admin/AdminWelcome';
import AdminFilters from '../../components/admin/AdminFilters';
import AdminStats from '../../components/admin/AdminStats';
import ComplaintTrendChart from '../../components/admin/ComplaintTrendChart';
import PriorityDistribution from '../../components/admin/PriorityDistribution';
import DepartmentComplaintChart from '../../components/admin/DepartmentComplaintChart';
import RecentComplaints from '../../components/admin/RecentComplaints';
import RecentActivity from '../../components/admin/RecentActivity';
import QuickActions from '../../components/admin/QuickActions';
import SystemStatus from '../../components/admin/SystemStatus';
import AIInsight from '../../components/admin/AIInsight';
import AdminFooter from '../../components/admin/AdminFooter';

// Modals
import AdminComplaintDetailsModal from '../../components/admin/modals/AdminComplaintDetailsModal';

// Mock Data
import {
  ADMIN_KPI_STATS,
  RECENT_COMPLAINTS_DATA
} from '../../data/adminDashboardData';

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Filter states
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Modal State
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Admin Dashboard | Smart Campus CGC University Mohali";
  }, []);

  // Filter complaints based on Search query & Quick Dropdown Filters
  const filteredComplaints = useMemo(() => {
    return RECENT_COMPLAINTS_DATA.filter((complaint) => {
      // 1. Department Filter
      if (
        selectedDepartment !== 'All Departments' &&
        complaint.department.toLowerCase() !== selectedDepartment.toLowerCase()
      ) {
        return false;
      }

      // 2. Priority Filter
      if (
        selectedPriority !== 'All Priorities' &&
        complaint.priority.toLowerCase() !== selectedPriority.toLowerCase()
      ) {
        return false;
      }

      // 3. Status Filter
      if (
        selectedStatus !== 'All Statuses' &&
        complaint.status.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }

      // 4. Header Search Query (ID, Title, Student, Department)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesId = complaint.id.toLowerCase().includes(query);
        const matchesTitle = complaint.title.toLowerCase().includes(query);
        const matchesStudent = complaint.student.toLowerCase().includes(query);
        const matchesDept = complaint.department.toLowerCase().includes(query);
        return matchesId || matchesTitle || matchesStudent || matchesDept;
      }

      return true;
    });
  }, [searchQuery, selectedDepartment, selectedPriority, selectedStatus]);

  // Dynamically reflect filter impact on stats if filtered
  const dynamicStats = useMemo(() => {
    if (
      selectedDepartment === 'All Departments' &&
      selectedPriority === 'All Priorities' &&
      selectedStatus === 'All Statuses' &&
      !searchQuery.trim()
    ) {
      return ADMIN_KPI_STATS;
    }

    // Filtered sub-counts
    const total = filteredComplaints.length;
    const pending = filteredComplaints.filter((c) => c.status === 'Pending').length;
    const inProgress = filteredComplaints.filter((c) => c.status === 'In Progress' || c.status === 'Under Review').length;
    const resolved = filteredComplaints.filter((c) => c.status === 'Resolved').length;
    const critical = filteredComplaints.filter((c) => c.priority === 'Critical').length;

    return [
      { ...ADMIN_KPI_STATS[0], value: total.toLocaleString() },
      { ...ADMIN_KPI_STATS[1], value: pending.toLocaleString() },
      { ...ADMIN_KPI_STATS[2], value: inProgress.toLocaleString() },
      { ...ADMIN_KPI_STATS[3], value: resolved.toLocaleString() },
      { ...ADMIN_KPI_STATS[4], value: critical.toLocaleString() }
    ];
  }, [filteredComplaints, selectedDepartment, selectedPriority, selectedStatus, searchQuery]);

  const handleResetFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedPriority('All Priorities');
    setSelectedStatus('All Statuses');
    setSearchQuery('');
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] flex font-sans selection:bg-[#008F63] selection:text-white transition-colors duration-200">
      {/* 1. Fixed Left Responsive Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Dashboard Wrapper */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0 transition-all">
        {/* 2. Top Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 3. Dashboard Scrollable Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* SECTION 1: Welcome Area */}
          <AdminWelcome />

          {/* SECTION 2: Quick Filters Bar */}
          <AdminFilters
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onResetFilters={handleResetFilters}
          />

          {/* SECTION 3: 5 KPI Statistics Cards */}
          <AdminStats stats={dynamicStats} />

          {/* SECTION 4: Complaint Trends (2/3) + Priority Distribution (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <ComplaintTrendChart />
            </div>
            <div className="lg:col-span-1">
              <PriorityDistribution />
            </div>
          </div>

          {/* SECTION 5: Department-wise Complaints (Horizontal BarChart - Full Width) */}
          <div className="w-full">
            <DepartmentComplaintChart />
          </div>

          {/* SECTION 6: Recent Complaints (Master Table / Mobile Cards - Full Width) */}
          <div className="w-full">
            <RecentComplaints
              complaints={filteredComplaints}
              onViewDetails={handleViewDetails}
              onEditComplaint={handleViewDetails}
            />
          </div>

          {/* SECTION 7: Recent Activity (1/2) + Quick Actions (1/2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <RecentActivity />
            <QuickActions />
          </div>

          {/* SECTION 8: System Status (1/2) + AI Insight (1/2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <SystemStatus />
            <AIInsight />
          </div>
        </main>

        {/* 4. Admin Footer */}
        <AdminFooter />
      </div>

      {/* Complaint Details Modal */}
      <AdminComplaintDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        complaint={selectedComplaint}
      />
    </div>
  );
}
