'use client';

import React from 'react';
import HeroLogo from './HeroLogo';

interface HeroSectionProps {
  parallaxOffset: { x: number; y: number };
  activeSection: number;
  onSelectSection: (index: number) => void;
}

export default function HeroSection({
  parallaxOffset,
  activeSection,
  onSelectSection,
}: HeroSectionProps) {
  const isHeroActive = activeSection === 0;

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* CENTERPIECE: PROJECT NOOVERSE / TORPA TITLE IN THE SKY (IMAGE 1) */}
      <div
        style={{
          position: 'absolute',
          top: '13.5%',
          left: '50%',
          transform: `translate(calc(-50% + ${parallaxOffset.x * 18}px), ${
            parallaxOffset.y * 14
          }px) perspective(900px) rotateY(${parallaxOffset.x * 3.5}deg) rotateX(${
            -parallaxOffset.y * 3.5
          }deg)`,
          opacity: 1,
          zIndex: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <HeroLogo />
      </div>

      {/* SUBTLE SCROLL HELPER HINT AT BOTTOM OF HERO */}
      <div
        onClick={() => onSelectSection(1)}
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          opacity: 0.75,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '2px',
            color: 'var(--hud-text-dim)',
          }}
        >
          SCROLL TO INITIALIZE ARCHIVE
        </span>
        <span style={{ fontSize: '12px', color: '#ffffff', animation: 'dashScan 1.8s infinite' }}>
          ↓
        </span>
      </div>
    </section>
  );
}
