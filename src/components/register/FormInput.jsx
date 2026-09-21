import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = true,
  helperText,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0]">
          {label} {required && <span className="text-[#D4A84F]">*</span>}
        </label>
        {helperText && (
          <span className="text-[10px] text-[#A8B3B0]/60">{helperText}</span>
        )}
      </div>

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#050A0C] border ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : 'border-white/10 focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30'
          } rounded-xl ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-4 py-2.5 text-sm text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none transition-all duration-200`}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
