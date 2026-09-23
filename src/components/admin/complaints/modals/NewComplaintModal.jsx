import React, { useState } from 'react';
import { X, PlusCircle, Check } from 'lucide-react';
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_DEPARTMENTS,
  COMPLAINT_PRIORITIES
} from '../../../../data/adminComplaintsData';

export default function NewComplaintModal({ isOpen, onClose, onCreateComplaint }) {
  const [title, setTitle] = useState('');
  const [student, setStudent] = useState('');
  const [studentId, setStudentId] = useState('');
  const [category, setCategory] = useState(COMPLAINT_CATEGORIES[0]);
  const [department, setDepartment] = useState(COMPLAINT_DEPARTMENTS[1]);
  const [priority, setPriority] = useState('Medium');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !student.trim()) return;

    const newId = `SC-2026-${Math.floor(1850 + Math.random() * 800)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} Sep 2026`;
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTicket = {
      id: newId,
      title: title.trim(),
      student: student.trim(),
      studentId: studentId.trim() || `SC-STU-2026-${Math.floor(100 + Math.random() * 800)}`,
      category,
      department,
      priority,
      status: 'Pending',
      submittedAt: `${formattedDate}, ${formattedTime}`,
      submittedDate: formattedDate,
      submittedTimestamp: Date.now(),
      assignedTo: 'Unassigned',
      location: location.trim() || 'Campus Complex',
      description: description.trim() || title.trim(),
      attachments: [],
      aiAnalysis: {
        category,
        priority,
        confidence: '92%',
        keywords: [category.toLowerCase(), 'administrative', 'dispatch'],
        suggestedDepartment: department,
        label: 'Demo AI Analysis'
      },
      timeline: [
        { time: `${formattedDate} — ${formattedTime}`, title: 'Submitted', desc: `Complaint lodged via Admin console by ${student.trim()}.` },
        { time: `${formattedDate} — ${formattedTime}`, title: 'Pending', desc: 'Queued for departmental triage.' }
      ],
      internalNotes: []
    };

    onCreateComplaint(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E3] dark:border-[#243338]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                Create Administrative Ticket
              </h3>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
                Log a new complaint directly from the central control center
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Complaint Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Projector lamp failure in Block B..."
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                placeholder="e.g. Prachi Priya"
                className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 2024CSB1098"
                className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] rounded-xl px-2.5 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none cursor-pointer"
              >
                {COMPLAINT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] rounded-xl px-2.5 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none cursor-pointer"
              >
                {COMPLAINT_DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] rounded-xl px-2.5 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none cursor-pointer"
              >
                {COMPLAINT_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Campus Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Block 3, 2nd Floor, Room 204"
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Detailed Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact observations and affected students..."
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl p-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#DDE8E3] dark:border-[#243338] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
