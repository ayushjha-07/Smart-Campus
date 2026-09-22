import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isMockMode } from '../../services/dataSource';

/**
 * Loading spinner while session restoration is pending
 */
function RouteLoading() {
  return (
    <div className="min-h-screen bg-[#07121A] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-[#315C3A] border-t-[#D4A84F] rounded-full animate-spin" />
      <p className="text-xs text-[#A8B3B0] font-medium tracking-wide">
        Verifying institutional credentials...
      </p>
    </div>
  );
}

/**
 * Protects routes from unauthenticated access.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // In mock development mode, bypass route guards if no token
  if (isMockMode) {
    return children;
  }

  if (loading) {
    return <RouteLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Protects routes by verifying user roles against allowedRoles array.
 */
export function RoleRoute({ allowedRoles = [], children }) {
  const { currentUser, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (isMockMode) {
    return children;
  }

  if (loading) {
    return <RouteLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = currentUser?.role?.toUpperCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

  if (!role || !normalizedAllowed.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

/**
 * Route guard for Student pages (Accessible by Students and Administrators)
 */
export function StudentRoute({ children }) {
  return (
    <RoleRoute allowedRoles={['STUDENT', 'ADMINISTRATOR']}>
      {children}
    </RoleRoute>
  );
}

/**
 * Route guard for Department Staff pages (Accessible by Department Staff and Administrators)
 */
export function DepartmentRoute({ children }) {
  return (
    <RoleRoute allowedRoles={['DEPARTMENT_STAFF', 'ADMINISTRATOR']}>
      {children}
    </RoleRoute>
  );
}

/**
 * Route guard for Admin pages (Accessible by Administrators only; redirects Students to /student/dashboard)
 */
export function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    const role = (currentUser.role || '').toUpperCase();
    if (role === 'STUDENT') {
      return <Navigate to="/student/dashboard" replace />;
    }
    if (role === 'DEPARTMENT_STAFF') {
      return <Navigate to="/department/dashboard" replace />;
    }
  }

  return children;
}

const RouteGuards = {
  ProtectedRoute,
  RoleRoute,
  StudentRoute,
  DepartmentRoute,
  AdminRoute,
};

export default RouteGuards;
