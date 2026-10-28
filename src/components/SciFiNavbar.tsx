'use client';

import React from 'react';
import { soundFx } from '@/utils/soundEffects';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTerminal: () => void;
  onSelectSection?: (index: number) => void;
}

export default function SciFiNavbar({
  activeTab,
  setActiveTab,
  onOpenTerminal,
  onSelectSection,
}: NavbarProps) {
  const navItems = ['HOME', 'ORIGIN', 'BEFORE', 'TIMELINE'];

  const handleNavClick = (item: string, index: number) => {
    soundFx.playClick();
    setActiveTab(item);
    if (onSelectSection) {
      onSelectSection(index);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {/* TOP-LEFT CIRCULAR EMBLEM & GUIDE LINE (ANIMATING ORBIT SATELLITE: IMAGE 3) */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
          }}
        >
          {/* Outer circle */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid var(--hud-line)',
            }}
          />
          {/* Inner circle */}
          <div
            style={{
              position: 'absolute',
              inset: '7px',
              borderRadius: '50%',
              border: '1px solid var(--hud-line-bright)',
            }}
          />
          {/* Smoothly Orbiting Satellite Dot (Image 3) */}
          <div
            style={{
              position: 'absolute',
              inset: '7px',
              borderRadius: '50%',
              animation: 'orbitSpin 5s linear infinite',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-2.5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 5px #ffffff, 0 0 8px rgba(185, 230, 248, 0.95)',
              }}
            />
          </div>
        </div>

        {/* 1px horizontal guide line extending right */}
        <div
          style={{
            width: '70px',
            height: '1px',
            background: 'linear-gradient(90deg, var(--hud-line), transparent)',
          }}
        />
      </div>

      {/* CENTER HUD MENU BAR - REDUCED TOP GAP (IMAGE 2) & DARKER BACKDROP */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
          width: 'clamp(580px, 52vw, 680px)',
        }}
      >
        {/* SVG Trace Line + Darker Translucent Background Fill (Image 2 & 5) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '48px',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 680 48"
            fill="none"
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))',
            }}
          >
            {/* Darker Background Polygon Fill inside the chamfer jog */}
            <polygon
              points="48,10 84,42 596,42 632,10"
              fill="rgba(4, 10, 18, 0.88)"
            />

            {/* Continuous 1px circuit trace line */}
            <path
              d="M 0,10 L 48,10 L 84,42 L 596,42 L 632,10 L 680,10"
              stroke="var(--hud-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Left 45-degree glowing accent capsule */}
            <line
              x1="61"
              y1="21"
              x2="72"
              y2="32"
              stroke="#e8f8fc"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 3px rgba(185, 230, 248, 0.85))"
            />

            {/* Right 45-degree glowing accent capsule */}
            <line
              x1="619"
              y1="21"
              x2="608"
              y2="32"
              stroke="#e8f8fc"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 3px rgba(185, 230, 248, 0.85))"
            />
          </svg>
        </div>

        {/* Menu Items Row with Generous Left & Right Padding */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(18px, 2.4vw, 36px)',
            padding: '10px clamp(76px, 7.8vw, 98px) 14px clamp(76px, 7.8vw, 98px)',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}
        >
          {navItems.map((item, index) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item, index)}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  background: 'none',
                  border: 'none',
                  position: 'relative',
                  padding: '4px 6px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '3.5px',
                  color: isActive ? '#ffffff' : 'var(--hud-text-faint)',
                  transition: 'color 0.2s ease, text-shadow 0.2s ease',
                  textShadow: isActive
                    ? '0 0 8px rgba(255, 255, 255, 0.6), 0 0 14px rgba(185, 230, 248, 0.4)'
                    : 'none',
                }}
              >
                {item}

                {/* Exact Active Underline with Center Dot: ——●—— */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--hud-line-bright)',
                      }}
                    />
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 5px #ffffff, 0 0 8px rgba(185, 230, 248, 0.8)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Top right space is now reserved for the persistent Background Audio Play/Pause controller */}
    </header>
  );
}
