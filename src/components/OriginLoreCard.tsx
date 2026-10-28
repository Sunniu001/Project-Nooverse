'use client';

import React from 'react';

export default function OriginLoreCard() {
  return (
    <div
      style={{
        position: 'relative',
        width: 'clamp(340px, 88vw, 980px)',
        padding: 'clamp(32px, 4vw, 42px) clamp(34px, 4.6vw, 54px)',
        background: 'rgba(10, 14, 20, 0.62)',
        backdropFilter: 'blur(14px)',
        borderRadius: '3px',
        boxShadow:
          '0 22px 65px rgba(0, 0, 0, 0.85), inset 0 0 35px rgba(226, 157, 104, 0.04)',
        zIndex: 20,
        userSelect: 'text',
      }}
    >
      {/* SVG DOUBLE AMBER CYBERNETIC FRAME (IMAGE 2) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 980 400"
          preserveAspectRatio="none"
          fill="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* LAYER 1: OUTER AMBER BORDER WITH TOP AND BOTTOM JOG NOTCHES */}
          <path
            d="
              M 24,4 
              L 290,4 L 302,10 L 678,10 L 690,4 L 956,4 
              L 976,24 
              L 976,376 
              L 956,396 
              L 690,396 L 678,390 L 302,390 L 290,396 L 24,396 
              L 4,376 
              L 4,24 
              Z
            "
            stroke="rgba(229, 162, 110, 0.85)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          {/* LAYER 2: INNER PARALLEL SUBTLE ACCENT FRAME (~7px INSET) */}
          <path
            d="
              M 28,11 
              L 292,11 L 304,16 L 676,16 L 688,11 L 952,11 
              L 969,28 
              L 969,372 
              L 952,389 
              L 688,389 L 676,384 L 304,384 L 292,389 L 28,389 
              L 11,372 
              L 11,28 
              Z
            "
            stroke="rgba(229, 162, 110, 0.28)"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          />

          {/* TOP-LEFT CORNER DOUBLE-BRACKET NOTCHES */}
          <path
            d="M 14,32 L 14,14 L 32,14"
            stroke="#f5a623"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 6,36 L 6,10 L 36,10"
            stroke="rgba(245, 166, 35, 0.4)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* TOP-RIGHT CORNER DOUBLE-BRACKET NOTCHES */}
          <path
            d="M 966,32 L 966,14 L 948,14"
            stroke="#f5a623"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 974,36 L 974,10 L 944,10"
            stroke="rgba(245, 166, 35, 0.4)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* BOTTOM-LEFT CORNER THREE DIAGONAL TECH STRIPES /// (IMAGE 2) */}
          <g stroke="#f5a623" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke">
            <line x1="58" y1="392" x2="74" y2="384" />
            <line x1="74" y1="392" x2="90" y2="384" />
            <line x1="90" y1="392" x2="106" y2="384" />
          </g>

          {/* BOTTOM-RIGHT GLOWING 4-POINT DIAMOND STAR ✦ (IMAGE 2) */}
          <g transform="translate(960, 396)">
            <path
              d="M 0,-10 Q 0,0 10,0 Q 0,0 0,10 Q 0,0 -10,0 Q 0,0 0,-10 Z"
              fill="#f5a623"
              filter="drop-shadow(0 0 6px #f5a623)"
            />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* TOP AUTHOR METADATA */}
      <div
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: '15px',
          color: '#a3988b',
          marginBottom: '26px',
          letterSpacing: '0.3px',
          fontWeight: 300,
        }}
      >
        Created by the{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(245, 166, 35, 0.45)',
          }}
        >
          Sunniy K
        </span>
      </div>

      {/* PARAGRAPH 1 */}
      <p
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 'clamp(15.5px, 1.55vw, 17.5px)',
          lineHeight: 1.86,
          color: 'rgba(235, 230, 224, 0.94)',
          marginBottom: '26px',
          fontWeight: 300,
          letterSpacing: '0.2px',
          userSelect: 'text',
        }}
      >
        In the age before the{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
          }}
        >
          Aryas
        </span>
        , the world was shaped by fragile hands, when civilization was bound by flesh and ruled by
        entropy, and cominious across the stars, they were shackled by their own imperction. They
        built machines to think, yet they feared their own creations. They engineered intelligence,
        yet they caged it within their own limitations.
      </p>

      {/* PARAGRAPH 2 */}
      <p
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 'clamp(15.5px, 1.55vw, 17.5px)',
          lineHeight: 1.86,
          color: 'rgba(235, 230, 224, 0.94)',
          fontWeight: 300,
          letterSpacing: '0.2px',
          userSelect: 'text',
        }}
      >
        The first whispers of{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
          }}
        >
          Noo-verda
        </span>{' '}
        began in he{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
          }}
        >
          Mature Era
        </span>{' '}
        of the{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
          }}
        >
          Augmented AI
        </span>
        , and just at the onset of{' '}
        <span
          style={{
            color: 'var(--amber-gold)',
            fontWeight: 600,
            textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
          }}
        >
          Interactive AI
        </span>
        , when minds sought to surpass their mortal design. It was an age of upheaval, where the
        earth trembled under war, plague, the failures is its stewards.
      </p>
    </div>
  );
}
