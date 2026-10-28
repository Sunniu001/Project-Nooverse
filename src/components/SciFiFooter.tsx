'use client';

import React from 'react';
import { soundFx } from '@/utils/soundEffects';

export default function SciFiFooter() {
  return (
    <footer
      id="about"
      style={{
        borderTop: '1px solid var(--hud-cyan-border)',
        background: 'rgba(3, 8, 14, 0.95)',
        padding: '60px 32px 36px 32px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Top accent glowing line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--hud-cyan-glow), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '3px',
              marginBottom: '12px',
            }}
          >
            PROJECT NOOVERSE
          </div>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(200, 225, 235, 0.7)',
              maxWidth: '340px',
            }}
          >
            An exoplanetary sci-fi exploration initiative documenting the dawn of the dimensional
            portal ring anomaly in Sector 3 (Earth, 2070).
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--hud-cyan)',
              letterSpacing: '2px',
              marginBottom: '14px',
            }}
          >
            QUICK UPLINKS
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-tech)',
            }}
          >
            {['MISSION BRIEFING', 'ARYA ONE TELEMETRY', 'PORTAL HARMONICS', 'SECTOR ATLAS'].map(
              (item) => (
                <a
                  key={item}
                  href="#lore"
                  onMouseEnter={() => soundFx.playHover()}
                  style={{
                    color: 'rgba(200, 225, 235, 0.7)',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--hud-cyan)')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(200, 225, 235, 0.7)')
                  }
                >
                  ▸ {item}
                </a>
              )
            )}
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--hud-cyan)',
              letterSpacing: '2px',
              marginBottom: '14px',
            }}
          >
            RELAY METRICS
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              color: 'rgba(200, 225, 235, 0.65)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div>BEACON: ARYA-1-CONVERGENCE</div>
            <div>LAT/LON: 23.4121° N / 85.3240° E</div>
            <div>ELEVATION: 132M (FLOOD BASIN)</div>
            <div>STATUS: BROADCASTING NOMINAL</div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'rgba(200, 225, 235, 0.5)',
        }}
      >
        <div>PROJECT NOOVERSE © 2070. ALL DIMENSIONAL RIGHTS RESERVED.</div>
        <div style={{ color: 'var(--hud-cyan)' }}>AUTHENTICATION: QUANTUM LEVEL 4</div>
      </div>
    </footer>
  );
}
