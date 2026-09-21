import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminWelcomeCard from '../../components/admin/AdminWelcomeCard';
import AdminStatCard from '../../components/admin/AdminStatCard';
import ComplaintOverviewChart from '../../components/admin/ComplaintOverviewChart';
import PriorityDistribution from '../../components/admin/PriorityDistribution';
import ComplaintStatusChart from '../../components/admin/ComplaintStatusChart';
import RecentComplaints from '../../components/admin/RecentComplaints';
import DepartmentPerformance from '../../components/admin/DepartmentPerformance';
import AIInsights from '../../components/admin/AIInsights';
import AttentionRequired from '../../components/admin/AttentionRequired';
import AdminActivity from '../../components/admin/AdminActivity';
import QuickActions from '../../components/admin/QuickActions';
import AdminFooter from '../../components/admin/AdminFooter';

// Modals
import AssignDepartmentModal from '../../components/admin/modals/AssignDepartmentModal';
import ChangePriorityModal from '../../components/admin/modals/ChangePriorityModal';
import ChangeStatusModal from '../../components/admin/modals/ChangeStatusModal';
import AdminComplaintDetailsModal from '../../components/admin/modals/AdminComplaintDetailsModal';

// Mock Data
import {
  ADMIN_STATS,
  RECENT_COMPLAINTS_DATA
} from '../../data/adminMockData';
import { dashboardApi } from '../../services/dashboardApi';
import { complaintApi } from '../../services/complaintApi';
import { departmentApi } from '../../services/departmentApi';
import { mapComplaint, denormalizeStatus } from '../../utils/mapper';
import { dataSource } from '../../services/dataSource';

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [complaints, setComplaints] = useState(RECENT_COMPLAINTS_DATA);
  const [adminData, setAdminData] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'assign' | 'priority' | 'status' | 'details'
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current?.id ? null : current));
    }, 4000);
  };

  const fetchAdminDashboard = async () => {
    if (dataSource.isMockMode()) return;
    setLoading(true);
    try {
      const [dashRes, deptsRes] = await Promise.all([
        dashboardApi.getAdminDashboard().catch((err) => {
          console.warn('Could not fetch admin dashboard, using mock:', err);
          return null;
        }),
        departmentApi.getDepartments().catch((err) => {
          console.warn('Could not fetch departments:', err);
          return [];
        })
      ]);

      if (deptsRes && Array.isArray(deptsRes)) {
        setDepartmentsList(deptsRes);
      }

      if (dashRes) {
        setAdminData(dashRes);
        if (dashRes.recent_complaints && dashRes.recent_complaints.length > 0) {
          const mapped = dashRes.recent_complaints.map(mapComplaint);
          setComplaints(mapped);
        }
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  // Handlers for modal actions
  const handleOpenAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setActiveModal('assign');
  };

  const handleOpenPriority = (complaint) => {
    setSelectedComplaint(complaint);
    setActiveModal('priority');
  };

  const handleOpenStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setActiveModal('status');
  };

  const handleOpenDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setActiveModal('details');
  };

  // Urgent review handler
  const handleReviewUrgent = (id) => {
    const target = complaints.find((c) => c.id === id);
    if (target) {
      setSelectedComplaint(target);
      setActiveModal('details');
    } else {
      // If it's one of the urgent mock tickets not in the primary 5
      const fallback = {
        id,
        title: id === 'SC-2026-1838' ? 'Water leakage near Hostel Block B' : id === 'SC-2026-1829' ? 'Power outage in Computer Lab' : 'Security concern near north gate',
        student: 'Campus Security / Monitor',
        department: id === 'SC-2026-1838' ? 'Maintenance' : id === 'SC-2026-1829' ? 'Electrical' : 'Security',
        priority: id === 'SC-2026-1838' ? 'CRITICAL' : 'HIGH',
        status: id === 'SC-2026-1838' ? 'Pending' : id === 'SC-2026-1829' ? 'Under Review' : 'Assigned',
        submitted: 'Recent',
        location: 'Designated Campus Sector',
        description: 'Urgent priority incident requiring immediate department dispatch and oversight.',
      };
      setSelectedComplaint(fallback);
      setActiveModal('details');
    }
  };

  // Action update callbacks
  const handleAssignDepartment = async (id, newDept) => {
    try {
      if (!dataSource.isMockMode()) {
        const targetComplaint = complaints.find((c) => c.id === id);
        const targetDept = departmentsList.find(
          (d) => d.name.toLowerCase() === newDept.toLowerCase() || d.department_code.toLowerCase() === newDept.toLowerCase()
        );
        if (targetComplaint && targetDept) {
          await complaintApi.updateDepartment(targetComplaint.rawId || id, targetDept.id);
        }
      }
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, department: newDept } : item))
      );
      showToast(`Assigned ${id} to ${newDept} department.`);
    } catch (err) {
      console.error('Failed to assign department:', err);
      showToast(err.message || 'Failed to update department routing.', 'error');
    }
  };

  const handleUpdatePriority = async (id, newPriority) => {
    try {
      if (!dataSource.isMockMode()) {
        const targetComplaint = complaints.find((c) => c.id === id);
        if (targetComplaint) {
          await complaintApi.updatePriority(targetComplaint.rawId || id, newPriority.toUpperCase());
        }
      }
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, priority: newPriority } : item))
      );
      showToast(`Updated priority of ${id} to ${newPriority}.`);
    } catch (err) {
      console.error('Failed to update priority:', err);
      showToast(err.message || 'Failed to update ticket priority.', 'error');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      if (!dataSource.isMockMode()) {
        const targetComplaint = complaints.find((c) => c.id === id);
        if (targetComplaint) {
          await complaintApi.updateStatus(targetComplaint.rawId || id, denormalizeStatus(newStatus));
        }
      }
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      showToast(`Status of ${id} changed to ${newStatus}.`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast(err.message || 'Failed to update ticket status.', 'error');
    }
  };

  const handleQuickAssign = () => {
    const unassigned = complaints.find((c) => c.status === 'Pending' || c.status === 'Submitted') || complaints[0];
    if (unassigned) {
      handleOpenAssign(unassigned);
    }
  };

  const handleReportToast = () => {
    showToast('Campus Audit Report generated and queued for export.', 'info');
  };

  // Dynamic KPI Stats
  const dynamicStats = [
    {
      ...ADMIN_STATS[0],
      value: adminData ? String(adminData.total_complaints ?? 0) : ADMIN_STATS[0].value,
    },
    {
      ...ADMIN_STATS[1],
      value: adminData ? String(adminData.pending_count ?? 0) : ADMIN_STATS[1].value,
    },
    {
      ...ADMIN_STATS[2],
      value: adminData ? String(adminData.in_progress_count ?? 0) : ADMIN_STATS[2].value,
    },
    {
      ...ADMIN_STATS[3],
      value: adminData ? String(adminData.resolved_count ?? 0) : ADMIN_STATS[3].value,
    },
    {
      ...ADMIN_STATS[4],
      value: adminData ? String(adminData.critical_count ?? 0) : ADMIN_STATS[4].value,
    },
    {
      ...ADMIN_STATS[5],
      value: adminData ? `${adminData.resolution_rate ?? 0}%` : ADMIN_STATS[5].value,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans selection:bg-[#315C3A] selection:text-[#D4A84F]">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Dashboard Wrapper */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Top Header */}
        <AdminHeader onToggleMobile={() => setMobileOpen(true)} />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Welcome Card */}
          <AdminWelcomeCard />

          {/* KPI Statistics (6 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {dynamicStats.map((stat) => (
              <AdminStatCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* Charts Row: Complaint Overview & Priority Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComplaintOverviewChart />
            </div>
            <div className="lg:col-span-1">
              <PriorityDistribution />
            </div>
          </div>

          {/* Status Breakdown & Urgent Attention Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ComplaintStatusChart />
            </div>
            <div className="lg:col-span-2">
              <AttentionRequired onReviewComplaint={handleReviewUrgent} />
            </div>
          </div>

          {/* Quick Actions Bar */}
          <QuickActions
            onAssignFirstUnassigned={handleQuickAssign}
            onGenerateReportToast={handleReportToast}
          />

          {/* Recent Complaints Master Table */}
          <RecentComplaints
            complaints={complaints}
            onViewDetails={handleOpenDetails}
            onAssignDept={handleOpenAssign}
            onChangePriority={handleOpenPriority}
            onChangeStatus={handleOpenStatus}
          />

          {/* Department Performance & AI Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentPerformance performanceData={adminData?.department_performance} />
            <AIInsights />
          </div>

          {/* Activity Timeline Audit Log */}
          <div className="grid grid-cols-1 gap-6">
            <AdminActivity />
          </div>
        </main>

        {/* Admin Footer */}
        <AdminFooter />
      </div>

      {/* Interactive Modals */}
      <AssignDepartmentModal
        isOpen={activeModal === 'assign'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onAssign={handleAssignDepartment}
      />

      <ChangePriorityModal
        isOpen={activeModal === 'priority'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onUpdatePriority={handleUpdatePriority}
      />

      <ChangeStatusModal
        isOpen={activeModal === 'status'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onUpdateStatus={handleUpdateStatus}
      />

      <AdminComplaintDetailsModal
        isOpen={activeModal === 'details'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onOpenAssign={handleOpenAssign}
        onOpenPriority={handleOpenPriority}
        onOpenStatus={handleOpenStatus}
      />

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0D1B22] border border-[#315C3A] text-[#F5F5F0] shadow-2xl text-xs animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#A7C481] shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-[#D4A84F] shrink-0" />
          )}
          <span className="flex-1 font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 text-[#9FB1BC] hover:text-[#F5F5F0] rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
