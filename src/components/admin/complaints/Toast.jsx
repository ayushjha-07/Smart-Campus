import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 max-w-md ${
        isSuccess
          ? 'bg-white dark:bg-[#0C1518] border-[#008F63] dark:border-[#00A875] text-[#071A2B] dark:text-[#F5F5F0]'
          : isError
          ? 'bg-white dark:bg-[#0C1518] border-red-500 text-[#071A2B] dark:text-[#F5F5F0]'
          : 'bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0]'
      }`}>
        <div className={`p-1.5 rounded-lg shrink-0 ${
          isSuccess
            ? 'bg-[#008F63]/15 text-[#008F63] dark:text-[#00A875]'
            : isError
            ? 'bg-red-500/15 text-red-500'
            : 'bg-blue-500/15 text-blue-500'
        }`}>
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : isError ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <Info className="w-4 h-4" />
          )}
        </div>

        <p className="text-xs font-bold leading-snug">
          {toast.message}
        </p>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] transition-colors ml-auto"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
