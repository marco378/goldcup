'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="nav">

      {/* TOP BAR (LOGO) */}
      <div className="topBar">
        <Link href="/" style={{ textDecoration: 'none' }}>
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
            <Link href="/teams" className={isActive('/teams') ? 'navLink active' : 'navLink'}>Teams</Link>
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
                  <Link href="#" className="navLink" onClick={() => setMoreOpen(false)}>Wall of Fame</Link>
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
      </div>

      {moreOpen && (
        <div className="backdrop" onClick={() => setMoreOpen(false)} />
      )}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0px;
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
        }

        .dropdown .navLink {
          display: block;
          padding: 10px 14px;
        }

        .dropdown .navLink:hover {
          background: #1a1a1a;
        }

        .backdrop {
          position: fixed;
          inset: 0;
        }
      `}</style>
    </nav>
  )
}
