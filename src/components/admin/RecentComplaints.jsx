import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  Eye,
  Building2,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  X
} from 'lucide-react';
import {
  CAMPUS_DEPARTMENTS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS
} from '../../data/adminMockData';

const priorityBadges = {
  LOW: { bg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481', border: '#71844A' },
  MEDIUM: { bg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E', border: '#D4A84F' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.15)', text: '#FCA5A5', border: '#EF4444' },
};

const statusBadges = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Submitted': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function RecentComplaints({
  complaints,
  onViewDetails,
  onAssignDept,
  onChangePriority,
  onChangeStatus,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter & Search logic
  const filteredComplaints = complaints
    .filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.student.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchPriority =
        priorityFilter === 'ALL' || item.priority.toUpperCase() === priorityFilter;
      const matchDept = deptFilter === 'ALL' || item.department === deptFilter;

      return matchSearch && matchStatus && matchPriority && matchDept;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (sortBy === 'priority') {
        const pOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      return 0;
    });

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setDeptFilter('ALL');
  };

  const hasActiveFilters =
    search || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || deptFilter !== 'ALL';

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-card-elevated overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-[#1A2E3B] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
                Recent Complaints
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#07121A] text-[#D4A84F] border border-[#1A2E3B]">
                {filteredComplaints.length} Records
              </span>
            </div>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Live incoming and triaged university issues
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/complaints"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#315C3A]/20 hover:bg-[#315C3A]/40 text-[#D4A84F] border border-[#315C3A]/60 text-xs font-semibold transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-[#9FB1BC] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by student, title, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
              aria-label="Filter complaints by status"
            >
              <option value="ALL">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
              aria-label="Filter complaints by priority"
            >
              <option value="ALL">All Priorities</option>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer max-w-[140px]"
              aria-label="Filter complaints by department"
            >
              <option value="ALL">All Departments</option>
              {CAMPUS_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
              aria-label="Sort complaints"
            >
              <option value="newest">Newest First</option>
              <option value="priority">Highest Priority</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="p-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#D4A84F] flex items-center gap-1 text-[11px] font-medium"
              title="Reset filters"
            >
              <X className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View (hidden on small devices) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#1A2E3B] bg-[#07121A]/80 text-[#9FB1BC] uppercase font-semibold text-[10px] tracking-wider">
              <th className="py-3 px-4">Complaint ID</th>
              <th className="py-3 px-4">Complaint</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-3 text-center">Priority</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3">Submitted</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2E3B]/70">
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#9FB1BC]">
                  No complaints found matching the current search & filters.
                </td>
              </tr>
            ) : (
              filteredComplaints.map((item) => {
                const prio = priorityBadges[item.priority] || priorityBadges.MEDIUM;
                const stat = statusBadges[item.status] || statusBadges.Pending;
                const isMenuOpen = activeMenuId === item.id;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#13242E]/50 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#D4A84F] whitespace-nowrap">
                      {item.id}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-[#F5F5F0] truncate group-hover:text-[#D4A84F] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#9FB1BC] truncate mt-0.5">
                        {item.location || 'General Campus'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-[#F5F5F0]">{item.student}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#07121A] text-[#9FB1BC] border border-[#1A2E3B]">
                        {item.department}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
                        style={{
                          backgroundColor: prio.bg,
                          color: prio.text,
                          border: `1px solid ${prio.border}40`,
                        }}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{
                          backgroundColor: stat.bg,
                          color: stat.text,
                          border: `1px solid ${stat.border}40`,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-[#9FB1BC] text-[11px] whitespace-nowrap">
                      {item.submitted}
                    </td>

                    <td className="py-3.5 px-3 text-right relative whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(isMenuOpen ? null : item.id);
                        }}
                        className="p-1.5 rounded-lg text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute right-3 mt-1 w-44 bg-[#07121A] border border-[#1A2E3B] rounded-lg shadow-2xl py-1 z-50 text-xs text-left animate-in fade-in duration-100"
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewDetails(item);
                            }}
                            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#71844A]" />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onAssignDept(item);
                            }}
                            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                          >
                            <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
                            Assign Department
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onChangePriority(item);
                            }}
                            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            Change Priority
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onChangeStatus(item);
                            }}
                            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                            Update Status
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (renders on screens < 768px to prevent horizontal page scrolling) */}
      <div className="block md:hidden divide-y divide-[#1A2E3B] p-3 space-y-3">
        {filteredComplaints.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#9FB1BC]">
            No complaints found.
          </div>
        ) : (
          filteredComplaints.map((item) => {
            const prio = priorityBadges[item.priority] || priorityBadges.MEDIUM;
            const stat = statusBadges[item.status] || statusBadges.Pending;

            return (
              <div
                key={item.id}
                className="pt-3 pb-1 space-y-2 bg-[#07121A]/60 p-3 rounded-lg border border-[#1A2E3B]/70 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#D4A84F]">{item.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: prio.bg,
                        color: prio.text,
                        border: `1px solid ${prio.border}40`,
                      }}
                    >
                      {item.priority}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                      style={{
                        backgroundColor: stat.bg,
                        color: stat.text,
                        border: `1px solid ${stat.border}40`,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#F5F5F0] text-xs leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-[#9FB1BC] mt-0.5 flex items-center justify-between">
                    <span>By: {item.student}</span>
                    <span>{item.submitted}</span>
                  </div>
                  <div className="text-[11px] text-[#71844A] mt-0.5">
                    Dept: <span className="text-[#F5F5F0]">{item.department}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A2E3B] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="flex-1 py-1.5 rounded bg-[#13242E] text-[#F5F5F0] text-center font-medium hover:bg-[#1A2E3B] transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onAssignDept(item)}
                    className="flex-1 py-1.5 rounded bg-[#13242E] text-[#D4A84F] text-center font-medium hover:bg-[#1A2E3B] transition-colors"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => onChangeStatus(item)}
                    className="flex-1 py-1.5 rounded bg-[#315C3A]/30 text-[#A7C481] text-center font-medium hover:bg-[#315C3A]/50 transition-colors"
                  >
                    Status
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
