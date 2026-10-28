'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import MilestoneDossierModal, { DOSSIER_DATA, MilestoneModalData } from './MilestoneDossierModal';

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  eraYears: string;
  eraTitle: string;
  eraSubtitle: string;
  bgImage: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    id: 'torpa',
    year: '2 0 1 8',
    title: 'PROJECT TORPA',
    description:
      'In the forests of Torpa, near Ranchi, an expedition set out to investigate an obscure legend surrounding a mythical plant, leading to the first accidental rupture in reality.',
    eraYears: '2 0 1 8   —   2 0 1 9',
    eraTitle: 'T H E   F I R S T   D I S R U P T I O N',
    eraSubtitle: 'Projects that cracked the surface.',
    bgImage: '/images/event-torpa.png',
  },
  {
    id: 'megalith',
    year: '2 0 1 9',
    title: 'PROJECT MEGALITH',
    description:
      'An investigation into history, memory, and celestial alignments produced an anomaly—reality appeared to branch into alternative variations, birthing the Aryaverse.',
    eraYears: '2 0 1 8   —   2 0 1 9',
    eraTitle: 'T H E   F I R S T   D I S R U P T I O N',
    eraSubtitle: 'Projects that cracked the surface.',
    bgImage: '/images/event-megalith.png',
  },
  {
    id: 'census',
    year: '2 0 2 8   —   2 0 2 9',
    title: 'THE MISSING CENSUS',
    description:
      'Ahead of the 2029 General Elections, an election official is dispatched into the restricted Chotanagpur territory—a landscape of abandoned AI infrastructure and hazardous checkpoints.',
    eraYears: '2 0 2 8   —   2 0 2 9',
    eraTitle: 'T H E   F R A C T U R E',
    eraSubtitle: 'The breakdown between memory, mind, and reality.',
    bgImage: '/images/event-census.png',
  },
  {
    id: 'covid29',
    year: '2 0 2 9',
    title: 'COVID-29',
    description:
      'A disease of the mind that erased the distinction between memory and reality, challenging whether biological human cognition can sustain civilization.',
    eraYears: '2 0 2 8   —   2 0 3 0',
    eraTitle: 'T H E   F R A C T U R E',
    eraSubtitle: 'The year that changed everything.',
    bgImage: '/images/event-covid29.png',
  },
  {
    id: 'noosphere',
    year: '2 0 2 9   —   2 0 3 0',
    title: 'THE NOOSPHERE HYPOTHESIS',
    description:
      "In the aftermath of COVID-29, a proposition circulated: humanity's survival required moving beyond biological limits—laying the foundations of Homo Perennial.",
    eraYears: '2 0 2 8   —   2 0 3 0',
    eraTitle: 'T H E   F R A C T U R E',
    eraSubtitle: 'The foundations of Homo Perennial.',
    bgImage: '/images/event-noosphere.png',
  },
];

interface TimelineSectionProps {
  isActive?: boolean;
  isSettled?: boolean;
  onHorizontalBoundary?: (direction: 'prev' | 'next') => void;
  entryDirection?: 'from-prev' | 'from-next' | null;
}

export default function TimelineSection({
  isActive = false,
  isSettled = false,
  onHorizontalBoundary,
  entryDirection,
}: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const targetScrollRef = useRef(0);
  const overscrollRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredBgImage, setHoveredBgImage] = useState<string | null>(null);
  const [activeDossier, setActiveDossier] = useState<MilestoneModalData | null>(null);

  // Update active index and scroll metrics based on progress
  const updateMetrics = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setActiveIndex(0);
      return;
    }

    const current = el.scrollLeft;
    targetScrollRef.current = current;
    const progress = Math.min(Math.max(current / maxScroll, 0), 1);
    setScrollProgress(progress);

    // Compute active milestone corresponding to current scroll level
    const index = Math.min(
      Math.max(Math.round(progress * (MILESTONES.length - 1)), 0),
      MILESTONES.length - 1
    );
    setActiveIndex(index);
  }, []);

  // When entry direction changes or section activates, position track appropriately
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    if (entryDirection === 'from-next') {
      el.scrollLeft = maxScroll;
      targetScrollRef.current = maxScroll;
      overscrollRef.current = 0;
      updateMetrics();
    } else if (entryDirection === 'from-prev') {
      el.scrollLeft = 0;
      targetScrollRef.current = 0;
      overscrollRef.current = 0;
      updateMetrics();
    }
  }, [entryDirection, updateMetrics]);

  const scrollToMilestone = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = (index / (MILESTONES.length - 1)) * maxScroll;
    targetScrollRef.current = target;
    overscrollRef.current = 0;
    el.scrollTo({ left: target, behavior: 'smooth' });
    setTimeout(updateMetrics, 350);
  };

  const handleMilestoneHover = (item: TimelineMilestone) => {
    setHoveredId(item.id);
    setHoveredBgImage(item.bgImage);
  };

  const handleMilestoneLeave = () => {
    setHoveredId(null);
  };

  // STRICT HORIZONTAL SCROLL & SECTION LOCK:
  // Intercepts wheel events when section is in view:
  // 1. While inside timeline horizontal range (between 0 and maxScroll), vertical scrolling is strictly locked.
  // 2. All vertical wheel motion maps directly to horizontal traversal across the events.
  // 3. Only when all horizontal scrolls are 100% completed and the user continues to scroll down,
  //    we smoothly unlock and proceed to the next section ('archives').
  // 4. Similarly when scrolling back up to the beginning, only then proceed to previous section ('before').
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Only lock vertical scrolling and handle horizontal wheel traversal
    // when the timeline section is both active AND fully settled in full viewport!
    if (!isActive || !isSettled) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if pinch-zooming
      if (e.ctrlKey) return;
      // Don't intercept if dossier modal is open
      if (activeDossier) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      // Extract dominant delta (vertical wheel or horizontal touchpad)
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 0.5) return;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const currentScroll = track.scrollLeft;

      // 1. SCROLLING FORWARD / DOWN
      if (delta > 0) {
        if (currentScroll < maxScroll - 6) {
          // Still scrolling horizontally across the events:
          // Strictly lock vertical scrolling
          e.preventDefault();
          overscrollRef.current = 0;
          targetScrollRef.current = Math.min(maxScroll, targetScrollRef.current + delta * 1.05);
          track.scrollLeft = targetScrollRef.current;
          updateMetrics();
        } else {
          // At the end of the events (THE NOOSPHERE HYPOTHESIS)!
          // All horizontal scrolls are completed.
          // Require deliberate further scroll intent before transitioning to next section
          e.preventDefault();
          overscrollRef.current += delta;
          if (overscrollRef.current >= 90) {
            isTransitioningRef.current = true;
            onHorizontalBoundary?.('next');
            setTimeout(() => {
              isTransitioningRef.current = false;
              overscrollRef.current = 0;
            }, 1000);
          }
        }
      }

      // 2. SCROLLING BACKWARD / UP
      else if (delta < 0) {
        if (currentScroll > 6) {
          // Still scrolling horizontally backwards across the events:
          // Strictly lock vertical scrolling
          e.preventDefault();
          overscrollRef.current = 0;
          targetScrollRef.current = Math.max(0, targetScrollRef.current + delta * 1.05);
          track.scrollLeft = targetScrollRef.current;
          updateMetrics();
        } else {
          // At the start of the events (PROJECT TORPA)!
          // Require deliberate further scroll intent before transitioning to previous section
          e.preventDefault();
          overscrollRef.current += Math.abs(delta);
          if (overscrollRef.current >= 90) {
            isTransitioningRef.current = true;
            onHorizontalBoundary?.('prev');
            setTimeout(() => {
              isTransitioningRef.current = false;
              overscrollRef.current = 0;
            }, 1000);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    const onScroll = () => updateMetrics();
    track.addEventListener('scroll', onScroll, { passive: true });
    updateMetrics();

    const handleKey = (e: KeyboardEvent) => {
      if (!isActive || !isSettled || activeDossier) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (track.scrollLeft < maxScroll - 10) {
          e.preventDefault();
          track.scrollBy({ left: 340, behavior: 'smooth' });
          targetScrollRef.current = Math.min(maxScroll, track.scrollLeft + 340);
          setTimeout(updateMetrics, 350);
        } else {
          onHorizontalBoundary?.('next');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (track.scrollLeft > 10) {
          e.preventDefault();
          track.scrollBy({ left: -340, behavior: 'smooth' });
          targetScrollRef.current = Math.max(0, track.scrollLeft - 340);
          setTimeout(updateMetrics, 350);
        } else {
          onHorizontalBoundary?.('prev');
        }
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isActive, isSettled, activeDossier, updateMetrics, onHorizontalBoundary]);

  const activeMilestone = MILESTONES[activeIndex] || MILESTONES[0];
  const hoveredMilestone = hoveredId ? MILESTONES.find((m) => m.id === hoveredId) || null : null;
  const displayedMilestone = hoveredMilestone || activeMilestone;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(70px, 8.5vh, 90px) 0 clamp(20px, 3vh, 32px) 0',
        boxSizing: 'border-box',
        backgroundColor: '#000000',
      }}
    >
      {/* ============================================================== */}
      {/* 1. CINEMATIC BACKGROUND: PURE BLACK BY DEFAULT,                */}
      {/*    DISSOLVES INTO EVENT IMAGE ON HOVER, FADES BACK ON LEAVE    */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* 1. BORDERED HUD VIEWPORT (CONSTRAINS IMAGE, NOT EDGE-TO-EDGE)  */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(48px, 6.8vh, 60px)',
          bottom: 'clamp(14px, 2vh, 22px)',
          left: 'clamp(18px, 2.5vw, 36px)',
          right: 'clamp(18px, 2.5vw, 36px)',
          border: '1px solid rgba(229, 162, 110, 0.35)',
          borderRadius: '2px',
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',
          boxShadow: '0 0 35px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(0, 0, 0, 0.85)',
          background: '#000000',
        }}
      >
        {/* Dynamic Event Background Image Layers (Inside Bordered HUD Frame) */}
        {MILESTONES.map((m, i) => {
          const isHovered = hoveredId === m.id;
          const isScrollActive = !hoveredId && activeIndex === i;

          let opacity = 0;
          let scale = 1;
          let filter = 'blur(10px) brightness(0.85) contrast(1.08)';

          if (isHovered) {
            opacity = 1;
            scale = 1.03;
            // Fully un-blurred, sharp and crystal clear on hover!
            filter = 'blur(0px) brightness(1.0) contrast(1.1)';
          } else if (isScrollActive) {
            // Blurred on non-hover state as requested!
            opacity = 0.82;
            scale = 1.0;
            filter = 'blur(10px) brightness(0.88) contrast(1.1)';
          }

          return (
            <div
              key={m.id}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${m.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                filter,
                opacity,
                transform: `scale(${scale})`,
                transition:
                  'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s ease-out, filter 0.6s ease',
                zIndex: isHovered ? 2 : 1,
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Top Vignette Layer (Inside HUD Frame) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '38%',
            background:
              'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.85) 35%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Vignette Layer (Inside HUD Frame) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.88) 35%, rgba(0, 0, 0, 0.45) 72%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Left & Right Edge Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.35) 6%, transparent 16%, transparent 84%, rgba(0, 0, 0, 0.35) 94%, rgba(0, 0, 0, 0.8) 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Subtle scanline texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.15) 3px, rgba(0, 0, 0, 0.15) 4px)',
            zIndex: 4,
            pointerEvents: 'none',
            opacity: 0.22,
          }}
        />

        {/* Tactical Outer Corner L-Brackets in glowing Amber */}
        {/* Top-Left */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            width: '18px',
            height: '18px',
            borderTop: '2.5px solid #ff9e3b',
            borderLeft: '2.5px solid #ff9e3b',
            zIndex: 5,
            filter: 'drop-shadow(0 0 4px #ff9e3b)',
          }}
        />
        {/* Top-Right */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '18px',
            height: '18px',
            borderTop: '2.5px solid #ff9e3b',
            borderRight: '2.5px solid #ff9e3b',
            zIndex: 5,
            filter: 'drop-shadow(0 0 4px #ff9e3b)',
          }}
        />
        {/* Bottom-Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '-2px',
            width: '18px',
            height: '18px',
            borderBottom: '2.5px solid #ff9e3b',
            borderLeft: '2.5px solid #ff9e3b',
            zIndex: 5,
            filter: 'drop-shadow(0 0 4px #ff9e3b)',
          }}
        />
        {/* Bottom-Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '18px',
            height: '18px',
            borderBottom: '2.5px solid #ff9e3b',
            borderRight: '2.5px solid #ff9e3b',
            zIndex: 5,
            filter: 'drop-shadow(0 0 4px #ff9e3b)',
          }}
        />

        {/* Micro Tactical Telemetry Tags */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '12px',
            fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: 'rgba(229, 162, 110, 0.7)',
            zIndex: 5,
          }}
        >
          TIMELINE MATRIX // SECTOR 03
        </div>
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: 'rgba(215, 230, 245, 0.6)',
            zIndex: 5,
          }}
        >
          2018 — 2030 ARCHIVE
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TOP-LEFT HEADER BLOCK (IMAGE 1: PROJECT NOOVERSE / TIMELINE) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          paddingLeft: 'clamp(32px, 4.5vw, 64px)',
          marginTop: 'clamp(20px, 3vh, 32px)',
          pointerEvents: 'auto',
        }}
      >
        {/* 'PROJECT NOOVERSE' with Moon-O logo */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: "'Outfit', var(--font-logo), sans-serif",
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            fontWeight: 300,
            letterSpacing: 'clamp(6px, 0.8vw, 10px)',
            color: 'rgba(235, 230, 224, 0.85)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          <span style={{ marginRight: 'clamp(6px, 0.8vw, 10px)' }}>PROJECT</span>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>N</span>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>O</span>
          <div
            style={{
              position: 'relative',
              width: '14px',
              height: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 'clamp(4px, 0.5vw, 7px)',
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
              <path d="M 50,6 A 44,44 0 0,1 50,94" stroke="#ffffff" strokeWidth="3" />
              <path d="M 50,94 A 44,44 0 0,1 32,8" stroke="#ffffff" strokeWidth="3" />
              <path d="M 32,8 C 18,20 16,40 22,54 C 26,64 36,80 50,94" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.6" />
              <circle cx="22" cy="54" r="5" fill="#ffffff" />
            </svg>
          </div>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>V</span>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>E</span>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>R</span>
          <span style={{ marginRight: 'clamp(4px, 0.5vw, 7px)' }}>S</span>
          <span>E</span>
        </div>

        {/* 'T I M E L I N E' title */}
        <h2
          style={{
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 300,
            letterSpacing: 'clamp(10px, 1.4vw, 18px)',
            color: '#ffffff',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          TIMELINE
        </h2>

        {/* Small amber accent line underneath */}
        <div
          style={{
            width: '42px',
            height: '2px',
            background: 'linear-gradient(to right, #e5a26e, rgba(229, 162, 110, 0.2))',
            marginTop: '12px',
            boxShadow: '0 0 6px rgba(229, 162, 110, 0.6)',
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 3. CENTER HORIZONTAL TIMELINE TRACK (HORIZONTAL SCROLL CONTAINER) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0',
        }}
      >
        {/* Holographic Cyan Digital Glitch Rail Spanning Full Width */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '24px',
            pointerEvents: 'none',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Top cyan track line */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(90, 160, 200, 0.45) 4%, rgba(90, 160, 200, 0.8) 50%, rgba(90, 160, 200, 0.45) 96%, transparent 100%)',
              boxShadow: '0 0 6px rgba(90, 160, 200, 0.5)',
            }}
          />

          {/* Central cyan digital glitch data rail texture */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: 0,
              right: 0,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(20, 50, 75, 0.4) 4%, rgba(20, 50, 75, 0.65) 50%, rgba(20, 50, 75, 0.4) 96%, transparent 100%)',
            }}
          >
            {/* Center glowing core wire */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                transform: 'translateY(-50%)',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(160, 220, 255, 0.6) 6%, rgba(210, 245, 255, 0.9) 50%, rgba(160, 220, 255, 0.6) 94%, transparent 100%)',
                boxShadow: '0 0 8px rgba(120, 205, 245, 0.85)',
              }}
            />

            {/* Segmented cybernetic glitch blocks */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
                  repeating-linear-gradient(90deg,
                    transparent 0px, transparent 16px,
                    rgba(65, 135, 175, 0.35) 16px, rgba(65, 135, 175, 0.35) 32px,
                    transparent 32px, transparent 58px,
                    rgba(115, 190, 230, 0.52) 58px, rgba(115, 190, 230, 0.52) 84px,
                    transparent 84px, transparent 116px,
                    rgba(45, 95, 125, 0.42) 116px, rgba(45, 95, 125, 0.42) 148px,
                    transparent 148px, transparent 182px,
                    rgba(140, 215, 255, 0.55) 182px, rgba(140, 215, 255, 0.55) 206px
                  )
                `,
                backgroundSize: '412px 100%',
                filter: 'drop-shadow(0 0 3px rgba(85, 155, 195, 0.5))',
              }}
            />

            {/* Subtle horizontal scanline striations */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.35) 2px, rgba(0, 0, 0, 0.35) 3px)',
                opacity: 0.65,
              }}
            />
          </div>

          {/* Bottom cyan track line */}
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(90, 160, 200, 0.45) 4%, rgba(90, 160, 200, 0.8) 50%, rgba(90, 160, 200, 0.45) 96%, transparent 100%)',
              boxShadow: '0 0 6px rgba(90, 160, 200, 0.5)',
            }}
          />
        </div>

        {/* SCROLLABLE HORIZONTAL MILESTONE ITEMS CONTAINER */}
        <div
          ref={trackRef}
          style={{
            width: '100%',
            height: '340px',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            overflowY: 'visible',
            scrollBehavior: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0 clamp(80px, 12vw, 180px)',
            zIndex: 10,
            cursor: 'grab',
          }}
        >
          {MILESTONES.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            const isAnyHovered = hoveredId !== null;
            const isScrollFocused = !isAnyHovered && idx === activeIndex;
            const isGroupGap = idx === 1;
            const isLast = idx === MILESTONES.length - 1;
            const marginRight = isLast
              ? '0px'
              : isGroupGap
              ? 'clamp(280px, 28vw, 380px)'
              : 'clamp(140px, 15vw, 190px)';

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMilestoneHover(item)}
                onMouseLeave={handleMilestoneLeave}
                onClick={() => {
                  scrollToMilestone(idx);
                  if (DOSSIER_DATA[item.id]) {
                    setActiveDossier(DOSSIER_DATA[item.id]);
                  }
                }}
                style={{
                  flexShrink: 0,
                  width: 'clamp(260px, 24vw, 300px)',
                  marginRight,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: DOSSIER_DATA[item.id] ? 'pointer' : 'default',
                  transform: isHovered
                    ? 'scale(1.12) translateY(-6px)'
                    : isScrollFocused
                    ? 'scale(1.04) translateY(-3px)'
                    : isAnyHovered
                    ? 'scale(0.95)'
                    : 'scale(1)',
                  opacity: isHovered
                    ? 1
                    : isScrollFocused
                    ? 1
                    : isAnyHovered
                    ? 0.38
                    : 0.68,
                  filter: isAnyHovered && !isHovered ? 'blur(0.5px)' : 'none',
                  transition:
                    'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, filter 0.35s ease',
                  zIndex: isHovered ? 30 : isScrollFocused ? 20 : 10,
                }}
              >
                {/* 1. BRACKET BOX (EXACT MATCH TO REFERENCE IMAGE) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isHovered
                      ? 'rgba(14, 22, 32, 0.94)'
                      : isScrollFocused
                      ? 'rgba(12, 18, 26, 0.88)'
                      : 'rgba(7, 11, 16, 0.78)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: isHovered
                      ? '0 0 32px rgba(229, 162, 110, 0.65), inset 0 0 15px rgba(229, 162, 110, 0.22)'
                      : isScrollFocused
                      ? '0 0 22px rgba(229, 162, 110, 0.45), inset 0 0 12px rgba(229, 162, 110, 0.16)'
                      : '0 4px 18px rgba(0, 0, 0, 0.7)',
                    transition: 'all 0.3s ease',
                  }}
                  title={DOSSIER_DATA[item.id] ? `Click to inspect ${item.title} dossier` : undefined}
                >
                  {/* YEAR LABEL ABOVE TOP-LEFT OF BOX (EXACT MATCH) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 14px)',
                      left: '2px',
                      fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
                      fontSize: '12.5px',
                      fontWeight: 600,
                      letterSpacing: '5px',
                      color: isHovered ? '#ffc896' : isScrollFocused ? '#ffbe82' : '#e5a26e',
                      textShadow: isHovered
                        ? '0 0 14px rgba(255, 195, 140, 0.95)'
                        : isScrollFocused
                        ? '0 0 10px rgba(229, 162, 110, 0.85)'
                        : '0 0 7px rgba(229, 162, 110, 0.6)',
                      userSelect: 'none',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    }}
                  >
                    {item.year}
                  </div>

                  {/* CORNER BRACKETS (GOLD/AMBER - EXACT MATCH) */}
                  {/* Top-Left Bracket */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      height: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      borderTop: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      borderLeft: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      boxShadow: isHovered
                        ? '0 0 14px rgba(229, 162, 110, 1), 0 0 24px rgba(229, 162, 110, 0.5)'
                        : isScrollFocused
                        ? '0 0 10px rgba(229, 162, 110, 0.85)'
                        : '0 0 5px rgba(229, 162, 110, 0.45)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Top-Right Bracket */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      height: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      borderTop: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      borderRight: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      boxShadow: isHovered
                        ? '0 0 14px rgba(229, 162, 110, 1), 0 0 24px rgba(229, 162, 110, 0.5)'
                        : isScrollFocused
                        ? '0 0 10px rgba(229, 162, 110, 0.85)'
                        : '0 0 5px rgba(229, 162, 110, 0.45)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Bottom-Left Bracket */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      height: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      borderBottom: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      borderLeft: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      boxShadow: isHovered
                        ? '0 0 14px rgba(229, 162, 110, 1), 0 0 24px rgba(229, 162, 110, 0.5)'
                        : isScrollFocused
                        ? '0 0 10px rgba(229, 162, 110, 0.85)'
                        : '0 0 5px rgba(229, 162, 110, 0.45)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Bottom-Right Bracket */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      height: isHovered ? '16px' : isScrollFocused ? '15px' : '14px',
                      borderBottom: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      borderRight: `${isHovered ? '3.5px' : isScrollFocused ? '3px' : '2.5px'} solid #e5a26e`,
                      boxShadow: isHovered
                        ? '0 0 14px rgba(229, 162, 110, 1), 0 0 24px rgba(229, 162, 110, 0.5)'
                        : isScrollFocused
                        ? '0 0 10px rgba(229, 162, 110, 0.85)'
                        : '0 0 5px rgba(229, 162, 110, 0.45)',
                      transition: 'all 0.3s ease',
                    }}
                  />

                  {/* Bottom border line from left bracket to center node */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '12px',
                      right: 'calc(50% + 9px)',
                      height: '1.5px',
                      background: '#e5a26e',
                      boxShadow: isScrollFocused
                        ? '0 0 6px rgba(229, 162, 110, 0.7)'
                        : '0 0 4px rgba(229, 162, 110, 0.5)',
                    }}
                  />
                  {/* Bottom border line from center node to right bracket */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 'calc(50% + 9px)',
                      right: '12px',
                      height: '1.5px',
                      background: '#e5a26e',
                      boxShadow: isScrollFocused
                        ? '0 0 6px rgba(229, 162, 110, 0.7)'
                        : '0 0 4px rgba(229, 162, 110, 0.5)',
                    }}
                  />

                  {/* CIRCULAR AMBER NODE (EMBEDDED DIRECTLY ON BOTTOM BORDER) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translate(-50%, 50%)',
                      width: isHovered ? '20px' : isScrollFocused ? '19px' : '18px',
                      height: isHovered ? '20px' : isScrollFocused ? '19px' : '18px',
                      borderRadius: '50%',
                      border: '1.5px solid #e5a26e',
                      background: 'rgba(7, 11, 16, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isHovered
                        ? '0 0 14px #e5a26e, 0 0 25px rgba(229, 162, 110, 0.8)'
                        : isScrollFocused
                        ? '0 0 12px rgba(229, 162, 110, 0.9), 0 0 20px rgba(229, 162, 110, 0.4)'
                        : '0 0 7px rgba(229, 162, 110, 0.65)',
                      zIndex: 5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Inner glowing amber core */}
                    <div
                      style={{
                        width: isHovered ? '11px' : isScrollFocused ? '10.5px' : '10px',
                        height: isHovered ? '11px' : isScrollFocused ? '10.5px' : '10px',
                        borderRadius: '50%',
                        background: isHovered
                          ? '#fff4e6'
                          : isScrollFocused
                          ? '#ffe8d1'
                          : '#e5a26e',
                        boxShadow: isHovered
                          ? '0 0 10px #ffffff'
                          : isScrollFocused
                          ? '0 0 8px #ffbe82'
                          : '0 0 6px #e5a26e',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>

                  {/* PROJECT TITLE */}
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 'clamp(12px, 1.25vw, 14.5px)',
                      fontWeight: isHovered ? 600 : isScrollFocused ? 600 : 500,
                      letterSpacing: '3.5px',
                      color: isHovered ? '#ffffff' : isScrollFocused ? '#fff5eb' : '#e5a26e',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textShadow: isHovered
                        ? '0 0 16px rgba(255, 215, 175, 1), 0 0 30px rgba(229, 162, 110, 0.7)'
                        : isScrollFocused
                        ? '0 0 12px rgba(255, 205, 160, 0.8), 0 0 22px rgba(229, 162, 110, 0.5)'
                        : '0 0 6px rgba(229, 162, 110, 0.35)',
                      userSelect: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* 2. DESCRIPTION CONTAINER WITH LEFT VERTICAL GUIDE LINE (EXACT MATCH TO IMAGE 4) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 22px)',
                    left: '2px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '12px',
                    opacity: isHovered ? 1 : isScrollFocused ? 1 : 0.75,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {/* Left vertical framing guide line */}
                  <div
                    style={{
                      width: '1.2px',
                      background: isHovered
                        ? '#e5a26e'
                        : isScrollFocused
                        ? '#e5a26e'
                        : 'rgba(229, 162, 110, 0.7)',
                      boxShadow: isHovered
                        ? '0 0 8px rgba(229, 162, 110, 0.9)'
                        : isScrollFocused
                        ? '0 0 6px rgba(229, 162, 110, 0.7)'
                        : '0 0 4px rgba(229, 162, 110, 0.35)',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />

                  {/* Description Lore Text */}
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(12px, 1.15vw, 13px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: isHovered
                        ? '#ffffff'
                        : isScrollFocused
                        ? 'rgba(245, 248, 255, 0.96)'
                        : 'rgba(225, 232, 240, 0.75)',
                      textAlign: 'left',
                      letterSpacing: '0.25px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                      userSelect: 'text',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. BOTTOM CENTER LORE ERA & PROGRESS TRACKER (EXACT MATCH IMAGE 2 & 3) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px',
          marginBottom: 'clamp(24px, 3vh, 36px)',
        }}
      >
        {/* Horizontal Progress Bar with Moving Amber Pip */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickRatio = (e.clientX - rect.left) / rect.width;
            const targetIndex = Math.round(clickRatio * (MILESTONES.length - 1));
            scrollToMilestone(targetIndex);
          }}
          style={{
            position: 'relative',
            width: 'clamp(260px, 28vw, 340px)',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          title="Click to seek along timeline"
        >
          {/* Base track line */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(229, 162, 110, 0.25) 15%, rgba(229, 162, 110, 0.25) 85%, transparent)',
            }}
          />

          {/* Active progress line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: `${scrollProgress * 100}%`,
              height: '1px',
              background: 'linear-gradient(to right, rgba(217, 140, 74, 0.3), #d98c4a)',
              boxShadow: '0 0 6px rgba(217, 140, 74, 0.7)',
            }}
          />

          {/* Glowing Amber Pip Indicator moving along track (Exact to Image 3) */}
          <div
            style={{
              position: 'absolute',
              left: `${scrollProgress * 100}%`,
              transform: 'translateX(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fae8d2',
              boxShadow: '0 0 6px #fae8d2, 0 0 10px #d98c4a',
              transition: 'left 0.1s ease-out',
            }}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. CLICK-TRIGGERED MILITARY DOSSIER MODAL                     */}
      {/* ============================================================== */}
      {activeDossier && (
        <MilestoneDossierModal
          data={activeDossier}
          onClose={() => setActiveDossier(null)}
        />
      )}
    </div>
  );
}
