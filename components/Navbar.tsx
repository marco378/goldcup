'use client'

import { useMemo, useState } from 'react'

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false)

  // ✅ Define links properly
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Tournament', href: '/tournament' },
    { label: 'Teams & Players', href: '/teams' },
    { label: 'Wall of Fame', href: '/wall-of-fame' },
    { label: 'Live & Schedule', href: '/schedule' },
    { label: 'Media & Gallery', href: '/schedule' },
    { label: 'Sponsors & Partners', href: '/schedule' },
    { label: 'News & Updates', href: '/schedule' },
    { label: 'Contact', href: '/schedule' },
  ]

  const linkStyle = useMemo(() => ({
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '15px',
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 500,
    opacity: 0.9,
    whiteSpace: 'nowrap',
  }), [])

  const NavLink = ({ href, children }) => (
    <a href={href} style={linkStyle}>{children}</a>
  )

  // ✅ First 6 visible, rest in More
  const visibleLinks = links.slice(0, 6)
  const hiddenLinks = links.slice(6)

  return (
    <nav className="nav">
      <div className="logoNotch">L O G O</div>

      <div className="navRow">
        <div className="leftNav">
          {visibleLinks.map(link => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}

          {hiddenLinks.length > 0 && (
            <div className="moreWrap">
              <button
                type="button"
                className="moreButton"
                onClick={() => setMoreOpen(v => !v)}
              >
                More
              </button>

              {moreOpen && (
                <div className="moreMenu">
                  {hiddenLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="moreItem"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {moreOpen && <div className="backdrop" onClick={() => setMoreOpen(false)} />}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          z-index: 100;
        }

        .logoNotch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 44px;
          background: #050505;
          border: 1px solid rgba(255,255,255,0.15);
          border-top: none;
          border-radius: 0 0 12px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #fff;
        }

        .navRow {
          position: absolute;
          top: 48px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
        }

        .leftNav {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .moreWrap { position: relative; }

        .moreButton {
          background: none;
          border: none;
          color: #fff;
          font-size: 15px;
          cursor: pointer;
        }

        .moreMenu {
          position: absolute;
          top: 30px;
          left: 0;
          background: #0e0e0e;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          min-width: 160px;
        }

        .moreItem {
          display: block;
          padding: 8px 12px;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
        }

        .moreItem:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .backdrop {
          position: fixed;
          inset: 0;
        }
      `}</style>
    </nav>
  )
}