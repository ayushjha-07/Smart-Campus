import React from 'react';
import { Check, X } from 'lucide-react';

export default function PasswordStrength({ password }) {
  if (!password) return null;

  const rules = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: '1 uppercase letter', valid: /[A-Z]/.test(password) },
    { label: '1 number', valid: /[0-9]/.test(password) },
    { label: '1 special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passedCount = rules.filter((r) => r.valid).length;

  let strengthLabel = 'Weak';
  let barColor = 'bg-red-500';
  let textColor = 'text-red-400';
  let progressWidth = '33%';

  if (passedCount >= 4) {
    strengthLabel = 'Strong';
    barColor = 'bg-emerald-400';
    textColor = 'text-emerald-400';
    progressWidth = '100%';
  } else if (passedCount >= 2) {
    strengthLabel = 'Medium';
    barColor = 'bg-[#D4A84F]';
    textColor = 'text-[#D4A84F]';
    progressWidth = '66%';
  }

  return (
    <div className="space-y-2 mt-2 p-3 rounded-xl bg-[#050A0C] border border-white/5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#A8B3B0]">Password Strength:</span>
        <span className={`font-bold font-mono ${textColor}`}>{strengthLabel}</span>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full h-1.5 bg-[#07121A] rounded-full overflow-hidden border border-white/10">
        <div
          className={`h-full ${barColor} transition-all duration-300 rounded-full`}
          style={{ width: progressWidth }}
        />
      </div>

      {/* Rules Checklist */}
      <div className="grid grid-cols-2 gap-1 pt-1 text-[11px]">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 ${
              rule.valid ? 'text-emerald-400 font-medium' : 'text-[#A8B3B0]/60'
            }`}
          >
            {rule.valid ? (
              <Check className="w-3 h-3 stroke-[2.5]" />
            ) : (
              <X className="w-3 h-3 text-[#A8B3B0]/40" />
            )}
            <span>{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
