import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  AlertTriangle, 
  Megaphone, 
  CheckCheck, 
  Trash2, 
  Search, 
  Filter, 
  Send, 
  X, 
  ShieldAlert, 
  Info, 
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import { useNotifications } from '../../context/NotificationContext';
import notificationApi from '../../services/notificationApi';
import { formatTimeAgo } from '../../utils/date';

export default function AdminNotifications() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAsUnread, 
    markAllAsRead, 
    deleteNotification,
    refreshUnreadCount
  } = useNotifications();

  // Page state & filtering
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, unread, critical, announcements
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Announcement Modal State
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    priority: 'INFO',
    target_role: ''
  });
  const [submittingAnnouncement, setSubmittingAnnouncement] = useState(false);

  // Fetch paginated notifications with filters
  const loadNotifications = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (activeTab === 'unread') filters.is_read = false;
      if (activeTab === 'critical') filters.priority = 'CRITICAL';
      if (activeTab === 'announcements') filters.type = 'ANNOUNCEMENT';

      if (priorityFilter !== 'ALL') filters.priority = priorityFilter;
      if (searchQuery.trim()) filters.search = searchQuery.trim();

      const res = await notificationApi.getNotifications(page, 15, filters);
      if (res && Array.isArray(res.items)) {
        setItems(res.items);
        setTotalPages(res.total_pages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (err) {
      console.error('Failed to load admin notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [page, activeTab, priorityFilter]);

  // Handle Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadNotifications();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Broadcast Announcement
  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.message) return;

    setSubmittingAnnouncement(true);
    try {
      await notificationApi.createAnnouncement({
        title: announcementForm.title,
        message: announcementForm.message,
        priority: announcementForm.priority,
        target_role: announcementForm.target_role || null
      });
      setIsAnnouncementOpen(false);
      setAnnouncementForm({ title: '', message: '', priority: 'INFO', target_role: '' });
      loadNotifications();
      refreshUnreadCount();
    } catch (err) {
      console.error('Failed to broadcast announcement:', err);
    } finally {
      setSubmittingAnnouncement(false);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> WARNING
          </span>
        );
      case 'SUCCESS':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> SUCCESS
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1">
            <Info className="w-3 h-3" /> INFO
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07121A] text-[#F5F5F0] flex flex-col font-sans">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <AdminHeader
          title="Notification Center & Announcements"
          subtitle="Real-time institutional alert center and broadcast engine"
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fadeIn">
          
          {/* Top Stat Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-[#9FB1BC] uppercase font-bold tracking-wider">Unread Alerts</p>
                <p className="text-2xl font-black text-[#D4A84F] mt-1">{unreadCount}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
                <Bell className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-[#9FB1BC] uppercase font-bold tracking-wider">Total Feed Count</p>
                <p className="text-2xl font-black text-[#F5F5F0] mt-1">{totalCount}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#13242E] border border-white/5 text-[#9FB1BC]">
                <Info className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-[#9FB1BC] uppercase font-bold tracking-wider">Institutional Action</p>
                <button
                  onClick={() => setIsAnnouncementOpen(true)}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#71844A] text-xs font-bold text-[#F5F5F0] hover:brightness-110 transition-all shadow-sm"
                >
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>Broadcast Alert</span>
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-[#D4A84F]/10 border border-[#D4A84F]/30 text-[#D4A84F]">
                <Send className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Controls & Filter Bar */}
          <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Alerts' },
                { id: 'unread', label: `Unread (${unreadCount})` },
                { id: 'critical', label: 'Critical Hazards' },
                { id: 'announcements', label: 'Announcements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#315C3A] text-[#F5F5F0]'
                      : 'text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Actions: Search & Mark All Read */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg text-[#F5F5F0] outline-none"
                />
              </div>

              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] border border-[#1A2E3B] text-xs font-semibold text-[#D4A84F] inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-xs text-[#9FB1BC]">
                <div className="w-6 h-6 border-2 border-[#D4A84F] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading alerts stream...
              </div>
            ) : items.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="w-10 h-10 text-[#9FB1BC]/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#F5F5F0]">No notifications found</p>
                <p className="text-xs text-[#9FB1BC] mt-1">There are no notifications matching your current filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1A2E3B]">
                {items.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      !notif.is_read ? 'bg-[#07121A]/50 border-l-2 border-l-[#D4A84F]' : 'hover:bg-[#13242E]/50'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getPriorityBadge(notif.priority)}
                        <span className="text-xs font-bold text-[#F5F5F0]">{notif.title}</span>
                        {!notif.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#D4A84F]" />
                        )}
                        <span className="text-[10px] text-[#9FB1BC] flex items-center gap-1 ml-auto sm:ml-0">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(notif.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-[#A8B3B0] leading-relaxed pr-4">
                        {notif.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {notif.complaint_id && (
                        <Link
                          to="/admin/complaints"
                          className="px-2.5 py-1 rounded bg-[#13242E] hover:bg-[#1A2E3B] text-[11px] font-semibold text-[#D4A84F] border border-[#1A2E3B] flex items-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}

                      <button
                        onClick={() => notif.is_read ? markAsUnread(notif.id) : markAsRead(notif.id)}
                        className="p-1.5 rounded hover:bg-[#13242E] text-[#9FB1BC] hover:text-[#F5F5F0] transition-colors"
                        title={notif.is_read ? 'Mark unread' : 'Mark read'}
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-[#9FB1BC] hover:text-red-400 transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-3 border-t border-[#1A2E3B] flex items-center justify-between text-xs text-[#9FB1BC]">
                <span>Page {page} of {totalPages}</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded hover:bg-[#13242E] disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded hover:bg-[#13242E] disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        <AdminFooter />
      </div>

      {/* Broadcast Announcement Modal */}
      {isAnnouncementOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A2E3B]">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#D4A84F]" />
                <h3 className="font-bold text-base text-[#F5F5F0]">Broadcast Campus Announcement</h3>
              </div>
              <button
                onClick={() => setIsAnnouncementOpen(false)}
                className="p-1 text-[#9FB1BC] hover:text-[#F5F5F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A8B3B0] font-semibold mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled Wi-Fi Network Maintenance"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2 text-[#F5F5F0] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#A8B3B0] font-semibold mb-1">Message Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Details regarding the alert or announcement..."
                  value={announcementForm.message}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2 text-[#F5F5F0] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A8B3B0] font-semibold mb-1">Priority Level</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                    className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2 text-[#F5F5F0] outline-none"
                  >
                    <option value="INFO">INFO (General)</option>
                    <option value="WARNING">WARNING (Attention Required)</option>
                    <option value="CRITICAL">CRITICAL (Campus Hazard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8B3B0] font-semibold mb-1">Target Audience</label>
                  <select
                    value={announcementForm.target_role}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, target_role: e.target.value })}
                    className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2 text-[#F5F5F0] outline-none"
                  >
                    <option value="">All Users (Campus-wide)</option>
                    <option value="STUDENT">Students Only</option>
                    <option value="DEPARTMENT_STAFF">Department Staff Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1A2E3B]">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#13242E] text-[#9FB1BC] hover:text-[#F5F5F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAnnouncement}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#71844A] text-[#F5F5F0] font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingAnnouncement ? 'Broadcasting...' : 'Broadcast Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
