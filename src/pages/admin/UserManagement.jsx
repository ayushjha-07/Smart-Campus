import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

// Layout Components
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// User Management Components
import UserManagementHeader from '../../components/admin/users/UserManagementHeader';
import UserSummaryCards from '../../components/admin/users/UserSummaryCards';
import UserFilters from '../../components/admin/users/UserFilters';
import UserTable from '../../components/admin/users/UserTable';
import UserMobileCard from '../../components/admin/users/UserMobileCard';
import UserDetailsDrawer from '../../components/admin/users/UserDetailsDrawer';
import Pagination from '../../components/admin/users/Pagination';
import BulkUserActions from '../../components/admin/users/BulkUserActions';

// User Modals
import AddUserModal from '../../components/admin/users/AddUserModal';
import EditUserModal from '../../components/admin/users/EditUserModal';
import ChangeRoleModal from '../../components/admin/users/ChangeRoleModal';
import ChangeDepartmentModal from '../../components/admin/users/ChangeDepartmentModal';
import ResetPasswordModal from '../../components/admin/users/ResetPasswordModal';
import SuspendUserModal from '../../components/admin/users/SuspendUserModal';
import DeleteUserModal from '../../components/admin/users/DeleteUserModal';

// Department Components & Modals
import DepartmentTab from '../../components/admin/users/DepartmentTab';
import DepartmentDetailsDrawer from '../../components/admin/users/DepartmentDetailsDrawer';
import AddDepartmentModal from '../../components/admin/users/AddDepartmentModal';
import EditDepartmentModal from '../../components/admin/users/EditDepartmentModal';
import DeactivateDepartmentModal from '../../components/admin/users/DeactivateDepartmentModal';

// Data & Helpers
import {
  loadUsersFromStorage,
  saveUsersToStorage,
  loadDepartmentsFromStorage,
  saveDepartmentsToStorage,
  exportUsersCSV
} from '../../data/userManagementMockData';
import { userApi } from '../../services/userApi';
import { departmentApi } from '../../services/departmentApi';
import { mapUser, mapDepartment } from '../../utils/mapper';
import { dataSource } from '../../services/dataSource';

export default function UserManagement({ initialTab = 'users' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile sidebar state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine initial tab from route or prop
  const isDeptRoute = location.pathname.includes('/admin/departments');
  const [activeTab, setActiveTab] = useState(isDeptRoute ? 'departments' : initialTab);

  // Data State with LocalStorage Persistence
  const [users, setUsers] = useState(() => loadUsersFromStorage());
  const [departments, setDepartments] = useState(() => loadDepartmentsFromStorage());

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    role: 'All Roles',
    department: 'All Departments',
    status: 'All',
    year: 'All',
    sort: 'Newest'
  });

  // Selected Users for Bulk Operations
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Modal / Drawer Active States
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.id ? null : curr));
    }, 4500);
  };

  const fetchAllData = async () => {
    if (dataSource.isMockMode()) return;
    try {
      const [usersRes, deptsRes] = await Promise.all([
        userApi.getUsers().catch((err) => {
          console.warn('Could not fetch users from API:', err);
          return null;
        }),
        departmentApi.getDepartments().catch((err) => {
          console.warn('Could not fetch departments from API:', err);
          return null;
        })
      ]);

      if (usersRes && Array.isArray(usersRes) && usersRes.length > 0) {
        const mappedUsers = usersRes.map(mapUser);
        setUsers(mappedUsers);
      }
      if (deptsRes && Array.isArray(deptsRes) && deptsRes.length > 0) {
        const mappedDepts = deptsRes.map(mapDepartment);
        setDepartments(mappedDepts);
      }
    } catch (err) {
      console.error('Error fetching users/departments from API:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Helper to persist users
  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    saveUsersToStorage(newUsers);
  };

  // Helper to persist departments
  const updateDepartments = (newDepts) => {
    setDepartments(newDepts);
    saveDepartmentsToStorage(newDepts);
  };

  // Filter & Sort Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Search
      const q = filters.search.toLowerCase().trim();
      if (q) {
        const matchName = u.name.toLowerCase().includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchCode = (u.code || u.id).toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCode) return false;
      }

      // Role
      if (filters.role !== 'All Roles' && u.role !== filters.role) {
        return false;
      }

      // Department
      if (filters.department !== 'All Departments' && u.department !== filters.department) {
        return false;
      }

      // Status
      if (filters.status !== 'All' && u.status !== filters.status) {
        return false;
      }

      // Year
      if (filters.year !== 'All' && u.year !== filters.year) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sort) {
        case 'Oldest':
          return a.id.localeCompare(b.id);
        case 'Name A-Z':
          return a.name.localeCompare(b.name);
        case 'Name Z-A':
          return b.name.localeCompare(a.name);
        default: // Newest
          return b.id.localeCompare(a.id);
      }
    });
  }, [users, filters]);

  // Paginate Users
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Selection handlers
  const handleToggleSelectUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const allSelected = currentPageIds.every((id) => selectedUserIds.includes(id));

    if (allSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedUserIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  // User Actions
  const handleOpenAddUser = () => {
    setActiveModal('addUser');
  };

  const handleAddUser = (newUser) => {
    const updated = [newUser, ...users];
    updateUsers(updated);
    showToast(`User ${newUser.name} created successfully.`);
  };

  const handleSaveUser = (updatedUser) => {
    const updated = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    updateUsers(updated);
    if (selectedUser?.id === updatedUser.id) setSelectedUser(updatedUser);
    showToast('User information updated successfully.');
  };

  const handleUpdateRole = (userId, newRole) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    updateUsers(updated);
    showToast(`Role updated to ${newRole}.`);
  };

  const handleUpdateDepartment = (userId, newDept) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, department: newDept } : u));
    updateUsers(updated);
    showToast(`Assigned to ${newDept} department.`);
  };

  const handleConfirmResetPassword = (user) => {
    showToast(`Password reset instructions sent to ${user.email}.`);
  };

  const handleConfirmSuspend = async (userId, newStatus) => {
    if (!dataSource.isMockMode() && typeof userId === 'string' && userId.length > 20) {
      await userApi.updateUserStatus(userId, newStatus === 'Suspended' ? 'SUSPENDED' : 'ACTIVE').catch((err) => {
        console.error('Failed to update user status on server:', err);
      });
    }
    const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
    updateUsers(updated);
    showToast(newStatus === 'Suspended' ? 'User account suspended.' : 'User account reactivated.');
  };

  const handleDeleteUser = (userId) => {
    const updated = users.filter((u) => u.id !== userId);
    updateUsers(updated);
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
    showToast('User account deleted from system directory.', 'warning');
  };

  // Bulk Actions
  const handleBulkActivate = () => {
    const updated = users.map((u) =>
      selectedUserIds.includes(u.id) ? { ...u, status: 'Active' } : u
    );
    updateUsers(updated);
    showToast(`${selectedUserIds.length} users marked as Active.`);
    setSelectedUserIds([]);
  };

  const handleBulkSuspend = () => {
    const updated = users.map((u) =>
      selectedUserIds.includes(u.id) ? { ...u, status: 'Suspended' } : u
    );
    updateUsers(updated);
    showToast(`${selectedUserIds.length} users suspended.`, 'warning');
    setSelectedUserIds([]);
  };

  const handleBulkChangeDept = () => {
    // Reassign selected users to Maintenance demo default
    const updated = users.map((u) =>
      selectedUserIds.includes(u.id) ? { ...u, department: 'Maintenance' } : u
    );
    updateUsers(updated);
    showToast(`${selectedUserIds.length} users reassigned to Maintenance.`);
    setSelectedUserIds([]);
  };

  const handleExportUsers = () => {
    exportUsersCSV(filteredUsers);
    showToast('All filtered user records exported to CSV.');
  };

  const handleExportSelected = () => {
    const targetUsers = users.filter((u) => selectedUserIds.includes(u.id));
    exportUsersCSV(targetUsers);
    showToast(`${targetUsers.length} selected users exported to CSV.`);
  };

  // Department Actions
  const handleAddDepartment = async (newDept) => {
    let savedDept = newDept;
    if (!dataSource.isMockMode()) {
      try {
        const created = await departmentApi.createDepartment({
          name: newDept.name,
          department_code: newDept.code || newDept.departmentCode || newDept.name.slice(0, 4).toUpperCase(),
          description: newDept.description || ''
        });
        if (created) savedDept = mapDepartment(created);
      } catch (err) {
        console.error('Failed to create department on server:', err);
      }
    }
    const updated = [savedDept, ...departments];
    updateDepartments(updated);
    showToast(`Department "${newDept.name}" created successfully.`);
  };

  const handleSaveDepartment = async (updatedDept) => {
    if (!dataSource.isMockMode() && typeof updatedDept.id === 'string' && updatedDept.id.length > 20) {
      try {
        await departmentApi.updateDepartment(updatedDept.id, {
          name: updatedDept.name,
          description: updatedDept.description || ''
        });
      } catch (err) {
        console.error('Failed to update department on server:', err);
      }
    }
    const updated = departments.map((d) => (d.id === updatedDept.id ? updatedDept : d));
    updateDepartments(updated);
    if (selectedDept?.id === updatedDept.id) setSelectedDept(updatedDept);
    showToast('Department details updated successfully.');
  };

  const handleDeactivateDepartment = async (deptId, newStatus) => {
    if (!dataSource.isMockMode() && typeof deptId === 'string' && deptId.length > 20) {
      try {
        await departmentApi.updateDepartmentStatus(deptId, newStatus === 'Inactive' ? 'INACTIVE' : 'ACTIVE');
      } catch (err) {
        console.error('Failed to update department status on server:', err);
      }
    }
    const updated = departments.map((d) => (d.id === deptId ? { ...d, status: newStatus } : d));
    updateDepartments(updated);
    showToast(newStatus === 'Inactive' ? 'Department deactivated.' : 'Department reactivated.');
  };

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans selection:bg-[#315C3A] selection:text-[#D4A84F]">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Sticky Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          title="User & Department Management"
          subtitle="Manage campus users, roles, departments, and access."
        />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto pb-24">
          {/* Top Page Header with Tab Switcher & Action Triggers */}
          <UserManagementHeader
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === 'departments' && !location.pathname.includes('departments')) {
                navigate('/admin/departments');
              } else if (tab === 'users' && !location.pathname.includes('users')) {
                navigate('/admin/users');
              }
            }}
            onOpenAddUser={handleOpenAddUser}
            onOpenAddDepartment={() => setActiveModal('addDept')}
            onExportUsers={handleExportUsers}
          />

          {/* Conditional View Based on Active Tab */}
          {activeTab === 'users' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Summary Cards */}
              <UserSummaryCards />

              {/* Filter Toolbar */}
              <UserFilters
                filters={filters}
                onApplyFilters={(f) => {
                  setFilters(f);
                  setCurrentPage(1);
                  showToast('User filters applied.');
                }}
                onClearFilters={(defaults) => {
                  setFilters(defaults);
                  setCurrentPage(1);
                  showToast('User filters cleared.', 'info');
                }}
              />

              {/* Desktop & Tablet Table */}
              <div className="hidden md:block">
                <UserTable
                  users={paginatedUsers}
                  selectedUserIds={selectedUserIds}
                  onToggleSelectUser={handleToggleSelectUser}
                  onToggleSelectAll={handleToggleSelectAll}
                  onViewUser={(u) => {
                    setSelectedUser(u);
                    setActiveModal('viewUser');
                  }}
                  onEditUser={(u) => {
                    setSelectedUser(u);
                    setActiveModal('editUser');
                  }}
                  onChangeRole={(u) => {
                    setSelectedUser(u);
                    setActiveModal('changeRole');
                  }}
                  onChangeDepartment={(u) => {
                    setSelectedUser(u);
                    setActiveModal('changeDept');
                  }}
                  onResetPassword={(u) => {
                    setSelectedUser(u);
                    setActiveModal('resetPass');
                  }}
                  onSuspendUser={(u) => {
                    setSelectedUser(u);
                    setActiveModal('suspendUser');
                  }}
                  onDeleteUser={(u) => {
                    setSelectedUser(u);
                    setActiveModal('deleteUser');
                  }}
                />
              </div>

              {/* Mobile Cards List (< 768px) */}
              <div className="md:hidden space-y-3">
                {paginatedUsers.map((u) => (
                  <UserMobileCard
                    key={u.id}
                    user={u}
                    isSelected={selectedUserIds.includes(u.id)}
                    onToggleSelect={() => handleToggleSelectUser(u.id)}
                    onViewUser={() => {
                      setSelectedUser(u);
                      setActiveModal('viewUser');
                    }}
                    onEditUser={() => {
                      setSelectedUser(u);
                      setActiveModal('editUser');
                    }}
                    onChangeRole={() => {
                      setSelectedUser(u);
                      setActiveModal('changeRole');
                    }}
                    onChangeDepartment={() => {
                      setSelectedUser(u);
                      setActiveModal('changeDept');
                    }}
                    onResetPassword={() => {
                      setSelectedUser(u);
                      setActiveModal('resetPass');
                    }}
                    onSuspendUser={() => {
                      setSelectedUser(u);
                      setActiveModal('suspendUser');
                    }}
                    onDeleteUser={() => {
                      setSelectedUser(u);
                      setActiveModal('deleteUser');
                    }}
                  />
                ))}
              </div>

              {/* Functional Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPage(p)}
                onItemsPerPageChange={(limit) => {
                  setItemsPerPage(limit);
                  setCurrentPage(1);
                }}
              />
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <DepartmentTab
                departments={departments}
                onOpenAddDepartment={() => setActiveModal('addDept')}
                onViewDetails={(d) => {
                  setSelectedDept(d);
                  setActiveModal('viewDept');
                }}
                onEditDepartment={(d) => {
                  setSelectedDept(d);
                  setActiveModal('editDept');
                }}
                onViewComplaints={(d) => {
                  navigate(`/admin/complaints?dept=${encodeURIComponent(d.name)}`);
                }}
                onViewStaff={(d) => {
                  setSelectedDept(d);
                  setActiveModal('viewDept');
                }}
                onDeactivateDepartment={(d) => {
                  setSelectedDept(d);
                  setActiveModal('deactivateDept');
                }}
              />
            </div>
          )}
        </main>

        {/* Global Admin Footer */}
        <AdminFooter />
      </div>

      {/* Floating Bulk Action Bar */}
      <BulkUserActions
        selectedCount={selectedUserIds.length}
        onActivateSelected={handleBulkActivate}
        onSuspendSelected={handleBulkSuspend}
        onChangeDeptSelected={handleBulkChangeDept}
        onExportSelected={handleExportSelected}
        onClearSelection={() => setSelectedUserIds([])}
      />

      {/* User Modals & Drawers */}
      <UserDetailsDrawer
        isOpen={activeModal === 'viewUser'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onEditUser={(u) => {
          setSelectedUser(u);
          setActiveModal('editUser');
        }}
        onChangeRole={(u) => {
          setSelectedUser(u);
          setActiveModal('changeRole');
        }}
        onChangeDepartment={(u) => {
          setSelectedUser(u);
          setActiveModal('changeDept');
        }}
        onResetPassword={(u) => {
          setSelectedUser(u);
          setActiveModal('resetPass');
        }}
      />

      <AddUserModal
        isOpen={activeModal === 'addUser'}
        onClose={() => setActiveModal(null)}
        onAddUser={handleAddUser}
      />

      <EditUserModal
        isOpen={activeModal === 'editUser'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onSaveUser={handleSaveUser}
      />

      <ChangeRoleModal
        isOpen={activeModal === 'changeRole'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onUpdateRole={handleUpdateRole}
      />

      <ChangeDepartmentModal
        isOpen={activeModal === 'changeDept'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onUpdateDepartment={handleUpdateDepartment}
      />

      <ResetPasswordModal
        isOpen={activeModal === 'resetPass'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirmReset={handleConfirmResetPassword}
      />

      <SuspendUserModal
        isOpen={activeModal === 'suspendUser'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirmSuspend={handleConfirmSuspend}
      />

      <DeleteUserModal
        isOpen={activeModal === 'deleteUser'}
        onClose={() => setActiveModal(null)}
        user={selectedUser}
        onConfirmDelete={handleDeleteUser}
      />

      {/* Department Modals & Drawers */}
      <DepartmentDetailsDrawer
        isOpen={activeModal === 'viewDept'}
        onClose={() => setActiveModal(null)}
        dept={selectedDept}
        onEditDepartment={(d) => {
          setSelectedDept(d);
          setActiveModal('editDept');
        }}
      />

      <AddDepartmentModal
        isOpen={activeModal === 'addDept'}
        onClose={() => setActiveModal(null)}
        onAddDepartment={handleAddDepartment}
      />

      <EditDepartmentModal
        isOpen={activeModal === 'editDept'}
        onClose={() => setActiveModal(null)}
        dept={selectedDept}
        onSaveDepartment={handleSaveDepartment}
      />

      <DeactivateDepartmentModal
        isOpen={activeModal === 'deactivateDept'}
        onClose={() => setActiveModal(null)}
        dept={selectedDept}
        onConfirmDeactivate={handleDeactivateDepartment}
      />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0D1B22] border border-[#315C3A] text-[#F5F5F0] shadow-2xl text-xs animate-in slide-in-from-bottom-5 duration-200 max-w-md">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
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
