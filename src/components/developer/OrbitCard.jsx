import React, { useState } from 'react';
import FloatingCard from './FloatingCard';

/**
 * OrbitCard — 4-layer orbiting card architecture
 * 1. Orbit path track (rotates around center)
 * 2. Position wrapper (anchored at radius X/Y and angle)
 * 3. Counter-rotation wrapper (cancels rotation to keep text horizontal & readable)
 * 4. FloatingCard (renders glassmorphic card with hover pause, lift, scale & glow)
 */
export default function OrbitCard({
  radiusX = 220,
  radiusY = 200,
  initialAngle = 0, // in degrees
  duration = 20, // in seconds
  reverse = false, // false = clockwise, true = counter-clockwise
  isVisible = true,
  cardProps,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Compute (x, y) offset on the ellipse based on initialAngle
  const rad = (initialAngle * Math.PI) / 180;
  const x = Math.round(radiusX * Math.cos(rad));
  const y = Math.round(radiusY * Math.sin(rad));

  const trackAnimation = reverse ? 'orbitSpinReverse' : 'orbitSpin';
  const counterAnimation = reverse ? 'orbitSpin' : 'orbitSpinReverse';
  const playState = !isVisible || isHovered ? 'paused' : 'running';

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        animation: `${trackAnimation} ${duration}s linear infinite`,
        animationPlayState: playState,
      }}
    >
      {/* 2. Position Wrapper */}
      <div
        className="absolute pointer-events-auto"
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
      >
        {/* 3. Counter-Rotation Wrapper */}
        <div
          style={{
            animation: `${counterAnimation} ${duration}s linear infinite`,
            animationPlayState: playState,
          }}
        >
          {/* 4. Floating Card */}
          <FloatingCard
            {...cardProps}
            isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </div>
    </div>
  );
}
