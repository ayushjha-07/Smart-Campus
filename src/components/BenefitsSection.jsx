import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { benefitsData } from '../data/landingData';

export default function BenefitsSection({ onOpenSubmitModal }) {
  return (
    <section id="benefits" className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#008F63]/5 dark:bg-[#315C3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4A84F]/5 dark:bg-[#D4A84F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/50 text-[#008F63] dark:text-[#D4A84F] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dual Impact Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            Built for Students. Powered for Leadership.
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
            A harmonious campus ecosystem that bridges student everyday concerns with decisive administrative action.
          </p>
        </div>

        {/* 2-Column Benefits Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Column 1: For Students */}
          <div className="relative group bg-white dark:bg-[#0D1B22]/90 border border-[#DDE8E3] dark:border-[#315C3A]/40 rounded-[24px] p-8 sm:p-10 shadow-lg shadow-slate-200/50 dark:shadow-2xl backdrop-blur-xl hover:border-[#008F63]/60 dark:hover:border-[#71844A]/60 transition-all duration-300 flex flex-col justify-between">
            
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4F1] dark:bg-[#315C3A]/25 border border-[#DDE8E3] dark:border-[#315C3A]/60 flex items-center justify-center text-[#008F63] dark:text-[#71844A] group-hover:scale-110 transition-transform shadow-2xs">
                  <GraduationCap className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#EEF4F1] dark:bg-[#315C3A]/20 text-[#008F63] dark:text-[#71844A] border border-[#DDE8E3] dark:border-[#315C3A]/40">
                  Student Experience
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-3">
                FOR STUDENTS
              </h3>
              <p className="text-sm text-[#60717A] dark:text-[#9FB1BC] mb-8 leading-relaxed">
                Say goodbye to unacknowledged emails and lost paper forms. Experience accountability and clarity on every issue you report.
              </p>

              {/* Benefits List */}
              <div className="space-y-5">
                {benefitsData.students.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-[#EEF4F1] dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#71844A] mt-0.5 shrink-0">
                      <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-10 pt-6 border-t border-[#DCE5E2] dark:border-white/10">
              <button
                onClick={onOpenSubmitModal}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#008F63] hover:bg-[#007A54] transition-all duration-200 border border-[#00A875]/50 flex items-center justify-center gap-2 shadow-md shadow-[#008F63]/25 cursor-pointer"
              >
                <span>Report an Issue Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Column 2: For Administrators */}
          <div className="relative group bg-white dark:bg-[#0D1B22]/90 border border-[#DDE8E3] dark:border-[#D4A84F]/30 rounded-[24px] p-8 sm:p-10 shadow-lg shadow-slate-200/50 dark:shadow-2xl backdrop-blur-xl hover:border-[#D4A84F]/60 transition-all duration-300 flex flex-col justify-between">
            
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF9EE] dark:bg-[#D4A84F]/15 border border-[#F5E5C0] dark:border-[#D4A84F]/40 flex items-center justify-center text-[#D4A84F] group-hover:scale-110 transition-transform shadow-2xs">
                  <Building2 className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#D4A84F]/20 text-[#967431] dark:text-[#D4A84F] border border-[#F5E5C0] dark:border-[#D4A84F]/40">
                  Governance & Ops
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-3">
                FOR ADMINISTRATORS
              </h3>
              <p className="text-sm text-[#60717A] dark:text-[#9FB1BC] mb-8 leading-relaxed">
                Supercharge departmental oversight, track resolution bottlenecks, and enforce SLAs with audit-ready transparency.
              </p>

              {/* Benefits List */}
              <div className="space-y-5">
                {benefitsData.admins.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-[#FEF9EE] dark:bg-[#D4A84F]/20 text-[#D4A84F] mt-0.5 shrink-0">
                      <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Admin Feature Flag */}
            <div className="mt-10 pt-6 border-t border-[#DCE5E2] dark:border-white/10 flex items-center justify-between text-xs text-[#60717A] dark:text-[#9FB1BC] font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A84F]" />
                Institutional SLA Automation
              </span>
              <span className="font-bold text-[#008F63] dark:text-[#D4A84F]">Audit-Ready Records</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
