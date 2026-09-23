import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

// Layout Components
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// Analytics UI Components
import AnalyticsHeader from '../../components/admin/analytics/AnalyticsHeader';
import AnalyticsFilters from '../../components/admin/analytics/AnalyticsFilters';
import AnalyticsKpiCards from '../../components/admin/analytics/AnalyticsKpiCards';
import ComplaintTrendChart from '../../components/admin/analytics/ComplaintTrendChart';
import StatusDistribution from '../../components/admin/analytics/StatusDistribution';
import PriorityDistribution from '../../components/admin/analytics/PriorityDistribution';
import DepartmentAnalytics from '../../components/admin/analytics/DepartmentAnalytics';
import CategoryAnalytics from '../../components/admin/analytics/CategoryAnalytics';
import ResolutionTimeChart from '../../components/admin/analytics/ResolutionTimeChart';
import MonthlyPerformance from '../../components/admin/analytics/MonthlyPerformance';
import AIInsights from '../../components/admin/analytics/AIInsights';
import CriticalComplaints from '../../components/admin/analytics/CriticalComplaints';
import CampusInsights from '../../components/admin/analytics/CampusInsights';

// Mock Master Dataset
import {
  ANALYTICS_KPIS,
  WEEKLY_TREND_DATA,
  STATUS_DISTRIBUTION_DATA,
  PRIORITY_DISTRIBUTION_DATA,
  DEPARTMENT_ANALYTICS_DATA,
  CATEGORY_ANALYTICS_DATA,
  RESOLUTION_TIME_BREAKDOWN,
  MONTHLY_PERFORMANCE_DATA,
} from '../../data/analyticsData';

import { useApp } from '../../context/useApp';

const STORAGE_FILTER_KEY = 'smart_campus_analytics_filters_v2';

export default function AdminAnalytics() {
  const { theme, toggleTheme } = useApp();
  const [searchParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync theme with URL query param if present (e.g., ?theme=dark or ?theme=light)
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam === 'dark' && theme !== 'dark') {
      document.documentElement.classList.add('dark');
      toggleTheme();
    } else if (themeParam === 'light' && theme !== 'light') {
      document.documentElement.classList.remove('dark');
      toggleTheme();
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Analytics & Insights | CGC University Mohali';
  }, []);

  // Filter State with localStorage recovery
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FILTER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      dateRange: 'Last 30 Days',
      department: 'All Departments',
      category: 'All Categories',
      priority: 'All Priorities',
      status: 'All Status',
    };
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.id ? null : curr));
    }, 4500);
  };

  // Persist filter modifications
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FILTER_KEY, JSON.stringify(filters));
    } catch {
      // Ignore storage errors
    }
  }, [filters]);

  const handleFilterChange = (key, val) => {
    setFilters((prev) => ({
      ...prev,
      [key]: val,
    }));
    showToast(`Filter applied: ${val}`);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'Last 30 Days',
      department: 'All Departments',
      category: 'All Categories',
      priority: 'All Priorities',
      status: 'All Status',
    });
    showToast('Analytics filters reset to default (Last 30 Days, All Departments).', 'info');
  };

  // Dynamically scale/filter KPIs based on active department or priority
  const dynamicKpis = useMemo(() => {
    if (filters.department === 'All Departments') {
      return ANALYTICS_KPIS;
    }

    const dept = DEPARTMENT_ANALYTICS_DATA.find((d) => d.department === filters.department);
    if (!dept) return ANALYTICS_KPIS;

    return [
      {
        id: 'total',
        title: `${dept.department} Complaints`,
        value: `${dept.total}`,
        rawValue: dept.total,
        change: '+8.4%',
        trend: 'up',
        label: 'vs previous period',
        description: `Total complaints logged for ${dept.department}`,
        color: '#008F63',
        darkColor: '#00A875',
      },
      {
        id: 'resolved',
        title: 'Resolved Complaints',
        value: `${dept.resolved}`,
        rawValue: dept.resolved,
        change: '+14.2%',
        trend: 'up',
        label: `${dept.rate}% of dept volume`,
        description: 'Successfully closed tickets',
        color: '#315C3A',
        darkColor: '#43784F',
      },
      {
        id: 'pending',
        title: 'Pending Review',
        value: `${dept.pending}`,
        rawValue: dept.pending,
        change: '-5.1%',
        trend: 'down',
        label: 'vs previous period',
        description: 'Awaiting triage or assignment',
        color: '#71844A',
        darkColor: '#8CA45C',
      },
      {
        id: 'resolution_time',
        title: 'Avg. Resolution Time',
        value: `${dept.avgDays} Days`,
        rawValue: dept.avgDays,
        change: '-10.2%',
        trend: 'down',
        label: 'Department turnaround',
        description: 'Average closure duration',
        color: '#D4A84F',
        darkColor: '#E5BF6E',
      },
      {
        id: 'critical',
        title: 'Active High Priority',
        value: `${dept.inProgress}`,
        rawValue: dept.inProgress,
        change: '+2.0%',
        trend: 'up',
        label: 'Active operations',
        description: 'In-progress field assignments',
        color: '#EF4444',
        darkColor: '#F87171',
      },
    ];
  }, [filters.department]);

  // Dynamically scale trend line data if a specific department is chosen
  const dynamicTrendData = useMemo(() => {
    if (filters.department === 'All Departments') {
      return WEEKLY_TREND_DATA;
    }
    const dept = DEPARTMENT_ANALYTICS_DATA.find((d) => d.department === filters.department);
    const ratio = dept ? dept.total / 1248 : 0.2;

    return WEEKLY_TREND_DATA.map((item) => ({
      week: item.week,
      received: Math.max(8, Math.round(item.received * ratio)),
      resolved: Math.max(5, Math.round(item.resolved * ratio)),
      active: Math.max(4, Math.round(item.active * ratio)),
    }));
  }, [filters.department]);

  return (
    <div className="min-h-screen bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] flex font-sans selection:bg-[#008F63] selection:text-white transition-colors duration-200">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Sticky Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          title="Analytics & Insights"
          subtitle="Understand campus complaints, identify trends, and make data-driven decisions."
        />

        {/* Dashboard Body */}
        <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-6 space-y-6">
          {/* Top Page Action Header */}
          <AnalyticsHeader
            dateRange={filters.dateRange}
            onDateRangeChange={(val) => handleFilterChange('dateRange', val)}
            filters={filters}
            onShowToast={showToast}
          />

          {/* Filter Bar */}
          <AnalyticsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* 5 Top KPI Cards */}
          <AnalyticsKpiCards kpiData={dynamicKpis} />

          {/* Complaint Trend LineChart (Large Section) */}
          <ComplaintTrendChart data={dynamicTrendData} />

          {/* Status & Priority Donut Charts (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusDistribution data={STATUS_DISTRIBUTION_DATA} />
            <PriorityDistribution data={PRIORITY_DISTRIBUTION_DATA} />
          </div>

          {/* Department-wise Complaints (Horizontal BarChart) */}
          <DepartmentAnalytics data={DEPARTMENT_ANALYTICS_DATA} />

          {/* Category Analytics & Turnaround Duration (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryAnalytics data={CATEGORY_ANALYTICS_DATA} />
            <ResolutionTimeChart breakdown={RESOLUTION_TIME_BREAKDOWN} />
          </div>

          {/* Monthly Performance Combo Chart */}
          <MonthlyPerformance data={MONTHLY_PERFORMANCE_DATA} />

          {/* AI-Powered Automated Insights */}
          <AIInsights />

          {/* Critical Complaints Table */}
          <CriticalComplaints />

          {/* Campus Insights Executive Summary */}
          <CampusInsights />
        </main>

        {/* Global Admin Footer */}
        <AdminFooter />
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] shadow-2xl text-xs animate-in slide-in-from-bottom-5 duration-200 max-w-md">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#008F63] dark:text-[#00A875] shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-[#D4A84F] shrink-0" />
          )}
          <span className="flex-1 font-semibold">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 text-[#60717A] hover:text-[#071A2B] dark:hover:text-white rounded"
            aria-label="Dismiss Notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
