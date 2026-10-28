'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VideoBgProps {
  parallaxOffset?: { x: number; y: number };
}

export default function VideoBackground({ parallaxOffset = { x: 0, y: 0 } }: VideoBgProps) {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  useEffect(() => {
    const fwd = forwardVideoRef.current;
    const rev = reverseVideoRef.current;
    if (!fwd || !rev) return;

    let isSwitching = false;

    // Switch from forward playback to reverse playback
    const switchToReverse = () => {
      if (isSwitching) return;
      isSwitching = true;
      setDirection('reverse');
      rev.currentTime = 0;
      rev.play().catch(() => {});
      setTimeout(() => {
        if (fwd) {
          fwd.pause();
          fwd.currentTime = 0;
        }
        isSwitching = false;
      }, 350);
    };

    // Switch from reverse playback to forward playback
    const switchToForward = () => {
      if (isSwitching) return;
      isSwitching = true;
      setDirection('forward');
      fwd.currentTime = 0;
      fwd.play().catch(() => {});
      setTimeout(() => {
        if (rev) {
          rev.pause();
          rev.currentTime = 0;
        }
        isSwitching = false;
      }, 350);
    };

    // Listen to timeupdate near the end & ended event for forward video
    const handleFwdTimeUpdate = () => {
      if (fwd.duration && fwd.currentTime >= fwd.duration - 0.25) {
        switchToReverse();
      }
    };
    const handleFwdEnded = () => {
      switchToReverse();
    };

    // Listen to timeupdate near the end & ended event for reverse video
    const handleRevTimeUpdate = () => {
      if (rev.duration && rev.currentTime >= rev.duration - 0.25) {
        switchToForward();
      }
    };
    const handleRevEnded = () => {
      switchToForward();
    };

    fwd.addEventListener('timeupdate', handleFwdTimeUpdate);
    fwd.addEventListener('ended', handleFwdEnded);
    rev.addEventListener('timeupdate', handleRevTimeUpdate);
    rev.addEventListener('ended', handleRevEnded);

    // Initial play forward
    fwd.play().catch(() => {});

    return () => {
      fwd.removeEventListener('timeupdate', handleFwdTimeUpdate);
      fwd.removeEventListener('ended', handleFwdEnded);
      rev.removeEventListener('timeupdate', handleRevTimeUpdate);
      rev.removeEventListener('ended', handleRevEnded);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: '-25px',
        zIndex: 0,
        pointerEvents: 'none',
        transform: `translate(${-parallaxOffset.x * 12}px, ${-parallaxOffset.y * 8}px) scale(1.04)`,
        transition: 'transform 0.04s linear',
        willChange: 'transform',
      }}
    >
      {/* 1. FORWARD PLAYBACK VIDEO */}
      <video
        ref={forwardVideoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/hero-clean.png"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 42%',
          filter: 'contrast(1.05) brightness(0.96)',
          opacity: direction === 'forward' ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out',
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source
          src="https://res.cloudinary.com/dwgpeeu0r/video/upload/v1793179828/video_lxlubv.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. REVERSE PLAYBACK VIDEO (Ping-Pong / Forward & Reverse) */}
      <video
        ref={reverseVideoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 42%',
          filter: 'contrast(1.05) brightness(0.96)',
          opacity: direction === 'reverse' ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out',
        }}
      >
        <source src="/videos/hero-bg-reverse.mp4" type="video/mp4" />
        <source
          src="https://res.cloudinary.com/dwgpeeu0r/video/upload/e_reverse/v1793179828/video_lxlubv.mp4"
          type="video/mp4"
        />
      </video>

      {/* SLIGHT DARKER OVERLAY (AS REQUESTED) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(2, 6, 12, 0.54)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Cinematic Atmospheric Vignettes */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to top, rgba(2, 6, 12, 0.85) 0%, rgba(2, 6, 12, 0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(2, 6, 12, 0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
