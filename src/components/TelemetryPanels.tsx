'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TelemetryProps {
  activeSection?: number;
  totalSections?: number;
  onSelectSection?: (index: number) => void;
}

export default function TelemetryPanels({
  activeSection = 0,
  totalSections = 5,
  onSelectSection,
}: TelemetryProps) {
  const [timeStr, setTimeStr] = useState('05:42:17');
  const [scrollProgress, setScrollProgress] = useState(0);
  const gaugeRef = useRef<SVGSVGElement>(null);

  // Live ticking sci-fi clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeStr(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update scrollProgress whenever activeSection changes
  useEffect(() => {
    if (totalSections > 1) {
      setScrollProgress(activeSection / (totalSections - 1));
    }
  }, [activeSection, totalSections]);

  // Allow clicking on the gauge scale to switch section
  const handleGaugeClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = gaugeRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const progress = Math.min(Math.max((clickY - 10) / (rect.height - 20), 0), 1);
    const targetIdx = Math.round(progress * (totalSections - 1));
    if (onSelectSection) {
      onSelectSection(targetIdx);
    }
  };

  // Cursor indicator Y on the 10 -> 170 ladder line
  const cursorY = 10 + scrollProgress * (170 - 10);

  return (
    <>
      {/* ============================================================== */}
      {/* LEFT HUD ELEMENTS - BOUND TO HERO (HIDDEN ON SCROLL: IMAGE 3)  */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'fixed',
          top: '76px',
          left: '36px',
          bottom: '36px',
          width: '240px',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 40,
          userSelect: 'none',
        }}
      >
        {/* Top-Left Telemetry Text Block */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '2.5px',
              color: 'var(--hud-white)',
              marginBottom: '3px',
              textShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
            }}
          >
            ARYA ONE
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '1.2px',
              color: 'var(--hud-text-dim)',
              lineHeight: 1.4,
            }}
          >
            23.4121° N
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '1.2px',
              color: 'var(--hud-text-dim)',
              lineHeight: 1.4,
            }}
          >
            85.3240° E
          </div>
        </div>

        {/* Left Vertical Scale Gauge with Arrow Cursor at '00' */}
        <div
          style={{
            position: 'relative',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            margin: '10px 0',
          }}
        >
          {/* Guide Line on far left with white/ice arrow cursor */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '10px',
              bottom: '10px',
              width: '1px',
              background: 'var(--hud-line)',
            }}
          >
            {/* Top guide pip */}
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '-1px',
                width: '3px',
                height: '3px',
                backgroundColor: 'var(--hud-line-bright)',
              }}
            />

            {/* Soft white with slight blue tint arrow cursor at '00' */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '-3px',
                transform: 'translateY(-50%)',
                width: '0',
                height: '0',
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: '7px solid #ffffff',
                filter: 'drop-shadow(0 0 4px rgba(215, 238, 246, 0.8))',
              }}
            />
          </div>

          {/* SVG Calibrated Tick Marks: 100, 50, 00, -50, -100 */}
          <div style={{ marginLeft: '20px', height: '100%' }}>
            <svg
              viewBox="0 0 60 220"
              style={{ height: '100%', width: '60px', overflow: 'visible' }}
            >
              {/* Vertical axis line */}
              <line
                x1="8"
                y1="10"
                x2="8"
                y2="210"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />

              {/* 100 Tick */}
              <line x1="8" y1="10" x2="20" y2="10" stroke="var(--hud-line-bright)" strokeWidth="1" />
              <circle cx="8" cy="10" r="1.5" fill="#ffffff" />
              <text x="26" y="13" fill="var(--hud-text-dim)" fontSize="9" fontFamily="Share Tech Mono" letterSpacing="1">
                100
              </text>

              {/* Sub-ticks between 100 and 50 */}
              <line x1="8" y1="22.5" x2="13" y2="22.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />
              <line x1="8" y1="35" x2="15" y2="35" stroke="var(--hud-line)" strokeWidth="1" />
              <line x1="8" y1="47.5" x2="13" y2="47.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />

              {/* 50 Tick */}
              <line x1="8" y1="60" x2="18" y2="60" stroke="var(--hud-line-bright)" strokeWidth="1" />
              <text x="26" y="63" fill="var(--hud-text-dim)" fontSize="9" fontFamily="Share Tech Mono" letterSpacing="1">
                50
              </text>

              {/* Sub-ticks between 50 and 00 */}
              <line x1="8" y1="72.5" x2="13" y2="72.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />
              <line x1="8" y1="85" x2="15" y2="85" stroke="var(--hud-line)" strokeWidth="1" />
              <line x1="8" y1="97.5" x2="13" y2="97.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />

              {/* 00 Tick */}
              <line x1="8" y1="110" x2="18" y2="110" stroke="var(--hud-line-bright)" strokeWidth="1" />
              <text x="26" y="113" fill="#ffffff" fontSize="9" fontFamily="Share Tech Mono" letterSpacing="1">
                00
              </text>

              {/* Sub-ticks between 00 and -50 */}
              <line x1="8" y1="122.5" x2="13" y2="122.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />
              <line x1="8" y1="135" x2="15" y2="135" stroke="var(--hud-line)" strokeWidth="1" />
              <line x1="8" y1="147.5" x2="13" y2="147.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />

              {/* -50 Tick */}
              <line x1="8" y1="160" x2="18" y2="160" stroke="var(--hud-line-bright)" strokeWidth="1" />
              <text x="26" y="163" fill="var(--hud-text-dim)" fontSize="9" fontFamily="Share Tech Mono" letterSpacing="1">
                -50
              </text>

              {/* Sub-ticks between -50 and -100 */}
              <line x1="8" y1="172.5" x2="13" y2="172.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />
              <line x1="8" y1="185" x2="15" y2="185" stroke="var(--hud-line)" strokeWidth="1" />
              <line x1="8" y1="197.5" x2="13" y2="197.5" stroke="var(--hud-ice-faint)" strokeWidth="1" />

              {/* -100 Tick */}
              <line x1="8" y1="210" x2="20" y2="210" stroke="var(--hud-line-bright)" strokeWidth="1" />
              <circle cx="8" cy="210" r="1.5" fill="#ffffff" />
              <text x="26" y="213" fill="var(--hud-text-dim)" fontSize="9" fontFamily="Share Tech Mono" letterSpacing="1">
                -100
              </text>
            </svg>
          </div>
        </div>

        {/* Bottom-Left Chamfered Telemetry Box */}
        <div
          style={{
            position: 'relative',
            width: '185px',
            padding: '12px 14px 10px 14px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--hud-line)',
            clipPath:
              'polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          {/* Top-right corner accent mark */}
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              width: '8px',
              height: '8px',
              borderTop: '1px solid var(--hud-line-bright)',
              borderRight: '1px solid var(--hud-line-bright)',
            }}
          />

          {/* Coordinate Data Rows */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              rowGap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              lineHeight: 1.3,
            }}
          >
            <span style={{ color: 'var(--hud-text-dim)' }}>LAT</span>
            <span style={{ color: 'var(--hud-white)', letterSpacing: '1px' }}>23.4121° N</span>

            <span style={{ color: 'var(--hud-text-dim)' }}>LON</span>
            <span style={{ color: 'var(--hud-white)', letterSpacing: '1px' }}>85.3240° E</span>

            <span style={{ color: 'var(--hud-text-dim)' }}>ALT</span>
            <span style={{ color: 'var(--hud-white)', letterSpacing: '1px' }}>132 M</span>

            <span style={{ color: 'var(--hud-text-dim)' }}>TIME</span>
            <span style={{ color: 'var(--hud-white)', letterSpacing: '1px' }}>{timeStr}</span>
          </div>

          {/* Segmented status line underneath */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <div style={{ width: '22px', height: '1px', background: 'var(--hud-ice-faint)' }} />
            <div style={{ width: '12px', height: '2px', background: 'var(--hud-line)' }} />
            <div
              style={{
                width: '18px',
                height: '3px',
                background: '#ffffff',
                boxShadow: '0 0 6px rgba(215, 238, 246, 0.8)',
              }}
            />
            <div style={{ width: '12px', height: '2px', background: 'var(--hud-line)' }} />
            <div style={{ width: '22px', height: '1px', background: 'var(--hud-ice-faint)' }} />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT HUD HERO ELEMENTS (BOUND TO HERO: HIDDEN ON SCROLL: IMAGE 4) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'fixed',
          top: '76px',
          right: '36px',
          bottom: '36px',
          width: '180px',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          zIndex: 40,
          userSelect: 'none',
        }}
      >
        {/* Top-Right Location Text Block */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '2.5px',
              color: 'var(--hud-white)',
              marginBottom: '3px',
              textShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
            }}
          >
            EARTH
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '1.5px',
              color: 'var(--hud-text-dim)',
              lineHeight: 1.4,
            }}
          >
            SECTOR 3
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '1.5px',
              color: 'var(--hud-text-dim)',
              lineHeight: 1.4,
            }}
          >
            INDIA
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '2px',
              color: 'var(--hud-text-dim)',
              lineHeight: 1.4,
            }}
          >
            2030
          </div>
        </div>

        {/* Empty space placeholder for where the vertical scrollbar aligns */}
        <div style={{ height: '180px' }} />

        {/* Bottom-Right Tactical Scope / Radar - ANIMATED (IMAGE 4) */}
        <div
          style={{
            position: 'relative',
            width: '128px',
            height: '148px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Circular Radar Graphic */}
          <div
            style={{
              position: 'relative',
              width: '110px',
              height: '110px',
            }}
          >
            <svg
              viewBox="0 0 110 110"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              {/* Outer circle */}
              <circle
                cx="55"
                cy="55"
                r="48"
                fill="none"
                stroke="var(--hud-line-bright)"
                strokeWidth="1"
              />

              {/* Middle circle */}
              <circle
                cx="55"
                cy="55"
                r="30"
                fill="none"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />

              {/* Inner circle */}
              <circle
                cx="55"
                cy="55"
                r="14"
                fill="none"
                stroke="var(--hud-line-bright)"
                strokeWidth="1"
              />

              {/* Crosshairs extending through the circle */}
              <line
                x1="7"
                y1="55"
                x2="103"
                y2="55"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />
              <line
                x1="55"
                y1="7"
                x2="55"
                y2="103"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />

              {/* Rotating inner diamond / star geometry */}
              <g
                style={{
                  transformOrigin: '55px 55px',
                  animation: 'orbitSpin 20s linear infinite',
                }}
              >
                <rect
                  x="29"
                  y="29"
                  width="52"
                  height="52"
                  fill="none"
                  stroke="var(--hud-ice-faint)"
                  strokeWidth="1"
                  transform="rotate(45 55 55)"
                />
                <rect
                  x="34"
                  y="34"
                  width="42"
                  height="42"
                  fill="none"
                  stroke="var(--hud-ice-faint)"
                  strokeWidth="1"
                />
              </g>

              {/* Sweeping 360-degree Radar Scan Beam */}
              <g
                style={{
                  transformOrigin: '55px 55px',
                  animation: 'radarSweep 4s linear infinite',
                }}
              >
                <line
                  x1="55"
                  y1="55"
                  x2="55"
                  y2="7"
                  stroke="#ffffff"
                  strokeWidth="1"
                  filter="drop-shadow(0 0 3px #ffffff)"
                />
                <polygon
                  points="55,55 55,7 85,15"
                  fill="url(#radarGradient)"
                  opacity="0.25"
                />
              </g>

              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Center coordinate pip */}
              <circle cx="55" cy="55" r="2" fill="#ffffff" />

              {/* Pulsing Target Anomaly blip at 12 o'clock on middle ring */}
              <circle
                cx="55"
                cy="25"
                r="3"
                fill="#ffffff"
                stroke="var(--hud-line-bright)"
                strokeWidth="1"
                filter="drop-shadow(0 0 5px #ffffff)"
                style={{
                  animation: 'radarPulse 2s ease-in-out infinite',
                }}
              />

              {/* Angular pointer vector connecting blip */}
              <line
                x1="55"
                y1="25"
                x2="78"
                y2="12"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Framing bracket around radar with bottom chamfer cut */}
          <div
            style={{
              position: 'absolute',
              inset: '-6px -8px 0 -8px',
              pointerEvents: 'none',
            }}
          >
            <svg
              viewBox="0 0 144 148"
              fill="none"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              {/* L-bracket coming down and under radar */}
              <path
                d="M 136,10 L 136,118 L 16,118"
                stroke="var(--hud-line)"
                strokeWidth="1"
              />

              {/* Outer bottom-right corner bounding bracket with chamfer cut */}
              <path
                d="M 142,100 L 142,132 L 126,140 L 100,140"
                stroke="var(--hud-line-bright)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Segmented data dashes below radar with scanning pulse animation */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '3px',
                background: '#ffffff',
                boxShadow: '0 0 4px rgba(215, 238, 246, 0.6)',
                animation: 'dashScan 2s ease-in-out infinite',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '3px',
                background: '#ffffff',
                boxShadow: '0 0 4px rgba(215, 238, 246, 0.6)',
                animation: 'dashScan 2s ease-in-out infinite 0.4s',
              }}
            />
            <div
              style={{
                width: '10px',
                height: '3px',
                background: 'var(--hud-ice-faint)',
                animation: 'dashScan 2s ease-in-out infinite 0.8s',
              }}
            />
            <div
              style={{
                width: '18px',
                height: '3px',
                background: 'var(--hud-ice-faint)',
                animation: 'dashScan 2s ease-in-out infinite 1.2s',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
