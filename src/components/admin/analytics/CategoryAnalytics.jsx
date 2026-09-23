import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { ChevronDown, Layers } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#0C1518] p-2.5 rounded-xl border border-[#DDE8E3] dark:border-[#243338] shadow-xl text-xs space-y-1">
        <div className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
          {data.category}
        </div>
        <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0]">
          Complaints:{' '}
          <span className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
            {data.count}
          </span>{' '}
          ({data.share})
        </div>
      </div>
    );
  }
  return null;
};

export default function CategoryAnalytics({ data }) {
  const [sortBy, setSortBy] = useState('Most Complaints');

  const sortedData = useMemo(() => {
    const cloned = [...data];
    if (sortBy === 'Most Complaints') {
      return cloned.sort((a, b) => b.count - a.count);
    }
    if (sortBy === 'Least Complaints') {
      return cloned.sort((a, b) => a.count - b.count);
    }
    if (sortBy === 'Alphabetical') {
      return cloned.sort((a, b) => a.category.localeCompare(b.category));
    }
    return cloned;
  }, [data, sortBy]);

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header with Sort dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Complaint Categories
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
              10 Categories
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
            Ticket volume distribution across operational disciplines
          </p>
        </div>

        {/* Sort Selector */}
        <div className="relative inline-flex items-center self-start sm:self-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-xs font-semibold rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] shadow-2xs hover:border-[#008F63] focus:outline-hidden cursor-pointer"
            aria-label="Sort Categories"
          >
            <option value="Most Complaints">Most Complaints</option>
            <option value="Least Complaints">Least Complaints</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-[#60717A] dark:text-[#A8B3B0]" />
        </div>
      </div>

      {/* Vertical BarChart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#DDE8E3"
              className="dark:stroke-[#1A2E3B]"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              stroke="#60717A"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#DDE8E3', strokeWidth: 1 }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={35}
            />
            <YAxis
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              name="Complaint Count"
              radius={[4, 4, 0, 0]}
              barSize={24}
              isAnimationActive={false}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || '#008F63'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Caption footer */}
      <div className="mt-2 pt-3 border-t border-[#DDE8E3] dark:border-[#243338] flex items-center justify-between text-xs text-[#60717A] dark:text-[#A8B3B0]">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
          <span>
            Infrastructure & Water Supply account for <strong className="text-[#071A2B] dark:text-[#F5F5F0]">32.2%</strong> of all student submissions.
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#D4A84F]">
          Sorted: {sortBy}
        </span>
      </div>
    </div>
  );
}
