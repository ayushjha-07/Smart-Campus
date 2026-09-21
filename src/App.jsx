import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { StudentRoute, DepartmentRoute, AdminRoute } from './components/common/RouteGuards';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import GlobalToast from './components/common/GlobalToast';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetails from './pages/ComplaintDetails';
import Notifications from './pages/Notifications';
import StudentProfile from './pages/StudentProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import UserManagement from './pages/admin/UserManagement';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';
import DepartmentDashboard from './pages/department/DepartmentDashboard';
import DepartmentNotificationsPage from './pages/department/DepartmentNotificationsPage';
import DepartmentPlaceholder from './pages/department/DepartmentPlaceholder';
import NotFoundPage from './pages/NotFoundPage';
import AccessDeniedPage from './pages/AccessDeniedPage';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <GlobalSearchModal />
          <GlobalToast />
          <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Portal Routes (Guarded for Student or Admin) */}
          <Route path="/student/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
          <Route path="/student/complaints/new" element={<StudentRoute><SubmitComplaint /></StudentRoute>} />
          <Route path="/student/submit" element={<StudentRoute><SubmitComplaint /></StudentRoute>} />
          <Route path="/student/complaints" element={<StudentRoute><MyComplaints /></StudentRoute>} />
          <Route path="/student/complaints/:id" element={<StudentRoute><ComplaintDetails /></StudentRoute>} />
          <Route path="/student/notifications" element={<StudentRoute><Notifications /></StudentRoute>} />
          <Route path="/student/profile" element={<StudentRoute><StudentProfile /></StudentRoute>} />

          {/* Admin Portal Routes (Guarded for Admin strictly) */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/complaints" element={<AdminRoute><AdminComplaints /></AdminRoute>} />
          <Route path="/admin/departments" element={<AdminRoute><UserManagement initialTab="departments" /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagement initialTab="users" /></AdminRoute>} />
          <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><AdminPlaceholder /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminPlaceholder /></AdminRoute>} />
          <Route path="/admin/help" element={<AdminRoute><AdminPlaceholder /></AdminRoute>} />

          {/* Department Portal Routes (Guarded for Department Staff or Admin) */}
          <Route path="/department/dashboard" element={<DepartmentRoute><DepartmentDashboard /></DepartmentRoute>} />
          <Route path="/department/complaints" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />
          <Route path="/department/in-progress" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />
          <Route path="/department/resolved" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />
          <Route path="/department/notifications" element={<DepartmentRoute><DepartmentNotificationsPage /></DepartmentRoute>} />
          <Route path="/department/analytics" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />
          <Route path="/department/profile" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />
          <Route path="/department/help" element={<DepartmentRoute><DepartmentPlaceholder /></DepartmentRoute>} />

          {/* Error Pages */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
  );
}

