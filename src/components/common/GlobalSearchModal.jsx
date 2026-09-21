import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  FileText,
  Building2,
  Users,
  Compass,
  ArrowRight,
  ClipboardList,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { INITIAL_DEPARTMENTS, INITIAL_USERS } from '../../data/userManagementMockData';

export default function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, complaints } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Route shortcuts
  const QUICK_LINKS = [
    { title: 'Student Dashboard', path: '/student/dashboard', role: 'Student', icon: Compass },
    { title: 'Submit a Complaint', path: '/student/complaints/new', role: 'Student', icon: FileText },
    { title: 'My Complaints', path: '/student/complaints', role: 'Student', icon: ClipboardList },
    { title: 'Admin Dashboard', path: '/admin/dashboard', role: 'Admin', icon: Compass },
    { title: 'Complaint Management', path: '/admin/complaints', role: 'Admin', icon: ClipboardList },
    { title: 'Analytics & Insights', path: '/admin/analytics', role: 'Admin', icon: Sparkles },
    { title: 'User & Department Management', path: '/admin/users', role: 'Admin', icon: Users },
    { title: 'Maintenance Department Dashboard', path: '/department/dashboard', role: 'Department', icon: Building2 },
    { title: 'Student Profile', path: '/student/profile', role: 'Student', icon: Users },
    { title: 'Notification Center', path: '/student/notifications', role: 'All', icon: FileText }
  ];

  const matchedLinks = QUICK_LINKS.filter((l) =>
    l.title.toLowerCase().includes(q) || l.path.toLowerCase().includes(q) || l.role.toLowerCase().includes(q)
  );

  const matchedComplaints = complaints.filter((c) =>
    c.id.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    (c.department && c.department.toLowerCase().includes(q)) ||
    (c.student && c.student.toLowerCase().includes(q))
  ).slice(0, 5);

  const matchedDepartments = INITIAL_DEPARTMENTS.filter((d) =>
    d.name.toLowerCase().includes(q) || (d.code && d.code.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchedUsers = INITIAL_USERS.filter((u) =>
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.code && u.code.toLowerCase().includes(q))
  ).slice(0, 4);

  const handleClose = () => {
    setQuery('');
    closeSearch();
  };

  const handleSelectRoute = (path) => {
    handleClose();
    navigate(path);
  };

  const handleSelectComplaint = (id) => {
    handleClose();
    navigate(`/student/complaints/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <Search className="w-5 h-5 text-[#D4A84F] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search complaints, students, staff, departments, or navigate anywhere..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#F5F5F0] placeholder-[#9FB1BC]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#9FB1BC] hover:text-[#F5F5F0] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#07121A] text-[#9FB1BC] border border-[#1A2E3B]">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
          {/* Complaints Section */}
          {matchedComplaints.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71844A] flex items-center justify-between">
                <span>Complaints ({matchedComplaints.length})</span>
                <span className="text-[10px] text-[#9FB1BC] font-normal">Click to open tracker</span>
              </div>
              <div className="space-y-1">
                {matchedComplaints.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectComplaint(c.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#13242E] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-bold text-[#D4A84F] text-xs shrink-0">
                        {c.id}
                      </span>
                      <span className="text-[#F5F5F0] truncate font-medium group-hover:text-[#D4A84F] transition-colors">
                        {c.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] text-[#9FB1BC]">{c.department}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          c.status === 'Resolved'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : c.status === 'In Progress'
                            ? 'bg-blue-500/15 text-blue-300'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Navigation Pages */}
          {matchedLinks.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                Navigation Shortcuts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {matchedLinks.slice(0, 6).map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleSelectRoute(link.path)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D1B22] hover:bg-[#13242E] border border-[#1A2E3B]/60 hover:border-[#315C3A] transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-[#D4A84F] shrink-0" />
                        <span className="text-[#F5F5F0] truncate group-hover:text-[#D4A84F] font-medium">
                          {link.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9FB1BC] group-hover:text-[#D4A84F] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Departments */}
          {matchedDepartments.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                Departments
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {matchedDepartments.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectRoute('/admin/departments')}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#0D1B22] hover:bg-[#13242E] border border-[#1A2E3B]/60 text-left"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#315C3A]" />
                      <span className="text-[#F5F5F0] truncate">{d.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4A84F] shrink-0">
                      {d.code || d.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {matchedUsers.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                Users & Directory
              </div>
              <div className="space-y-1">
                {matchedUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSelectRoute('/admin/users')}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#13242E] text-left"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Users className="w-3.5 h-3.5 text-[#71844A]" />
                      <span className="text-[#F5F5F0] font-medium truncate">{u.name}</span>
                      <span className="text-[11px] text-[#9FB1BC] font-mono">({u.code || u.id})</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#07121A] text-[#D4A84F] border border-[#1A2E3B] shrink-0">
                      {u.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {matchedComplaints.length === 0 &&
            matchedLinks.length === 0 &&
            matchedDepartments.length === 0 &&
            matchedUsers.length === 0 && (
              <div className="py-12 text-center text-[#9FB1BC]">
                <Search className="w-8 h-8 text-[#D4A84F] mx-auto mb-2 opacity-50" />
                <p className="font-semibold text-[#F5F5F0]">No matching results found</p>
                <p className="text-[11px] mt-1">Try searching by ticket ID (e.g. SC-2026-1848), keyword, or student name.</p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-[#1A2E3B] bg-[#0D1B22] flex items-center justify-between text-[11px] text-[#9FB1BC]">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#07121A] border border-[#1A2E3B] font-mono text-[10px]">
              Ctrl+K
            </kbd>{' '}
            Global Command Palette
          </span>
          <span>Smart Campus v2.0 • Frontend Mock Mode</span>
        </div>
      </div>
    </div>
  );
}
