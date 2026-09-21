import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SuccessCard({ userName, role }) {
  return (
    <div className="max-w-md w-full mx-auto my-auto p-8 sm:p-10 rounded-3xl bg-[#0D1B22] border border-[#315C3A]/70 shadow-2xl text-center space-y-6 animate-fadeIn">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#315C3A]/25 border border-[#71844A] text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-[#315C3A]/30">
        <CheckCircle2 className="w-9 h-9 stroke-[2]" />
      </div>

      {/* Headings */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07121A] border border-[#315C3A] text-xs font-semibold text-[#D4A84F] uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Registration Completed</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0]">
          Account Created
        </h3>

        <p className="text-sm text-[#A8B3B0] mt-2 leading-relaxed">
          Welcome to Smart Campus, <strong className="text-[#F5F5F0]">{userName || 'Member'}</strong>! Your Smart Campus account has been created.
        </p>

        {role === 'staff' && (
          <div className="mt-4 p-3 rounded-xl bg-[#07121A] border border-[#D4A84F]/30 text-xs text-[#D4A84F] text-left">
            Staff accounts are logged into the departmental directory. Departmental verification will be automatically assigned.
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <Link
          to="/login"
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#D4A84F] text-[#07121A] hover:bg-[#E5BF6E] hover:shadow-lg hover:shadow-[#D4A84F]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <span>Continue to Login</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
