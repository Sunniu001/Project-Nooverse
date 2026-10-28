'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SciFiNavbar from '@/components/SciFiNavbar';
import HeroSection from '@/components/HeroSection';
import OriginDossierSection from '@/components/OriginDossierSection';
import BeforeNooverseSection from '@/components/BeforeNooverseSection';
import TimelineSection from '@/components/TimelineSection';
import LoreArchive from '@/components/LoreArchive';
import TacticalRadarSection from '@/components/TacticalRadarSection';
import BlocsSection from '@/components/BlocsSection';
import SciFiFooter from '@/components/SciFiFooter';
import TerminalModal from '@/components/TerminalModal';
import VideoBackground from '@/components/VideoBackground';
import HudScrollbar from '@/components/HudScrollbar';
import TelemetryPanels from '@/components/TelemetryPanels';
import BackgroundAudio from '@/components/BackgroundAudio';

const NAV_TABS = ['HOME', 'ORIGIN', 'BEFORE', 'TIMELINE'];
const SECTION_IDS = ['home', 'origin', 'before', 'timeline', 'archives', 'radar', 'blocs'];
const TOTAL_SECTIONS = 7;

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState('HOME');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [smoothedPos, setSmoothedPos] = useState({ x: 0, y: 0 });
  const [timelineEntryDir, setTimelineEntryDir] = useState<'from-prev' | 'from-next' | null>('from-prev');

  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const isNavigatingRef = useRef(false);

  // Navigate to target section smoothly using native browser scrolling
  const goToSection = useCallback((targetIndex: number) => {
    const clamped = Math.max(0, Math.min(targetIndex, TOTAL_SECTIONS - 1));
    const targetId = SECTION_IDS[clamped];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      isNavigatingRef.current = true;
      if (clamped === 3) {
        setTimelineEntryDir(targetIndex <= 3 ? 'from-prev' : 'from-next');
      }
      targetEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 850);
    }
    setActiveSection(clamped);
    setActiveTab(NAV_TABS[clamped] || '');
  }, []);

  // 1. Mouse Parallax Tracker for Background & Hero Logo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseRef.current = { x, y };
    };

    const updateParallax = () => {
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.065;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.065;
      setSmoothedPos({
        x: Number(currentMouseRef.current.x.toFixed(4)),
        y: Number(currentMouseRef.current.y.toFixed(4)),
      });
      animFrameRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 2. NATURAL SCROLL DETECTOR
  // Automatically detects which section is currently in view and updates activeSection / activeTab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.38;
      let currentIdx = 0;

      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          if (scrollPos >= el.offsetTop) {
            currentIdx = i;
          }
        }
      }

      // If user naturally scrolls into the Timeline section, cleanly snap and lock into view
      if (!isNavigatingRef.current && currentIdx === 3 && activeSection !== 3) {
        const timelineEl = document.getElementById('timeline');
        if (timelineEl) {
          const dir = activeSection < 3 ? 'from-prev' : 'from-next';
          setTimelineEntryDir(dir);
          window.scrollTo({ top: timelineEl.offsetTop, behavior: 'instant' });
        }
      }

      setActiveSection(currentIdx);
      setActiveTab(NAV_TABS[currentIdx] || '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Are we on custom header screens (Sections 1 and 2: Origin Dossier & Before Nooverse)?
  const isCustomHeaderActive = activeSection === 1 || activeSection === 2;

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-deep)',
        overflowX: 'hidden',
      }}
    >
      {/* Subtle CRT Scanline overlay */}
      <div className="scanlines-overlay" />

      {/* CONTINUOUS FORWARD & REVERSE VIDEO BACKGROUND WITH DARKER OVERLAY */}
      <VideoBackground parallaxOffset={smoothedPos} />

      {/* HUD TELEMETRY OVERLAY (LEFT ELEVATION/SCALE + RIGHT RADAR SCOPE) */}
      {/* FIXED TO VIEWPORT: ACTIVE WHILE VIDEO IS IN THE BACKGROUND (SECTIONS 0, 1, 2) */}
      {/* FADES OUT ON SECTOR 3 (TIMELINE & LORE ARCHIVES) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          opacity: activeSection < 3 ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease',
          zIndex: 35,
        }}
      >
        <TelemetryPanels activeSection={activeSection} totalSections={TOTAL_SECTIONS} />
      </div>

      {/* TOP HUD NAVIGATION BAR (Hidden on Sections 1, 2, 3 so custom headers are pristine) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          opacity: isCustomHeaderActive ? 0 : 1,
          pointerEvents: isCustomHeaderActive ? 'none' : 'auto',
          transition: 'opacity 0.4s ease',
        }}
      >
        <SciFiNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectSection={goToSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
      </div>

      {/* PERSISTENT RIGHT HUD SCROLLBAR */}
      <HudScrollbar
        activeSection={activeSection}
        totalSections={TOTAL_SECTIONS}
        onSelectSection={goToSection}
      />

      {/* AMBIENT BACKGROUND AUDIO STREAM (FIXED TOP-RIGHT) */}
      <BackgroundAudio activeSection={activeSection} />

      {/* ============================================================== */}
      {/* NATURAL STACKED SECTIONS (NO LOCKS, NO HIJACKED WHEEL)         */}
      {/* ============================================================== */}

      {/* SECTION 0: HERO VIEWPORT (TITLE IN SKY + HUD OVERLAYS) */}
      <HeroSection
        parallaxOffset={smoothedPos}
        activeSection={activeSection}
        onSelectSection={goToSection}
      />

      {/* SECTION 1: ORIGIN LORE DOSSIER 1 ('PROJECT NOOVERSE') */}
      <section
        id="origin"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: 'transparent',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '720px',
            height: '420px',
            background:
              'radial-gradient(circle, rgba(226, 157, 104, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(55px)',
          }}
        />
        <OriginDossierSection onOpenMenu={() => setIsTerminalOpen(true)} />
      </section>

      {/* SECTION 2: ORIGIN LORE DOSSIER 2 ('BEFORE NOOVERSE') */}
      <section
        id="before"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: 'transparent',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '720px',
            height: '420px',
            background:
              'radial-gradient(circle, rgba(226, 157, 104, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(55px)',
          }}
        />
        <BeforeNooverseSection />
      </section>

      {/* SECTION 3: TIMELINE (LOCKED HORIZONTAL SCROLL) */}
      <section
        id="timeline"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <TimelineSection
          isActive={activeSection === 3}
          entryDirection={timelineEntryDir}
          onHorizontalBoundary={(dir) => {
            goToSection(dir === 'next' ? 4 : 2);
          }}
        />
      </section>

      {/* SECTION 4: SECTOR 3 DECLASSIFIED LORE ARCHIVES */}
      <section
        id="archives"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(3, 7, 12, 0.94)',
          backdropFilter: 'blur(10px)',
          padding: '60px 0',
          boxSizing: 'border-box',
        }}
      >
        <LoreArchive />
      </section>

      {/* SECTION 5: TACTICAL RECON RADAR GRID */}
      <section
        id="radar"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(3, 7, 12, 0.94)',
          backdropFilter: 'blur(10px)',
          padding: '60px 0',
          boxSizing: 'border-box',
        }}
      >
        <TacticalRadarSection />
      </section>

      {/* SECTION 6: CONTROLLING BLOCS & SCI-FI FOOTER */}
      <section
        id="blocs"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(3, 7, 12, 0.95)',
          backdropFilter: 'blur(10px)',
          paddingTop: '60px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <BlocsSection />
        </div>
        <SciFiFooter />
      </section>

      {/* Interactive Quantum Access Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </main>
  );
}
