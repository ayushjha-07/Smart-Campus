import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function GlobalToast() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0D1B22] border border-[#315C3A] text-[#F5F5F0] shadow-2xl text-xs animate-in slide-in-from-bottom-5 duration-200"
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
            {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
            {isError && <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />}
            {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-[#D4A84F] shrink-0" />}

            <span className="flex-1 font-medium">{toast.message}</span>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#9FB1BC] hover:text-[#F5F5F0] rounded"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
