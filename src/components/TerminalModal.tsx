'use client';

import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '@/utils/soundEffects';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([
    'NOOVERSE QUANTUM MAINFRAME // FIRMWARE 4.8.2-SEC3',
    'INITIATING SECURE HANDSHAKE WITH ARYA ONE APEX RELAY...',
    'CONNECTION ESTABLISHED AT 1420.405 MHz.',
    'TYPE "help" FOR AVAILABLE OPERATIONAL DIRECTIVES.',
  ]);
  const [callsign, setCallsign] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundFx.playTargetLock();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    soundFx.playClick();

    if (!cmd) return;

    const newHistory = [...history, `root@nooverse-gate:~# ${inputVal}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'AVAILABLE PROTOCOLS:',
          '  status   - Interrogate gateway aperture stability',
          '  scan     - Initiate active radar telemetry sweep',
          '  lore     - Display declassified mission briefing',
          '  warp     - Simulate dimensional transit jump',
          '  clear    - Purge console buffer',
          '  exit     - Disconnect terminal'
        );
        break;
      case 'status':
        newHistory.push(
          'DIAGNOSTIC REPORT:',
          '  [✓] O-GATE CONVERGENCE: STABLE (99.2%)',
          '  [✓] GRAVITATIONAL FLUX: 984.2 TJ',
          '  [✓] ARYA ONE TOWER: SYNCHRONIZED',
          '  [!] SOLAR OCCULTATION: APPROACHING TWILIGHT'
        );
        break;
      case 'scan':
        soundFx.playRadarPing();
        newHistory.push(
          'RADAR SWEEP INITIATED...',
          '  DETECTED: 1 MEGASTRUCTURE (THE O-GATE)',
          '  DETECTED: 1 ATMOSPHERIC TOWER (ARYA ONE)',
          '  DETECTED: 42 UNREGISTERED WETLAND SIGNATURES',
          'SCAN COMPLETE.'
        );
        break;
      case 'lore':
        newHistory.push(
          'DECLASSIFIED BRIEFING:',
          '  Year 2070. Flooded Sector 3, India.',
          '  The giant portal ring awakened at sunset, distorting quantum space.',
          '  Four blocs vie for control of the Nooverse threshold.'
        );
        break;
      case 'warp':
        soundFx.playTargetLock();
        newHistory.push(
          'INITIATING WARP SEQUENCE...',
          'SPACETIME CURVATURE EXCEEDING SAFE TOLERANCES...',
          'TRANSIT AUTHORIZED. WELCOME TO THE NOOVERSE.'
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        newHistory.push(`COMMAND NOT RECOGNIZED: "${cmd}". TYPE "help" FOR PROTOCOLS.`);
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleBetaSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callsign) return;
    soundFx.playTargetLock();
    setSubmitted(true);
    setHistory((prev) => [
      ...prev,
      `[ACCESS GRANTED] CALLSIGN "${callsign.toUpperCase()}" ENROLLED FOR CLOSED NOOVERSE RECON.`,
    ]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(2, 6, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playClick();
          onClose();
        }
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          background: 'rgba(4, 11, 20, 0.95)',
          border: '1.5px solid var(--hud-cyan)',
          borderRadius: '4px',
          boxShadow: '0 0 40px rgba(0, 240, 255, 0.25), inset 0 0 20px rgba(0, 240, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            background: 'rgba(0, 240, 255, 0.1)',
            borderBottom: '1px solid var(--hud-cyan-border)',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--hud-cyan)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--hud-cyan)',
                boxShadow: '0 0 8px var(--hud-cyan)',
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: '1.5px' }}>
              NOOVERSE ACCESS TERMINAL // SECTOR 3
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--hud-cyan)',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '2px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Console Log Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12.5px',
            color: '#a0e8f8',
            lineHeight: 1.6,
            minHeight: '260px',
          }}
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                color: line.startsWith('root@')
                  ? 'var(--hud-cyan)'
                  : line.startsWith('[!]')
                  ? 'var(--hud-amber)'
                  : line.startsWith('[ACCESS')
                  ? '#00ffaa'
                  : 'rgba(180, 225, 240, 0.85)',
              }}
            >
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Interactive CLI Input Line */}
        <form
          onSubmit={handleCommand}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(3, 8, 14, 0.9)',
            borderTop: '1px solid var(--hud-cyan-border)',
            padding: '10px 18px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              color: 'var(--hud-cyan)',
              marginRight: '8px',
            }}
          >
            root@nooverse-gate:~#
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#ffffff',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid var(--hud-cyan)',
              color: 'var(--hud-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '4px 12px',
              borderRadius: '2px',
            }}
          >
            EXECUTE
          </button>
        </form>

        {/* Quick Clearance Pass / Callsign Registration */}
        <div
          style={{
            background: 'rgba(5, 14, 24, 0.85)',
            borderTop: '1px dashed var(--hud-cyan-border)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--hud-cyan-dim)',
              letterSpacing: '1px',
            }}
          >
            PILOT CLEARANCE REQUEST // CLOSED BETA ACCESS
          </div>

          {submitted ? (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#00ffaa',
              }}
            >
              ✓ ENROLLMENT CONFIRMED FOR {callsign.toUpperCase()}. TRANSMISSION ENCRYPTED.
            </div>
          ) : (
            <form
              onSubmit={handleBetaSignup}
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="ENTER CALLSIGN / COMM-ID"
                style={{
                  flex: 1,
                  background: 'rgba(3, 8, 14, 0.8)',
                  border: '1px solid var(--hud-cyan-border)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  background: 'var(--hud-cyan)',
                  border: 'none',
                  color: '#03070b',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  padding: '8px 18px',
                  borderRadius: '2px',
                }}
              >
                REQUEST ACCESS
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
