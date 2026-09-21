import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

// Layout Components
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// Analytics Components
import AnalyticsHeader from '../../components/admin/analytics/AnalyticsHeader';
import AnalyticsFilters from '../../components/admin/analytics/AnalyticsFilters';
import MetricCards from '../../components/admin/analytics/MetricCards';
import ComplaintTrendChart from '../../components/admin/analytics/ComplaintTrendChart';
import CategoryAnalysis from '../../components/admin/analytics/CategoryAnalysis';
import PriorityDistribution from '../../components/admin/analytics/PriorityDistribution';
import StatusDistribution from '../../components/admin/analytics/StatusDistribution';
import DepartmentPerformance from '../../components/admin/analytics/DepartmentPerformance';
import ResolutionTimeChart from '../../components/admin/analytics/ResolutionTimeChart';
import ComplaintHotspots from '../../components/admin/analytics/ComplaintHotspots';
import AIInsights from '../../components/admin/analytics/AIInsights';
import RecurringIssues from '../../components/admin/analytics/RecurringIssues';
import ReportGenerator from '../../components/admin/analytics/ReportGenerator';
import AnalyticsActivity from '../../components/admin/analytics/AnalyticsActivity';

// Modals
import ReportModal from '../../components/admin/analytics/ReportModal';
import DepartmentDetailsModal from '../../components/admin/analytics/DepartmentDetailsModal';

// Mock Data
import {
  METRIC_CARDS_DATA,
  COMPLAINT_TREND_DATA,
  CATEGORY_DATA,
  PRIORITY_DATA,
  STATUS_DATA,
  DEPARTMENT_PERFORMANCE_DATA,
  RESOLUTION_TIME_DATA,
  exportAnalyticsCSV
} from '../../data/analyticsMockData';
import { analyticsApi } from '../../services/analyticsApi';
import { dataSource } from '../../services/dataSource';

const FILTER_STORAGE_KEY = 'smart_campus_analytics_filters';

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiOverview, setApiOverview] = useState(null);

  // Filters State with LocalStorage Persistence
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem(FILTER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      dateRange: 'Last 7 Days',
      department: 'All Departments',
      category: 'All Categories',
      priority: 'All'
    };
  });

  // Modal States
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.id ? null : curr));
    }, 4500);
  };

  const fetchAnalytics = async () => {
    if (dataSource.isMockMode()) return;
    try {
      const res = await analyticsApi.getOverview();
      if (res) {
        setApiOverview(res);
      }
    } catch (err) {
      console.warn('Could not fetch analytics overview, falling back to mock:', err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Persist filter changes
  useEffect(() => {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    } catch {
      // Ignore storage errors
    }
  }, [filters]);

  // Handle Filter Application
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const activeSummary = [];
    if (newFilters.department !== 'All Departments') activeSummary.push(newFilters.department);
    if (newFilters.category !== 'All Categories') activeSummary.push(newFilters.category);
    if (newFilters.priority !== 'All') activeSummary.push(newFilters.priority);
    if (newFilters.dateRange !== 'Last 7 Days') activeSummary.push(newFilters.dateRange);

    const desc = activeSummary.length > 0 ? activeSummary.join(' • ') : 'Full campus scope';
    showToast(`Filters updated: ${desc}`);
  };

  const handleResetFilters = (defaultFilters) => {
    setFilters(defaultFilters);
    showToast('Analytics filters reset to default (Last 7 Days, All Departments).', 'info');
  };

  // Refresh Trigger
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAnalytics();
    setIsRefreshing(false);
    showToast('Analytics data synchronized with campus telemetry.');
  };

  // CSV Export Trigger
  const handleExportCSV = () => {
    exportAnalyticsCSV(filters);
    showToast('Analytics summary exported as CSV successfully.');
  };

  // Navigation to related complaints
  const handleViewRelatedComplaints = () => {
    navigate('/admin/complaints');
  };

  // Dynamically scale/filter data according to active filters
  const dynamicMetrics = useMemo(() => {
    let base = METRIC_CARDS_DATA;
    if (apiOverview) {
      base = [
        {
          ...METRIC_CARDS_DATA[0],
          value: String(apiOverview.total_complaints ?? 248),
        },
        {
          ...METRIC_CARDS_DATA[1],
          value: String(apiOverview.resolved_complaints ?? 139),
        },
        {
          ...METRIC_CARDS_DATA[2],
          value: `${apiOverview.resolution_rate ?? 56}%`,
        },
        {
          ...METRIC_CARDS_DATA[3],
          value: `${apiOverview.avg_resolution_hours ?? 28.5} hrs`,
        },
        {
          ...METRIC_CARDS_DATA[4],
          value: String((apiOverview.pending_complaints || 0) + (apiOverview.in_progress_complaints || 0)),
        },
        {
          ...METRIC_CARDS_DATA[5],
          value: `${apiOverview.sla_compliance_rate ?? 92.4}%`,
        },
      ];
    }

    if (filters.department === 'All Departments' && filters.category === 'All Categories' && filters.priority === 'All') {
      return base;
    }

    // If specific department is chosen
    if (filters.department !== 'All Departments') {
      const dept = DEPARTMENT_PERFORMANCE_DATA.find((d) => d.department === filters.department);
      if (dept) {
        return [
          {
            id: 'total',
            title: 'Department Complaints',
            value: `${dept.total}`,
            change: '+5.2%',
            trend: 'up',
            subtitle: `${dept.department} Queue`,
            color: '#315C3A'
          },
          {
            id: 'resolved',
            title: 'Resolved Complaints',
            value: `${dept.resolved}`,
            change: `${dept.resolutionRate}%`,
            trend: 'neutral',
            subtitle: `${dept.resolutionRate}% of dept`,
            color: '#10B981'
          },
          {
            id: 'rate',
            title: 'Resolution Rate',
            value: `${dept.resolutionRate}%`,
            change: '+4.1%',
            trend: 'up',
            subtitle: 'Division benchmark',
            color: '#D4A84F'
          },
          {
            id: 'avg_time',
            title: 'Avg. Resolution Time',
            value: `${dept.avgResolutionHours} hrs`,
            change: '-8%',
            trend: 'down',
            subtitle: `${dept.avgResolutionDays} days turnaround`,
            color: '#71844A'
          },
          {
            id: 'high_priority',
            title: 'Active In Progress',
            value: `${dept.inProgress}`,
            change: 'Active',
            trend: 'neutral',
            subtitle: 'Field operations',
            color: '#F97316'
          },
          {
            id: 'critical',
            title: 'Pending Review',
            value: `${dept.pending}`,
            change: 'Triage',
            trend: 'neutral',
            subtitle: 'Requires action',
            color: '#EF4444'
          }
        ];
      }
    }

    return METRIC_CARDS_DATA;
  }, [filters, apiOverview]);

  const dynamicTrendData = useMemo(() => {
    if (filters.department === 'All Departments') {
      return COMPLAINT_TREND_DATA;
    }
    // Scale trend data proportionally for selected department
    const dept = DEPARTMENT_PERFORMANCE_DATA.find((d) => d.department === filters.department);
    const ratio = dept ? dept.total / 248 : 0.25;

    return COMPLAINT_TREND_DATA.map((item) => ({
      date: item.date,
      Submitted: Math.max(1, Math.round(item.Submitted * ratio)),
      Resolved: Math.max(1, Math.round(item.Resolved * ratio)),
      Active: Math.max(2, Math.round(item.Active * ratio))
    }));
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex font-sans selection:bg-[#315C3A] selection:text-[#D4A84F]">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all">
        {/* Sticky Header */}
        <AdminHeader
          onToggleMobile={() => setMobileOpen(true)}
          title="Analytics & Insights"
          subtitle="Understand complaint trends, department performance, and campus issues."
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top Analytics Action Header */}
          <AnalyticsHeader
            onOpenReportModal={() => setReportModalOpen(true)}
            onExportCSV={handleExportCSV}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Top Filter Bar */}
          <AnalyticsFilters
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />

          {/* KPI Metrics Cards (6 Cards) */}
          <MetricCards metrics={dynamicMetrics} />

          {/* Large Complaint Trend Chart */}
          <div className="grid grid-cols-1 gap-6">
            <ComplaintTrendChart data={dynamicTrendData} />
          </div>

          {/* Category & Distribution Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CategoryAnalysis data={CATEGORY_DATA} />
            </div>
            <div className="lg:col-span-1">
              <PriorityDistribution data={PRIORITY_DATA} />
            </div>
            <div className="lg:col-span-1">
              <StatusDistribution data={STATUS_DATA} />
            </div>
          </div>

          {/* Department Performance Table */}
          <div className="grid grid-cols-1 gap-6">
            <DepartmentPerformance
              data={DEPARTMENT_PERFORMANCE_DATA}
              onViewDepartmentDetails={(dept) => setSelectedDepartment(dept)}
            />
          </div>

          {/* Turnaround Time Analysis & Campus Hotspots */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <ResolutionTimeChart data={RESOLUTION_TIME_DATA} />
            </div>
            <div className="lg:col-span-7">
              <ComplaintHotspots />
            </div>
          </div>

          {/* AI-Powered Automated Insights */}
          <div className="grid grid-cols-1 gap-6">
            <AIInsights />
          </div>

          {/* Recurring Issues & Top Reported Problem */}
          <div className="grid grid-cols-1 gap-6">
            <RecurringIssues
              onViewRelatedComplaints={handleViewRelatedComplaints}
            />
          </div>

          {/* Report Generation Banner */}
          <div className="grid grid-cols-1 gap-6">
            <ReportGenerator
              onOpenModal={() => setReportModalOpen(true)}
              onExportCSV={handleExportCSV}
            />
          </div>

          {/* Recent Analytics Activity Timeline */}
          <div className="grid grid-cols-1 gap-6">
            <AnalyticsActivity />
          </div>
        </main>

        {/* Global Admin Footer */}
        <AdminFooter />
      </div>

      {/* Report Generation Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        defaultFilters={filters}
        onReportSuccess={(msg) => showToast(msg)}
      />

      {/* Department Details Modal */}
      <DepartmentDetailsModal
        isOpen={Boolean(selectedDepartment)}
        onClose={() => setSelectedDepartment(null)}
        department={selectedDepartment}
      />

      {/* Floating Toast Alert */}
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
