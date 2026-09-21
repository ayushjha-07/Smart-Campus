import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Eye,
  MapPin,
  Clock,
  X
} from 'lucide-react';

const priorityBadges = {
  LOW: { bg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481', border: '#71844A' },
  MEDIUM: { bg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E', border: '#D4A84F' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.18)', text: '#FCA5A5', border: '#EF4444' },
};

const statusBadges = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'Assigned': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: '#06B6D4' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
  'Resolved': { bg: 'rgba(49, 92, 58, 0.25)', text: '#A7C481', border: '#315C3A' },
};

export default function AssignedComplaintsTable({
  complaints = [],
  onViewComplaint
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredItems = useMemo(() => {
    return complaints.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        (c.location && c.location.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.status && c.status.toLowerCase().includes(q));

      const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;
      const matchCategory = categoryFilter === 'ALL' || c.category === categoryFilter;

      return matchSearch && matchStatus && matchPriority && matchCategory;
    });
  }, [complaints, search, statusFilter, priorityFilter, categoryFilter]);

  const hasActiveFilters = search || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || categoryFilter !== 'ALL';

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setCategoryFilter('ALL');
  };

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-card-elevated overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-[#1A2E3B] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
                Recently Assigned
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#07121A] text-[#D4A84F] border border-[#1A2E3B]">
                {filteredItems.length} Tickets
              </span>
            </div>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Active workload assigned to Maintenance division
            </p>
          </div>

          <Link
            to="/department/complaints"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#315C3A]/20 hover:bg-[#315C3A]/40 text-[#D4A84F] border border-[#315C3A]/60 text-xs font-semibold transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-[#9FB1BC] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID, title, location, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
            aria-label="Filter by status"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
            aria-label="Filter by priority"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] rounded-lg px-2.5 py-1.5 text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] cursor-pointer"
            aria-label="Filter by category"
          >
            <option value="ALL">All Categories</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="p-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#D4A84F] flex items-center gap-1 text-[11px] font-medium transition-colors"
            >
              <X className="w-3 h-3" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#1A2E3B] bg-[#07121A]/80 text-[#9FB1BC] uppercase font-semibold text-[10px] tracking-wider">
              <th className="py-3 px-4">Complaint ID</th>
              <th className="py-3 px-4">Complaint</th>
              <th className="py-3 px-3 text-center">Priority</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-3">Assigned</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2E3B]/70">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#9FB1BC]">
                  No assigned complaints match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const prio = priorityBadges[item.priority] || priorityBadges.MEDIUM;
                const stat = statusBadges[item.status] || statusBadges.Pending;

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
                        Category: {item.category}
                      </div>
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

                    <td className="py-3.5 px-4 whitespace-nowrap text-[#9FB1BC]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#71844A] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-[#9FB1BC] text-[11px] whitespace-nowrap">
                      {item.assignedAt || 'Recent'}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onViewComplaint(item)}
                        className="px-3 py-1 rounded bg-[#13242E] hover:bg-[#315C3A] text-xs font-medium text-[#F5F5F0] border border-[#1A2E3B] hover:border-[#315C3A] inline-flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4A84F]" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden divide-y divide-[#1A2E3B] p-3 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#9FB1BC]">
            No assigned complaints found.
          </div>
        ) : (
          filteredItems.map((item) => {
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
                  <h4 className="font-bold text-[#F5F5F0] text-xs">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-[#9FB1BC] mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#71844A]" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9FB1BC]" />
                      {item.assignedAt}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A2E3B] flex items-center justify-end">
                  <button
                    onClick={() => onViewComplaint(item)}
                    className="w-full py-1.5 rounded bg-[#315C3A]/25 text-[#D4A84F] hover:bg-[#315C3A]/40 font-semibold border border-[#315C3A]/60 text-center transition-colors"
                  >
                    View Complaint
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
