import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';
import DepartmentSidebar from '../../components/department/DepartmentSidebar';
import DepartmentHeader from '../../components/department/DepartmentHeader';
import DepartmentWelcome from '../../components/department/DepartmentWelcome';
import DepartmentStatCard from '../../components/department/DepartmentStatCard';
import UrgentComplaints from '../../components/department/UrgentComplaints';
import DepartmentWorkloadChart from '../../components/department/DepartmentWorkloadChart';
import ComplaintActivityChart from '../../components/department/ComplaintActivityChart';
import AssignedComplaintsTable from '../../components/department/AssignedComplaintsTable';
import DepartmentQuickActions from '../../components/department/DepartmentQuickActions';
import DepartmentPerformance from '../../components/department/DepartmentPerformance';
import DepartmentInsights from '../../components/department/DepartmentInsights';
import DepartmentActivity from '../../components/department/DepartmentActivity';
import DepartmentNotifications from '../../components/department/DepartmentNotifications';
import AdminFooter from '../../components/admin/AdminFooter';

// Modals
import ComplaintDetailsDrawer from '../../components/department/modals/ComplaintDetailsDrawer';
import UpdateStatusModal from '../../components/department/modals/UpdateStatusModal';
import ProgressUpdateModal from '../../components/department/modals/ProgressUpdateModal';
import InternalNoteModal from '../../components/department/modals/InternalNoteModal';
import ResolveComplaintModal from '../../components/department/modals/ResolveComplaintModal';

// Mock Data
import {
  DEPARTMENT_STATS,
  loadDepartmentComplaints,
  saveDepartmentComplaints
} from '../../data/departmentMockData';
import { dashboardApi } from '../../services/dashboardApi';
import { complaintApi } from '../../services/complaintApi';
import { mapComplaint, denormalizeStatus } from '../../utils/mapper';
import { dataSource } from '../../services/dataSource';

export default function DepartmentDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [complaints, setComplaints] = useState(() => loadDepartmentComplaints());
  const [deptData, setDeptData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'drawer' | 'status' | 'progress' | 'note' | 'resolve'
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current?.id ? null : current));
    }, 4000);
  };

  const fetchDepartmentDashboard = async () => {
    if (dataSource.isMockMode()) return;
    setLoading(true);
    try {
      const res = await dashboardApi.getDepartmentDashboard();
      if (res) {
        setDeptData(res);
        if (res.recent_complaints && res.recent_complaints.length > 0) {
          const mapped = res.recent_complaints.map(mapComplaint);
          setComplaints(mapped);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch department dashboard from API, using mock:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDepartmentDashboard();
  }, []);

  const updateComplaintsState = (newComplaints) => {
    setComplaints(newComplaints);
    saveDepartmentComplaints(newComplaints);
  };

  // Open complaint details
  const handleOpenDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setActiveModal('drawer');
  };

  const handleSelectUrgent = (id) => {
    const target = complaints.find((c) => c.id === id) || complaints[0];
    handleOpenDetails(target);
  };

  // Modal openers
  const handleOpenStatusModal = (complaint) => {
    setSelectedComplaint(complaint || complaints[0]);
    setActiveModal('status');
  };

  const handleOpenProgressModal = (complaint) => {
    setSelectedComplaint(complaint || complaints[0]);
    setActiveModal('progress');
  };

  const handleOpenNoteModal = (complaint) => {
    setSelectedComplaint(complaint || complaints[0]);
    setActiveModal('note');
  };

  const handleOpenResolveModal = (complaint) => {
    setSelectedComplaint(complaint || complaints[0]);
    setActiveModal('resolve');
  };

  // Execution Handlers
  const handleUpdateStatus = async (id, newStatus, message) => {
    if (!dataSource.isMockMode()) {
      const target = complaints.find((c) => c.id === id);
      await complaintApi.updateStatus(target?.rawId || id, denormalizeStatus(newStatus)).catch((err) => {
        console.error('Failed to update status on server:', err);
      });
    }

    const updated = complaints.map((c) => {
      if (c.id === id) {
        const timeline = [
          ...(c.timeline || []),
          {
            time: 'Just now',
            title: `Status: ${newStatus}`,
            desc: message || `Status updated to ${newStatus} by Maintenance staff.`
          }
        ];
        return {
          ...c,
          status: newStatus,
          updatedAt: 'Just now',
          timeline,
          latestUpdate: message || `Status changed to ${newStatus}.`
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast('Complaint status updated successfully.');
  };

  const handlePostProgressUpdate = async (id, updateText) => {
    if (!dataSource.isMockMode()) {
      const target = complaints.find((c) => c.id === id);
      await complaintApi.addUpdate(target?.rawId || id, {
        message: updateText,
        is_internal: false
      }).catch((err) => {
        console.error('Failed to post progress update on server:', err);
      });
    }

    const updated = complaints.map((c) => {
      if (c.id === id) {
        const timeline = [
          ...(c.timeline || []),
          {
            time: 'Just now',
            title: 'Progress Update',
            desc: updateText
          }
        ];
        return {
          ...c,
          timeline,
          updatedAt: 'Just now',
          latestUpdate: updateText
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast('Progress update posted to complaint timeline.');
  };

  const handleSaveInternalNote = async (id, noteText) => {
    if (!dataSource.isMockMode()) {
      const target = complaints.find((c) => c.id === id);
      await complaintApi.addUpdate(target?.rawId || id, {
        message: noteText,
        is_internal: true
      }).catch((err) => {
        console.error('Failed to post internal note on server:', err);
      });
    }

    const newNote = {
      id: `n-${Date.now()}`,
      author: 'Rohit Sharma (Maintenance)',
      date: 'Just now',
      text: noteText
    };

    const updated = complaints.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          internalNotes: [...(c.internalNotes || []), newNote],
          updatedAt: 'Just now'
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast('Internal department note saved.');
  };

  const handleConfirmResolve = async (id, resolutionMessage) => {
    if (!dataSource.isMockMode()) {
      const target = complaints.find((c) => c.id === id);
      await complaintApi.resolveComplaint(target?.rawId || id, resolutionMessage || 'Resolved by department').catch((err) => {
        console.error('Failed to resolve complaint on server:', err);
      });
    }

    const updated = complaints.map((c) => {
      if (c.id === id) {
        const timeline = [
          ...(c.timeline || []),
          {
            time: 'Just now',
            title: 'Resolved',
            desc: resolutionMessage
          }
        ];
        return {
          ...c,
          status: 'Resolved',
          updatedAt: 'Just now',
          timeline,
          latestUpdate: `Resolved: ${resolutionMessage}`
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast(`Complaint ${id} marked as resolved.`);
  };

  const activeWorkloadCount = deptData ? (deptData.assigned_total - deptData.resolved_count) : complaints.filter((c) => c.status !== 'Resolved').length;

  // Dynamic KPI stats
  const dynamicStats = DEPARTMENT_STATS.map((stat) => {
    if (!deptData) return stat;
    if (stat.id === 'assigned') return { ...stat, value: String(deptData.assigned_total ?? stat.value) };
    if (stat.id === 'pending') return { ...stat, value: String(deptData.pending_count ?? stat.value) };
    if (stat.id === 'in-progress') return { ...stat, value: String(deptData.in_progress_count ?? stat.value) };
    if (stat.id === 'resolved') return { ...stat, value: String(deptData.resolved_count ?? stat.value) };
    if (stat.id === 'urgent') return { ...stat, value: String(deptData.urgent_complaints?.length ?? stat.value) };
    return stat;
  });

  const urgentComplaintsList = deptData?.urgent_complaints && deptData.urgent_complaints.length > 0
    ? deptData.urgent_complaints.map(mapComplaint)
    : null;

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans selection:bg-[#315C3A] selection:text-[#D4A84F]">
      {/* Department Sidebar */}
      <DepartmentSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Layout Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Top Header */}
        <DepartmentHeader
          onToggleMobile={() => setMobileOpen(true)}
          onSearch={(q) => {
            if (q) {
              const el = document.getElementById('assigned-complaints-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Welcome Card */}
          <DepartmentWelcome activeWorkload={activeWorkloadCount || 12} />

          {/* 5 Statistics KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {dynamicStats.map((stat) => (
              <DepartmentStatCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* Urgent Complaints Section */}
          <UrgentComplaints onSelectComplaint={handleSelectUrgent} items={urgentComplaintsList} />

          {/* Charts Row: Workload Donut & Complaint Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DepartmentWorkloadChart />
            </div>
            <div className="lg:col-span-2">
              <ComplaintActivityChart />
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <DepartmentQuickActions
            onOpenStatus={() => handleOpenStatusModal(complaints[0])}
            onOpenResolve={() => handleOpenResolveModal(complaints[0])}
            onOpenNote={() => handleOpenNoteModal(complaints[0])}
          />

          {/* Assigned Complaints Table */}
          <div id="assigned-complaints-section">
            <AssignedComplaintsTable
              complaints={complaints}
              onViewComplaint={handleOpenDetails}
            />
          </div>

          {/* Performance & Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentPerformance />
            <DepartmentInsights />
          </div>

          {/* Activity Timeline & Notifications Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentActivity />
            <DepartmentNotifications />
          </div>
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>

      {/* Modals & Drawers */}
      <ComplaintDetailsDrawer
        isOpen={activeModal === 'drawer'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onOpenUpdateStatus={handleOpenStatusModal}
        onOpenProgressUpdate={handleOpenProgressModal}
        onOpenInternalNote={handleOpenNoteModal}
        onOpenResolve={handleOpenResolveModal}
      />

      <UpdateStatusModal
        isOpen={activeModal === 'status'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onUpdateStatus={handleUpdateStatus}
      />

      <ProgressUpdateModal
        isOpen={activeModal === 'progress'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onPostUpdate={handlePostProgressUpdate}
      />

      <InternalNoteModal
        isOpen={activeModal === 'note'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onSaveNote={handleSaveInternalNote}
      />

      <ResolveComplaintModal
        isOpen={activeModal === 'resolve'}
        onClose={() => setActiveModal(null)}
        complaint={selectedComplaint}
        onConfirmResolve={handleConfirmResolve}
      />

      {/* Toast Alert */}
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
