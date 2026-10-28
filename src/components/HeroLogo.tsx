'use client';

import React from 'react';

export default function HeroLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* Subtitle: P R O J E C T (Exact font, weight, and letter spacing matching reference) */}
      <div
        style={{
          fontFamily: 'var(--font-logo)',
          fontSize: 'clamp(12px, 1.4vw, 15px)',
          fontWeight: 300,
          letterSpacing: '20px',
          color: 'rgba(245, 250, 252, 0.92)',
          marginBottom: '6px',
          paddingLeft: '20px', // Compensate for trailing letter-spacing to remain centered
          textTransform: 'uppercase',
        }}
      >
        PROJECT
      </div>

      {/* Main Title: N O [O-Moon] V E R S E */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-logo)',
          fontSize: 'clamp(36px, 4.6vw, 54px)',
          fontWeight: 300,
          color: '#ffffff',
          lineHeight: 1,
        }}
      >
        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>N</span>
        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>O</span>

        {/* CUSTOM MOON SHAPED 'O' (EXACTLY MATCHING IMAGE 1) */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(38px, 4.8vw, 56px)',
            height: 'clamp(38px, 4.8vw, 56px)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 'clamp(10px, 1.4vw, 16px)',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            {/* 1. Right circular arc of the O */}
            <path
              d="M 50,6 A 44,44 0 0,1 50,94"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* 2. Left outer arc of the O */}
            <path
              d="M 50,94 A 44,44 0 0,1 32,8"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* 3. Inward orbital loop trajectory passing to the moon */}
            <path
              d="M 32,8 C 18,20 16,40 22,54 C 26,64 36,80 50,94"
              stroke="rgba(240, 248, 252, 0.7)"
              strokeWidth="1.2"
              strokeDasharray="100"
            />

            {/* 4. Top satellite node at ~11 o'clock */}
            <g transform="translate(32, 8)">
              {/* Satellite core pip */}
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
              {/* Micro crosshair / satellite solar panels */}
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#ffffff" strokeWidth="0.8" />
            </g>

            {/* 5. Solid White Celestial Moon Dot sitting on the orbital trajectory */}
            <circle
              cx="22"
              cy="54"
              r="4.8"
              fill="#ffffff"
              filter="drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))"
            />
          </svg>
        </div>

        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>V</span>
        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>E</span>
        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>R</span>
        <span style={{ marginRight: 'clamp(10px, 1.4vw, 16px)' }}>S</span>
        <span>E</span>
      </div>
    </div>
  );
}
