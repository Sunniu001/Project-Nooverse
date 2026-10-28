'use client';

import React, { useState } from 'react';
import { soundFx } from '@/utils/soundEffects';

export default function LoreArchive() {
  const [selectedTopic, setSelectedTopic] = useState(0);

  const topics = [
    {
      id: 'ring',
      code: 'ANOMALY-001',
      title: 'THE O-GATE / VOID RING',
      classification: 'LEVEL 5 TRANSCENDENT',
      coordinates: '23.4121° N, 85.3240° E',
      summary:
        'A megastructure ring measuring 840 meters in diameter, mysteriously activated along the floodplains of Sector 3 at dawn. It manifests an unstable wormhole gateway into the alternate dimensional manifold designated as the Nooverse.',
      details: [
        'Mass: Estimated 14.2 Million Metric Tons of zero-point composite alloy',
        'Energy Flux: Harmonic resonance peaked at 1.420 GHz (The Hydrogen Line)',
        'Observation: The inner aperture bends local spacetime, projecting alternate solar illumination even during Earth sunset.',
      ],
      status: 'ACTIVE APERTURE',
      accent: 'var(--hud-amber)',
    },
    {
      id: 'spire',
      code: 'STRUCTURE-042',
      title: 'ARYA ONE TOWER COMPLEX',
      classification: 'INDUSTRIAL SOVEREIGNTY',
      coordinates: '23.4502° N, 85.2910° E',
      summary:
        'The primary atmospheric extraction tower dominating the eastern skyline. Built in 2058 to scrub toxic monsoon aerosol emissions, it now serves as the primary observation and telemetry relay anchoring the perimeter defense grid.',
      details: [
        'Height: 1,120 Meters above sea level',
        'Power Source: Geothermal siphoning coupled with sub-surface ion generators',
        'Current Role: Intercepting gravitational distortion waves emitted by the O-Gate',
      ],
      status: 'TRANSMITTING',
      accent: 'var(--hud-cyan)',
    },
    {
      id: 'sector',
      code: 'TERRITORY-SEC3',
      title: 'THE FLOODED DELTA (INDIA 2070)',
      classification: 'HABITATION ZONE // RESTRICTED',
      coordinates: 'SECTOR 3 SUB-BASIN',
      summary:
        'Submerged wetlands, forgotten stilt settlements, and neon-lit salvage hubs clustered beneath the shadow of the colossal ring. Here, scavengers and engineers harvest dimensional spallation particles washing into the waters.',
      details: [
        'Water Salinity: Elevated heavy isotope contaminants (Deuterium traces)',
        'Population: 42,000 registered scavengers, research personnel, and synth-pilots',
        'Climate: Perpetual twilight haze with electromagnetic auroral storms',
      ],
      status: 'MONITORED',
      accent: 'var(--hud-cyan)',
    },
  ];

  return (
    <section
      id="lore"
      style={{
        padding: '100px 32px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Section Header with Sci-Fi HUD Bracket */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '50px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--hud-cyan)',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}
        >
          <span style={{ width: '8px', height: '8px', background: 'var(--hud-cyan)' }} />
          SEC_ARCHIVE // DIRECTORY 07
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '4px',
            lineHeight: 1.2,
          }}
        >
          SECTOR 3 DECLASSIFIED LORE
        </h2>

        <p
          style={{
            color: 'rgba(200, 225, 235, 0.7)',
            maxWidth: '680px',
            marginTop: '12px',
            fontSize: '15px',
            lineHeight: 1.6,
          }}
        >
          Intercepted transmission logs, atmospheric analyses, and topological surveys of the
          anomalous ring convergence zone.
        </p>
      </div>

      {/* Interactive Dossier Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {topics.map((t, idx) => {
          const isSelected = selectedTopic === idx;
          return (
            <div
              key={t.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedTopic(idx);
              }}
              onMouseEnter={() => soundFx.playHover()}
              style={{
                position: 'relative',
                background: isSelected ? 'rgba(8, 22, 38, 0.85)' : 'rgba(4, 12, 20, 0.65)',
                border: `1px solid ${isSelected ? t.accent : 'var(--hud-cyan-border)'}`,
                padding: '28px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isSelected
                  ? `0 0 25px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05)`
                  : 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Corner tech marks */}
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '-1px',
                  width: '12px',
                  height: '12px',
                  borderTop: `2px solid ${t.accent}`,
                  borderRight: `2px solid ${t.accent}`,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: t.accent,
                  letterSpacing: '1.5px',
                }}
              >
                <span>{t.code}</span>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: '2px',
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid var(--hud-cyan-border)',
                  }}
                >
                  {t.status}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                }}
              >
                {t.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--hud-cyan-dim)',
                  marginBottom: '14px',
                }}
              >
                LOC: {t.coordinates}
              </div>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: 'rgba(210, 230, 240, 0.8)',
                  marginBottom: '20px',
                }}
              >
                {t.summary}
              </p>

              {/* Expandable technical breakdown */}
              <div
                style={{
                  borderTop: '1px solid rgba(0, 240, 255, 0.15)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {t.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      color: 'rgba(180, 210, 225, 0.75)',
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ color: t.accent }}>▸</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
