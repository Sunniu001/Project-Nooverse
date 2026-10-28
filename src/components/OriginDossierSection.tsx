'use client';

import React from 'react';

interface OriginDossierProps {
  onOpenMenu?: () => void;
}

export default function OriginDossierSection({ onOpenMenu }: OriginDossierProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px clamp(16px, 3.5vw, 48px) 24px clamp(16px, 3.5vw, 48px)',
        boxSizing: 'border-box',
        userSelect: 'text',
        overflow: 'hidden',
      }}
    >
      {/* ============================================================== */}
      {/* 1. TOP OUTER CYBERNETIC FRAMING SVG LINE (IMAGE 2)            */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '28px',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      >
        <svg
          viewBox="0 0 1024 28"
          preserveAspectRatio="none"
          fill="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* Subtle outer amber framing runner spanning across top */}
          <path
            d="M 12,20 L 330,20 L 345,10 L 679,10 L 694,20 L 1012,20"
            stroke="rgba(226, 157, 104, 0.45)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Micro bracket notches at left and right edges */}
          <line x1="12" y1="20" x2="12" y2="28" stroke="rgba(226, 157, 104, 0.5)" strokeWidth="1.5" />
          <line x1="1012" y1="20" x2="1012" y2="28" stroke="rgba(226, 157, 104, 0.5)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. TOP HEADER ROW: LOGO IN CENTER                             */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1050px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(55px, 7.5vh, 80px)',
          zIndex: 25,
        }}
      >
        {/* CENTERPIECE: PROJECT N O [Moon-O] V E R S E */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(14px, 2.2vw, 26px)',
            }}
          >
            {/* 'PROJECT' in crisp white with tracked spacing */}
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                fontWeight: 300,
                letterSpacing: 'clamp(10px, 1.3vw, 15px)',
                color: '#ffffff',
                paddingLeft: 'clamp(10px, 1.3vw, 15px)', // balance trailing letter-spacing
                textTransform: 'uppercase',
              }}
            >
              PROJECT
            </span>

            {/* 'N O [Moon-O] V E R S E' matching Image 3 in pure white */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(18px, 2.1vw, 24px)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>N</span>
              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>O</span>

              {/* CELESTIAL MOON SYMBOL WITH WHITE DOT (MATCHING IMAGE 3) */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(20px, 2.2vw, 26px)',
                  height: 'clamp(20px, 2.2vw, 26px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 'clamp(7px, 0.9vw, 11px)',
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                >
                  {/* Right circular arc of the O */}
                  <path
                    d="M 50,6 A 44,44 0 0,1 50,94"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Left outer arc of the O */}
                  <path
                    d="M 50,94 A 44,44 0 0,1 32,8"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Orbital loop trajectory passing through to the moon */}
                  <path
                    d="M 32,8 C 18,20 16,40 22,54 C 26,64 36,80 50,94"
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="1.3"
                  />

                  {/* Satellite node at ~11 o'clock */}
                  <g transform="translate(32, 8)">
                    <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#ffffff" strokeWidth="0.8" />
                  </g>

                  {/* Solid White Celestial Moon Dot */}
                  <circle
                    cx="22"
                    cy="54"
                    r="4.8"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))"
                  />
                </svg>
              </div>

              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>V</span>
              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>E</span>
              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>R</span>
              <span style={{ marginRight: 'clamp(7px, 0.9vw, 11px)' }}>S</span>
              <span>E</span>
            </div>
          </div>

          {/* Centered micro divider line with diamond (Image 1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '240px',
              marginTop: '8px',
              opacity: 0.65,
            }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(229, 162, 110, 0.6))',
              }}
            />
            <div
              style={{
                width: '4px',
                height: '4px',
                background: '#e5a26e',
                transform: 'rotate(45deg)',
                margin: '0 8px',
                boxShadow: '0 0 4px #e5a26e',
              }}
            />
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to left, transparent, rgba(229, 162, 110, 0.6))',
              }}
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CENTRAL CYBERNETIC LORE CARD (EXACT FONT, SIZE & DOUBLE FRAME) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(320px, 72vw, 920px)',
          padding: 'clamp(28px, 3.5vw, 40px) clamp(30px, 4.2vw, 50px)',
          background: 'rgba(10, 14, 20, 0.62)',
          backdropFilter: 'blur(14px)',
          borderRadius: '3px',
          boxShadow:
            '0 22px 65px rgba(0, 0, 0, 0.85), inset 0 0 35px rgba(226, 157, 104, 0.04)',
          zIndex: 20,
          margin: 'auto 0',
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

        {/* TOP AUTHOR METADATA (EXACT FONT & COLOR FROM IMAGE 2) */}
        <div
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: '16px',
            color: '#a3988b',
            marginBottom: '26px',
            letterSpacing: '0.3px',
            fontWeight: 300,
            userSelect: 'text',
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

        {/* PARAGRAPH 1 (LARGER FONT & LINE-HEIGHT: SELECTABLE) */}
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

        {/* PARAGRAPH 2 (LARGER FONT & LINE-HEIGHT: SELECTABLE) */}
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

      {/* ============================================================== */}
      {/* 4. BOTTOM ACCENT LINE RUNNER: ————— [   ] ————— (IMAGE 2)       */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          opacity: 0.75,
        }}
      >
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(229, 162, 110, 0.6))',
          }}
        />
        <div
          style={{
            width: '42px',
            height: '2px',
            background: '#e5a26e',
            margin: '0 10px',
            boxShadow: '0 0 6px rgba(229, 162, 110, 0.8)',
          }}
        />
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(229, 162, 110, 0.6))',
          }}
        />
      </div>
    </div>
  );
}
