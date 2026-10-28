'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };
    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '4px',
          height: '4px',
          backgroundColor: 'var(--hud-cyan)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px var(--hud-cyan)',
        }}
      />

      {/* Trailing Crosshair / Targeting Reticle */}
      <div
        style={{
          position: 'absolute',
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '42px' : '28px',
          height: isHovered ? '42px' : '28px',
          border: `1px solid ${isHovered ? 'var(--hud-cyan)' : 'var(--hud-cyan-dim)'}`,
          borderRadius: isHovered ? '4px' : '50%',
          transform: `translate(-50%, -50%) rotate(${isHovered ? '45deg' : '0deg'}) scale(${
            isClicked ? 0.8 : 1
          })`,
          transition: 'width 0.2s, height 0.2s, transform 0.2s, border-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ticks */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'var(--hud-cyan-dim)',
            top: '50%',
            left: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '1px',
            background: 'var(--hud-cyan-dim)',
            left: '50%',
            top: 0,
          }}
        />
      </div>

      {/* Real-time coordinates floating next to cursor */}
      <div
        style={{
          position: 'absolute',
          left: `${pos.x + 16}px`,
          top: `${pos.y + 16}px`,
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--hud-cyan-dim)',
          letterSpacing: '1px',
          background: 'rgba(3, 7, 12, 0.75)',
          padding: '2px 5px',
          border: '1px solid var(--hud-cyan-border)',
          borderRadius: '2px',
          backdropFilter: 'blur(4px)',
        }}
      >
        [{Math.round(pos.x)},{Math.round(pos.y)}]
      </div>
    </div>
  );
}
