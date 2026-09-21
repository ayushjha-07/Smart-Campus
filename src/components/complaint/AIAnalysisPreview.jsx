import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Gauge, 
  Layers, 
  Building2, 
  Clock, 
  CheckCircle2
} from 'lucide-react';

export default function AIAnalysisPreview({ analysis, _textLength }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return {
          badge: 'bg-red-50 text-[#E5484D] border-red-200 shadow-xs',
          icon: AlertTriangle,
          textColor: 'text-[#E5484D]',
          meterBg: 'bg-[#E5484D]',
          resolutionTime: '2 – 4 Hours',
        };
      case 'HIGH':
        return {
          badge: 'bg-amber-50 text-[#E8A317] border-amber-200 shadow-xs',
          icon: Flame,
          textColor: 'text-[#E8A317]',
          meterBg: 'bg-[#E8A317]',
          resolutionTime: '4 – 8 Hours',
        };
      case 'MEDIUM':
        return {
          badge: 'bg-emerald-50 text-[#16A36A] border-emerald-200 shadow-xs',
          icon: Sparkles,
          textColor: 'text-[#16A36A]',
          meterBg: 'bg-[#16A36A]',
          resolutionTime: '12 – 24 Hours',
        };
      case 'LOW':
      default:
        return {
          badge: 'bg-slate-50 text-[#168A5B] border-slate-200 shadow-xs',
          icon: ShieldCheck,
          textColor: 'text-[#168A5B]',
          meterBg: 'bg-[#168A5B]',
          resolutionTime: '24 – 48 Hours',
        };
    }
  };

  const priorityStyle = analysis ? getPriorityStyle(analysis.priority) : null;
  const PriorityIcon = priorityStyle ? priorityStyle.icon : Sparkles;

  const capabilities = [
    {
      id: 'cap-1',
      icon: Layers,
      text: 'Detects issue category automatically',
    },
    {
      id: 'cap-2',
      icon: Building2,
      text: 'Suggests the right department',
    },
    {
      id: 'cap-3',
      icon: Clock,
      text: 'Estimates resolution timeline',
    },
    {
      id: 'cap-4',
      icon: CheckCircle2,
      text: 'Helps you write a better complaint',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2] dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-[#168A5B] flex items-center justify-center">
            <Cpu className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0] flex items-center gap-2">
              <span>AI Complaint Analysis</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#168A5B] border border-emerald-200 dark:border-emerald-500/20">
                LIVE NLP
              </span>
            </h3>
            <p className="text-[10px] text-[#64748B] dark:text-[#A8B3B0]">Simulated semantic triage preview</p>
          </div>
        </div>
      </div>

      {!analysis ? (
        /* Empty / Idle State matching reference */
        <div className="py-4 space-y-5">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center mx-auto text-[#168A5B] shadow-xs">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h4 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Start typing your complaint...
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] max-w-xs mx-auto leading-relaxed">
              Our AI will analyze your complaint and predict priority, department, and estimated resolution time.
            </p>
          </div>

          {/* Four Compact AI Capability Rows */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-white/10">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[#D4A84F] flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-[#14213D] dark:text-[#F5F5F0]">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* Live Dynamic AI Analysis Results */
        <div className="space-y-3.5 animate-fadeIn">
          
          {/* Category & Priority Row */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Category */}
            <div className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] tracking-wider block mb-1">
                Category
              </span>
              <span className="text-xs font-bold text-[#14213D] dark:text-[#F5F5F0] truncate block">
                {analysis.category}
              </span>
            </div>

            {/* Priority with Badge */}
            <div className={`p-3 rounded-xl border ${priorityStyle.badge}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Priority
                </span>
                <PriorityIcon className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs font-black tracking-wide ${priorityStyle.textColor}`}>
                {analysis.priority}
              </span>
            </div>

          </div>

          {/* Department & Resolution Time Row */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Suggested Department */}
            <div className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] tracking-wider block mb-1">
                Department
              </span>
              <span className="text-xs font-bold text-[#168A5B] truncate block">
                {analysis.suggestedDepartment || 'Maintenance Dept'}
              </span>
            </div>

            {/* Resolution Time */}
            <div className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] tracking-wider block mb-1">
                Est. Resolution
              </span>
              <span className="text-xs font-bold text-[#14213D] dark:text-[#F5F5F0] truncate block">
                {priorityStyle.resolutionTime}
              </span>
            </div>

          </div>

          {/* Confidence Meter */}
          <div className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] flex items-center gap-1.5 font-medium">
                <Gauge className="w-3.5 h-3.5 text-[#168A5B]" />
                Classification Confidence
              </span>
              <span className="font-mono font-bold text-[#168A5B]">
                {Math.round(analysis.confidence * 100)}%
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${priorityStyle.meterBg} rounded-full transition-all duration-500`}
                style={{ width: `${Math.round(analysis.confidence * 100)}%` }}
              />
            </div>
          </div>

          {/* Detected Keywords */}
          {analysis.keywords && analysis.keywords.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0] tracking-wider block mb-1.5">
                Extracted Keywords
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[#168A5B]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#168A5B]" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Diagnostic Reason */}
          {analysis.reason && (
            <div className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-white/5 border border-[#DDE7E2] dark:border-white/10 text-[11px] text-[#64748B] dark:text-[#A8B3B0] leading-relaxed">
              <strong className="text-[#14213D] dark:text-[#F5F5F0] block mb-0.5">Automated Reasoning:</strong>
              &ldquo;{analysis.reason}&rdquo;
            </div>
          )}

        </div>
      )}

    </div>
  );
}
