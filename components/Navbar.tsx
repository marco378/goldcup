'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false)

  const linkStyle = useMemo(
    () => ({
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '16px',
      fontFamily: "'Barlow', sans-serif",  // ✅ Fixed: quotes were wrapping both name and fallback
      fontWeight: 500,
      letterSpacing: '0.01em',
      opacity: 0.92,
      lineHeight: 1,
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
    }),
    []
  )

  return (
    <nav className="nav">
      {/* Logo notch */}
      <div className="logoNotch">L O G O</div>

      {/* Nav row */}
      <div className="navRow">
        {/* ✅ Primary links on the left */}
        <div className="leftNav">
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/tournament" style={linkStyle}>Tournament</Link>
          <Link href="/teams" style={linkStyle}>Teams & Players</Link>
          <Link href="/wall-of-fame" style={linkStyle}>Wall of Fame</Link>
          <Link href="/schedule" style={linkStyle}>Live & Schedule</Link>
          <Link href="/schedule" style={linkStyle}>Media & Gallery</Link>
          <Link href="/schedule" style={linkStyle}>Sponsors & Partners</Link>
          <Link href="/schedule" style={linkStyle}>News & Updates</Link>
          <Link href="/schedule" style={linkStyle}>Contact</Link>

          {/* ✅ Secondary links collapsed into More */}
          <div className="moreWrap">
            <button
              type="button"
              className="moreButton"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
            >
              <span>More</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {moreOpen && (
              <div className="moreMenu" role="menu">
                {[
                  { label: 'Media & Gallery',       href: '/media' },
                  { label: 'Sponsors & Partners',   href: '/sponsors' },
                  { label: 'News & Updates',         href: '/news' },
                  { label: 'Contact',                href: '/contact' },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="moreItem"
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ CTA button in its own rightNav
        <div className="rightNav">
          <Link href="/teams" className="viewTeamsButton">
            View Teams
          </Link>
        </div>*/ }
      </div>

      {moreOpen && <div className="backdrop" onClick={() => setMoreOpen(false)} />}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 80px;
          pointer-events: auto;
          background: transparent;
        }

        .logoNotch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 52px;
          background: #050505;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-top: none;
          border-radius: 0 0 16px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.28em;
          color: #fff;
          pointer-events: none;
          user-select: none;
          clip-path: inset(-2px -2px 0 -2px);
          
        }

        .logoNotch::before,
        .logoNotch::after {
          content: '';
          position: absolute;
          top: -1px;
          width: 36px;
          height: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
        }
        .logoNotch::before { left: -24px; transform: skewX(-38deg); }
        .logoNotch::after  { right: -24px; transform: skewX(38deg); }

        .navRow {
          position: absolute;
          top: 51px;
          left: 248px;
          right: 248px;
          display: flex;
          align-items: center;
          justify-content: space-between;  
          pointer-events: auto;
        }

        .leftNav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        /* ✅ rightNav now exists in JSX */
        .rightNav {
          display: flex;
          align-items: center;
        }

        .moreWrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .moreButton {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 16px;
          font-family: 'Barlow', sans-serif;  /* ✅ Fixed font-family */
          font-weight: 500;
          line-height: 1;
          opacity: 0.92;
          white-space: nowrap;
        }
        .moreButton:hover { opacity: 1; }

        .moreMenu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          background: #0e0e0e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          min-width: 190px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          z-index: 200;
        }

        .moreItem {
          display: block;
          padding: 10px 16px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          font-family: 'Barlow', sans-serif;  /* ✅ Fixed font-family */
          font-weight: 500;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .moreItem:hover { background: #1a1a1a; color: #fff; }

        .viewTeamsButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 20px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 6px;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-family: 'Barlow', sans-serif;  
          font-weight: 500;
          background: transparent;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
          line-height: 1;
          cursor: pointer;
        }
        .viewTeamsButton:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.7);
        }

        .backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
        }

        @media (max-width: 1100px) {
          .navRow { left: 40px; right: 40px; }
        }

        @media (max-width: 860px) {
          .navRow { top: 42px; left: 12px; right: 12px; }
          .leftNav > a { display: none; }
          .leftNav { gap: 16px; }
          .logoNotch { width: 140px; height: 44px; font-size: 12px; }
          .logoNotch::before,
          .logoNotch::after { display: none; }
        }
      `}</style>
    </nav>
  )
}