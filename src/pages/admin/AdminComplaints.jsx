import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// Complaint Management Sub-components
import ComplaintSummaryCards from '../../components/admin/complaints/ComplaintSummaryCards';
import ComplaintFilters from '../../components/admin/complaints/ComplaintFilters';
import ComplaintTable from '../../components/admin/complaints/ComplaintTable';
import BulkActionBar from '../../components/admin/complaints/BulkActionBar';
import ExportMenu from '../../components/admin/complaints/ExportMenu';
import Pagination from '../../components/admin/complaints/Pagination';

// Modals
import ComplaintDetailsModal from '../../components/admin/complaints/modals/ComplaintDetailsModal';
import AssignDepartmentModal from '../../components/admin/complaints/modals/AssignDepartmentModal';
import ChangePriorityModal from '../../components/admin/complaints/modals/ChangePriorityModal';
import ChangeStatusModal from '../../components/admin/complaints/modals/ChangeStatusModal';
import InternalNoteModal from '../../components/admin/complaints/modals/InternalNoteModal';
import ConfirmActionModal from '../../components/admin/complaints/modals/ConfirmActionModal';

// Data & Storage helpers
import {
  loadAdminComplaints,
  saveAdminComplaints,
  downloadCSV
} from '../../data/adminComplaintsData';
import { complaintApi } from '../../services/complaintApi';
import { departmentApi } from '../../services/departmentApi';
import { mapComplaint, denormalizeStatus } from '../../utils/mapper';
import { dataSource } from '../../services/dataSource';

export default function AdminComplaints() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [complaints, setComplaints] = useState(() => loadAdminComplaints());
  const [departmentsList, setDepartmentsList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL_TIME');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'details' | 'assign' | 'priority' | 'status' | 'note' | 'confirm'
  const [modalTargetComplaint, setModalTargetComplaint] = useState(null);
  const [isBulkOperation, setIsBulkOperation] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current?.id ? null : current));
    }, 4000);
  };

  const fetchComplaints = async () => {
    if (dataSource.isMockMode()) {
      setComplaints(loadAdminComplaints());
      return;
    }
    setIsRefreshing(true);
    try {
      const [complaintsRes, deptsRes] = await Promise.all([
        complaintApi.getComplaints({ page: 1, page_size: 100 }).catch((err) => {
          console.warn('Could not fetch complaints from API:', err);
          return null;
        }),
        departmentApi.getDepartments().catch((err) => {
          console.warn('Could not fetch departments from API:', err);
          return [];
        })
      ]);

      if (deptsRes && Array.isArray(deptsRes)) {
        setDepartmentsList(deptsRes);
      }

      if (complaintsRes && complaintsRes.items && complaintsRes.items.length > 0) {
        const mapped = complaintsRes.items.map(mapComplaint);
        setComplaints(mapped);
      } else {
        setComplaints(loadAdminComplaints());
      }
    } catch (err) {
      console.error('Error in fetchComplaints:', err);
      setComplaints(loadAdminComplaints());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Helper to persist updates
  const updateComplaintsState = (newComplaints) => {
    setComplaints(newComplaints);
    saveAdminComplaints(newComplaints);
  };

  // Summary counts computed dynamically
  const summaryCounts = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending' || c.status === 'Submitted').length;
    const underReview = complaints.filter(c => c.status === 'Under Review').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    return {
      total,
      pending,
      underReview,
      inProgress,
      resolved,
    };
  }, [complaints]);

  // Filter and sort complaints
  const filteredComplaints = useMemo(() => {
    return complaints
      .filter((item) => {
        // Search matching
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          item.id.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.student.toLowerCase().includes(q) ||
          (item.studentId && item.studentId.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q));

        // Filters
        const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
        const matchPriority =
          priorityFilter === 'ALL' || item.priority.toUpperCase() === priorityFilter;
        const matchDept = deptFilter === 'ALL' || item.department === deptFilter;
        const matchCategory =
          categoryFilter === 'ALL' || item.category === categoryFilter;

        // Date filters
        let matchDate = true;
        if (dateFilter === 'TODAY') {
          matchDate = item.submittedAt?.includes('20 Sep') || item.submittedRelative?.includes('min') || item.submittedRelative?.includes('hr');
        } else if (dateFilter === 'LAST_7_DAYS') {
          matchDate = true; // All mock items fall within 7 days
        } else if (dateFilter === 'LAST_30_DAYS') {
          matchDate = true;
        }

        return matchSearch && matchStatus && matchPriority && matchDept && matchCategory && matchDate;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        if (sortBy === 'oldest') return a.id.localeCompare(b.id);
        if (sortBy === 'priority') {
          const pOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
          return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
        }
        if (sortBy === 'updated') {
          return (b.submittedTimestamp || 0) - (a.submittedTimestamp || 0);
        }
        return 0;
      });
  }, [complaints, search, statusFilter, priorityFilter, deptFilter, categoryFilter, dateFilter, sortBy]);

  // Paginated Complaints
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredComplaints.slice(startIndex, startIndex + pageSize);
  }, [filteredComplaints, currentPage, pageSize]);

  // Reset pagination if filters change
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setDeptFilter('ALL');
    setCategoryFilter('ALL');
    setDateFilter('ALL_TIME');
    setSortBy('newest');
    setCurrentPage(1);
    showToast('Filters cleared.');
  };

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

  // Single Action Modal Openers
  const handleOpenDetails = (complaint) => {
    setModalTargetComplaint(complaint);
    setIsBulkOperation(false);
    setActiveModal('details');
  };

  const handleOpenAssign = (complaint) => {
    setModalTargetComplaint(complaint);
    setIsBulkOperation(false);
    setActiveModal('assign');
  };

  const handleOpenPriority = (complaint) => {
    setModalTargetComplaint(complaint);
    setIsBulkOperation(false);
    setActiveModal('priority');
  };

  const handleOpenStatus = (complaint) => {
    setModalTargetComplaint(complaint);
    setIsBulkOperation(false);
    setActiveModal('status');
  };

  const handleOpenAddNote = (complaint) => {
    setModalTargetComplaint(complaint);
    setIsBulkOperation(false);
    setActiveModal('note');
  };

  const handleMarkResolved = (complaint) => {
    setConfirmConfig({
      title: `Resolve ${complaint.id}?`,
      description: `Are you sure you want to mark "${complaint.title}" as resolved? The student will receive an immediate resolution notice.`,
      confirmLabel: 'Mark Resolved',
      type: 'success',
      onConfirm: () => {
        executeStatusUpdate([complaint.id], 'Resolved', 'Marked resolved via admin console.');
      }
    });
    setActiveModal('confirm');
  };

  // Bulk Action Openers
  const handleBulkAssign = () => {
    setIsBulkOperation(true);
    setModalTargetComplaint(null);
    setActiveModal('assign');
  };

  const handleBulkPriority = () => {
    setIsBulkOperation(true);
    setModalTargetComplaint(null);
    setActiveModal('priority');
  };

  const handleBulkStatus = () => {
    setIsBulkOperation(true);
    setModalTargetComplaint(null);
    setActiveModal('status');
  };

  const handleBulkResolve = () => {
    setConfirmConfig({
      title: `Resolve ${selectedIds.length} Complaints?`,
      description: `Are you sure you want to batch resolve all ${selectedIds.length} selected complaints? This action updates ticket lifecycle state immediately.`,
      confirmLabel: 'Resolve All Selected',
      type: 'success',
      onConfirm: () => {
        executeStatusUpdate(selectedIds, 'Resolved', 'Batch resolved via bulk administration.');
        setSelectedIds([]);
      }
    });
    setActiveModal('confirm');
  };

  // Execution Handlers
  const executeDepartmentAssign = async (newDept, note) => {
    const targetIds = isBulkOperation ? selectedIds : [modalTargetComplaint.id];
    if (!dataSource.isMockMode()) {
      const targetDept = departmentsList.find(
        (d) => d.name.toLowerCase() === newDept.toLowerCase() || d.department_code.toLowerCase() === newDept.toLowerCase()
      );
      if (targetDept) {
        for (const cid of targetIds) {
          const c = complaints.find((x) => x.id === cid);
          await complaintApi.updateDepartment(c?.rawId || cid, targetDept.id).catch((err) => {
            console.error(`Failed to assign ${cid}:`, err);
          });
        }
      }
    }

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        const timeline = [
          ...(c.timeline || []),
          {
            time: 'Just now',
            title: `Assigned to ${newDept}`,
            desc: note || 'Department routing updated by admin.'
          }
        ];
        return {
          ...c,
          department: newDept,
          updatedAt: 'Just now',
          timeline,
          latestUpdate: `Routed to ${newDept} department.`
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast(
      isBulkOperation
        ? `Assigned ${targetIds.length} complaints to ${newDept}.`
        : `Complaint ${modalTargetComplaint.id} assigned to ${newDept}.`
    );
    if (isBulkOperation) setSelectedIds([]);
  };

  const executePriorityUpdate = async (newPriority, reason) => {
    const targetIds = isBulkOperation ? selectedIds : [modalTargetComplaint.id];
    if (!dataSource.isMockMode()) {
      for (const cid of targetIds) {
        const c = complaints.find((x) => x.id === cid);
        await complaintApi.updatePriority(c?.rawId || cid, newPriority.toUpperCase()).catch((err) => {
          console.error(`Failed to update priority for ${cid}:`, err);
        });
      }
    }

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        return {
          ...c,
          priority: newPriority,
          updatedAt: 'Just now',
          latestUpdate: `Priority updated to ${newPriority}${reason ? `: ${reason}` : ''}.`
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast(
      isBulkOperation
        ? `Updated priority of ${targetIds.length} complaints to ${newPriority}.`
        : `Updated priority of ${modalTargetComplaint.id} to ${newPriority}.`
    );
    if (isBulkOperation) setSelectedIds([]);
  };

  const executeStatusUpdate = async (targetIds, newStatus, message) => {
    if (!dataSource.isMockMode()) {
      for (const cid of targetIds) {
        const c = complaints.find((x) => x.id === cid);
        if (newStatus === 'Resolved') {
          await complaintApi.resolveComplaint(c?.rawId || cid, message || 'Resolved by admin console').catch((err) => {
            console.error(`Failed to resolve ${cid}:`, err);
          });
        } else {
          await complaintApi.updateStatus(c?.rawId || cid, denormalizeStatus(newStatus)).catch((err) => {
            console.error(`Failed to update status for ${cid}:`, err);
          });
        }
      }
    }

    const updated = complaints.map((c) => {
      if (targetIds.includes(c.id)) {
        const timeline = [
          ...(c.timeline || []),
          {
            time: 'Just now',
            title: `Status: ${newStatus}`,
            desc: message || `Status transitioned to ${newStatus}.`
          }
        ];
        return {
          ...c,
          status: newStatus,
          updatedAt: 'Just now',
          timeline,
          latestUpdate: message || `Status transitioned to ${newStatus}.`
        };
      }
      return c;
    });

    updateComplaintsState(updated);
    showToast(
      targetIds.length > 1
        ? `Updated status of ${targetIds.length} complaints to ${newStatus}.`
        : `Status of ${targetIds[0]} changed to ${newStatus}.`
    );
  };

  const executeAddNote = async (id, noteText) => {
    if (!dataSource.isMockMode()) {
      const c = complaints.find((x) => x.id === id);
      await complaintApi.addUpdate(c?.rawId || id, {
        message: noteText,
        is_internal: true
      }).catch((err) => {
        console.error(`Failed to add note to ${id}:`, err);
      });
    }

    const newNote = {
      id: `n-${Date.now()}`,
      author: 'Campus Administrator',
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
    showToast(`Internal note appended to ${id}.`);
  };

  // Top header actions
  const handleAssignFirstUnassigned = () => {
    const target =
      complaints.find((c) => c.status === 'Pending' || c.status === 'Submitted') ||
      complaints.find((c) => c.status === 'Under Review') ||
      complaints[0];

    if (target) {
      handleOpenAssign(target);
    }
  };

  const handleRefresh = () => {
    fetchComplaints();
    showToast('Complaint directory refreshed from server.');
  };

  const handleExportSelected = () => {
    const selectedData = complaints.filter((c) => selectedIds.includes(c.id));
    downloadCSV(selectedData, `campus_complaints_selected_${Date.now()}.csv`);
    showToast(`Exported ${selectedData.length} selected complaints.`);
  };

  const handleContactStudent = (complaint) => {
    const mailtoLink = `mailto:${complaint.studentEmail || 'student@campus.edu'}?subject=Regarding%20Smart%20Campus%20Complaint%20${complaint.id}&body=Dear%20${encodeURIComponent(complaint.student)},%0A%0ARegarding%20your%20complaint%20"${encodeURIComponent(complaint.title)}"%20(ID:%20${complaint.id}):%0A%0A`;
    window.open(mailtoLink, '_blank');
  };

  const selectedData = useMemo(() => {
    return complaints.filter((c) => selectedIds.includes(c.id));
  }, [complaints, selectedIds]);

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans selection:bg-[#315C3A] selection:text-[#D4A84F]">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Top Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          title="Complaint Management"
          subtitle="Review, prioritize, assign, and track campus complaints."
          onGlobalSearch={(q) => setSearch(q)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top Page Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight">
                All Complaints
              </h2>
              <p className="text-xs sm:text-sm text-[#9FB1BC] mt-0.5">
                Manage every complaint submitted through the Smart Campus platform.
              </p>
            </div>

            {/* Right Buttons: + Assign, Export, Refresh */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleAssignFirstUnassigned}
                className="px-3.5 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] flex items-center gap-1.5 transition-colors shadow-glow-green"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
                <span>+ Assign Complaint</span>
              </button>

              <ExportMenu
                allFilteredData={filteredComplaints}
                currentPageData={paginatedComplaints}
                selectedData={selectedData}
                onExportSuccess={(msg) => showToast(msg)}
              />

              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg bg-[#0D1B22] hover:bg-[#13242E] text-[#9FB1BC] hover:text-[#F5F5F0] border border-[#1A2E3B] transition-colors"
                title="Refresh complaints list"
                aria-label="Refresh complaints list"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#D4A84F]' : ''}`} />
              </button>
            </div>
          </div>

          {/* 5 Summary Cards */}
          <ComplaintSummaryCards counts={summaryCounts} />

          {/* Filter Toolbar */}
          <ComplaintFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            deptFilter={deptFilter}
            setDeptFilter={setDeptFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredComplaints.length}
          />

          {/* Main Complaints Table & Mobile Cards */}
          <ComplaintTable
            complaints={paginatedComplaints}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onViewDetails={handleOpenDetails}
            onAssignDept={handleOpenAssign}
            onChangePriority={handleOpenPriority}
            onChangeStatus={handleOpenStatus}
            onAddNote={handleOpenAddNote}
            onMarkResolved={handleMarkResolved}
            onResetFilters={handleResetFilters}
            isAllSelected={isAllCurrentPageSelected}
          />

          {/* Pagination Footer */}
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

        {/* Admin Footer */}
        <AdminFooter />
      </div>

      {/* Bulk Action Sticky Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onBulkAssign={handleBulkAssign}
        onBulkPriority={handleBulkPriority}
        onBulkStatus={handleBulkStatus}
        onBulkResolve={handleBulkResolve}
        onExportSelected={handleExportSelected}
        onClearSelection={() => setSelectedIds([])}
      />

      {/* Modals */}
      <ComplaintDetailsModal
        isOpen={activeModal === 'details'}
        onClose={() => setActiveModal(null)}
        complaint={modalTargetComplaint}
        onOpenAssign={handleOpenAssign}
        onOpenPriority={handleOpenPriority}
        onOpenStatus={handleOpenStatus}
        onOpenAddNote={handleOpenAddNote}
        onContactStudent={handleContactStudent}
      />

      <AssignDepartmentModal
        isOpen={activeModal === 'assign'}
        onClose={() => setActiveModal(null)}
        complaint={modalTargetComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onAssign={executeDepartmentAssign}
      />

      <ChangePriorityModal
        isOpen={activeModal === 'priority'}
        onClose={() => setActiveModal(null)}
        complaint={modalTargetComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onUpdatePriority={executePriorityUpdate}
      />

      <ChangeStatusModal
        isOpen={activeModal === 'status'}
        onClose={() => setActiveModal(null)}
        complaint={modalTargetComplaint}
        selectedCount={selectedIds.length}
        isBulk={isBulkOperation}
        onUpdateStatus={(newStatus, msg) => {
          const targetIds = isBulkOperation ? selectedIds : [modalTargetComplaint.id];
          executeStatusUpdate(targetIds, newStatus, msg);
          if (isBulkOperation) setSelectedIds([]);
        }}
      />

      <InternalNoteModal
        isOpen={activeModal === 'note'}
        onClose={() => setActiveModal(null)}
        complaint={modalTargetComplaint}
        onSaveNote={executeAddNote}
      />

      <ConfirmActionModal
        isOpen={activeModal === 'confirm'}
        onClose={() => setActiveModal(null)}
        title={confirmConfig?.title}
        description={confirmConfig?.description}
        confirmLabel={confirmConfig?.confirmLabel}
        type={confirmConfig?.type}
        onConfirm={() => {
          if (confirmConfig?.onConfirm) confirmConfig.onConfirm();
        }}
      />

      {/* Toast Alert Feedback */}
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
