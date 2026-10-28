'use client';

import React, { useState, useEffect } from 'react';

export interface MilestoneModalData {
  id: string;
  year: string;
  title: string;
  era: string;
  archiveRef: string;
  classification: string;
  paragraphs: string[];
  location: string[];
  period: string;
  focus: string[];
  images: {
    src: string;
    caption: {
      tag: string;
      region: string;
      subRegion: string;
      year: string;
    };
  }[];
}

export const DOSSIER_DATA: Record<string, MilestoneModalData> = {
  torpa: {
    id: 'torpa',
    year: '2 0 1 8',
    title: 'PROJECT  TORPA',
    era: 'T H E   F I R S T   D I S R U P T I O N',
    archiveRef: 'REF: PT-2018-001',
    classification: 'CONFIDENTIAL // FIELD LOG',
    paragraphs: [
      'In the forests of Torpa, near Ranchi, an expedition set out to investigate an obscure legend surrounding a mythical plant.',
      'The undertaking was never intended to change the course of human history. It began as an attempt to investigate the unknown, somewhere between folklore, field research, and the possibility that an overlooked piece of the natural world might hold an unexpected answer.',
      'Instead, the expedition became associated with the first accidental rupture in the foundations of reality. What began as an isolated incident would lead to questions that existing scientific frameworks were not equipped to answer.',
      'One year later, a more ambitious undertaking would push those questions further.',
    ],
    location: ['Torpa Region, Near Ranchi', 'Jharkhand, India'],
    period: '2018',
    focus: ['Botanical Anomaly', 'Mythical Plant', 'Reality Rupture'],
    images: [
      {
        src: '/images/event-torpa.png',
        caption: {
          tag: '↑',
          region: 'TORPA FORESTS',
          subRegion: 'NEAR RANCHI, JHARKHAND',
          year: '2018',
        },
      },
      {
        src: '/images/torpa-flora.jpg',
        caption: {
          tag: '↑',
          region: 'BIO-SAMPLE 09',
          subRegion: 'CANOPY NODE',
          year: '2018',
        },
      },
      {
        src: '/images/torpa-rover.jpg',
        caption: {
          tag: '↑',
          region: 'FIELD RECON CONVOY',
          subRegion: 'TORPA BASIN',
          year: '2018',
        },
      },
    ],
  },
  megalith: {
    id: 'megalith',
    year: '2 0 1 9',
    title: 'PROJECT  MEGALITH',
    era: 'T H E   F I R S T   D I S R U P T I O N',
    archiveRef: 'REF: PM-2019-004',
    classification: 'RESTRICTED // ANOMALY LOG',
    paragraphs: [
      'Project Megalith began with an investigation into the relationship between history, memory, and time.',
      'Researchers sought to understand why ancient civilisations, separated by vast distances and periods of history, appeared to organise certain structures around celestial alignments. Their work attempted to bridge the gap between the knowledge of the past and the technological capabilities of the present.',
      'The investigation produced an anomaly. Reality, previously understood as a singular and continuous sequence of events, appeared to branch into alternative variations. Among these possibilities was a world that would eventually be known as the Aryaverse: a reality whose subsequent development would lead towards the emergence of the Noosphere.',
      'The full implications of Project Megalith remained unknown. But its consequences extended beyond the experiment itself. In the years that followed, parts of eastern India began to resemble the remains of a future that had arrived too early.',
    ],
    location: ['Megalithic Alignment Site', 'Eastern India'],
    period: '2019',
    focus: ['Celestial Alignments', 'Reality Branching', 'Aryaverse Genesis'],
    images: [
      {
        src: '/images/event-megalith.png',
        caption: {
          tag: '↑',
          region: 'MEGALITHIC CIRCLE',
          subRegion: 'CELESTIAL NEXUS',
          year: '2019',
        },
      },
      {
        src: '/images/torpa-excavation.jpg',
        caption: {
          tag: '↑',
          region: 'DEEP DRILL SITE 02',
          subRegion: 'CHOTA NAGPUR',
          year: '2019',
        },
      },
      {
        src: '/images/torpa-rover.jpg',
        caption: {
          tag: '↑',
          region: 'CONVOY APPROACH',
          subRegion: 'EASTERN RIDGE',
          year: '2019',
        },
      },
    ],
  },
  census: {
    id: 'census',
    year: '2 0 2 8   —   2 0 2 9',
    title: 'THE  MISSING  CENSUS',
    era: 'T H E   F R A C T U R E',
    archiveRef: 'REF: EC-2029-MC7',
    classification: 'OFFICIAL INQUIRY // CONFIDENTIAL',
    paragraphs: [
      "In the years following Project Megalith, parts of Chotanagpur began to change. Mining settlements emptied, industrial facilities fell silent, and restricted zones spread across the mineral-rich region. The remains of India's once-expanding AI infrastructure stood abandoned amid a landscape of checkpoints and forgotten communities.",
      'As India approached the 2029 General Elections, the Election Commission of India began preparations to reach every registered voter, no matter how remote their location. From sprawling cities to isolated settlements with only a handful of eligible voters, the principle remained the same: no constituency was to be overlooked.',
      'Chotanagpur would be no exception. An election official was to be sent into the restricted territory to conduct the necessary electoral work, entering a region that had become easier to classify as hazardous than to understand.',
      'The official records said little about the people who remained there. What lay beyond the checkpoints was another matter entirely.',
    ],
    location: ['Chotanagpur Restricted Territory', 'Ranchi-Torpa Corridor, India'],
    period: '2028 — 2029',
    focus: ['Election Commission Protocol', 'Abandoned AI Infrastructure', 'Restricted Zones'],
    images: [
      {
        src: '/images/event-census.png',
        caption: {
          tag: '↑',
          region: 'RESTRICTED AREA CHECKPOINT',
          subRegion: 'RANCHI-TORPA CORRIDOR',
          year: '2029',
        },
      },
      {
        src: '/images/hero-clean.png',
        caption: {
          tag: '↑',
          region: 'SUB-SURFACE SECTOR',
          subRegion: 'CHOTANAGPUR BASIN',
          year: '2029',
        },
      },
      {
        src: '/images/torpa-excavation.jpg',
        caption: {
          tag: '↑',
          region: 'ABANDONED RECEPTACLE',
          subRegion: 'SECTOR-4 BORE',
          year: '2028',
        },
      },
    ],
  },
  covid29: {
    id: 'covid29',
    year: '2 0 2 9',
    title: 'COVID-29',
    era: 'THE YEAR THAT CHANGED EVERYTHING',
    archiveRef: 'REF: CV29-GLOBAL-01',
    classification: 'COGNITIVE ANOMALY // RESTRICTED',
    paragraphs: [
      'Humanity had survived pandemics before. It had developed systems of quarantine, vaccination, public health, and collective response.',
      'COVID-29 was different. The disease did not affect the body alone. Its most disturbing consequences involved the mind.',
      'Survivors reported fragmented memories, temporal disorientation, and experiences in which the distinction between remembered events and events that had never occurred became increasingly difficult to establish.',
      "As the pandemic spread, governments struggled to maintain order. Scientific institutions raced to understand its effects. Economies faltered, social systems fractured, and confidence in the world's ability to return to normal diminished.",
      'The crisis exposed a fundamental vulnerability. Humanity had built increasingly complex systems around the assumption that human beings would remain biologically stable, mentally continuous, and capable of participating in society as they always had. COVID-29 challenged that assumption at its foundation.',
      'The question was no longer simply how humanity could survive another pandemic. It was whether the biological and cognitive limitations of the human organism had become a threat to the continuity of civilisation itself.',
    ],
    location: ['Global Pandemic Horizon', 'National Capital Region, India'],
    period: '2029',
    focus: ['Temporal Disorientation', 'Memory Fragmentation', 'Cognitive Vulnerability'],
    images: [
      {
        src: '/images/event-covid29.png',
        caption: {
          tag: '↑',
          region: 'DESERTED CAPITAL CORRIDOR',
          subRegion: 'LOCKDOWN PROTOCOL 29',
          year: '2029',
        },
      },
      {
        src: '/images/hero-banner.png',
        caption: {
          tag: '↑',
          region: 'CIVIL HARMONICS RELAY',
          subRegion: 'NCR METROPOLIS',
          year: '2029',
        },
      },
      {
        src: '/images/hero-clean.png',
        caption: {
          tag: '↑',
          region: 'PERIMETER SCAN',
          subRegion: 'COGNITIVE ISOLATION',
          year: '2029',
        },
      },
    ],
  },
  noosphere: {
    id: 'noosphere',
    year: '2 0 2 9   —   2 0 3 0',
    title: 'THE NOOSPHERE HYPOTHESIS',
    era: 'THE FOUNDATIONS OF HOMO PERENNIAL',
    archiveRef: 'REF: NH-2030-SYNTH',
    classification: 'TOP SECRET // NOOSPHERE DIRECTIVE',
    paragraphs: [
      'In the aftermath of COVID-29, a radical proposition began circulating through obscure research forums and fragmented digital networks. Known as the Noosphere Hypothesis, it proposed that humanity\'s long-term survival might depend on moving beyond the limitations of biological existence.',
      'The organic body was obsolete. If consciousness could be transferred, if synthetic bodies could replace biological vessels, then humanity could become untouchable. And if humanity\'s future depended on increasingly complex forms of intelligence, perhaps the next stage of human evolution would require a fundamental transformation of what it meant to be human.',
      'The hypothesis offered no universally accepted proof, no established method of implementation, and no guarantee that its proposed future would be desirable. Its importance lay elsewhere: for a civilisation confronting the apparent fragility of its own biological foundations, it offered a direction in which to search for answers.',
      'One statement became emblematic of the idea: "Viruses do not infect silicon."',
      'The proposition divided opinion. To some, it represented the next frontier of scientific progress. To others, it threatened to redefine humanity in ways that could never be reversed. But the urgency of the crisis ensured that the question would not remain philosophical for long.',
      'Research accelerated. Investment followed. The development of synthetic organs, biomechanical replacements, and bio-silicon neural interfaces began to converge around a common objective: making human cognition and physical existence less dependent on the biological body.',
      'What emerged was not an immediate escape from biology, but the beginning of a new technological trajectory. The foundations of Homo Perennial had been laid.',
    ],
    location: ['Distributed Research Networks', 'Chotanagpur & NCR Synthetics'],
    period: '2029 — 2030',
    focus: [
      'Homo Perennial',
      'Bio-Silicon Convergence',
      'Synthetic Consciousness',
      'Post-Biological Trajectory',
    ],
    images: [
      {
        src: '/images/event-noosphere.png',
        caption: {
          tag: '↑',
          region: 'SYNTHETIC PHARMA TOWER',
          subRegion: 'ANTIVIRAL & SILICON NEXUS',
          year: '2030',
        },
      },
      {
        src: '/images/hero-clean.png',
        caption: {
          tag: '↑',
          region: 'NEURAL INTERFACE MATRIX',
          subRegion: 'HOMO PERENNIAL PROTOTYPE',
          year: '2030',
        },
      },
      {
        src: '/images/hero-banner.png',
        caption: {
          tag: '↑',
          region: 'NOOSPHERE HARMONICS TOWER',
          subRegion: 'NCR RESTRICTED ZONE',
          year: '2030',
        },
      },
    ],
  },
};

interface MilestoneDossierModalProps {
  data: MilestoneModalData;
  onClose: () => void;
}

export default function MilestoneDossierModal({
  data,
  onClose,
}: MilestoneDossierModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const activeImage = data.images[selectedImageIndex] || data.images[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2, 5, 8, 0.72)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        animation: 'fadeInModal 0.25s ease-out forwards',
      }}
    >
      {/* Central Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'clamp(880px, 86vw, 1160px)',
          maxWidth: '96vw',
          maxHeight: '92vh',
          background: 'rgba(7, 10, 14, 0.94)',
          border: '1.2px solid rgba(226, 157, 104, 0.55)',
          borderRadius: '3px',
          boxShadow:
            '0 24px 70px rgba(0, 0, 0, 0.9), inset 0 0 35px rgba(226, 157, 104, 0.04), 0 0 30px rgba(226, 157, 104, 0.15)',
          padding: 'clamp(22px, 2.8vw, 32px)',
          boxSizing: 'border-box',
          display: 'flex',
          gap: 'clamp(24px, 3vw, 38px)',
          overflowY: 'auto',
          animation: 'scaleInModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* ============================================================== */}
        {/* CORNER ACCENT BRACKETS (EXACT MATCH TO REFERENCE)             */}
        {/* ============================================================== */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Top-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: '-3px',
              width: '18px',
              height: '18px',
              borderTop: '3px solid #e5a26e',
              borderLeft: '3px solid #e5a26e',
              boxShadow: '0 0 10px rgba(229, 162, 110, 0.75)',
            }}
          />
          {/* Top-Right Bracket */}
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '18px',
              height: '18px',
              borderTop: '3px solid #e5a26e',
              borderRight: '3px solid #e5a26e',
              boxShadow: '0 0 10px rgba(229, 162, 110, 0.75)',
            }}
          />
          {/* Bottom-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: '-3px',
              left: '-3px',
              width: '18px',
              height: '18px',
              borderBottom: '3px solid #e5a26e',
              borderLeft: '3px solid #e5a26e',
              boxShadow: '0 0 10px rgba(229, 162, 110, 0.75)',
            }}
          />
          {/* Bottom-Right Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              width: '18px',
              height: '18px',
              borderBottom: '3px solid #e5a26e',
              borderRight: '3px solid #e5a26e',
              boxShadow: '0 0 10px rgba(229, 162, 110, 0.75)',
            }}
          />

          {/* Top center orange diamond node */}
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '6px',
              height: '6px',
              background: '#e5a26e',
              boxShadow: '0 0 6px #e5a26e',
            }}
          />
        </div>

        {/* ============================================================== */}
        {/* LEFT COLUMN: MAIN FEATURED IMAGE & 3 THUMBNAILS                */}
        {/* ============================================================== */}
        <div
          style={{
            flex: '1 1 52%',
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Main Visual Display */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(280px, 36vh, 360px)',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1.2px solid rgba(226, 157, 104, 0.45)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
              background: '#04070a',
            }}
          >
            {/* Background image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${activeImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.3s ease',
              }}
            />

            {/* Subtle dark gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(4, 7, 10, 0.4) 0%, transparent 40%, rgba(4, 7, 10, 0.6) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top-Left Telemetry Overlay on Image */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
                fontSize: '10px',
                letterSpacing: '1.5px',
                color: 'rgba(240, 245, 250, 0.92)',
                lineHeight: 1.4,
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ color: '#e5a26e', marginBottom: '2px', fontSize: '11px' }}>
                {activeImage.caption.tag}
              </div>
              <div style={{ fontWeight: 600 }}>{activeImage.caption.region}</div>
              <div style={{ color: 'rgba(215, 225, 235, 0.75)' }}>{activeImage.caption.subRegion}</div>
              <div style={{ color: 'rgba(215, 225, 235, 0.75)' }}>{activeImage.caption.year}</div>
            </div>

            {/* Bottom-Left Micro Segmented Slider Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                pointerEvents: 'none',
              }}
            >
              {data.images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === selectedImageIndex ? '16px' : '9px',
                    height: '3px',
                    borderRadius: '1px',
                    background: i === selectedImageIndex ? '#e5a26e' : 'rgba(255, 255, 255, 0.25)',
                    boxShadow: i === selectedImageIndex ? '0 0 6px #e5a26e' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>

            {/* Inner corner bracket accents */}
            <div
              style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                width: '8px',
                height: '8px',
                borderTop: '1px solid #e5a26e',
                borderLeft: '1px solid #e5a26e',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderBottom: '1px solid #e5a26e',
                borderRight: '1px solid #e5a26e',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 3 Thumbnails Directly Underneath */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              width: '100%',
            }}
          >
            {data.images.map((img, idx) => {
              const isSelected = idx === selectedImageIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  style={{
                    height: 'clamp(66px, 8.5vh, 80px)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: isSelected
                      ? '1.8px solid #e5a26e'
                      : '1px solid rgba(226, 157, 104, 0.25)',
                    boxShadow: isSelected
                      ? '0 0 12px rgba(229, 162, 110, 0.6)'
                      : '0 2px 6px rgba(0, 0, 0, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    opacity: isSelected ? 1 : 0.65,
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${img.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: DOSSIER LORE, CLASSIFICATION & METADATA GRID     */}
        {/* ============================================================== */}
        <div
          style={{
            flex: '1 1 48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Top Row: Year in Gold/Amber, Metadata & Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    color: '#e5a26e',
                    marginBottom: '4px',
                  }}
                >
                  {data.year}
                </div>

                {/* Title */}
                <h2
                  style={{
                    margin: '0 0 4px 0',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(20px, 2.2vw, 27px)',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    color: '#e5a26e',
                    textTransform: 'uppercase',
                    textShadow: '0 0 16px rgba(229, 162, 110, 0.4)',
                    lineHeight: 1.15,
                  }}
                >
                  {data.title}
                </h2>

                {/* Subtitle Era Row */}
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(10px, 0.9vw, 11.5px)',
                    fontWeight: 400,
                    letterSpacing: '2.5px',
                    color: 'rgba(235, 230, 224, 0.75)',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.era}
                </div>
              </div>

              {/* Right Side: Archive Classification & Close '✕' Button */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    textAlign: 'right',
                    fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '1.2px',
                    lineHeight: 1.45,
                    color: 'rgba(215, 225, 235, 0.65)',
                  }}
                >
                  <div>ARYAVERSE ARCHIVE</div>
                  <div>{data.archiveRef}</div>
                  <div>
                    CLASSIFICATION:{' '}
                    <span style={{ color: '#e5a26e', fontWeight: 600 }}>{data.classification}</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e5a26e',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    lineHeight: 1,
                    transition: 'transform 0.2s ease, color 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#e5a26e';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title="Close Dossier"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Subtle Divider Line with Orange Pip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                margin: '12px 0 14px 0',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#e5a26e',
                  marginRight: '8px',
                  boxShadow: '0 0 4px #e5a26e',
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(229, 162, 110, 0.5), transparent)',
                }}
              />
            </div>

            {/* Lore Description Paragraphs with dedicated right-side sci-fi scroll bar */}
            <div
              className="dossier-text-scroll"
              style={{
                maxHeight: 'clamp(200px, 28vh, 280px)',
                overflowY: 'auto',
                paddingRight: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(12px, 1.05vw, 13px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(215, 225, 235, 0.82)',
                userSelect: 'text',
                scrollbarWidth: 'thin',
                scrollbarColor: '#e5a26e rgba(226, 157, 104, 0.1)',
              }}
            >
              {data.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Tactical Metadata Grid Box (3 Columns) */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(10, 15, 22, 0.65)',
              border: '1px solid rgba(226, 157, 104, 0.45)',
              borderRadius: '2px',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr 1.2fr',
              columnGap: '14px',
              fontFamily: "var(--font-mono), 'Share Tech Mono', monospace",
            }}
          >
            {/* Corner brackets on metadata box */}
            <div
              style={{
                position: 'absolute',
                top: '-1px',
                left: '-1px',
                width: '6px',
                height: '6px',
                borderTop: '1px solid #e5a26e',
                borderLeft: '1px solid #e5a26e',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '6px',
                height: '6px',
                borderBottom: '1px solid #e5a26e',
                borderRight: '1px solid #e5a26e',
              }}
            />

            {/* Column 1: LOCATION */}
            <div>
              <div
                style={{
                  fontSize: '9px',
                  color: 'rgba(185, 205, 225, 0.6)',
                  letterSpacing: '1.5px',
                  marginBottom: '4px',
                }}
              >
                LOCATION
              </div>
              {data.location.map((loc, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    letterSpacing: '0.8px',
                    lineHeight: 1.3,
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>

            {/* Column 2: PERIOD */}
            <div>
              <div
                style={{
                  fontSize: '9px',
                  color: 'rgba(185, 205, 225, 0.6)',
                  letterSpacing: '1.5px',
                  marginBottom: '4px',
                }}
              >
                PERIOD
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  letterSpacing: '0.8px',
                  lineHeight: 1.3,
                }}
              >
                {data.period}
              </div>
            </div>

            {/* Column 3: FOCUS */}
            <div>
              <div
                style={{
                  fontSize: '9px',
                  color: 'rgba(185, 205, 225, 0.6)',
                  letterSpacing: '1.5px',
                  marginBottom: '4px',
                }}
              >
                FOCUS
              </div>
              {data.focus.map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    letterSpacing: '0.8px',
                    lineHeight: 1.3,
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS keyframes for smooth fade and scale in, and custom sci-fi text scrollbar */}
      <style jsx global>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .dossier-text-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .dossier-text-scroll::-webkit-scrollbar-track {
          background: rgba(226, 157, 104, 0.08);
          border-radius: 2px;
        }
        .dossier-text-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #e5a26e, #d98c4a);
          border-radius: 2px;
          box-shadow: 0 0 6px rgba(229, 162, 110, 0.6);
        }
        .dossier-text-scroll::-webkit-scrollbar-thumb:hover {
          background: #ffc896;
          box-shadow: 0 0 10px rgba(255, 200, 150, 0.9);
        }
      `}</style>
    </div>
  );
}
