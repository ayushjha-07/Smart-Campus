import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function PasswordInput({ value, onChange, placeholder = "Enter your password", hasError }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
        <Lock className="w-4 h-4" />
      </div>

      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#050A0C] border ${
          hasError
            ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
            : 'border-white/10 focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30'
        } rounded-xl pl-10 pr-11 py-3 text-sm text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none transition-all duration-200`}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A8B3B0] hover:text-[#F5F5F0] transition-colors focus:outline-none"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
