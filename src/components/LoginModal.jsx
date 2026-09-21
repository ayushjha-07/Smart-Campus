import React, { useState } from 'react';
import { X, Lock, GraduationCap, Building2, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setStatusMsg(`Portal authentication for ${role === 'student' ? 'Student' : 'Administrator'} role is configured for upcoming backend integration.`);
  };

  const handleReset = () => {
    setStatusMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#315C3A]/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#07121A] text-[#9FB1BC] hover:text-[#F5F5F0] border border-white/10 hover:border-white/20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#07121A] border border-[#D4A84F]/50 flex items-center justify-center text-[#D4A84F]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F5F5F0]">
              Campus Portal Login
            </h3>
            <p className="text-xs text-[#9FB1BC]">
              Unified access for students and administrators
            </p>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#07121A] rounded-xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              role === 'student'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              role === 'admin'
                ? 'bg-[#D4A84F] text-[#07121A] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Administrator</span>
          </button>
        </div>

        {statusMsg ? (
          <div className="p-4 rounded-xl bg-[#07121A] border border-[#D4A84F]/40 text-center space-y-3">
            <p className="text-xs text-[#D4A84F] font-medium leading-relaxed">
              {statusMsg}
            </p>
            <p className="text-[11px] text-[#9FB1BC]">
              Landing page demo only — backend auth is reserved for Phase 2.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#315C3A] text-[#F5F5F0]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9FB1BC] mb-1.5">
                {role === 'student' ? 'Student ID / Roll No' : 'Staff / Admin Email'}
              </label>
              <input
                type={role === 'student' ? 'text' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder={role === 'student' ? 'e.g. 2024CSB1042' : 'admin@smartcampus.edu'}
                className="w-full bg-[#07121A] border border-white/15 focus:border-[#D4A84F] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9FB1BC] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#07121A] border border-white/15 focus:border-[#D4A84F] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold text-[#F5F5F0] bg-gradient-to-r from-[#315C3A] to-[#3D7349] hover:from-[#3D7349] hover:to-[#71844A] border border-[#71844A]/50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#315C3A]/25"
              >
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
