'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// YouTube video: "Journey Through the Ruins of Tomorrow | Inspired by Simon Stålenhag"
// Target URL: https://www.youtube.com/watch?v=G_l08HcO-GY
const YOUTUBE_VIDEO_ID = 'G_l08HcO-GY';
const START_TIME_SECONDS = 0;

interface BackgroundAudioProps {
  activeSection?: number;
}

export default function BackgroundAudio({ activeSection = 0 }: BackgroundAudioProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  // Send control command directly to iframe and YT player
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendCommand = useCallback((func: string, args: any[] = []) => {
    // 1. Direct postMessage to the iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: args,
          }),
          '*'
        );
      } catch (err) {
        console.warn('postMessage command error:', err);
      }
    }

    // 2. Backup call to YT.Player API if attached
    if (playerRef.current && typeof playerRef.current[func] === 'function') {
      try {
        playerRef.current[func](...args);
      } catch {
        // ignore
      }
    }
  }, []);

  // 1. Initial play attempt + Listen for postMessage from YouTube
  useEffect(() => {
    // Attempt auto-play with sound
    const triggerAudio = () => {
      sendCommand('unMute');
      sendCommand('setVolume', [60]);
      sendCommand('seekTo', [START_TIME_SECONDS, true]);
      sendCommand('playVideo');
      setIsPlaying(true);
    };

    // Staggered trigger attempts to catch iframe load
    const t1 = setTimeout(triggerAudio, 800);
    const t2 = setTimeout(triggerAudio, 2000);
    const t3 = setTimeout(triggerAudio, 3500);

    // Immediate play unlock on ANY user gesture
    const handleGesture = () => {
      triggerAudio();
    };

    const events = ['click', 'pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, handleGesture, { once: true, passive: true }));

    // Listen for YouTube iframe messages
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (data.event === 'onReady') {
          setIsReady(true);
          triggerAudio();
        }

        // InfoDelivery tracks playback state: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
        if (data.event === 'infoDelivery' && data.info) {
          if (data.info.playerState === 1) {
            setIsPlaying(true);
          } else if (data.info.playerState === 2) {
            setIsPlaying(false);
          } else if (data.info.playerState === 0) {
            // Loop back to 2150s
            sendCommand('seekTo', [START_TIME_SECONDS, true]);
            sendCommand('playVideo');
            setIsPlaying(true);
          }
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      events.forEach((ev) => window.removeEventListener(ev, handleGesture));
      window.removeEventListener('message', handleMessage);
    };
  }, [sendCommand]);

  // 2. Also load YT.Player API to bind to the existing iframe
  useEffect(() => {
    let isCancelled = false;

    const bindYT = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;
      if (!YT || !YT.Player || !iframeRef.current) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (e: any) => {
              if (isCancelled) return;
              setIsReady(true);
              try {
                e.target.unMute();
                e.target.setVolume(60);
                e.target.seekTo(START_TIME_SECONDS, true);
                e.target.playVideo();
                setIsPlaying(true);
              } catch {
                // ignore
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (e: any) => {
              if (isCancelled) return;
              if (e.data === 1) setIsPlaying(true);
              if (e.data === 2) setIsPlaying(false);
              if (e.data === 0) {
                e.target.seekTo(START_TIME_SECONDS, true);
                e.target.playVideo();
              }
            },
          },
        });
      } catch (e) {
        console.warn('YT Player bind notice:', e);
      }
    };

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT && (window as any).YT.Player) {
      bindYT();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prevOnReady = (window as any).onYouTubeIframeAPIReady;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = () => {
        if (prevOnReady) prevOnReady();
        bindYT();
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // 3. User Play / Pause Click Toggle
  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('unMute');
      sendCommand('setVolume', [60]);
      sendCommand('seekTo', [START_TIME_SECONDS, true]);
      sendCommand('playVideo');
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* 
        In-viewport, non-throttled YouTube iframe.
        Dimensions 240x140 at bottom-right with opacity: 0.001 ensure Chrome/Safari 
        never pause or throttle the audio playback stream.
      */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '240px',
          height: '140px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -999,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <iframe
          ref={iframeRef}
          id="yt-ambient-player"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&start=${START_TIME_SECONDS}&loop=1&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1`}
          allow="autoplay; encrypted-media"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Ambient Background Music"
        />
      </div>

      {/* TOP-RIGHT SCI-FI AUDIO PLAY / PAUSE CONTROLLER (REPLACING ENTER NOOVERSE) */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '36px',
          zIndex: 1100,
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <button
          onClick={togglePlayPause}
          style={{
            position: 'relative',
            background: isPlaying
              ? 'rgba(10, 16, 24, 0.75)'
              : 'rgba(5, 8, 12, 0.65)',
            border: isPlaying
              ? '1px solid rgba(226, 157, 104, 0.75)'
              : '1px solid rgba(185, 230, 248, 0.35)',
            color: '#ffffff',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontFamily: "var(--font-tech), 'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: isPlaying
              ? '0 0 16px rgba(226, 157, 104, 0.3), inset 0 0 8px rgba(226, 157, 104, 0.12)'
              : '0 4px 12px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
          }}
          title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = isPlaying
              ? '#ffffff'
              : 'rgba(226, 157, 104, 0.9)';
            e.currentTarget.style.boxShadow =
              '0 0 16px rgba(255, 255, 255, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = isPlaying
              ? 'rgba(226, 157, 104, 0.75)'
              : 'rgba(185, 230, 248, 0.35)';
            e.currentTarget.style.boxShadow = isPlaying
              ? '0 0 16px rgba(226, 157, 104, 0.3), inset 0 0 8px rgba(226, 157, 104, 0.12)'
              : '0 4px 12px rgba(0, 0, 0, 0.5)';
          }}
        >
          {/* Animated or stationary Equalizer Sound Bars */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '2px',
              height: '12px',
              width: '13px',
            }}
          >
            <span
              style={{
                width: '2px',
                height: isPlaying ? '100%' : '35%',
                background: isPlaying ? '#e5a26e' : 'rgba(255, 255, 255, 0.45)',
                animation: isPlaying ? 'audioEq1 0.8s ease-in-out infinite alternate' : 'none',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                width: '2px',
                height: isPlaying ? '60%' : '35%',
                background: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                animation: isPlaying ? 'audioEq2 0.6s ease-in-out infinite alternate 0.15s' : 'none',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                width: '2px',
                height: isPlaying ? '85%' : '35%',
                background: isPlaying ? '#e5a26e' : 'rgba(255, 255, 255, 0.45)',
                animation: isPlaying ? 'audioEq3 0.9s ease-in-out infinite alternate 0.3s' : 'none',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                width: '2px',
                height: isPlaying ? '45%' : '35%',
                background: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                animation: isPlaying ? 'audioEq4 0.7s ease-in-out infinite alternate 0.2s' : 'none',
                borderRadius: '1px',
              }}
            />
          </div>

          {/* Text Label */}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>

          {/* Play / Pause Icon */}
          {isPlaying ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#ffffff' }}
            >
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#ffffff' }}
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* Global CSS for Equalizer animation */}
      <style jsx global>{`
        @keyframes audioEq1 {
          0% { height: 20%; }
          50% { height: 95%; }
          100% { height: 40%; }
        }
        @keyframes audioEq2 {
          0% { height: 70%; }
          50% { height: 30%; }
          100% { height: 100%; }
        }
        @keyframes audioEq3 {
          0% { height: 40%; }
          50% { height: 100%; }
          100% { height: 60%; }
        }
        @keyframes audioEq4 {
          0% { height: 90%; }
          50% { height: 20%; }
          100% { height: 75%; }
        }
      `}</style>
    </>
  );
}
