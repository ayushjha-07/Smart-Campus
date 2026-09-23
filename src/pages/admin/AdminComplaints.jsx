import React, { useState, useMemo, useEffect } from 'react';
import {
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// Complaint Management Components
import ComplaintStats from '../../components/admin/complaints/ComplaintStats';
import QuickInsights from '../../components/admin/complaints/QuickInsights';
import ComplaintFilters from '../../components/admin/complaints/ComplaintFilters';
import ComplaintTable from '../../components/admin/complaints/ComplaintTable';
import BulkActions from '../../components/admin/complaints/BulkActions';
import ExportMenu from '../../components/admin/complaints/ExportMenu';
import Pagination from '../../components/admin/complaints/Pagination';
import Toast from '../../components/admin/complaints/Toast';

// Modals & Drawer
import ComplaintDetailsDrawer from '../../components/admin/complaints/modals/ComplaintDetailsDrawer';
import AssignComplaintModal from '../../components/admin/complaints/modals/AssignComplaintModal';
import ChangeStatusModal from '../../components/admin/complaints/modals/ChangeStatusModal';
import ChangePriorityModal from '../../components/admin/complaints/modals/ChangePriorityModal';
import NewComplaintModal from '../../components/admin/complaints/modals/NewComplaintModal';

// Master data & persistence
import {
  loadAdminComplaints,
  saveAdminComplaints,
  downloadCSV
} from '../../data/adminComplaintsData';
import { useApp } from '../../context/useApp';

export default function AdminComplaints() {
  const { theme, toggleTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [complaints, setComplaints] = useState(() => loadAdminComplaints());
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter & Search state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [dateFilter, setDateFilter] = useState('All Dates');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal & Drawer states
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [priorityModalOpen, setPriorityModalOpen] = useState(false);
  const [newComplaintModalOpen, setNewComplaintModalOpen] = useState(false);

  const [activeComplaint, setActiveComplaint] = useState(null);
  const [isBulkOperation, setIsBulkOperation] = useState(false);

  // Check URL query parameters for deep linking (e.g. ?drawer=SC-2026-1847 or ?assign=SC-2026-1847)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const drawerId = params.get('drawer');
      const assignId = params.get('assign');
      const themeParam = params.get('theme');
      if (themeParam === 'dark' && theme !== 'dark') {
        toggleTheme();
      } else if (themeParam === 'light' && theme !== 'light') {
        toggleTheme();
      }

      if (drawerId) {
        const c = complaints.find((x) => x.id === drawerId) || complaints[0];
        if (c) {
          setActiveComplaint(c);
          setDetailsDrawerOpen(true);
        }
      } else if (assignId) {
        const c = complaints.find((x) => x.id === assignId) || complaints[0];
        if (c) {
          setActiveComplaint(c);
          setAssignModalOpen(true);
        }
      }
    }
  }, [complaints, theme, toggleTheme]);


  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  // Helper to persist complaints
  const updateComplaints = (newComplaints) => {
    setComplaints(newComplaints);
    saveAdminComplaints(newComplaints);
  };

  // KPI counts computed dynamically from state
  const statsCounts = useMemo(() => {
    const total = 1248; // Base benchmark + delta
    const pending = 186;
    const inProgress = 324;
    const resolved = 738;
    const critical = 24;

    return {
      total,
      pending,
      inProgress,
      resolved,
      critical
    };
  }, [complaints]);

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // 1. Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchId = c.id?.toLowerCase().includes(q);
        const matchTitle = c.title?.toLowerCase().includes(q);
        const matchStudent = c.student?.toLowerCase().includes(q);
        const matchStudentId = c.studentId?.toLowerCase().includes(q);
        const matchDept = c.department?.toLowerCase().includes(q);
        const matchCat = c.category?.toLowerCase().includes(q);
        const matchLocation = c.location?.toLowerCase().includes(q);
        if (!matchId && !matchTitle && !matchStudent && !matchStudentId && !matchDept && !matchCat && !matchLocation) {
          return false;
        }
      }

      // 2. Status Filter
      if (statusFilter !== 'All Status') {
        if (c.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      // 3. Priority Filter
      if (priorityFilter !== 'All Priority') {
        if (c.priority?.toLowerCase() !== priorityFilter.toLowerCase()) return false;
      }

      // 4. Category Filter
      if (categoryFilter !== 'All Categories') {
        if (c.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
      }

      // 5. Department Filter
      if (deptFilter !== 'All Departments') {
        if (c.department?.toLowerCase() !== deptFilter.toLowerCase()) return false;
      }

      // 6. Date Filter
      if (dateFilter !== 'All Dates') {
        if (dateFilter === 'Today') {
          return c.submittedDate?.includes('22 Sep') || c.submittedAt?.includes('22 Sep');
        }
        if (dateFilter === 'This Week') {
          return true; // Mock complaints are all within the current week
        }
        if (dateFilter === 'This Month') {
          return true;
        }
      }

      return true;
    });
  }, [complaints, search, statusFilter, priorityFilter, categoryFilter, deptFilter, dateFilter]);

  // Paginated Complaints
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredComplaints.slice(start, start + pageSize);
  }, [filteredComplaints, currentPage, pageSize]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('All Status');
    setPriorityFilter('All Priority');
    setCategoryFilter('All Categories');
    setDeptFilter('All Departments');
    setDateFilter('All Dates');
    setCurrentPage(1);
    showToast('Filters cleared.');
  };

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllCurrentPageSelected =
    paginatedComplaints.length > 0 &&
    paginatedComplaints.every((c) => selectedIds.includes(c.id));

  const handleToggleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      const pageIds = paginatedComplaints.map((c) => c.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedComplaints.map((c) => c.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  // Drawer & Modal Triggers
  const handleViewDetails = (complaint) => {
    setActiveComplaint(complaint);
    setDetailsDrawerOpen(true);
  };

  const handleOpenAssign = (complaint = null) => {
    setIsBulkOperation(false);
    setActiveComplaint(complaint);
    setAssignModalOpen(true);
  };

  const handleOpenStatus = (complaint = null) => {
    setIsBulkOperation(false);
    setActiveComplaint(complaint);
    setStatusModalOpen(true);
  };

  const handleOpenPriority = (complaint = null) => {
    setIsBulkOperation(false);
    setActiveComplaint(complaint);
    setPriorityModalOpen(true);
  };

  const handleDeleteComplaint = (id) => {
    const updated = complaints.filter((c) => c.id !== id);
    updateComplaints(updated);
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    showToast(`Complaint ${id} removed successfully.`);
  };

  // Bulk Handlers
  const handleBulkAssign = () => {
    setIsBulkOperation(true);
    setActiveComplaint(null);
    setAssignModalOpen(true);
  };

  const handleBulkStatus = () => {
    setIsBulkOperation(true);
    setActiveComplaint(null);
    setStatusModalOpen(true);
  };

  const handleBulkPriority = () => {
    setIsBulkOperation(true);
    setActiveComplaint(null);
    setPriorityModalOpen(true);
  };

  const handleBulkDelete = () => {
    const count = selectedIds.length;
    const updated = complaints.filter((c) => !selectedIds.includes(c.id));
    updateComplaints(updated);
    setSelectedIds([]);
    showToast(`Deleted ${count} complaints successfully.`);
  };

  const handleExportSelected = () => {
    const selectedData = complaints.filter((c) => selectedIds.includes(c.id));
    downloadCSV(selectedData, `campus_complaints_selected_${Date.now()}.csv`);
    showToast(`Exported ${selectedData.length} selected complaints.`);
  };

  // Actions Execution
  const executeAssign = ({ department, staff, priority, adminNote }) => {
    const targetIds = isBulkOperation
      ? selectedIds
      : [activeComplaint?.id].filter(Boolean);

    const now = new Date();
    const timeStr = `${now.getDate()} Sep 2026 — ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        const newTimeline = [
          ...(c.timeline || []),
          {
            time: timeStr,
            title: `Assigned to ${staff || department}`,
            desc: adminNote || `Department set to ${department}. Staff assigned: ${staff}.`
          }
        ];
        return {
          ...c,
          department,
          assignedTo: staff || c.assignedTo,
          priority: priority || c.priority,
          status: c.status === 'Pending' ? 'Assigned' : c.status,
          timeline: newTimeline
        };
      }
      return c;
    });

    updateComplaints(updated);
    if (activeComplaint && targetIds.includes(activeComplaint.id)) {
      setActiveComplaint(updated.find((c) => c.id === activeComplaint.id));
    }
    if (isBulkOperation) setSelectedIds([]);
    showToast('Complaint assigned successfully.');
  };

  const executeStatusUpdate = (newStatus, reason) => {
    const targetIds = isBulkOperation
      ? selectedIds
      : [activeComplaint?.id].filter(Boolean);

    const now = new Date();
    const timeStr = `${now.getDate()} Sep 2026 — ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        const newTimeline = [
          ...(c.timeline || []),
          {
            time: timeStr,
            title: newStatus,
            desc: reason || `Complaint status transitioned to ${newStatus}.`
          }
        ];
        return {
          ...c,
          status: newStatus,
          timeline: newTimeline
        };
      }
      return c;
    });

    updateComplaints(updated);
    if (activeComplaint && targetIds.includes(activeComplaint.id)) {
      setActiveComplaint(updated.find((c) => c.id === activeComplaint.id));
    }
    if (isBulkOperation) setSelectedIds([]);
    showToast('Complaint status updated.');
  };

  const executePriorityUpdate = (newPriority, reason) => {
    const targetIds = isBulkOperation
      ? selectedIds
      : [activeComplaint?.id].filter(Boolean);

    const now = new Date();
    const timeStr = `${now.getDate()} Sep 2026 — ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        const newTimeline = [
          ...(c.timeline || []),
          {
            time: timeStr,
            title: `Priority: ${newPriority}`,
            desc: reason || `Operational priority escalated to ${newPriority}.`
          }
        ];
        return {
          ...c,
          priority: newPriority,
          timeline: newTimeline
        };
      }
      return c;
    });

    updateComplaints(updated);
    if (activeComplaint && targetIds.includes(activeComplaint.id)) {
      setActiveComplaint(updated.find((c) => c.id === activeComplaint.id));
    }
    if (isBulkOperation) setSelectedIds([]);
    showToast('Priority updated successfully.');
  };

  const executeSaveRemark = (complaintId, remarkText) => {
    const now = new Date();
    const timeStr = `${now.getDate()} Sep 2026 — ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newNote = {
      id: `rem-${Date.now()}`,
      author: 'Administrator',
      date: `${now.getDate()} Sep 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      text: remarkText
    };

    const updated = complaints.map((c) => {
      if (c.id === complaintId) {
        const newTimeline = [
          ...(c.timeline || []),
          {
            time: timeStr,
            title: 'Admin Remark Added',
            desc: `"${remarkText}"`
          }
        ];
        return {
          ...c,
          internalNotes: [...(c.internalNotes || []), newNote],
          timeline: newTimeline
        };
      }
      return c;
    });

    updateComplaints(updated);
    if (activeComplaint?.id === complaintId) {
      setActiveComplaint(updated.find((c) => c.id === complaintId));
    }
    showToast('Admin remark saved and appended to timeline.');
  };

  const handleCreateNewComplaint = (newTicket) => {
    const updated = [newTicket, ...complaints];
    updateComplaints(updated);
    showToast(`Complaint ${newTicket.id} created successfully.`);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] flex font-sans selection:bg-[#008F63]/20 selection:text-[#008F63] transition-colors">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Admin Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          title="Complaint Management"
          subtitle="Review, prioritize, assign and manage campus complaints."
          searchQuery={search}
          onSearchChange={setSearch}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 space-y-6 max-w-[1440px] w-full mx-auto">
          {/* Top Page Header & Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
                Complaint Management
              </h2>
              <p className="text-xs sm:text-sm text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                Review, prioritize, assign and manage campus complaints.
              </p>
            </div>

            {/* Top-Right Buttons: Export Reports & + New Complaint */}
            <div className="flex items-center gap-2.5">
              <ExportMenu
                allFilteredData={filteredComplaints}
                currentPageData={paginatedComplaints}
                selectedData={complaints.filter((c) => selectedIds.includes(c.id))}
                onExportSuccess={(msg) => showToast(msg)}
              />

              <button
                onClick={() => setNewComplaintModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ New Complaint</span>
              </button>
            </div>
          </div>

          {/* 5 Summary KPI Cards */}
          <ComplaintStats counts={statsCounts} />

          {/* Quick Insights Strip */}
          <QuickInsights />

          {/* Search & Filter Panel */}
          <ComplaintFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            deptFilter={deptFilter}
            setDeptFilter={setDeptFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            onResetFilters={handleResetFilters}
            totalResults={filteredComplaints.length}
          />

          {/* Master Table & Mobile Cards */}
          <ComplaintTable
            complaints={paginatedComplaints}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onViewDetails={handleViewDetails}
            onAssign={handleOpenAssign}
            onChangeStatus={handleOpenStatus}
            onChangePriority={handleOpenPriority}
            onAddRemark={(complaint) => {
              handleViewDetails(complaint);
            }}
            onDelete={handleDeleteComplaint}
            onResetFilters={handleResetFilters}
            isAllSelected={isAllCurrentPageSelected}
          />

          {/* Pagination */}
          {filteredComplaints.length > 0 && (
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={filteredComplaints.length}
              onPageChange={(p) => setCurrentPage(p)}
              onPageSizeChange={(sz) => {
                setPageSize(sz);
                setCurrentPage(1);
              }}
            />
          )}
        </main>

        {/* Bulk Actions Floating Bar */}
        <BulkActions
          selectedCount={selectedIds.length}
          onBulkAssign={handleBulkAssign}
          onBulkStatus={handleBulkStatus}
          onBulkPriority={handleBulkPriority}
          onExportSelected={handleExportSelected}
          onBulkDelete={handleBulkDelete}
          onClearSelection={() => setSelectedIds([])}
        />

        {/* Footer */}
        <AdminFooter />
      </div>

      {/* Slide-in Complaint Details Drawer */}
      <ComplaintDetailsDrawer
        isOpen={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        complaint={activeComplaint}
        onAssign={handleOpenAssign}
        onChangeStatus={handleOpenStatus}
        onChangePriority={handleOpenPriority}
        onSaveRemark={executeSaveRemark}
      />

      {/* Assign Complaint Modal */}
      <AssignComplaintModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        complaint={activeComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onAssign={executeAssign}
      />

      {/* Change Status Modal */}
      <ChangeStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        complaint={activeComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onUpdateStatus={executeStatusUpdate}
      />

      {/* Change Priority Modal */}
      <ChangePriorityModal
        isOpen={priorityModalOpen}
        onClose={() => setPriorityModalOpen(false)}
        complaint={activeComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onUpdatePriority={executePriorityUpdate}
      />

      {/* Create New Complaint Modal */}
      <NewComplaintModal
        isOpen={newComplaintModalOpen}
        onClose={() => setNewComplaintModalOpen(false)}
        onCreateComplaint={handleCreateNewComplaint}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
