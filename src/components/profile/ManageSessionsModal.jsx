import React from 'react';
import { X, Smartphone, Laptop, CheckCircle2, LogOut, Shield } from 'lucide-react';

export default function ManageSessionsModal({
  isOpen,
  onClose,
  sessions = [],
  onTerminateOther,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 relative animate-scaleUp text-[#10213A] dark:text-[#F5F7F5]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E3] dark:border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                Active Login Sessions
              </h3>
              <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                Authorized devices currently signed into your student account
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

        {/* Sessions List */}
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-2xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 text-[#078A5A] dark:text-[#00B87A]">
                  {session.device.includes('iPhone') ? (
                    <Smartphone className="w-4 h-4" />
                  ) : (
                    <Laptop className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#10213A] dark:text-[#F5F7F5] truncate">
                      {session.device}
                    </span>
                    {session.current && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] text-[10px] font-bold border border-emerald-200 dark:border-emerald-500/30">
                        This Device
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#687A91] dark:text-[#91A7A5] flex items-center gap-2 mt-0.5">
                    <span>{session.location}</span>
                    <span>•</span>
                    <span className="font-mono">{session.ip}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-[#687A91] dark:text-[#91A7A5]">
                  {session.lastActive}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#DCE7E3] dark:border-white/10">
          <button
            type="button"
            onClick={onTerminateOther}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Other Devices</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
