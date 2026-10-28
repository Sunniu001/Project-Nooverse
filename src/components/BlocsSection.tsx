'use client';

import React, { useState } from 'react';
import { soundFx } from '@/utils/soundEffects';

export default function BlocsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const blocs = [
    {
      name: 'TERRA VANGUARD',
      role: 'SOVEREIGN DEFENSE COALITION',
      sigil: '⚔',
      influence: '44% SECTOR CONTROL',
      color: 'var(--hud-cyan)',
      description:
        'The heavily armored militarized division maintaining the outer barricade around the ring. Equipped with railgun interceptors and heavy mech patrols.',
    },
    {
      name: 'NOO QUANTUM INITIATIVE',
      role: 'RESEARCH & EXOPLANETARY CORPS',
      sigil: '⚛',
      influence: '32% SECTOR CONTROL',
      color: '#38bdf8',
      description:
        'A consortium of physicists and synth-intel researchers attempting to decode the gravitational harmonic frequencies emitted by the gateway.',
    },
    {
      name: 'VOID DRIFTERS',
      role: 'WETLAND RECLAIMERS & SCAVENGERS',
      sigil: '◈',
      influence: '18% SECTOR CONTROL',
      color: 'var(--hud-amber)',
      description:
        'Indigenous marshland survivalists and high-speed skiff pilots. They salvage raw exotic matter leaking from the portal water reflections.',
    },
    {
      name: 'AETHER SYNDICATE',
      role: 'COVERT DATA BROKERS',
      sigil: '✦',
      influence: '06% CLANDESTINE',
      color: 'var(--hud-crimson)',
      description:
        'Underground operatives smuggling dimensional artifacts and encrypted planetary transmission packets to off-world black markets.',
    },
  ];

  return (
    <section
      id="blocs"
      style={{
        padding: 'clamp(24px, 4vh, 60px) 32px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--hud-cyan)',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}
        >
          SECTOR 3 FACTIONS // POLARITY INDEX
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
          CONTROLLING BLOCS
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {blocs.map((bloc, idx) => (
          <div
            key={bloc.name}
            onMouseEnter={() => {
              setHoveredIndex(idx);
              soundFx.playHover();
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: 'rgba(5, 14, 24, 0.75)',
              border: `1px solid ${hoveredIndex === idx ? bloc.color : 'var(--hud-cyan-border)'}`,
              padding: '24px',
              borderRadius: '3px',
              transition: 'all 0.25s ease',
              transform: hoveredIndex === idx ? 'translateY(-4px)' : 'none',
              boxShadow:
                hoveredIndex === idx
                  ? `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${bloc.color}33`
                  : 'none',
              backdropFilter: 'blur(8px)',
              position: 'relative',
            }}
          >
            {/* Top corner color indicator */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '20px',
                right: '20px',
                height: '2px',
                background: bloc.color,
                opacity: hoveredIndex === idx ? 1 : 0.4,
              }}
            />

            <div
              style={{
                fontSize: '28px',
                color: bloc.color,
                marginBottom: '14px',
              }}
            >
              {bloc.sigil}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '4px',
                letterSpacing: '1px',
              }}
            >
              {bloc.name}
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--hud-cyan-dim)',
                letterSpacing: '1px',
                marginBottom: '14px',
              }}
            >
              {bloc.role}
            </div>

            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'rgba(200, 225, 235, 0.75)',
                marginBottom: '18px',
              }}
            >
              {bloc.description}
            </p>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: bloc.color,
                fontWeight: 600,
                letterSpacing: '1px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '12px',
              }}
            >
              {bloc.influence}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
