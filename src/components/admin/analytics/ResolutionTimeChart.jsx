import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { Clock } from 'lucide-react';

const CustomTooltip = ({ active, payload, unit }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = unit === 'hours' ? `${data.hours} hrs` : `${data.days} days`;
    return (
      <div className="bg-[#050A0C]/95 border border-[#1A2E3B] rounded-lg p-2.5 shadow-xl text-xs backdrop-blur-md">
        <div className="font-semibold text-[#F5F5F0] mb-1">{data.department}</div>
        <div className="flex items-center justify-between gap-4 text-[#9FB1BC]">
          <span>Avg Turnaround:</span>
          <span className="font-bold text-[#D4A84F]">{value}</span>
        </div>
        <div className="text-[10px] text-[#71844A] mt-1 border-t border-[#1A2E3B] pt-1">
          {data.hours <= 16 ? 'Within optimal SLA' : 'Slightly elevated backlog'}
        </div>
      </div>
    );
  }
  return null;
};

export default function ResolutionTimeChart({ data }) {
  const [unit, setUnit] = useState('hours'); // 'hours' | 'days'

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#71844A]" />
            <h2 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              Average Resolution Time
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Average time taken to resolve complaints by department
          </p>
        </div>

        {/* Hours / Days Toggle */}
        <div className="flex items-center gap-1 bg-[#07121A] p-0.5 rounded-lg border border-[#1A2E3B] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setUnit('hours')}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${
              unit === 'hours'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            Hours
          </button>
          <button
            type="button"
            onClick={() => setUnit('days')}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${
              unit === 'days'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            Days
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 15, left: -15, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2E3B" vertical={false} />
            <XAxis
              dataKey="department"
              stroke="#9FB1BC"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
              angle={-25}
              textAnchor="end"
              height={35}
            />
            <YAxis
              stroke="#9FB1BC"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
              unit={unit === 'hours' ? 'h' : 'd'}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <ReferenceLine
              y={unit === 'hours' ? 18 : 0.75}
              stroke="#D4A84F"
              strokeDasharray="4 4"
              label={{
                value: `Campus SLA Target (${unit === 'hours' ? '18h' : '0.75d'})`,
                fill: '#D4A84F',
                fontSize: 10,
                position: 'top'
              }}
            />
            <Bar
              dataKey={unit === 'hours' ? 'hours' : 'days'}
              fill="#71844A"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-2 pt-2 border-t border-[#1A2E3B]/60 flex items-center justify-between text-[11px] text-[#9FB1BC]">
        <span>Fastest: <strong className="text-[#10B981]">Security (13.6h)</strong></span>
        <span>Target SLA: <strong className="text-[#D4A84F]">18.0 hrs</strong></span>
        <span>Highest: <strong className="text-amber-400">Hostel (22.5h)</strong></span>
      </div>
    </div>
  );
}
