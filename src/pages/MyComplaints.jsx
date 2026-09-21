import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ChevronRight, 
  Download, 
  CheckCircle2, 
  X, 
  Check
} from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ComplaintSummaryCards from '../components/complaints/ComplaintSummaryCards';
import ComplaintFilters from '../components/complaints/ComplaintFilters';
import ComplaintTable from '../components/complaints/ComplaintTable';
import ComplaintCard from '../components/complaints/ComplaintCard';
import ComplaintPagination from '../components/complaints/ComplaintPagination';
import ComplaintEmptyState from '../components/complaints/ComplaintEmptyState';
import ComplaintInsight from '../components/complaints/ComplaintInsight';
import ApiErrorState from '../components/common/ApiErrorState';
import { TableSkeleton } from '../components/common/Skeletons';
import { complaintApi } from '../services/complaintApi';
import { mapComplaint } from '../utils/mapper';
import { isMockMode } from '../services/dataSource';
import { mockComplaintsList } from '../data/mockComplaints';
import campusAssets from '../assets/campusAssets';
import HeroCalligraphy from '../components/common/HeroCalligraphy';

const ITEMS_PER_PAGE = 6;

export default function MyComplaints() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  // Main filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Interaction feedback states
  const [toastMessage, setToastMessage] = useState(null);
  const [resolutionModalComplaint, setResolutionModalComplaint] = useState(null);

  // API State
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(!isMockMode);
  const [error, setError] = useState(null);

  const fetchComplaints = useCallback(async () => {
    if (isMockMode) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await complaintApi.getComplaints({
        search: searchQuery || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        priority: priorityFilter !== 'All' ? priorityFilter : undefined,
        category: categoryFilter !== 'All' ? categoryFilter : undefined,
        page: currentPage,
        page_size: ITEMS_PER_PAGE,
      });
      setApiData(res);
    } catch (err) {
      console.warn('Backend server unavailable, seamlessly falling back to local campus records:', err);
      // Gracefully fall back to local mock complaints without showing a connection error
      setApiData(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Complaints | Smart Campus Complaint & Analytics";
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // When header search updates, sync with complaints search
  const handleHeaderSearchChange = (val) => {
    setHeaderSearch(val);
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  const handleCopySuccess = (complaintId) => {
    showToast(`Complaint ID ${complaintId} copied to clipboard`);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (statusFilter !== 'All') count++;
    if (priorityFilter !== 'All') count++;
    if (categoryFilter !== 'All') count++;
    if (dateFilter !== 'All Time') count++;
    return count;
  }, [searchQuery, statusFilter, priorityFilter, categoryFilter, dateFilter]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setHeaderSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setDateFilter('All Time');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Derived Complaints List (from API or fallback to mock)
  const currentComplaintsList = useMemo(() => {
    if (apiData?.items) {
      return apiData.items.map(mapComplaint);
    }
    // Mock Mode fallback
    return mockComplaintsList;
  }, [apiData]);

  // Summary KPI calculation (fixed across entire dataset)
  const summaryMetrics = useMemo(() => {
    const total = apiData?.total ?? currentComplaintsList.length;
    const resolved = currentComplaintsList.filter((c) => c.status === 'Resolved').length;
    const inProgress = currentComplaintsList.filter((c) => c.status === 'In Progress').length;
    const pending = currentComplaintsList.filter((c) => ['Submitted', 'Under Review', 'Assigned'].includes(c.status)).length;
    return { total, resolved, inProgress, pending };
  }, [apiData, currentComplaintsList]);

  // Client-side filtering when in mock mode
  const filteredComplaints = useMemo(() => {
    if (apiData?.items) return currentComplaintsList;

    let list = [...currentComplaintsList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.id?.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      if (statusFilter === 'Pending') {
        list = list.filter((c) => ['Submitted', 'Under Review', 'Assigned'].includes(c.status));
      } else {
        list = list.filter((c) => c.status?.toLowerCase() === statusFilter.toLowerCase());
      }
    }

    if (priorityFilter !== 'All') {
      list = list.filter((c) => c.priority?.toUpperCase() === priorityFilter.toUpperCase());
    }

    if (categoryFilter !== 'All') {
      list = list.filter((c) => c.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Sort options
    if (sortBy === 'oldest') {
      list.reverse();
    } else if (sortBy === 'priority-high') {
      const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      list.sort((a, b) => (rank[b.priority?.toUpperCase()] || 0) - (rank[a.priority?.toUpperCase()] || 0));
    } else if (sortBy === 'priority-low') {
      const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      list.sort((a, b) => (rank[a.priority?.toUpperCase()] || 0) - (rank[b.priority?.toUpperCase()] || 0));
    }

    return list;
  }, [apiData, currentComplaintsList, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  const handleCardFilter = (status) => {
    if (status === 'All') {
      setStatusFilter('All');
    } else if (status === 'Pending') {
      setStatusFilter('Pending');
    } else {
      setStatusFilter(status);
    }
    setCurrentPage(1);
  };

  const totalFiltered = filteredComplaints.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / ITEMS_PER_PAGE));

  const paginatedComplaints = useMemo(() => {
    if (apiData?.items) return filteredComplaints;
    return filteredComplaints.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [apiData, filteredComplaints, currentPage]);

  // Export summary CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'SubmittedDate', 'Location'];
    const rows = filteredComplaints.map((c) => [
      c.id,
      `"${(c.title || '').replace(/"/g, '""')}"`,
      c.category,
      c.priority,
      c.status,
      c.submittedDate,
      `"${(c.location || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cgc_smart_campus_complaints_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Complaints registry exported as CSV');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#10233D] dark:text-[#F5F7F5] flex antialiased selection:bg-[#078B5B] selection:text-white transition-colors duration-200">
      
      {/* Fixed Left Sidebar with CGC Gate Background (300px width) */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
        
        {/* Sticky Dashboard Header */}
        <DashboardHeader
          onToggleMobile={() => setMobileSidebarOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={handleHeaderSearchChange}
        />

        {/* Scrollable Page Body in Normal Document Flow */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Page Title Area with CGC Aerial Campus Full-Bleed Master Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[195px] sm:min-h-[215px] flex items-center justify-between transition-all">
            
            {/* Real CGC Aerial Campus Photo (100% Opacity, Sharp, Real Photograph) */}
            <img
              src={campusAssets.aerialImage}
              alt="CGC University Mohali Aerial Campus"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 filter brightness-[1.0] contrast-[1.02]"
            />

            {/* Master Directional Contrast Gradient for Text Readability:
                - Left 45%: strong dark navy/black overlay (~82-84% opacity)
                - Middle 45%: smooth transition to transparent (down to ~18-20% opacity)
                - Right 10%: almost completely transparent, keeping CGC University building sharp & bright
            */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.85) 0%, rgba(5, 13, 18, 0.80) 40%, rgba(5, 13, 18, 0.40) 65%, rgba(5, 13, 18, 0.12) 85%, rgba(5, 13, 18, 0.0) 100%)'
              }}
            />
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, rgba(5, 13, 18, 0.70) 0%, rgba(5, 13, 18, 0.20) 28%, transparent 55%)'
              }}
            />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5 w-full">
              
              {/* Left: Badge, Heading, Description, Buttons */}
              <div className="space-y-2.5 max-w-xl">
                {/* Top Pill Badge: Smart Campus */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <span>Smart Campus</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    My <span className="text-[#10E894]">Complaints</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs leading-relaxed max-w-lg">
                    Track, manage, and follow the progress of all your submitted complaints.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link
                    to="/student/complaints/new"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#078A5A] hover:bg-[#06734B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Complaint</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10213A] bg-white hover:bg-slate-100 border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#10213A]" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Script Calligraphy Overlay with Soft White Blur Cloud */}
              <HeroCalligraphy />

            </div>
          </div>

          {/* 4 Summary KPI Cards */}
          <ComplaintSummaryCards
            counts={summaryMetrics}
            activeFilter={statusFilter}
            onSelectFilter={handleCardFilter}
          />

          {/* Campus Resolution Health Card */}
          <ComplaintInsight
            totalComplaints={summaryMetrics.total}
            resolvedComplaints={summaryMetrics.resolved}
            inProgressComplaints={summaryMetrics.inProgress}
          />

          {/* Search, Filter & Sort Bar */}
          <ComplaintFilters
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            onStatusChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            priorityFilter={priorityFilter}
            onPriorityChange={(val) => {
              setPriorityFilter(val);
              setCurrentPage(1);
            }}
            categoryFilter={categoryFilter}
            onCategoryChange={(val) => {
              setCategoryFilter(val);
              setCurrentPage(1);
            }}
            dateFilter={dateFilter}
            onDateChange={(val) => {
              setDateFilter(val);
              setCurrentPage(1);
            }}
            sortBy={sortBy}
            onSortChange={(val) => {
              setSortBy(val);
              setCurrentPage(1);
            }}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Complaints Table & Card List Area */}
          {loading ? (
            <TableSkeleton rows={6} cols={6} />
          ) : error ? (
            <ApiErrorState
              error={error}
              message="Unable to load campus complaints."
              onRetry={fetchComplaints}
            />
          ) : paginatedComplaints.length === 0 ? (
            <ComplaintEmptyState
              isFiltered={activeFilterCount > 0}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <div className="space-y-4">
              {/* Desktop Table View (>= 768px) */}
              <ComplaintTable
                complaints={paginatedComplaints}
                onCopySuccess={handleCopySuccess}
                onViewResolution={(complaint) => setResolutionModalComplaint(complaint)}
              />

              {/* Mobile Card View (< 768px) */}
              <div className="md:hidden space-y-3">
                {paginatedComplaints.map((item) => (
                  <ComplaintCard
                    key={item.id}
                    complaint={item}
                    onCopySuccess={handleCopySuccess}
                    onViewResolution={(complaint) => setResolutionModalComplaint(complaint)}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              <ComplaintPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalFiltered}
                pageSize={ITEMS_PER_PAGE}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
              />
            </div>
          )}

          {/* Resolution Details Modal */}
          {resolutionModalComplaint && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
              <div className="max-w-md w-full bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDE6E2] dark:border-[#1C3A42]">
                  <div className="flex items-center gap-2 text-[#087F5B] dark:text-[#16B978]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm text-[#0B1736] dark:text-[#F5F7F5]">Resolution Details</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResolutionModalComplaint(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-[#607080] dark:text-[#A8B5B1]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                    <span className="text-[#607080] dark:text-[#A8B5B1]">Ticket ID:</span>
                    <span className="font-mono font-bold text-[#087F5B] dark:text-[#16B978]">{resolutionModalComplaint.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                    <span className="text-[#607080] dark:text-[#A8B5B1]">Assigned Unit:</span>
                    <span className="font-semibold text-[#0B1736] dark:text-[#F5F7F5]">{resolutionModalComplaint.department || 'Maintenance'}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-[#607080] dark:text-[#A8B5B1] block mb-1.5 font-medium">Resolution Summary:</span>
                    <p className="p-3.5 rounded-xl bg-[#F7F9F8] dark:bg-[#10242B] text-[#0B1736] dark:text-[#F5F7F5] border border-[#DDE6E2] dark:border-[#1C3A42] leading-relaxed">
                      {resolutionModalComplaint.resolutionNote || 'Technician completed repair and certified equipment functionality.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setResolutionModalComplaint(null)}
                  className="w-full py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#065F44] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Floating Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-white dark:bg-[#0B1B22] border border-[#DDE6E2] dark:border-[#1C3A42] text-[#0B1736] dark:text-[#F5F7F5] text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-fadeIn">
              <Check className="w-4 h-4 text-[#087F5B] dark:text-[#16B978]" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Minimal Footer */}
          <div className="pt-8 pb-4 text-center text-xs text-[#607080] dark:text-[#A8B5B1] border-t border-[#DDE6E2] dark:border-[#1C3A42] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>&copy; {new Date().getFullYear()} CGC University Mohali — Smart Campus Complaint & Analytics</span>
            <span className="text-[#087F5B] dark:text-[#16B978] font-semibold">Report. Track. Resolve. Improve.</span>
          </div>

        </main>

      </div>

    </div>
  );
}
