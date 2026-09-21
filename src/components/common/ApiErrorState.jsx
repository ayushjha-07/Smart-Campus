import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, ShieldAlert, FileQuestion } from 'lucide-react';

/**
 * Branded error state component for displaying API status errors.
 */
export default function ApiErrorState({
  error,
  message,
  onRetry,
  className = ''
}) {
  let title = 'Something went wrong';
  let description = message || 'An unexpected error occurred while communicating with the server.';
  let Icon = AlertTriangle;
  let iconColor = 'text-[#D4A84F]';
  let iconBg = 'bg-[#D4A84F]/10 border-[#D4A84F]/30';

  const status = error?.status;
  const isNetwork = error?.isNetworkError || (error?.message && error.message.toLowerCase().includes('network'));

  if (isNetwork) {
    title = 'Connection Unavailable';
    description = 'Unable to connect to Smart Campus server. Please check your network connection.';
    Icon = WifiOff;
    iconColor = 'text-amber-400';
    iconBg = 'bg-amber-500/10 border-amber-500/30';
  } else if (status === 401) {
    title = 'Session Expired';
    description = 'Your session has expired. Please log in again.';
    Icon = ShieldAlert;
    iconColor = 'text-red-400';
    iconBg = 'bg-red-500/10 border-red-500/30';
  } else if (status === 403) {
    title = 'Access Restricted';
    description = "You don't have permission to perform this action.";
    Icon = ShieldAlert;
    iconColor = 'text-amber-400';
    iconBg = 'bg-amber-500/10 border-amber-500/30';
  } else if (status === 404) {
    title = 'Not Found';
    description = 'Requested resource was not found.';
    Icon = FileQuestion;
    iconColor = 'text-blue-400';
    iconBg = 'bg-blue-500/10 border-blue-500/30';
  } else if (status === 422) {
    title = 'Validation Notice';
    description = 'Please check the information you entered.';
    Icon = AlertTriangle;
    iconColor = 'text-amber-400';
    iconBg = 'bg-amber-500/10 border-amber-500/30';
  } else if (status >= 500) {
    title = 'Server Error';
    description = 'Server error. Please try again.';
    Icon = AlertTriangle;
    iconColor = 'text-red-400';
    iconBg = 'bg-red-500/10 border-red-500/30';
  }

  return (
    <div className={`bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-xl max-w-lg mx-auto ${className}`}>
      <div className={`w-16 h-16 rounded-2xl border ${iconBg} ${iconColor} flex items-center justify-center mx-auto shadow-lg`}>
        <Icon className="w-8 h-8 stroke-[2]" />
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-bold text-[#F5F5F0]">{title}</h4>
        <p className="text-xs sm:text-sm text-[#A8B3B0] leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315C3A] hover:bg-[#3d7047] text-[#F5F5F0] text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#315C3A]/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      )}
    </div>
  );
}
