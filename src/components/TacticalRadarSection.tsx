'use client';

import React, { useState } from 'react';
import { soundFx } from '@/utils/soundEffects';

interface AnomalyPoint {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  flux: string;
  threat: 'ALPHA' | 'BETA' | 'CRITICAL' | 'NEUTRAL';
  desc: string;
}

export default function TacticalRadarSection() {
  const [activePoint, setActivePoint] = useState<AnomalyPoint | null>(null);

  const points: AnomalyPoint[] = [
    {
      id: 'P1',
      name: 'THE O-GATE VECTOR',
      x: 68,
      y: 42,
      flux: '984.2 TeraJoules',
      threat: 'CRITICAL',
      desc: 'Active gravitational anomaly. Dimensional rift diameter expanding by 0.04% per tidal cycle.',
    },
    {
      id: 'P2',
      name: 'ARYA ONE APEX BEACON',
      x: 18,
      y: 35,
      flux: '142.0 MegaWatts',
      threat: 'NEUTRAL',
      desc: 'Primary telemetry transmitter emitting continuous synchronization bursts toward the ring.',
    },
    {
      id: 'P3',
      name: 'SUBMERGED DELTA SETTLEMENTS',
      x: 38,
      y: 78,
      flux: '12.4 MicroSieverts',
      threat: 'BETA',
      desc: 'Stilt structures constructed from composite scrap. Home to independent salvage cartels.',
    },
    {
      id: 'P4',
      name: 'ECLIPSE MONOLITH RELAY',
      x: 52,
      y: 58,
      flux: '48.9 TeraJoules',
      threat: 'ALPHA',
      desc: 'Sub-surface quantum resonance anchor preventing complete spacetime detachment.',
    },
  ];

  return (
    <section
      id="timeline"
      style={{
        padding: '80px 32px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--hud-cyan)',
              letterSpacing: '2px',
              marginBottom: '8px',
            }}
          >
            TOPOLOGICAL SURVEILLANCE // SECTOR 3
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '3px',
            }}
          >
            TACTICAL RECON GRID
          </h2>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--hud-cyan-dim)',
          }}
        >
          INTERACTIVE: CLICK RADAR WAYPOINTS TO SCAN
        </div>
      </div>

      {/* Grid Canvas Map */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '460px',
          background: 'radial-gradient(ellipse at center, rgba(6, 20, 34, 0.9) 0%, rgba(3, 7, 12, 0.98) 100%)',
          border: '1px solid var(--hud-cyan-border)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.08), inset 0 0 40px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Tactical Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Range Circles */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px dashed rgba(0, 240, 255, 0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            pointerEvents: 'none',
          }}
        />

        {/* Sweep Scanline */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--hud-cyan), transparent)',
            boxShadow: '0 0 15px var(--hud-cyan)',
            animation: 'scanVertical 8s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Waypoints */}
        {points.map((pt) => {
          const isSelected = activePoint?.id === pt.id;
          return (
            <div
              key={pt.id}
              onClick={() => {
                soundFx.playRadarPing();
                setActivePoint(pt);
              }}
              onMouseEnter={() => soundFx.playHover()}
              style={{
                position: 'absolute',
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              {/* Outer pulsing ping */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  border: `1px solid ${
                    pt.threat === 'CRITICAL' ? 'var(--hud-amber)' : 'var(--hud-cyan)'
                  }`,
                  animation: 'pulseGlow 2s infinite',
                  opacity: 0.6,
                }}
              />

              {/* Waypoint diamond */}
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  background: isSelected
                    ? 'var(--hud-cyan)'
                    : pt.threat === 'CRITICAL'
                    ? 'var(--hud-amber)'
                    : 'rgba(5, 15, 25, 0.9)',
                  border: `2px solid ${
                    pt.threat === 'CRITICAL' ? 'var(--hud-amber)' : 'var(--hud-cyan)'
                  }`,
                  transform: 'rotate(45deg)',
                  boxShadow: `0 0 10px ${
                    pt.threat === 'CRITICAL' ? 'var(--hud-amber)' : 'var(--hud-cyan)'
                  }`,
                  transition: 'all 0.2s',
                }}
              />

              {/* Waypoint label */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: isSelected ? '#ffffff' : 'rgba(200, 230, 240, 0.7)',
                  background: 'rgba(3, 8, 14, 0.85)',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  border: '1px solid var(--hud-cyan-border)',
                }}
              >
                {pt.name}
              </div>
            </div>
          );
        })}

        {/* Detailed Anomaly Readout Panel when waypoint clicked */}
        {activePoint && (
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              maxWidth: '380px',
              background: 'rgba(4, 12, 22, 0.95)',
              border: '1.5px solid var(--hud-cyan)',
              padding: '20px',
              borderRadius: '3px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
              zIndex: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
              }}
            >
              <span style={{ color: 'var(--hud-cyan)', fontWeight: 700 }}>
                TARGET ACQUIRED: {activePoint.id}
              </span>
              <button
                onClick={() => setActivePoint(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '18px',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              {activePoint.name}
            </h4>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--hud-cyan-dim)',
                marginBottom: '10px',
              }}
            >
              ENERGY FLUX: <span style={{ color: '#fff' }}>{activePoint.flux}</span>
            </div>

            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'rgba(210, 235, 245, 0.85)',
              }}
            >
              {activePoint.desc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
