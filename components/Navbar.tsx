'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const close = () => { setMenuOpen(false); setMoreOpen(false) }

  return (
    <nav className="nav">

      {/* TOP BAR (LOGO) */}
      <div className="topBar">
        <Link href="/" style={{ textDecoration: 'none' }} onClick={close}>
          <div className="logoNotch">LOGO</div>
        </Link>
      </div>

      {/* BOTTOM BAR */}
      <div className="bottomBar">
        <div className="navCenter">

          {/* LEFT */}
          <div className="leftNav">
            <Link href="/" className={isActive('/') ? 'navLink active' : 'navLink'}>Home</Link>
            <Link href="/tournament" className={isActive('/tournament') ? 'navLink active' : 'navLink'}>Tournament</Link>
            <Link href="/teamsandplayers" className={isActive('/teamsandplayers') ? 'navLink active' : 'navLink'}>Teams</Link>
          </div>

          {/* RIGHT */}
          <div className="rightNav">
            <Link href="/media" className={isActive('/media') ? 'navLink active' : 'navLink'}>Media</Link>
            <Link href="/sponsors" className={isActive('/sponsors') ? 'navLink active' : 'navLink'}>Sponsors</Link>

            <div className="moreWrap">
              <button onClick={() => setMoreOpen(v => !v)}>
                More ▾
              </button>

              {moreOpen && (
                <div className="dropdown">
                  <Link href="/walloffame" className="navLink" onClick={() => setMoreOpen(false)}>Wall of Fame</Link>
                  <Link href="/tournament" className="navLink" onClick={() => setMoreOpen(false)}>Schedule</Link>
                  <Link
                    href="/contact"
                    className={isActive('/contact') ? 'navLink active' : 'navLink'}
                    onClick={() => setMoreOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 3L19 19M19 3L3 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobileMenu">
          <Link href="/" className={isActive('/') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Home</Link>
          <Link href="/tournament" className={isActive('/tournament') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Tournament</Link>
          <Link href="/teamsandplayers" className={isActive('/teamsandplayers') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Teams</Link>
          <Link href="/media" className={isActive('/media') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Media</Link>
          <Link href="/sponsors" className={isActive('/sponsors') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Sponsors</Link>
          <Link href="/walloffame" className={isActive('/walloffame') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Wall of Fame</Link>
          <Link href="/contact" className={isActive('/contact') ? 'mobileLink active' : 'mobileLink'} onClick={close}>Contact</Link>
        </div>
      )}

      {moreOpen && (
        <div className="backdrop" onClick={() => setMoreOpen(false)} />
      )}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        /* TOP BAR */
        .topBar {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .logoNotch {
          width: 200px;
          height: 50px;
          background: #050505;
          border: 1px solid rgba(255,255,255,0.15);
          border-top: none;
          clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          letter-spacing: 0.3em;
          color: white;
          font-family: var(--font-manrope);
        }

        /* BOTTOM BAR */
        .bottomBar {
          margin-top: -12px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .navCenter {
          display: flex;
          width: 784px;
          justify-content: space-between;
          align-items: center;
        }

        .leftNav,
        .rightNav {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .navLink {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 16px;
          font-family: var(--font-manrope);
          transition: color 0.2s ease;
        }

        .navLink:hover {
          color: #fff;
        }

        .navLink.active {
          color: var(--gold);
        }

        /* MORE */
        .moreWrap {
          position: relative;
        }

        button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          font-size: 16px;
          font-family: var(--font-manrope);
          transition: color 0.2s ease;
        }

        button:hover {
          color: #fff;
        }

        .dropdown {
          position: absolute;
          top: 36px;
          right: 0;
          background: #0e0e0e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          overflow: hidden;
          min-width: 180px;
          display: flex; 
          z-index: 200;         /* ✅ ADD */
  flex-direction: column;
        }

        .dropdown .navLink {
          display: block;
          padding: 10px 14px;
          white-space: nowrap;
        }

        .dropdown .navLink:hover {
          background: #1a1a1a;
        }

        /* HAMBURGER — hidden on desktop */
        .hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          padding: 8px;
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          min-width: 44px;
          min-height: 44px;
        }

        /* MOBILE MENU */
        .mobileMenu {
          background: #050505;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          animation: menuSlide 0.22s ease both;
        }

        .mobileLink {
          display: block;
          padding: 14px 24px;
          font-size: 18px;
          font-family: var(--font-manrope);
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.15s ease, background 0.15s ease;
        }

        .mobileLink:hover {
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        .mobileLink.active {
          color: var(--gold);
        }

        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
        }

        /* ── TABLET & MOBILE: show hamburger, hide desktop nav ── */
        @media (max-width: 1023px) {
          .navCenter {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .bottomBar {
            justify-content: center;
            position: relative;
          }
        }

        /* ── PHONES ── */
        @media (max-width: 639px) {
          .logoNotch {
            width: 140px;
            font-size: 13px;
            height: 44px;
            letter-spacing: 0.15em;
          }

          .bottomBar {
            margin-top: -8px;
            height: 48px;
          }

          .hamburger {
            right: 12px;
          }
        }

        /* ── TABLETS ── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .logoNotch {
            width: 170px;
            font-size: 14px;
          }

          .bottomBar {
            margin-top: -10px;
            height: 54px;
          }
        }
      `}</style>
    </nav>
  )
}
