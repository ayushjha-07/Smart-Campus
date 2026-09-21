import React, { useState } from 'react';
import { MapPin, Info, AlertTriangle, Compass, Eye } from 'lucide-react';
import { CAMPUS_HOTSPOTS_DATA } from '../../../data/analyticsMockData';

export default function ComplaintHotspots() {
  const [selectedHotspot, setSelectedHotspot] = useState(CAMPUS_HOTSPOTS_DATA[0]);

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
              Complaint Hotspots
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Geospatial concentration of campus maintenance and service incidents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#07121A] text-[11px] font-medium text-[#D4A84F] border border-[#1A2E3B]">
            <Compass className="w-3.5 h-3.5" />
            Demo campus location data
          </span>
        </div>
      </div>

      {/* Main Content: Map Visualizer + Location Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Stylized Campus Map SVG Container (8 Cols) */}
        <div className="lg:col-span-8 bg-[#050A0C] border border-[#1A2E3B] rounded-xl p-3 sm:p-5 relative overflow-hidden shadow-inner">
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #315C3A 1px, transparent 1px), linear-gradient(to right, #1A2E3B 1px, transparent 1px), linear-gradient(to bottom, #1A2E3B 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Compass Rose Indicator */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1 text-[10px] text-[#71844A] bg-[#07121A]/80 px-2 py-1 rounded border border-[#1A2E3B]">
            <span>NORTH CAMPUS</span>
            <Compass className="w-3 h-3 text-[#D4A84F]" />
          </div>

          {/* Stylized Campus SVG Blueprint */}
          <div className="relative w-full aspect-[16/10] min-h-[280px]">
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Perimeter Boundary */}
              <rect
                x="40"
                y="40"
                width="920"
                height="520"
                rx="16"
                fill="#07121A"
                stroke="#1A2E3B"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Campus Roads & Pathways */}
              {/* Central Spine Avenue */}
              <path
                d="M 500 560 L 500 180 Q 500 140 450 140 L 150 140"
                fill="none"
                stroke="#13242E"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 500 560 L 500 180 Q 500 140 450 140 L 150 140"
                fill="none"
                stroke="#1A2E3B"
                strokeWidth="2"
                strokeDasharray="8 6"
              />

              {/* East Wing Boulevard */}
              <path
                d="M 500 350 L 850 350"
                fill="none"
                stroke="#13242E"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 500 350 L 850 350"
                fill="none"
                stroke="#1A2E3B"
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Campus Quadrangle Lawn */}
              <rect
                x="380"
                y="240"
                width="240"
                height="150"
                rx="10"
                fill="#315C3A"
                fillOpacity="0.12"
                stroke="#315C3A"
                strokeWidth="1.5"
              />
              <text
                x="500"
                y="320"
                textAnchor="middle"
                fill="#71844A"
                fontSize="12"
                fontWeight="600"
                letterSpacing="2"
              >
                CENTRAL QUAD
              </text>

              {/* Building Blocks */}
              {/* Hostel Block A */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'hostel-a'))}
              >
                <rect x="120" y="220" width="130" height="90" rx="6" fill="#0D1B22" stroke="#1A2E3B" strokeWidth="1.5" />
                <text x="185" y="270" textAnchor="middle" fill="#9FB1BC" fontSize="11" fontWeight="600">Hostel Block A</text>
              </g>

              {/* Hostel Block B (Major hotspot) */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'hostel-b'))}
              >
                <rect
                  x="220"
                  y="120"
                  width="140"
                  height="100"
                  rx="6"
                  fill="#13242E"
                  stroke={selectedHotspot.id === 'hostel-b' ? '#D4A84F' : '#EF4444'}
                  strokeWidth="2"
                />
                <text x="290" y="175" textAnchor="middle" fill="#F5F5F0" fontSize="12" fontWeight="bold">Hostel Block B</text>
              </g>

              {/* Central Library */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'library'))}
              >
                <rect x="420" y="80" width="160" height="90" rx="6" fill="#0D1B22" stroke="#1A2E3B" strokeWidth="1.5" />
                <text x="500" y="130" textAnchor="middle" fill="#9FB1BC" fontSize="11" fontWeight="600">Central Library</text>
              </g>

              {/* Academic Block */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'academic-block'))}
              >
                <rect
                  x="640"
                  y="120"
                  width="160"
                  height="110"
                  rx="6"
                  fill="#13242E"
                  stroke={selectedHotspot.id === 'academic-block' ? '#D4A84F' : '#F97316'}
                  strokeWidth="2"
                />
                <text x="720" y="180" textAnchor="middle" fill="#F5F5F0" fontSize="12" fontWeight="bold">Academic Block</text>
              </g>

              {/* Computer Lab */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'computer-lab'))}
              >
                <rect x="710" y="270" width="130" height="85" rx="6" fill="#0D1B22" stroke="#1A2E3B" strokeWidth="1.5" />
                <text x="775" y="318" textAnchor="middle" fill="#9FB1BC" fontSize="11" fontWeight="600">Computer Lab</text>
              </g>

              {/* Cafeteria */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'cafeteria'))}
              >
                <rect
                  x="420"
                  y="420"
                  width="160"
                  height="80"
                  rx="6"
                  fill="#13242E"
                  stroke={selectedHotspot.id === 'cafeteria' ? '#D4A84F' : '#F59E0B'}
                  strokeWidth="1.5"
                />
                <text x="500" y="465" textAnchor="middle" fill="#F5F5F0" fontSize="12" fontWeight="600">Cafeteria</text>
              </g>

              {/* Main Gate */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'main-gate'))}
              >
                <rect x="440" y="520" width="120" height="35" rx="4" fill="#0D1B22" stroke="#1A2E3B" strokeWidth="1.5" />
                <text x="500" y="542" textAnchor="middle" fill="#9FB1BC" fontSize="10" fontWeight="bold">MAIN GATE</text>
              </g>

              {/* Parking Area */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedHotspot(CAMPUS_HOTSPOTS_DATA.find(h => h.id === 'parking'))}
              >
                <rect x="760" y="420" width="140" height="80" rx="6" fill="#07121A" stroke="#1A2E3B" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="830" y="465" textAnchor="middle" fill="#71844A" fontSize="11" fontWeight="600">Parking Zone</text>
              </g>

              {/* Interactive Pulsing Hotspot Markers */}
              {CAMPUS_HOTSPOTS_DATA.map((spot) => {
                const isSelected = selectedHotspot.id === spot.id;
                const markerColor =
                  spot.complaints >= 30
                    ? '#EF4444'
                    : spot.complaints >= 20
                    ? '#F97316'
                    : spot.complaints >= 15
                    ? '#D4A84F'
                    : '#71844A';

                return (
                  <g
                    key={spot.id}
                    transform={`translate(${spot.x * 10}, ${spot.y * 6})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    {/* Pulsing ring */}
                    <circle
                      r={spot.complaints >= 30 ? 22 : 16}
                      fill={markerColor}
                      fillOpacity={isSelected ? 0.35 : 0.18}
                      className="animate-pulse"
                    />

                    {/* Outer border circle */}
                    <circle
                      r={spot.complaints >= 30 ? 16 : 13}
                      fill="#050A0C"
                      stroke={isSelected ? '#D4A84F' : markerColor}
                      strokeWidth={isSelected ? 2.5 : 1.8}
                    />

                    {/* Number Count Text */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#F5F5F0"
                      fontSize={spot.complaints >= 30 ? 11 : 9.5}
                      fontWeight="bold"
                    >
                      {spot.complaints}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#9FB1BC] pt-2 border-t border-[#1A2E3B]/80">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#D4A84F]" />
              Click any campus zone or marker to inspect location diagnostics
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]" /> High (30+)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F97316]" /> Medium (20+)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#71844A]" /> Low (&lt;20)</span>
            </div>
          </div>
        </div>

        {/* Selected Location Diagnostic Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-[#07121A] border border-[#1A2E3B] rounded-xl p-4.5 space-y-3.5 shadow-md">
          <div className="flex items-start justify-between gap-2 border-b border-[#1A2E3B] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                Hotspot Inspector
              </span>
              <h3 className="text-base font-bold text-[#F5F5F0] mt-0.5">
                {selectedHotspot.name}
              </h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide border ${
                selectedHotspot.intensity === 'high'
                  ? 'bg-red-500/15 text-red-400 border-red-500/30'
                  : selectedHotspot.intensity === 'medium'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-[#315C3A]/25 text-[#10B981] border-[#315C3A]'
              }`}
            >
              {selectedHotspot.intensity} Intensity
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center py-2">
            <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
              <span className="text-[10px] text-[#9FB1BC] block">Total Incidents</span>
              <span className="text-xl font-extrabold text-[#D4A84F]">
                {selectedHotspot.complaints}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
              <span className="text-[10px] text-[#9FB1BC] block">Campus Share</span>
              <span className="text-xl font-extrabold text-[#F5F5F0]">
                {((selectedHotspot.complaints / 248) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
              <span className="text-[#9FB1BC]">Primary Category:</span>
              <span className="font-semibold text-[#F5F5F0]">{selectedHotspot.primaryCategory}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#13242E]/70 border border-[#1A2E3B] text-xs space-y-1">
            <span className="font-semibold text-[#D4A84F] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Observed Pattern:
            </span>
            <p className="text-[#9FB1BC] text-[11px] leading-relaxed">
              {selectedHotspot.details}
            </p>
          </div>

          <button
            onClick={() => alert(`Navigating to filtered complaints for ${selectedHotspot.name}`)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span>View All {selectedHotspot.name} Complaints</span>
          </button>
        </div>
      </div>
    </div>
  );
}
