import React from 'react';
import { Link } from 'react-router-dom';
import cgcLogo from '../../assets/cgc_logo.png';

/**
 * Official CGC University & Smart Campus Identity Component
 *
 * Supported variants:
 * - 'navbar': Header navigation bar (~42-48px height)
 * - 'sidebar': Dashboard navigation sidebar (~50-60px height)
 * - 'auth': Login & Register pages (~70-90px height)
 *
 * Features:
 * - Unaltered official CGC University emblem preserving original proportions
 * - Clean institutional presentation on dark and light backgrounds
 * - Fully responsive with desktop, tablet, and mobile layouts
 */
export default function UniversityLogo({
  variant = 'navbar',
  showText = true,
  subtitle,
  className = '',
  linkTo = '/'
}) {
  // Variant-specific image dimensions and styles
  const config = {
    navbar: {
      imgClasses: 'h-11 sm:h-12 w-auto object-contain shrink-0',
      containerClasses: 'flex items-center gap-3',
      badgeClasses: 'bg-white rounded-xl p-1 shadow-md border border-white/20 flex items-center justify-center shrink-0',
      titleClasses: 'text-base sm:text-lg font-extrabold tracking-tight text-[#F5F5F0] leading-none',
      institutionClasses: 'text-[11px] sm:text-xs font-semibold text-[#D4A84F] tracking-wide mt-1',
      taglineClasses: 'text-[9px] uppercase tracking-widest text-[#71844A] font-bold hidden md:block mt-0.5',
    },
    sidebar: {
      imgClasses: 'h-14 sm:h-16 w-auto object-contain mx-auto shrink-0',
      containerClasses: 'flex flex-col items-center text-center gap-2.5 w-full',
      badgeClasses: 'bg-white rounded-2xl p-1.5 shadow-lg border border-white/20 flex items-center justify-center shrink-0 hover:scale-[1.02] transition-transform',
      titleClasses: 'text-lg font-black tracking-tight text-[#F5F5F0] leading-tight',
      institutionClasses: 'text-xs font-bold text-[#D4A84F] tracking-wider uppercase mt-0.5',
      taglineClasses: 'text-[9px] font-medium text-[#71844A] tracking-wider mt-0.5',
    },
    auth: {
      imgClasses: 'h-20 sm:h-24 w-auto object-contain mx-auto shrink-0',
      containerClasses: 'flex flex-col items-start gap-3 w-full',
      badgeClasses: 'bg-white rounded-2xl p-2 shadow-xl border border-white/20 flex items-center justify-center shrink-0',
      titleClasses: 'text-xl sm:text-2xl font-black tracking-tight text-[#F5F5F0] leading-tight',
      institutionClasses: 'text-sm sm:text-base font-bold text-[#D4A84F] tracking-wide',
      taglineClasses: 'text-xs text-[#A8B3B0] font-medium mt-1',
    },
  };

  const current = config[variant] || config.navbar;

  const content = (
    <div className={`${current.containerClasses} ${className}`}>
      {/* Official CGC University Logo */}
      <div className={current.badgeClasses}>
        <img
          src={cgcLogo}
          alt="CGC University Official Logo"
          className={current.imgClasses}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Institutional & Application Branding */}
      {showText && (
        <div className={variant === 'sidebar' ? 'flex flex-col items-center' : 'flex flex-col'}>
          {variant === 'sidebar' ? (
            <>
              <span className={current.titleClasses}>
                Smart <span className="text-[#D4A84F]">Campus</span>
              </span>
              <span className={current.institutionClasses}>
                CGC University
              </span>
              {subtitle ? (
                <span className="text-[10px] uppercase font-semibold text-[#71844A] tracking-wider mt-1 px-2 py-0.5 rounded bg-[#0D1B22] border border-white/5">
                  {subtitle}
                </span>
              ) : (
                <span className={current.taglineClasses}>
                  Report. Track. Resolve. Improve.
                </span>
              )}
            </>
          ) : variant === 'auth' ? (
            <>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl sm:text-2xl font-extrabold text-[#F5F5F0]">Smart</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#D4A84F]">Campus</span>
              </div>
              <span className={current.institutionClasses}>
                CGC University
              </span>
              <p className={current.taglineClasses}>
                Report. Track. Resolve. Improve.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 leading-none">
                <span className={current.titleClasses}>
                  Smart <span className="text-[#D4A84F]">Campus</span>
                </span>
              </div>
              <span className={current.institutionClasses}>
                CGC University
              </span>
              <span className={current.taglineClasses}>
                {subtitle || "Report. Track. Resolve. Improve."}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className="focus:outline-none focus:ring-2 focus:ring-[#D4A84F]/40 rounded-xl group transition-all"
        aria-label="CGC University Smart Campus Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
