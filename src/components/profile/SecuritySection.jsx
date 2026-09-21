import React, { useState } from 'react';
import { 
  Shield, 
  KeyRound, 
  Smartphone, 
  Laptop, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle, 
  LogOut 
} from 'lucide-react';

export default function SecuritySection({
  twoFactorEnabled,
  onToggle2FA,
  activeSessions = [],
  onTerminateOtherSessions,
  onPasswordChangeSuccess,
}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match. Please re-enter.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    if (onPasswordChangeSuccess) onPasswordChangeSuccess();

    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-[#168A5B]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Security & Credentials
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              Password protection, two-factor authentication, and active device sessions
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#168A5B] bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20 font-semibold">
          Protected
        </span>
      </div>

      {/* Two-Factor Authentication Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-[#168A5B] shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
                Two-Factor Authentication (2FA)
              </h4>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  twoFactorEnabled
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-[#168A5B] border border-emerald-200 dark:border-emerald-500/20'
                    : 'bg-slate-100 dark:bg-white/10 text-[#64748B] dark:text-[#A8B3B0] border border-slate-200 dark:border-white/10'
                }`}
              >
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5 leading-relaxed">
              Require a verification code sent to your student mobile number upon sign-in.
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          onClick={onToggle2FA}
          className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
            twoFactorEnabled ? 'bg-[#168A5B]' : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
          }`}
          aria-label="Toggle Two-Factor Authentication"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
              twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#14213D] dark:text-[#F5F5F0]">
            <KeyRound className="w-4 h-4 text-[#168A5B]" />
            <span>Update Account Password</span>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-xs text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] flex items-center gap-1 transition-colors"
          >
            {showPasswords ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Passwords</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Passwords</span>
              </>
            )}
          </button>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs text-[#168A5B] flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#168A5B] shrink-0" />
            <span>Password successfully updated. Saved in local account credentials.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
              Current Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
              New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] block">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              required
              className="w-full bg-[#F8FAFC] dark:bg-[#041118]/60 border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] focus:bg-white dark:focus:bg-[#041118] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D] dark:text-[#F5F5F0] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Password Strength Meter */}
        {newPassword && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#64748B] dark:text-[#A8B3B0]">Password Strength:</span>
              <span className={`font-bold font-mono ${
                strength === 100 ? 'text-[#168A5B]' : strength >= 50 ? 'text-[#D4A84F]' : 'text-rose-600'
              }`}>
                {strength === 100 ? 'Strong Security' : strength >= 50 ? 'Moderate' : 'Weak'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden border border-[#DDE7E2] dark:border-white/10">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  strength === 100 ? 'bg-[#168A5B]' : strength >= 50 ? 'bg-[#D4A84F]' : 'bg-rose-500'
                }`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={!currentPassword || !newPassword || !confirmPassword}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] hover:bg-[#127049] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-xs"
          >
            Update Password
          </button>
        </div>
      </form>

      {/* Active Device Sessions List */}
      <div className="space-y-3 pt-3 border-t border-[#DDE7E2] dark:border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#14213D] dark:text-[#F5F5F0]">
            <Laptop className="w-4 h-4 text-[#168A5B]" />
            <span>Active Login Sessions</span>
          </div>

          <button
            type="button"
            onClick={onTerminateOtherSessions}
            className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors flex items-center gap-1 font-semibold"
          >
            <LogOut className="w-3 h-3" />
            <span>Terminate Other Sessions</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-white/10 flex items-center justify-center text-[#168A5B] shrink-0">
                  {session.device.includes('iPhone') ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#14213D] dark:text-[#F5F5F0]">{session.device}</span>
                    {session.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#168A5B] border border-emerald-200 dark:border-emerald-500/20 text-[9px] font-bold">
                        Current Session
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] font-mono block">
                    {session.location} • IP: {session.ip}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-[#168A5B] font-mono font-medium self-end sm:self-auto">
                {session.lastActive}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
