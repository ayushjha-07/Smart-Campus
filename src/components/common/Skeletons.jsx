import React from 'react';

/**
 * Skeleton pulse block
 */
export function SkeletonBlock({ className = '' }) {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
  );
}

/**
 * Skeleton for 4 KPI statistics cards
 */
export function StatCardsSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="w-16 h-5 rounded-full bg-white/5" />
          </div>
          <div className="space-y-2">
            <div className="w-20 h-7 rounded-lg bg-white/5" />
            <div className="w-28 h-4 rounded-md bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for data tables (e.g. Complaints table, Users table)
 */
export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div className="w-36 h-6 rounded bg-white/5" />
        <div className="w-24 h-6 rounded bg-white/5" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div
            key={rIdx}
            className="flex items-center gap-4 py-3 px-2 border-b border-white/5"
          >
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="flex-1 h-5 rounded bg-white/5"
                style={{ maxWidth: cIdx === 0 ? '120px' : 'auto' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Chart widgets
 */
export function ChartSkeleton({ height = 'h-64' }) {
  return (
    <div className={`bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 space-y-4 animate-pulse ${height} flex flex-col justify-between`}>
      <div className="w-40 h-5 rounded bg-white/5" />
      <div className="flex-1 flex items-end gap-3 pt-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-white/5 rounded-t-lg"
            style={{ height: `${20 + (i * 12) % 70}%` }}
          />
        ))}
      </div>
      <div className="w-full h-4 rounded bg-white/5" />
    </div>
  );
}

/**
 * Skeleton for Complaint Details Page
 */
export function ComplaintDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between">
          <div className="w-32 h-6 rounded bg-white/5" />
          <div className="w-24 h-6 rounded bg-white/5" />
        </div>
        <div className="w-3/4 h-8 rounded bg-white/5" />
        <div className="w-full h-20 rounded bg-white/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 h-96 bg-white/5" />
        <div className="lg:col-span-4 bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 h-96 bg-white/5" />
      </div>
    </div>
  );
}
