'use client'

import { useState } from 'react'

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <nav className="nav">

      {/* 🔝 TOP BAR (LOGO) */}
      <div className="topBar">
        <div className="logoNotch">LOGO</div>
      </div>

      {/* 🔽 BOTTOM BAR */}
      <div className="bottomBar">
        <div className="navCenter">

          {/* LEFT */}
          <div className="leftNav">
            <a>Home</a>
            <a>Tournament</a>
            <a>Teams</a>
          </div>

          {/* RIGHT */}
          <div className="rightNav">
            <a>Media</a>
            <a>Sponsors</a>

            <div className="moreWrap">
              <button onClick={() => setMoreOpen(v => !v)}>
                More ▾
              </button>

              {moreOpen && (
                <div className="dropdown">
                  <a>Wall of Fame</a>
                  <a>Schedule</a>
                  <a>Contact</a>
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

        /* 🔝 TOP BAR */
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

          clip-path: polygon(
            0 0,
            100% 0,
            85% 100%,
            15% 100%
          );

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 16px;
          letter-spacing: 0.3em;
          color: white;
          font-family: var(--font-manrope);
        }

        /* 🔽 BOTTOM BAR */
        .bottomBar {
          margin-top: -12px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* 🔥 CENTERED GROUP */
        .navCenter {
            display: flex;
  width: 784px; /* 🔥 from figma */
  justify-content: space-between; /* 🔥 key */
  align-items: center;
        }

        .leftNav,
        .rightNav {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 16px;
          font-family: var(--font-manrope);
        }

        a:hover {
          color: #fff;
        }

        /* MORE */
        .moreWrap {
          position: relative;
        }

        button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
        }

        .dropdown {
          position: absolute;
          top: 36px;
          right: 0;
          background: #0e0e0e;
          border-radius: 6px;
          overflow: hidden;
          min-width: 180px;
        }

        .dropdown a {
          display: block;
          padding: 10px 14px;
        }

        .dropdown a:hover {
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