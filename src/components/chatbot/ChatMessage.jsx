import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, ExternalLink, ArrowRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const STATUS_BADGES = {
  'In Progress': {
    bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60',
    icon: Clock
  },
  'Under Review': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
    icon: AlertCircle
  },
  'Pending': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
    icon: Clock
  },
  'Resolved': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
    icon: CheckCircle2
  }
};

const PRIORITY_BADGES = {
  CRITICAL: 'bg-red-500 text-white',
  HIGH: 'bg-orange-500 text-white',
  MEDIUM: 'bg-amber-500 text-white',
  LOW: 'bg-emerald-600 text-white'
};

/**
 * ChatMessage — Renders individual user and assistant message items with interactive action cards
 */
export default function ChatMessage({ message, onNavigate }) {
  const navigate = useNavigate();
  const isUser = message.sender === 'user';

  const handleActionClick = (route) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      navigate(route);
    }
  };

  return (
    <div className={`flex items-start gap-2.5 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar Icon */}
      <div 
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
          isUser 
            ? 'bg-gradient-to-tr from-[#102A43] to-[#243B53] text-white' 
            : 'bg-gradient-to-tr from-[#00A86B] to-[#00D68F] text-white'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message Content Container */}
      <div className={`max-w-[82%] sm:max-w-[78%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Text Bubble */}
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
            isUser
              ? 'bg-[#00A86B] text-white rounded-tr-xs font-medium'
              : 'bg-white dark:bg-[#0E2433] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 rounded-tl-xs'
          }`}
        >
          {/* Support formatting for bold/newlines */}
          <div className="whitespace-pre-line">
            {message.text}
          </div>
        </div>

        {/* Dynamic Complaint Tracking Cards (if present in response) */}
        {message.complaints && message.complaints.length > 0 && (
          <div className="space-y-2 pt-1 w-full">
            {message.complaints.map((comp) => {
              const statusCfg = STATUS_BADGES[comp.status] || STATUS_BADGES['Under Review'];
              const StatusIcon = statusCfg.icon;
              const priorityClass = PRIORITY_BADGES[comp.priority] || 'bg-slate-500 text-white';

              return (
                <div
                  key={comp.id}
                  onClick={() => handleActionClick(`/student/complaints/${comp.id}`)}
                  className="p-3 rounded-xl bg-white dark:bg-[#0A1E2B] border border-slate-200 dark:border-white/10 hover:border-[#00B878] dark:hover:border-[#00B878] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {comp.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {comp.priority && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${priorityClass}`}>
                          {comp.priority}
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusCfg.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{comp.status}</span>
                      </span>
                    </div>
                  </div>

                  <p className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-white mt-1 group-hover:text-[#00A86B] dark:group-hover:text-[#10E894] transition-colors line-clamp-1">
                    {comp.title}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-1.5 border-t border-slate-100 dark:border-white/5">
                    <span>{comp.department || comp.category || 'Maintenance'}</span>
                    <span className="text-[#00A86B] dark:text-[#10E894] font-bold flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons (if attached to message) */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.actions.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleActionClick(act.route)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer ${
                  act.primary
                    ? 'bg-[#00B878] hover:bg-[#009e66] text-white shadow-emerald-950/20'
                    : 'bg-white dark:bg-[#0A1E2B] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10'
                }`}
              >
                <span>{act.label}</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        {message.timestamp && (
          <p className={`text-[10px] text-slate-400 dark:text-slate-500 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </p>
        )}

      </div>

    </div>
  );
}
