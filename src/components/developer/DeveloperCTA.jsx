import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * DeveloperCTA — Primary Action Button to navigate directly to the Smart Campus Landing Page
 */
export default function DeveloperCTA() {
  const navigate = useNavigate();

  const handleContinue = () => {
    try {
      sessionStorage.setItem('seen_developer_intro', 'true');
    } catch {
      // Storage quota or restriction safe fallback
    }
    navigate('/');
  };

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={handleContinue}
        className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00B878] dark:hover:bg-[#009E66] shadow-lg shadow-emerald-950/25 hover:shadow-xl hover:shadow-emerald-950/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        <span>Continue to Smart Campus</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
