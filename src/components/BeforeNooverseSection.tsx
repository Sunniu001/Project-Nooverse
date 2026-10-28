'use client';

import React from 'react';

export default function BeforeNooverseSection() {
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
      {/* 1. TOP OUTER CYBERNETIC FRAMING SVG LINE                      */}
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
          <path
            d="M 12,20 L 330,20 L 345,10 L 679,10 L 694,20 L 1012,20"
            stroke="rgba(226, 157, 104, 0.45)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <line x1="12" y1="20" x2="12" y2="28" stroke="rgba(226, 157, 104, 0.5)" strokeWidth="1.5" />
          <line x1="1012" y1="20" x2="1012" y2="28" stroke="rgba(226, 157, 104, 0.5)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. TOP HEADER ROW: BEFORE NOOVERSE + SUBTITLE                  */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1050px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(55px, 7.5vh, 80px)',
          zIndex: 25,
          userSelect: 'text',
        }}
      >
        {/* Title: B E F O R E   N O [Moon-O] V E R S E */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(14px, 2.2vw, 26px)',
          }}
        >
          {/* 'BEFORE' in crisp white with tracked spacing */}
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
            BEFORE
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

        {/* Subtitle: THE EVENTS THAT CHANGED THE COURSE OF HUMAN CIVILISATION. */}
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(9.5px, 0.95vw, 11.5px)',
            fontWeight: 400,
            letterSpacing: 'clamp(2.5px, 0.3vw, 4px)',
            color: 'rgba(225, 215, 205, 0.72)',
            textTransform: 'uppercase',
            marginTop: '8px',
            textAlign: 'center',
          }}
        >
          THE EVENTS THAT CHANGED THE COURSE OF HUMAN CIVILISATION.
        </div>

        {/* Centered micro divider line with diamond */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '260px',
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

      {/* ============================================================== */}
      {/* 3. CENTRAL CYBERNETIC LORE CARD (TEXT SELECTABLE & BIGGER FONT) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(320px, 72vw, 920px)',
          padding: 'clamp(30px, 3.8vw, 42px) clamp(30px, 4.4vw, 50px)',
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
        {/* SVG DOUBLE AMBER CYBERNETIC FRAME */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 920 420"
            preserveAspectRatio="none"
            fill="none"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            {/* LAYER 1: OUTER AMBER BORDER WITH TOP AND BOTTOM JOG NOTCHES */}
            <path
              d="
                M 24,4 
                L 270,4 L 282,10 L 638,10 L 650,4 L 896,4 
                L 916,24 
                L 916,396 
                L 896,416 
                L 650,416 L 638,410 L 282,410 L 270,416 L 24,416 
                L 4,396 
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
                L 272,11 L 284,16 L 636,16 L 648,11 L 892,11 
                L 909,28 
                L 909,392 
                L 892,409 
                L 648,409 L 636,404 L 284,404 L 272,409 L 28,409 
                L 11,392 
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
              d="M 906,32 L 906,14 L 888,14"
              stroke="#f5a623"
              strokeWidth="1.8"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 914,36 L 914,10 L 884,10"
              stroke="rgba(245, 166, 35, 0.4)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* BOTTOM-LEFT CORNER THREE DIAGONAL TECH STRIPES /// */}
            <g stroke="#f5a623" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke">
              <line x1="58" y1="412" x2="74" y2="404" />
              <line x1="74" y1="412" x2="90" y2="404" />
              <line x1="90" y1="412" x2="106" y2="404" />
            </g>

            {/* BOTTOM-RIGHT GLOWING 4-POINT DIAMOND STAR ✦ */}
            <g transform="translate(900, 416)">
              <path
                d="M 0,-10 Q 0,0 10,0 Q 0,0 0,10 Q 0,0 -10,0 Q 0,0 0,-10 Z"
                fill="#f5a623"
                filter="drop-shadow(0 0 6px #f5a623)"
              />
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* PARAGRAPH 1 (IMAGE 1) - LARGER FONT, SELECTABLE */}
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            lineHeight: 1.84,
            color: 'rgba(235, 230, 224, 0.94)',
            marginBottom: '20px',
            fontWeight: 300,
            letterSpacing: '0.2px',
            userSelect: 'text',
          }}
        >
          Every civilisation begins with{' '}
          <span
            style={{
              color: 'var(--amber-gold)',
              fontWeight: 600,
              textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
            }}
          >
            a set
          </span>{' '}
          of assumptions about the world it inhabits. For centuries, humanity believed reality to be
          singular, history to be continuous, and consciuseness to be inseparable from the biological
          body.
        </p>

        {/* PARAGRAPH 2 (IMAGE 1) - LARGER FONT, SELECTABLE */}
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            lineHeight: 1.84,
            color: 'rgba(235, 230, 224, 0.94)',
            marginBottom: '20px',
            fontWeight: 300,
            letterSpacing: '0.2px',
            userSelect: 'text',
          }}
        >
          By the early twenty-first century, those assumptions were already under pressure. Artificial
          intelligence was advancing, computational systems were becoming essential to civilisation,
          and{' '}
          <span
            style={{
              color: 'var(--amber-gold)',
              fontWeight: 600,
              textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
            }}
          >
            Mature Era
          </span>
          , the{' '}
          <span
            style={{
              color: 'var(--amber-gold)',
              fontWeight: 600,
              textShadow: '0 0 6px rgba(245, 166, 35, 0.4)',
            }}
          >
            Augmented AI
          </span>
          , w. reconsider the boundaries between biology and technology.
        </p>

        {/* PARAGRAPH 3 (IMAGE 1) - LARGER FONT, SELECTABLE */}
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            lineHeight: 1.84,
            color: 'rgba(235, 230, 224, 0.94)',
            marginBottom: '20px',
            fontWeight: 300,
            letterSpacing: '0.2px',
            userSelect: 'text',
          }}
        >
          Then came a series of events that would permanently alter the course of human history. What
          followed was not a single apocalypse, nor a sudden technological revolution. It was a gradual
          unravelling of the world as humanity understood it.
        </p>

        {/* PARAGRAPH 4 (IMAGE 1) - LARGER FONT, SELECTABLE */}
        <p
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(15px, 1.5vw, 17px)',
            lineHeight: 1.84,
            color: 'rgba(235, 230, 224, 0.94)',
            fontWeight: 300,
            letterSpacing: '0.2px',
            userSelect: 'text',
          }}
        >
          To understand the emergence of the Nooverse, we must first understand what happened before
          it.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 4. BOTTOM ACCENT LINE RUNNER: ————— [   ] —————                */}
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
