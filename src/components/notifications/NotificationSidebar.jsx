import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Wifi, 
  Home, 
  Bus, 
  Mail, 
  Wrench, 
  BookOpen, 
  Zap, 
  PlusCircle, 
  ClipboardList, 
  Sliders, 
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  Laptop,
  Building,
  Quote,
  Activity
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';

export default function NotificationSidebar({
  onOpenPreferences,
  onOpenAnnouncements,
  onSelectFilter,
}) {
  const [timeRange, setTimeRange] = useState('This Week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeHoverDay, setActiveHoverDay] = useState(3); // Thursday selected by default (index 3)

  const chartData = [
    { day: 'Mon', count: 2, date: 'Mon, 18 Sep' },
    { day: 'Tue', count: 5, date: 'Tue, 19 Sep' },
    { day: 'Wed', count: 4, date: 'Wed, 20 Sep' },
    { day: 'Thu', count: 8, date: 'Thu, 21 Sep' },
    { day: 'Fri', count: 5, date: 'Fri, 22 Sep' },
    { day: 'Sat', count: 4, date: 'Sat, 23 Sep' },
    { day: 'Sun', count: 7, date: 'Sun, 24 Sep' },
  ];

  const selectedPoint = chartData[activeHoverDay];

  // SVG Chart points mapped to coordinate space (viewBox: 0 0 320 85)
  const points = [
    { x: 35, y: 62 },
    { x: 80, y: 50 },
    { x: 125, y: 54 },
    { x: 170, y: 38 },
    { x: 215, y: 50 },
    { x: 260, y: 54 },
    { x: 305, y: 43 },
  ];

  // Smooth spline curve path
  const curvePath = "M 35 62 C 60 56, 65 50, 80 50 C 95 50, 110 54, 125 54 C 145 54, 155 38, 170 38 C 185 38, 200 50, 215 50 C 235 50, 245 54, 260 54 C 280 54, 290 43, 305 43";
  const areaPath = `${curvePath} L 305 72 L 35 72 Z`;

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* ================================================== */}
      {/* SECTION 1: CAMPUS ACTIVITY & INSIGHTS              */}
      {/* ================================================== */}
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#DCE7E3]/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center shadow-2xs">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Campus Activity & Insights
            </h3>
          </div>

          {/* Time Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-[#F5F7F5] transition-colors cursor-pointer"
            >
              <span>{timeRange}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-32 rounded-xl bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 shadow-lg p-1 z-30 text-xs">
                  {['This Week', 'Last Week', 'This Month'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setTimeRange(option);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        timeRange === option
                          ? 'bg-[#078A5A] text-white font-semibold'
                          : 'text-[#10213A] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4 Mini Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Metric 1: Most Reported */}
          <div className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                Most Reported
              </span>
              <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                <Building2 className="w-3 h-3" />
              </div>
            </div>
            <span className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] truncate">
              Infrastructure
            </span>
          </div>

          {/* Metric 2: Active Issues */}
          <div className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                Active Issues
              </span>
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileText className="w-3 h-3" />
              </div>
            </div>
            <span className="text-base font-bold font-mono text-[#10213A] dark:text-[#F5F7F5]">
              7
            </span>
          </div>

          {/* Metric 3: Resolved This Month */}
          <div className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                Resolved This Month
              </span>
              <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>
            <span className="text-base font-bold font-mono text-[#10213A] dark:text-[#F5F7F5]">
              5
            </span>
          </div>

          {/* Metric 4: Avg Response */}
          <div className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                Avg. Response
              </span>
              <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-3 h-3" />
              </div>
            </div>
            <span className="text-xs font-bold font-mono text-[#10213A] dark:text-[#F5F7F5]">
              24–48 hrs
            </span>
          </div>
        </div>

        {/* 7-Day Activity Chart */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Complaints Over Last 7 Days
            </h4>
          </div>

          {/* SVG Chart Container */}
          <div className="relative pt-6 pb-1">
            
            {/* Tooltip Overlay */}
            {selectedPoint && (
              <div 
                className="absolute z-10 -top-1 pointer-events-none transform -translate-x-1/2 transition-all duration-200"
                style={{ left: `${(points[activeHoverDay].x / 320) * 100}%` }}
              >
                <div className="bg-[#10213A] dark:bg-[#061116] text-white text-[10px] px-2.5 py-1 rounded-lg shadow-lg border border-white/10 text-center whitespace-nowrap">
                  <span className="font-bold block">{selectedPoint.count} complaints</span>
                  <span className="text-slate-300 dark:text-[#91A7A5] text-[9px]">{selectedPoint.date}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-[#10213A] dark:bg-[#061116] transform rotate-45 mx-auto -mt-1" />
              </div>
            )}

            {/* SVG Chart */}
            <svg
              viewBox="0 0 320 85"
              className="w-full h-24 overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Green Gradient Fill */}
                <linearGradient id="activityFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#078A5A" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#078A5A" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="30" y1="15" x2="310" y2="15" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-white/5" strokeWidth="1" />
              <line x1="30" y1="35" x2="310" y2="35" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-white/5" strokeWidth="1" />
              <line x1="30" y1="55" x2="310" y2="55" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-white/5" strokeWidth="1" />
              <line x1="30" y1="72" x2="310" y2="72" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="1" />

              {/* Y-axis numbers */}
              <text x="18" y="18" className="text-[9px] fill-[#687A91] dark:fill-[#91A7A5] font-mono text-right">15</text>
              <text x="18" y="38" className="text-[9px] fill-[#687A91] dark:fill-[#91A7A5] font-mono text-right">10</text>
              <text x="21" y="58" className="text-[9px] fill-[#687A91] dark:fill-[#91A7A5] font-mono text-right">5</text>
              <text x="21" y="74" className="text-[9px] fill-[#687A91] dark:fill-[#91A7A5] font-mono text-right">0</text>

              {/* Gradient Area Fill */}
              <path d={areaPath} fill="url(#activityFill)" />

              {/* Smooth Spline Stroke Line */}
              <path
                d={curvePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#078A5A] dark:text-[#00B87A]"
              />

              {/* Interactive Points on Line */}
              {points.map((pt, idx) => {
                const isActive = activeHoverDay === idx;
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveHoverDay(idx)}
                    onClick={() => setActiveHoverDay(idx)}
                  >
                    <circle cx={pt.x} cy={pt.y} r="12" fill="transparent" />
                    {isActive ? (
                      <>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          className="fill-[#078A5A] dark:fill-[#00B87A]"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="3"
                          fill="#FFFFFF"
                        />
                      </>
                    ) : (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3"
                        className="fill-white dark:fill-[#0B2027] stroke-[#078A5A] dark:stroke-[#00B87A]"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* X-axis Day Labels */}
            <div className="flex justify-between pl-8 pr-1 pt-1 text-[10px] font-mono text-[#687A91] dark:text-[#91A7A5]">
              {chartData.map((d, idx) => (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setActiveHoverDay(idx)}
                  className={`transition-colors cursor-pointer ${
                    activeHoverDay === idx
                      ? 'text-[#078A5A] dark:text-[#00B87A] font-bold'
                      : 'hover:text-[#10213A] dark:hover:text-[#F5F7F5]'
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Categories Progress Bars */}
        <div className="pt-2 border-t border-[#DCE7E3]/70 dark:border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Top Categories
            </h4>
            <button
              type="button"
              onClick={onOpenAnnouncements}
              className="text-[11px] font-semibold text-[#078A5A] dark:text-[#00B87A] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* 1: Infrastructure */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                  <span className="text-[#10213A] dark:text-[#F5F7F5] font-medium">Infrastructure</span>
                </div>
                <span className="font-mono font-bold text-[#10213A] dark:text-[#F5F7F5]">28%</span>
              </div>
              <div className="h-1.5 w-full bg-[#F5F8F7] dark:bg-[#071A20] rounded-full overflow-hidden">
                <div className="h-full bg-[#078A5A] dark:bg-[#00B87A] rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            {/* 2: IT / Wi-Fi */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[#10213A] dark:text-[#F5F7F5] font-medium">IT / Wi-Fi</span>
                </div>
                <span className="font-mono font-bold text-[#10213A] dark:text-[#F5F7F5]">22%</span>
              </div>
              <div className="h-1.5 w-full bg-[#F5F8F7] dark:bg-[#071A20] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            {/* 3: Hostel */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[#10213A] dark:text-[#F5F7F5] font-medium">Hostel</span>
                </div>
                <span className="font-mono font-bold text-[#10213A] dark:text-[#F5F7F5]">18%</span>
              </div>
              <div className="h-1.5 w-full bg-[#F5F8F7] dark:bg-[#071A20] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            {/* 4: Transport */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-[#10213A] dark:text-[#F5F7F5] font-medium">Transport</span>
                </div>
                <span className="font-mono font-bold text-[#10213A] dark:text-[#F5F7F5]">16%</span>
              </div>
              <div className="h-1.5 w-full bg-[#F5F8F7] dark:bg-[#071A20] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================================================== */}
      {/* SECTION 2: UPCOMING CAMPUS NOTICES                 */}
      {/* ================================================== */}
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors space-y-3.5">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#DCE7E3]/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center shadow-2xs">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Upcoming Campus Notices
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenAnnouncements}
            className="text-xs font-semibold text-[#078A5A] dark:text-[#00B87A] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Notice List */}
        <div className="space-y-2.5">
          
          {/* Notice 1: Hostel Block B */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] truncate leading-tight">
                  Hostel Block B Maintenance
                </h5>
                <p className="text-[11px] text-[#687A91] dark:text-[#91A7A5] truncate leading-tight mt-0.5">
                  Water supply maintenance
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] border border-emerald-200 dark:border-emerald-500/30 shrink-0">
              Tomorrow
            </span>
          </div>

          {/* Notice 2: Library Extended Hours */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] truncate leading-tight">
                  Library Extended Hours
                </h5>
                <p className="text-[11px] text-[#687A91] dark:text-[#91A7A5] truncate leading-tight mt-0.5">
                  Open 24/7 during exams
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shrink-0">
              24 Sep
            </span>
          </div>

          {/* Notice 3: Wi-Fi Maintenance */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 hover:border-[#078A5A]/30 dark:hover:border-[#00B87A]/30 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] truncate leading-tight">
                  Wi-Fi Maintenance
                </h5>
                <p className="text-[11px] text-[#687A91] dark:text-[#91A7A5] truncate leading-tight mt-0.5">
                  Network upgrade in Block 3
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shrink-0">
              25 Sep
            </span>
          </div>

        </div>

      </div>

      {/* ================================================== */}
      {/* SECTION 3: QUICK ACTIONS                           */}
      {/* ================================================== */}
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors space-y-3">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center shadow-2xs">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <h3 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Quick Actions
            </h3>
          </div>
          <p className="text-[11px] text-[#687A91] dark:text-[#91A7A5] mt-1 pl-9">
            Take quick actions from here
          </p>
        </div>

        {/* 3 Buttons in a 3-Column Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
          
          {/* Button 1: Submit Complaint (Green filled) */}
          <Link
            to="/student/complaints/new"
            className="flex flex-col justify-between p-3 rounded-xl bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-all shadow-md shadow-[#078A5A]/20 dark:shadow-[#00B87A]/20 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mb-2">
              <PlusCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight block mb-2">
              Submit Complaint
            </span>
            <div className="flex justify-end">
              <ArrowRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Button 2: View My Complaints */}
          <Link
            to="/student/complaints"
            className="flex flex-col justify-between p-3 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-white/5 border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] transition-all hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-2 text-[#687A91] dark:text-[#91A7A5]">
              <ClipboardList className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight block mb-2">
              View My Complaints
            </span>
            <div className="flex justify-end">
              <ArrowRight className="w-3.5 h-3.5 text-[#687A91] dark:text-[#91A7A5] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Button 3: Notification Preferences */}
          <button
            type="button"
            onClick={onOpenPreferences}
            className="flex flex-col justify-between p-3 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-slate-100 dark:hover:bg-white/5 border border-[#DCE7E3] dark:border-white/10 text-[#10213A] dark:text-[#F5F7F5] transition-all hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer text-left"
          >
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-2 text-[#687A91] dark:text-[#91A7A5]">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight block mb-2">
              Notification Preferences
            </span>
            <div className="flex justify-end">
              <ArrowRight className="w-3.5 h-3.5 text-[#687A91] dark:text-[#91A7A5] transition-transform group-hover:translate-x-1" />
            </div>
          </button>

        </div>

      </div>

      {/* ================================================== */}
      {/* SECTION 4: IMPORTANT & CRITICAL ALERTS             */}
      {/* ================================================== */}
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors space-y-3">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#DCE7E3]/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Important & Critical Alerts
            </h3>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            3 Active
          </span>
        </div>

        {/* Critical Alerts List */}
        <div className="space-y-2">
          {/* Critical 1 */}
          <div className="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300 truncate block">
                  Critical Security Issue Reported
                </span>
                <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5] block">
                  Campus Safety & Security • #SC-2026-1801
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 shrink-0 font-semibold">
              3m ago
            </span>
          </div>

          {/* Critical 2 */}
          <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 truncate block">
                  High-Priority Maintenance Alert
                </span>
                <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5] block">
                  Hostel Block B HVAC • #SC-2026-1847
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 shrink-0 font-semibold">
              2h ago
            </span>
          </div>

          {/* Critical 3 */}
          <div className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-[#078A5A] dark:bg-[#00B87A] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#10213A] dark:text-[#F5F7F5] truncate block">
                  Core Security Patch Scheduled
                </span>
                <span className="text-[10px] text-[#687A91] dark:text-[#91A7A5] block">
                  Campus Digital Systems • Routine Maintenance
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#687A91] dark:text-[#91A7A5] shrink-0">
              1d ago
            </span>
          </div>
        </div>

        {/* View All Important Action */}
        <div className="pt-2 text-center border-t border-[#DCE7E3]/70 dark:border-white/10">
          <button
            type="button"
            onClick={() => onSelectFilter && onSelectFilter('important')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8A93E] hover:text-[#C9972E] dark:hover:text-[#F1C258] transition-colors cursor-pointer group"
          >
            <span>View All Important Notifications</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* ================================================== */}
      {/* SECTION 5: CAMPUS EMERGENCY HELPLINES (24/7)       */}
      {/* ================================================== */}
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xs dark:shadow-xl transition-colors space-y-3">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#DCE7E3]/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#078A5A] dark:text-[#00B87A] flex items-center justify-center shadow-2xs">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">
                Campus Emergency & Help
              </h3>
              <p className="text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                24/7 dedicated university emergency services
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A]">
            24/7 Active
          </span>
        </div>

        {/* Helpline Contact Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          
          {/* Security */}
          <a
            href="tel:+911723984200"
            className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-[#DCE7E3] dark:border-white/5 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#10213A] dark:text-[#F5F7F5] block truncate text-[11px]">
                  Campus Security
                </span>
                <span className="font-mono text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                  +91 172 398 4200
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-[#687A91] group-hover:text-[#078A5A] dark:group-hover:text-[#00B87A] transition-transform group-hover:translate-x-0.5 shrink-0" />
          </a>

          {/* Medical / Health */}
          <a
            href="tel:+911723984222"
            className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-[#DCE7E3] dark:border-white/5 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#10213A] dark:text-[#F5F7F5] block truncate text-[11px]">
                  Health & Medical
                </span>
                <span className="font-mono text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                  +91 172 398 4222
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-[#687A91] group-hover:text-[#078A5A] dark:group-hover:text-[#00B87A] transition-transform group-hover:translate-x-0.5 shrink-0" />
          </a>

          {/* IT Network Ops */}
          <a
            href="tel:+911723984250"
            className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-[#DCE7E3] dark:border-white/5 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Laptop className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#10213A] dark:text-[#F5F7F5] block truncate text-[11px]">
                  IT & Wi-Fi Desk
                </span>
                <span className="font-mono text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                  +91 172 398 4250
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-[#687A91] group-hover:text-[#078A5A] dark:group-hover:text-[#00B87A] transition-transform group-hover:translate-x-0.5 shrink-0" />
          </a>

          {/* Hostel Warden */}
          <a
            href="tel:+911723984280"
            className="p-2.5 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-[#DCE7E3] dark:border-white/5 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Building className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-[#10213A] dark:text-[#F5F7F5] block truncate text-[11px]">
                  Hostel Warden Desk
                </span>
                <span className="font-mono text-[10px] text-[#687A91] dark:text-[#91A7A5]">
                  +91 172 398 4280
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-[#687A91] group-hover:text-[#078A5A] dark:group-hover:text-[#00B87A] transition-transform group-hover:translate-x-0.5 shrink-0" />
          </a>

        </div>

      </div>

      {/* ================================================== */}
      {/* SECTION 6: CGC UNIVERSITY "CGCU" SCULPTURE CARD    */}
      {/* ================================================== */}
      <div className="relative rounded-2xl border border-[#DCE7E3] dark:border-white/10 overflow-hidden shadow-2xs dark:shadow-xl transition-all h-[420px] sm:h-[460px] w-full group bg-white dark:bg-[#0B2027]">
        {/* Full-bleed authentic CGC University "CGCU" Open Hand sculpture photograph */}
        <img
          src={campusAssets.sculptureImage}
          alt="CGC University Mohali CGCU Landmark Sculpture"
          className="w-full h-full object-cover object-[center_35%] filter brightness-100 contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.01]"
          loading="eager"
        />

        {/* Subtle dark mode edge tone only — NO dark overlay in light theme */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </div>

    </div>
  );
}
