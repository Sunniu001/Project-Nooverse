'use client';

import React, { useRef, useState, useEffect } from 'react';

interface HudScrollbarProps {
  activeSection: number;
  totalSections?: number;
  onSelectSection: (index: number) => void;
}

export default function HudScrollbar({
  activeSection,
  totalSections = 7,
  onSelectSection,
}: HudScrollbarProps) {
  const gaugeRef = useRef<SVGSVGElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Position indicator Y along the 10 -> 170 track
  const cursorY = 10 + scrollProgress * (170 - 10);

  // Allow clicking on the gauge scale to switch section
  const handleGaugeClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = gaugeRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickProgress = Math.min(Math.max((clickY - 10) / (rect.height - 20), 0), 1);
    const targetIdx = Math.round(clickProgress * (totalSections - 1));
    onSelectSection(targetIdx);
  };

  // Hide the vertical section scrollbar when in the horizontal Timeline section (section 3)
  const isHidden = activeSection === 3;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '36px',
        transform: 'translateY(-50%)',
        height: '180px',
        width: '32px',
        zIndex: 900,
        pointerEvents: isHidden ? 'none' : 'auto',
        opacity: isHidden ? 0 : 1,
        transition: 'opacity 0.35s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      title="HUD Section Scrollbar: Click to navigate"
    >
      <svg
        ref={gaugeRef}
        onClick={handleGaugeClick}
        viewBox="0 0 32 180"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Main vertical track line */}
        <line
          x1="22"
          y1="10"
          x2="22"
          y2="170"
          stroke="var(--hud-line)"
          strokeWidth="1"
        />

        {/* Top tick and bracket */}
        <line x1="14" y1="10" x2="22" y2="10" stroke="var(--hud-line-bright)" strokeWidth="1" />
        <circle cx="22" cy="10" r="1.5" fill="#ffffff" />
        <rect x="10" y="8.5" width="3" height="3" fill="none" stroke="var(--hud-line)" strokeWidth="1" />

        {/* Calibrated ladder ticks on the left */}
        {[...Array(14)].map((_, i) => (
          <line
            key={i}
            x1={i % 3 === 0 ? "14" : "17"}
            y1={22 + i * 10}
            x2="22"
            y2={22 + i * 10}
            stroke={i % 3 === 0 ? "var(--hud-line-bright)" : "var(--hud-ice-faint)"}
            strokeWidth="1"
          />
        ))}

        {/* REAL-TIME DYNAMIC SCROLL BAR INDICATOR PIP (IMAGE 5) */}
        <rect
          x="25"
          y={cursorY - 4}
          width="5"
          height="8"
          fill="#ffffff"
          filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))"
          style={{
            transition: 'y 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Bottom tick and bracket */}
        <line x1="14" y1="170" x2="22" y2="170" stroke="var(--hud-line-bright)" strokeWidth="1" />
        <circle cx="22" cy="170" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
