'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const footerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = footerRef.current
    if (!node) {
      return
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.22 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className={`footer ${isVisible ? 'isVisible' : ''}`}>
      <div className="watermarkWrap">
        <h1 className="watermark">Gold Cup: 42nd Edition</h1>
      </div>

      <div className="row">
        <div className="links">
          <Link href="/" style={footerLinkStyle}>Home</Link>
          <Link href="/about" style={footerLinkStyle}>About</Link>
          <Link href="/teamsandplayers" style={footerLinkStyle}>Teams</Link>
          <Link href="/TournamentSection" style={footerLinkStyle}>Tournament Structure</Link>
          
          
          
        </div>

        <Link href="/" >
            <img src="./images/optimized/FinalLogo.png" alt="LOGO" width={140} height={140} />
          </Link>

        <div className="links right">
          <Link href="/sponsors" style={footerLinkStyle}>Sponsors</Link>
          <Link href="/tournament" style={footerLinkStyle}>Live Section</Link>
          <Link href="/walloffame" style={footerLinkStyle}>Wall of Fame</Link>
          <div className="moreWrap">
            <button className="moreBtn" onClick={() => setMoreOpen(v => !v)}>
              More
              <svg className={`chevron ${moreOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#fffbf2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {moreOpen && (
              <div className="dropdown">
                <Link href="/media"   onClick={() => setMoreOpen(false)} style={footerLinkStyle}>News & Updates</Link>
                <Link href="/contact" onClick={() => setMoreOpen(false)} style={footerLinkStyle}>Contact</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="copyWrap">
        <p>Gold Cup: 42nd Edition. All Rights Reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          background: transparent;
          position: relative;
          overflow: hidden;
        }

        .watermarkWrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          overflow: hidden;
          padding: 0;
        }

        .watermark {
          color: rgba(255, 255, 255, 0.1);
          font-family: var(--font-coluna),'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 218px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -4px;
          margin: 0;
          text-align: center;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(115%) skewY(4deg);
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease;
        }

        .row {
          position: relative;
          z-index: 1;
          padding: 52px 80px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 52px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0;
          transform: translateY(32px);
          transition: transform 0.65s ease, opacity 0.65s ease;
        }

        .links {
          display: flex;
          gap: 48px;
          align-items: center;
        }

        .moreWrap {
          position: relative;
        }
        .moreBtn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          padding: 0;
          white-space: nowrap;
          transition: color 0.18s ease;
        }
        .moreBtn:hover { color: #fff; }
        .chevron { transition: transform 0.2s ease; flex-shrink: 0; }
        .chevron.open { transform: rotate(180deg); }

        .dropdown {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          background: rgba(10,10,10,0.97);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          min-width: 140px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: fadeUp 0.18s ease both;
        }
        .dropdown :global(a) {
          display: block;
          padding: 12px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 140ms ease, color 140ms ease;
        }
        .dropdown :global(a:last-child) { border-bottom: none; }
        .dropdown :global(a:hover) { background: rgba(255,255,255,0.06); color: #fff !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .logoWrap {
          display: flex;
          justify-content: center;
          min-width: 80px;
          font-family: var(--font-manrope);
          font-size: 14px;
          letter-spacing: 0.24em;
          color: #fff;
        }

        .copyWrap {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 26px 80px 88px;
          opacity: 0;
          transform: translateY(24px);
          transition: transform 0.6s ease 0.08s, opacity 0.6s ease 0.08s;
        }

        p {
          font-family: var(--font-manrope);
          font-size: 12px;
          color: rgba(255, 251, 251, 0.96);
          letter-spacing: 0.02em;
        }

        .isVisible .watermark {
          opacity: 1;
          transform: translateY(0) skewY(0deg);
        }

        .isVisible .row,
        .isVisible .copyWrap {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .watermark,
          .row,
          .copyWrap {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .row {
            flex-direction: column;
            align-items: center;
            padding: 28px 16px 16px;
            gap: 24px;
          }

          .links,
          .links.right {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }

          .logoWrap {
            display: none;
          }

          .copyWrap {
            padding: 16px 16px 48px;
          }

          .watermarkWrap {
            padding: 0;
            width: 100%;
          }

          .watermark {
            font-size: 14.9vw;
            letter-spacing: -0.02em;
            white-space: nowrap;
            width: 100%;
            text-align: center;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .row {
            padding: 34px 18px 16px;
            gap: 18px;
          }

          .links {
            gap: 20px;
          }

          .links.right {
            justify-content: flex-end;
          }

          .copyWrap {
            padding: 18px 18px 38px;
          }

          .watermarkWrap {
            padding: 0;
          }

          .watermark {
            font-size: 13vw;
            letter-spacing: -0.02em;
            white-space: nowrap;
          }
        }
      `}</style>
    </footer>
  )
}

const footerLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.9)',
  textDecoration: 'none',
  fontSize: '13px',
  fontFamily: 'var(--font-manrope)',
  fontWeight: 500,
  letterSpacing: '0.02em',
  cursor: 'pointer',
}
