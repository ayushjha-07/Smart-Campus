import React from 'react';
import { Camera } from 'lucide-react';

export default function StudentAvatar({ onAvatarChange, size = 'large' }) {
  // SVG Vector Portrait representing Ayush Kumar Jha (matching the student photo in reference)
  return (
    <div className="relative group shrink-0 select-none">
      <div className={`rounded-full overflow-hidden border-2 border-[#078A5A] dark:border-[#00B87A] shadow-md bg-[#0F2826] ${
        size === 'large' ? 'w-20 h-20 sm:w-22 sm:h-22' : 'w-12 h-12'
      }`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle gradient */}
          <defs>
            <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B3A34" />
              <stop offset="100%" stopColor="#0B1A18" />
            </linearGradient>
            <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2A782" />
              <stop offset="100%" stopColor="#C98B66" />
            </linearGradient>
            <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A1B14" />
              <stop offset="100%" stopColor="#140D0A" />
            </linearGradient>
            <linearGradient id="jacket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B5E43" />
              <stop offset="100%" stopColor="#063E2C" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="120" height="120" fill="url(#avatarBg)" />

          {/* Body / Green Jacket */}
          <path
            d="M20 120 C20 92, 38 82, 60 82 C82 82, 100 92, 100 120 Z"
            fill="url(#jacket)"
          />
          {/* Inner Shirt Collar */}
          <path
            d="M48 82 L60 98 L72 82 Z"
            fill="#10213A"
          />
          {/* Neck */}
          <path
            d="M52 68 L52 84 C52 87, 68 87, 68 84 L68 68 Z"
            fill="url(#skin)"
          />

          {/* Head & Face */}
          <ellipse cx="60" cy="54" rx="20" ry="24" fill="url(#skin)" />

          {/* Hair */}
          <path
            d="M38 52 C37 34, 46 24, 60 24 C74 24, 83 34, 82 52 C82 52, 79 38, 60 38 C42 38, 38 52, 38 52 Z"
            fill="url(#hair)"
          />
          <path
            d="M40 38 C48 26, 72 26, 80 38 C75 30, 52 28, 40 38 Z"
            fill="#3D291F"
          />

          {/* Eyebrows */}
          <path d="M48 46 Q54 44 58 47" stroke="#1D120C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M72 46 Q66 44 62 47" stroke="#1D120C" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <ellipse cx="53" cy="51" rx="2.5" ry="2" fill="#140D0A" />
          <ellipse cx="67" cy="51" rx="2.5" ry="2" fill="#140D0A" />
          <circle cx="54" cy="50.2" r="0.7" fill="#FFFFFF" />
          <circle cx="68" cy="50.2" r="0.7" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M60 51 L59 59 L63 59" stroke="#B37854" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Smile */}
          <path d="M53 65 Q60 70 67 65" stroke="#944838" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M55 65.5 Q60 68 65 65.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Ears */}
          <ellipse cx="39" cy="54" rx="2.5" ry="4.5" fill="#D49673" />
          <ellipse cx="81" cy="54" rx="2.5" ry="4.5" fill="#D49673" />
        </svg>
      </div>

      {/* Camera Icon Badge */}
      <button
        type="button"
        onClick={onAvatarChange}
        title="Update profile avatar"
        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white border-2 border-white dark:border-[#0B2027] shadow-sm transition-transform hover:scale-110 cursor-pointer"
        aria-label="Change photo"
      >
        <Camera className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
