'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [moreOpen, setMoreOpen]   = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const closeAll = () => { setMenuOpen(false); setMoreOpen(false) }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className="nav">

      {/* ── SINGLE BAR ── */}
      <div className="bar">

        {/* Mobile logo (left side) */}
        <Link href="/" onClick={closeAll} className="mobileLogo">
          <img src="./images/optimized/FinalLogo.png" alt="LOGO" width={60} height={60} />
        </Link>

        {/* Desktop row */}
        <div className="navCenter">

          {/* Left links */}
          <div className="navGroup navLeft">
            <Link href="/"                  className={isActive('/')                  ? 'navLink active' : 'navLink'}>Home</Link>
            <Link href="/about"             className={isActive('/about')             ? 'navLink active' : 'navLink'}>About</Link>
            <Link href="/teamsandplayers"   className={isActive('/teamsandplayers')   ? 'navLink active' : 'navLink'}>Teams</Link>
            <Link href="/TournamentSection"        className={isActive('/TournamentSection')        ? 'navLink active' : 'navLink'}>Tournament Structure</Link>
            
            
            
          </div>

          {/* Centre logo */}
          <Link href="/" onClick={closeAll} className="logoWrap">
            <img src="./images/optimized/FinalLogo.png" alt="LOGO" width={60} height={60} />
          </Link>

          {/* Right links */}
          <div className="navGroup navRight">
            
            
            <Link href="/sponsors" className={isActive('/sponsors') ? 'navLink active' : 'navLink'}>Sponsors</Link>
            <Link href="/tournament"        className={isActive('/tournament')        ? 'navLink active' : 'navLink'}>Live Section</Link>
            <Link href="/walloffame"        className={isActive('/walloffame')        ? 'navLink active' : 'navLink'}>Wall of Fame</Link>

            <div className="moreWrap">
              <button className="moreBtn" onClick={() => setMoreOpen(v => !v)}>
                More
                <svg className={`chevron ${moreOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="#fffbf2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {moreOpen && (
                <div className="dropdown">
                  <Link href="/media"   onClick={closeAll}>News & Updates</Link>
                  <Link href="/contact" onClick={closeAll}>Contact</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hamburger (mobile only) */}
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>

      </div>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <>
          <div className="overlay" onClick={closeAll} />

          <div className="drawer">
            <div className="drawerHeader">
              <Link href="/" onClick={closeAll} className="drawerLogo">Gold Cup</Link>
              <button className="drawerClose" onClick={closeAll}>✕</button>
            </div>

            <div className="drawerLinks">
              {[
                { href: '/',                label: 'Home' },
                { href: '/tournament',      label: 'Live Section' },
                { href: '/teamsandplayers', label: 'Teams' },
                { href: '/media',           label: 'News & Updates' },
                { href: '/sponsors',        label: 'Sponsors' },
                { href: '/walloffame',      label: 'Wall of Fame' },
                { href: '/about',           label: 'About' },
                { href: '/contact',         label: 'Contact' },
              ].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={isActive(item.href) ? 'drawerLink mobileActive' : 'drawerLink'}
                  style={{ animationDelay: `${i * 0.045}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`

        /* ── nav shell ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
        }

        /* ══════════════════════════════
            SINGLE BAR
        ══════════════════════════════ */
        .bar {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 24px;
          position: relative;
        }

        /* Mobile logo - hidden on desktop */
        :global(.mobileLogo) {
          display: none;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }
        :global(.mobileLogo) img {
          display: block;
          object-fit: contain;
          width: 50px;
          height: auto;
        }

        /* three-column centred layout */
        .navCenter {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 50px;
          width: fit-content;
          max-width: calc(100% - 40px);
          margin: 0 auto;
          max-width: 1100px;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 12px;
          padding: 11px 24px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .navGroup {
          display: flex;
          align-items: center;
          gap: 50px;
          flex: 1;
        }

        .navLeft  { justify-content: flex-end;  }
        .navRight { justify-content: flex-start; }

        /* logo */
        .logoWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .logoWrap img {
          display: block;
          object-fit: contain;
          width: 110px;
          height: auto;
        }

        /* nav links */
        :global(.navLink) {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 0.84;
          letter-spacing: -0.14px;
          color: #fffbf2;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.18s ease;
        }
        :global(.navLink:hover) { color: #fff; }
        :global(.navLink.active) { color: var(--gold-light, #E2C06A); }

        /* More button */
        .moreWrap { position: relative; }
        .moreBtn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.14px;
          color: #fffbf2;
          cursor: pointer;
          padding: 0;
          white-space: nowrap;
          transition: color 0.18s ease;
        }
        .moreBtn:hover { color: #fff; }
        .chevron {
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .chevron.open { transform: rotate(180deg); }

        /* dropdown */
        .dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          background: rgba(10,10,10,0.97);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          min-width: 160px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: fadeDown 0.18s ease both;
        }
        .dropdown :global(a) {
          display: block;
          padding: 12px 18px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,0.80);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 140ms ease, color 140ms ease;
        }
        .dropdown :global(a:last-child) { border-bottom: none; }
        .dropdown :global(a:hover) { background: rgba(255,255,255,0.06); color: #fff; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* hamburger */
        .hamburger {
          display: none;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 2;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: opacity 0.2s;
        }

        /* ══════════════════════════════
            OVERLAY
        ══════════════════════════════ */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
          z-index: 99;
        }

        /* ══════════════════════════════
            MOBILE DRAWER
        ══════════════════════════════ */
        .drawer {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(10,10,10,0.97);
          display: flex;
          flex-direction: column;
          animation: drawerIn 340ms cubic-bezier(.2,.8,.2,1);
          overflow-y: auto;
        }
        .drawer::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(900px circle at 10% 0%, rgba(255,215,0,0.12), transparent 45%);
        }

        .drawerHeader {
          padding: 52px 28px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        :global(.drawerLogo) {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 52px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.95);
          text-decoration: none;
        }

        .drawerClose {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.80);
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .drawerLinks {
          padding: 0 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.10);
        }
        :global(.drawerLink) {
          display: block;
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          font-family: var(--font-manrope), sans-serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: -0.3px;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          opacity: 0;
          transform: translateY(12px);
          animation: menuRowIn 380ms cubic-bezier(.2,.8,.2,1) forwards;
          transition: color 180ms ease;
        }
        :global(.drawerLink:last-child) { border-bottom: none; }
        :global(.drawerLink:hover)      { color: #fff; }
        :global(.drawerLink.mobileActive) { color: var(--gold-light, #E2C06A); }

        @keyframes drawerIn {
          from { transform: translateX(20px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes menuRowIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ══════════════════════════════
            RESPONSIVE
        ══════════════════════════════ */
        @media (max-width: 1023px) {
          .navCenter { display: none; }
          .hamburger { display: flex; }
          :global(.mobileLogo) { display: block; }
        }

        @media (max-width: 639px) {
          .bar { padding: 46px 20px; }
          :global(.mobileLogo) img {
            width: 65px;
            padding-top: 17px;
          }
        }
      `}</style>
    </nav>
  )
}