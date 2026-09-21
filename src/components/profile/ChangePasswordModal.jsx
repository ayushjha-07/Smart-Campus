import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

export default function ChangePasswordModal({ isOpen, onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Calculate password strength
  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, text: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score <= 2) return { score: 2, text: 'Moderate', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, text: 'Good', color: 'bg-emerald-500' };
    return { score: 4, text: 'Strong', color: 'bg-[#078A5A] dark:bg-[#00B87A]' };
  };

  const strength = getStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess && onSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 relative animate-scaleUp text-[#10213A] dark:text-[#F5F7F5]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E3] dark:border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                Change Password
              </h3>
              <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                Update your account password securely
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#687A91] dark:text-[#91A7A5]"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#687A91] dark:text-[#91A7A5]"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength Meter */}
            {newPassword && (
              <div className="pt-1 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#687A91] dark:text-[#91A7A5]">Password strength</span>
                  <span className="font-bold">{strength.text}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-all ${
                        step <= strength.score
                          ? strength.color
                          : 'bg-slate-200 dark:bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#687A91] dark:text-[#91A7A5]"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DCE7E3] dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
