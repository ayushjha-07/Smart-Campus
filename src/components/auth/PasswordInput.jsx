import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function PasswordInput({ value, onChange, placeholder = "Enter your password", hasError }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#008F63] dark:text-[#00B878]">
        <Lock className="w-4 h-4" />
      </div>

      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Password"
        className={`w-full bg-white dark:bg-[#050A0C] border ${
          hasError
            ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
            : 'border-[#DDE5E1] dark:border-white/10 focus:border-[#008F63] dark:focus:border-[#00B878] focus:ring-1 focus:ring-[#008F63]/25 dark:focus:ring-[#00B878]/30'
        } rounded-xl pl-10 pr-11 py-3 text-sm text-[#07121A] dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#A8B3B0]/40 outline-none transition-all duration-200`}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:text-[#A8B3B0] dark:hover:text-[#F5F5F0] transition-colors focus:outline-none cursor-pointer"
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
