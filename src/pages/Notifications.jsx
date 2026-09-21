import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCheck, 
  Check, 
  Plus,
  PlusCircle,
  ClipboardList,
  Sliders,
  Megaphone
} from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import NotificationTabs from '../components/notifications/NotificationTabs';
import NotificationFilters from '../components/notifications/NotificationFilters';
import NotificationList from '../components/notifications/NotificationList';
import NotificationSidebar from '../components/notifications/NotificationSidebar';
import NotificationDetailsModal from '../components/notifications/NotificationDetailsModal';
import DeleteNotificationModal from '../components/notifications/DeleteNotificationModal';
import CampusAnnouncements from '../components/notifications/CampusAnnouncements';
import NotificationPreferences from '../components/notifications/NotificationPreferences';
import { 
  loadStoredNotifications, 
  saveStoredNotifications 
} from '../data/mockNotifications';
import { notificationApi } from '../services/notificationApi';
import { mapNotification } from '../utils/mapper';
import { dataSource } from '../services/dataSource';
import { TableSkeleton } from '../components/common/Skeletons';
import campusAssets from '../assets/campusAssets';

export default function Notifications() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  // Main notifications list state
  const [notifications, setNotifications] = useState(() => loadStoredNotifications());
  const [loading, setLoading] = useState(false);

  // Filter and tab states
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Secondary sections visibility toggles
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  // Modals & toast states
  const [selectedNotificationForDetails, setSelectedNotificationForDetails] = useState(null);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchNotifications = async () => {
    if (dataSource.isMockMode()) {
      setNotifications(loadStoredNotifications());
      return;
    }
    setLoading(true);
    try {
      const res = await notificationApi.getNotifications(1, 50);
      if (res && res.items && res.items.length > 0) {
        const mapped = res.items.map(mapNotification);
        setNotifications(mapped);
      } else {
        setNotifications(loadStoredNotifications());
      }
    } catch (err) {
      console.error('Failed to load notifications from API:', err);
      setNotifications(loadStoredNotifications());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Notifications | Smart Campus Complaint & Analytics";
    fetchNotifications();
  }, []);

  // Sync state to localStorage whenever notifications change
  const updateNotifications = (newList) => {
    setNotifications(newList);
    saveStoredNotifications(newList);
  };

  // Toast feedback helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2600);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (statusFilter !== 'All') count++;
    if (categoryFilter !== 'All') count++;
    if (timeFilter !== 'All') count++;
    if (priorityFilter !== 'All') count++;
    return count;
  }, [searchQuery, statusFilter, categoryFilter, timeFilter, priorityFilter]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setTimeFilter('All');
    setPriorityFilter('All');
  };

  // Mark all as read action
  const handleMarkAllAsRead = async () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    updateNotifications(updated);
    if (!dataSource.isMockMode()) {
      try {
        await notificationApi.markAllAsRead();
      } catch (e) {
        console.error('API mark all as read failed:', e);
      }
    }
    showToast('All notifications marked as read.');
  };

  // Toggle read state for single notification
  const handleToggleRead = async (id) => {
    const target = notifications.find((n) => n.id === id);
    if (!target) return;

    const newReadState = !target.read;
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: newReadState } : n
    );
    updateNotifications(updated);

    if (!dataSource.isMockMode() && newReadState) {
      try {
        await notificationApi.markAsRead(id);
      } catch (e) {
        console.error('API mark as read failed:', e);
      }
    }

    showToast(newReadState ? 'Marked as read.' : 'Marked as unread.');
  };

  // Mark single as read
  const handleMarkAsRead = async (id) => {
    const target = notifications.find((n) => n.id === id);
    if (!target || target.read) return;

    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    updateNotifications(updated);
    if (!dataSource.isMockMode()) {
      try {
        await notificationApi.markAsRead(id);
      } catch (e) {
        console.error('API mark as read failed:', e);
      }
    }
  };

  // Delete notification flow
  const handleConfirmDelete = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    updateNotifications(updated);
    setNotificationToDelete(null);
    showToast('Notification deleted.');
  };

  // When clicking an unread item, mark it as read and view details
  const handleItemClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    setSelectedNotificationForDetails(notification);
  };

  // Tab counts for badge display
  const tabCounts = useMemo(() => {
    const all = notifications.length;
    const unread = notifications.filter((n) => !n.read).length;
    const complaints = notifications.filter((n) => n.category === 'Complaint Updates').length;
    const system = notifications.filter((n) => n.category === 'System').length;
    const announcements = notifications.filter((n) => n.category === 'Announcements').length;
    return { all, unread, complaints, system, announcements };
  }, [notifications]);

  // Handle clicking on summary metric card or important filter
  const handleSidebarFilterSelect = (filterId) => {
    if (filterId === 'all') {
      setActiveTab('all');
      setStatusFilter('All');
      setPriorityFilter('All');
    } else if (filterId === 'unread') {
      setActiveTab('unread');
      setStatusFilter('Unread');
    } else if (filterId === 'complaints') {
      setActiveTab('complaints');
      setCategoryFilter('Complaint Updates');
    } else if (filterId === 'announcements') {
      setActiveTab('announcements');
      setCategoryFilter('Announcements');
    } else if (filterId === 'important') {
      setActiveTab('all');
      setPriorityFilter('Important');
      showToast('Showing Important & Critical notifications');
    }
  };

  // Filtered notification list
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Tab filter
      if (activeTab === 'unread' && item.read) return false;
      if (activeTab === 'complaints' && item.category !== 'Complaint Updates') return false;
      if (activeTab === 'system' && item.category !== 'System') return false;
      if (activeTab === 'announcements' && item.category !== 'Announcements') return false;

      // Status filter dropdown
      if (statusFilter === 'Unread' && item.read) return false;
      if (statusFilter === 'Read' && !item.read) return false;

      // Category filter dropdown
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;

      // Priority filter dropdown
      if (priorityFilter === 'Important' && item.priority !== 'Important' && item.priority !== 'Critical') return false;
      if (priorityFilter !== 'All' && priorityFilter !== 'Important' && item.priority !== priorityFilter) return false;

      // Time filter dropdown
      if (timeFilter === 'Today') {
        const isToday = (item.timestamp || '').includes('minute') || (item.timestamp || '').includes('hour') || (item.timestamp || '').includes('Today');
        if (!isToday) return false;
      } else if (timeFilter === 'This Week') {
        const isOld = (item.timestamp || '').includes('month') || (item.timestamp || '').includes('2 weeks');
        if (isOld) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = (item.title || '').toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesId = (item.complaintId || '').toLowerCase().includes(q);
        const matchesDept = (item.department || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesId && !matchesDept) return false;
      }

      return true;
    });
  }, [notifications, activeTab, statusFilter, categoryFilter, priorityFilter, timeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#10233D] dark:text-[#F5F7F5] transition-colors duration-200 flex antialiased selection:bg-[#078A5A] selection:text-white">
      
      {/* Fixed Left Sidebar (280px width) */}
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
          onSearchChange={(val) => {
            setHeaderSearch(val);
            setSearchQuery(val);
          }}
        />

        {/* Scrollable Notifications Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 max-w-[1400px] w-full mx-auto">
          
          {/* ================================================== */}
          {/* HEADER BANNER: Master CGC Aerial Campus Hero Banner */}
          {/* ================================================== */}
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
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 w-full">
              
              {/* Left Details */}
              <div className="space-y-2.5 max-w-xl">
                {/* Top Pill Badge: Smart Campus */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <span>Smart Campus</span>
                  </div>
                  {tabCounts.unread > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-[#D4A84F]/25 text-[#D4A84F] border border-[#D4A84F]/50 shadow-sm backdrop-blur-md">
                      {tabCounts.unread} Unread
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    Notifications
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs leading-relaxed max-w-lg">
                    Stay updated on your complaints, official resolutions, and campus announcements.
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

                  <Link
                    to="/student/complaints"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10213A] bg-white hover:bg-slate-100 border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <ClipboardList className="w-4 h-4 text-[#10213A]" />
                    <span>View My Complaints</span>
                  </Link>
                </div>
              </div>

              {/* Right Side: Script Calligraphy Overlay ("Your Voice / A Better Campus") */}
              <div className="hidden sm:block text-right select-none pr-3 sm:pr-4 shrink-0">
                <p className="font-serif italic text-2xl lg:text-3xl text-white font-medium tracking-tight leading-none drop-shadow-md">
                  Your Voice
                </p>
                <p className="font-serif italic text-2xl lg:text-3xl text-[#10E894] font-bold tracking-tight leading-none mt-1 drop-shadow-md">
                  A Better Campus
                </p>
                {/* Elegant Curved Underline Stroke */}
                <div className="flex justify-end">
                  <svg
                    className="w-32 sm:w-40 h-2.5 sm:h-3 text-[#10E894] mt-1"
                    viewBox="0 0 150 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 8.5C45 2.5 105 2.5 146 6.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* ================================================== */}
          {/* HORIZONTAL CONTROL BAR: Tabs & Top Action Buttons */}
          {/* ================================================== */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: Segmented Tabs */}
            <NotificationTabs
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                if (tab === 'unread') setStatusFilter('Unread');
                else setStatusFilter('All');
                setPriorityFilter('All');
              }}
              counts={tabCounts}
            />

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={tabCounts.unread === 0}
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0B2027] hover:bg-slate-50 dark:hover:bg-[#0D252D] disabled:opacity-40 text-[#10213A] dark:text-[#F5F7F5] border border-[#DCE7E3] dark:border-white/10 transition-colors shadow-2xs cursor-pointer"
              >
                <CheckCheck className="w-4 h-4 text-[#078A5A] dark:text-[#00B87A]" />
                <span>Mark all as read</span>
              </button>

              <Link
                to="/student/complaints/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-[#D8A93E] hover:bg-[#C9972E] text-[#10213A] transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Complaint</span>
              </Link>
            </div>
          </div>

          {/* ================================================== */}
          {/* TWO-COLUMN WORKSPACE: Main Feed + Right Sidebar     */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* Left Column (8 cols on lg: ~67% width) */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 min-w-0">
              {/* Search & Inline Dropdown Filters */}
              <NotificationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                timeFilter={timeFilter}
                onTimeChange={setTimeFilter}
                onClearFilters={handleClearFilters}
                activeFilterCount={activeFilterCount}
              />

              {/* Main Notification Cards Feed */}
              {loading ? (
                <TableSkeleton rows={5} cols={3} />
              ) : (
                <NotificationList
                  notifications={filteredNotifications}
                  isFiltered={activeFilterCount > 0 || activeTab !== 'all'}
                  onClearFilters={handleClearFilters}
                  onItemClick={handleItemClick}
                  onToggleRead={handleToggleRead}
                  onViewDetails={(item) => setSelectedNotificationForDetails(item)}
                  onDeleteRequest={(item) => setNotificationToDelete(item)}
                />
              )}

              {/* Collapsible Utility Panels: Announcements & Notification Settings */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#DCE7E3] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAnnouncements(!showAnnouncements)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30 text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-[#F5F7F5] transition-colors cursor-pointer"
                >
                  <Megaphone className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                  <span>{showAnnouncements ? 'Hide Bulletins' : 'Campus Bulletins & Advisories'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30 text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-[#F5F7F5] transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#D8A93E]" />
                  <span>{showPreferences ? 'Hide Settings' : 'Notification Preferences'}</span>
                </button>
              </div>

              {/* Expandable Campus Bulletins */}
              {showAnnouncements && (
                <div className="animate-fadeIn">
                  <CampusAnnouncements />
                </div>
              )}

              {/* Expandable Notification Preferences */}
              {showPreferences && (
                <div className="animate-fadeIn">
                  <NotificationPreferences
                    onPreferenceSaved={(_key, _val) => {
                      showToast('Notification preferences updated.');
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Analytics & Quick Actions Panel (4 cols on lg: ~33% width) */}
            <div className="lg:col-span-4 min-w-0">
              <NotificationSidebar
                onOpenPreferences={() => {
                  setShowPreferences(true);
                  showToast('Opened Notification Preferences');
                }}
                onOpenAnnouncements={() => {
                  setShowAnnouncements(true);
                  showToast('Opened Campus Bulletins & Advisories');
                }}
              />
            </div>

          </div>

        </main>
      </div>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 text-xs font-semibold text-[#10213A] dark:text-[#F5F7F5] shadow-xl animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Details Modal for System / Announcements / Complaints */}
      <NotificationDetailsModal
        isOpen={Boolean(selectedNotificationForDetails)}
        notification={selectedNotificationForDetails}
        onClose={() => setSelectedNotificationForDetails(null)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteNotificationModal
        isOpen={Boolean(notificationToDelete)}
        notification={notificationToDelete}
        onClose={() => setNotificationToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />

    </div>
  );
}
