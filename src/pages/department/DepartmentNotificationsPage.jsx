import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  AlertTriangle, 
  CheckCheck, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  ExternalLink,
  ShieldAlert,
  Info,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DepartmentSidebar from '../../components/department/DepartmentSidebar';
import DepartmentHeader from '../../components/department/DepartmentHeader';
import { useNotifications } from '../../context/NotificationContext';
import notificationApi from '../../services/notificationApi';
import { formatTimeAgo } from '../../utils/date';

export default function DepartmentNotificationsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    unreadCount, 
    markAsRead, 
    markAsUnread, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, unread, assignments, urgent
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadDepartmentNotifications = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (activeTab === 'unread') filters.is_read = false;
      if (activeTab === 'assignments') filters.type = 'COMPLAINT_ASSIGNED';
      if (activeTab === 'urgent') filters.priority = 'HIGH';

      if (searchQuery.trim()) filters.search = searchQuery.trim();

      const res = await notificationApi.getNotifications(page, 15, filters);
      if (res && Array.isArray(res.items)) {
        setItems(res.items);
        setTotalPages(res.total_pages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (err) {
      console.error('Failed to load department notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartmentNotifications();
  }, [page, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadDepartmentNotifications();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> CRITICAL
          </span>
        );
      case 'WARNING':
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> HIGH
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
      <DepartmentSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <DepartmentHeader
          title="Department Notifications & Assignments"
          subtitle="Work order assignments, priority escalations & campus remarks"
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fadeIn">
          
          {/* Header Controls */}
          <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Alerts' },
                { id: 'unread', label: `Unread (${unreadCount})` },
                { id: 'assignments', label: 'Ticket Assignments' },
                { id: 'urgent', label: 'Urgent Tickets' },
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

            {/* Search & Mark All */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-[#9FB1BC] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter ticket alerts..."
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

          {/* List Card */}
          <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-xs text-[#9FB1BC]">
                <div className="w-6 h-6 border-2 border-[#D4A84F] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading department feed...
              </div>
            ) : items.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="w-10 h-10 text-[#9FB1BC]/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#F5F5F0]">No notifications</p>
                <p className="text-xs text-[#9FB1BC] mt-1">Your department queue has no active alerts under this filter.</p>
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

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {notif.complaint_id && (
                        <Link
                          to={`/department/complaints`}
                          className="px-2.5 py-1 rounded bg-[#13242E] hover:bg-[#1A2E3B] text-[11px] font-semibold text-[#D4A84F] border border-[#1A2E3B] flex items-center gap-1 transition-colors"
                        >
                          <span>View Ticket</span>
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
      </div>
    </div>
  );
}
