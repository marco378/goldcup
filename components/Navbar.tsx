'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const closeAll = () => {
    setMenuOpen(false)
    setMoreOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <nav className="nav">

      {/* ===== TOP BAR ===== */}
      <div className="topBar">
        <Link href="/" onClick={closeAll}>
          <div className="logoNotch">LOGO</div>
        </Link>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="bottomBar">

        <div className="navCenter">

          <div className="leftNav">
            <Link href="/" className={isActive('/') ? 'navLink active' : 'navLink'}>Home</Link>
            <Link href="/tournament" className={isActive('/tournament') ? 'navLink active' : 'navLink'}>Tournament</Link>
            <Link href="/teamsandplayers" className={isActive('/teamsandplayers') ? 'navLink active' : 'navLink'}>Teams</Link>
          </div>

          <div className="rightNav">
            <Link href="/media" className={isActive('/media') ? 'navLink active' : 'navLink'}>Media</Link>
            <Link href="/sponsors" className={isActive('/sponsors') ? 'navLink active' : 'navLink'}>Sponsors</Link>

            <div className="moreWrap">
              <button onClick={() => setMoreOpen(v => !v)}>
                More ▾
              </button>

              {moreOpen && (
                <div className="dropdown">
                  <Link href="/walloffame" onClick={closeAll}>Wall of Fame</Link>
                  <Link href="/tournament" onClick={closeAll}>Schedule</Link>
                  <Link href="/about" onClick={closeAll}>About</Link>
                  <Link href="/contact" onClick={closeAll}>Contact</Link>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ===== HAMBURGER ===== */}
        <button className="hamburger" onClick={() => setMenuOpen(true)}>
          ☰
        </button>

      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {menuOpen && (
        <>
          <div className="overlay" onClick={closeAll} />

          <div className="drawer">

            {/* ===== HEADER ===== */}
            <div className="drawerHeader">
              <Link href="/" onClick={closeAll} className="drawerLogo">GOLD CUP MENU</Link>
              <button className="drawerClose" onClick={closeAll}>✕</button>
            </div>

            {/* ===== ROW + DIVIDER MENU ===== */}
            <div className="drawerLinks">
              {[
                { href: '/', label: 'Home' },
                { href: '/tournament', label: 'Tournament' },
                { href: '/teamsandplayers', label: 'Teams' },
                { href: '/media', label: 'Media' },
                { href: '/sponsors', label: 'Sponsors' },
                { href: '/walloffame', label: 'Wall of Fame' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={`drawerLink${isActive(item.href) ? ' mobileActive' : ''}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

          </div>
        </>
      )}

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .topBar {
          display: flex;
          justify-content: center;
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
          color: white;
        }

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

        :global(.navLink) {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 500;
        }

        :global(.navLink.active) {
          color: var(--gold-light);
        }

        .moreWrap {
          position: relative;
        }

        .moreWrap button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.85);
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          min-width: 160px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
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
          transition: background 150ms ease, color 150ms ease;
        }

        .dropdown :global(a:last-child) {
          border-bottom: none;
        }

        .dropdown :global(a:hover) {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .hamburger {
          display: none;
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          font-size: 22px;
          color: white;
          cursor: pointer;
        }

        /* ===== OVERLAY ===== */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
        }

        /* ===== DRAWER BASE ===== */
        .drawer {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.97);
          display: flex;
          flex-direction: column;
          animation: drawerIn 380ms cubic-bezier(.2,.8,.2,1);
          overflow-y: auto;
        }

        .drawer::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(900px circle at 10% 0%, rgba(255,215,0,0.12), transparent 45%);
          opacity: 0.9;
        }

        /* ===== DRAWER HEADER ===== */
        .drawerHeader {
          padding: 52px 28px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        :global(.drawerLogo) {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
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

        /* ===== LINKS ===== */
        .drawerLinks {
          padding: 0 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.10);
        }

        .drawerLinks :global(a) {
          display: block;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          font-family: var(--font-manrope), sans-serif;
          font-size: 20px;
          font-weight: 300;
          letter-spacing: -0.3px;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          opacity: 0;
          transform: translateY(12px);
          animation: menuRowIn 400ms cubic-bezier(.2,.8,.2,1) forwards;
          transition: color 180ms ease;
        }

        .drawerLinks :global(a:last-child) {
          border-bottom: none;
        }

        .drawerLinks :global(a:hover) {
          color: #fff;
        }

        .drawerLinks :global(a.mobileActive) {
          color: var(--gold-light);
        }

        /* ===== ANIMATIONS ===== */
        @keyframes drawerIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes menuRowIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1023px) {
          .navCenter {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </nav>
  )
}