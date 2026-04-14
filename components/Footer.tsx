'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      

      <div className="row">
        <div className="links">
          {['Home', 'Tournament', 'Teams'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={footerLinkStyle}>
              {item}
            </Link>
          ))}
        </div>

        <div className="logoWrap">L O G O</div>

        <div className="links right">
          {['Media', 'Sponsors'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={footerLinkStyle}>
              {item}
            </Link>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'auto', ...footerLinkStyle }}>
            More
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="copyWrap">
        <p>Copyright Audace labs</p>
      </div>

      <style jsx>{`
        .footer {
          background: #000;
          position: relative;
          overflow: hidden;
        }

        
        .row {
          position: relative;
          z-index: 1;
          padding: 40px 80px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .links {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .logoWrap {
          display: flex;
          justify-content: center;
          min-width: 80px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          letter-spacing: 0.24em;
          color: #fff;
        }

        .copyWrap {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 80px 68px;
        }

        p {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.52);
          letter-spacing: 0.02em;
        }

        @media (max-width: 900px) {
          .row {
            padding: 26px 18px 10px;
            gap: 12px;
          }

          .links {
            gap: 14px;
          }

          .links.right {
            justify-content: flex-end;
          }

          .copyWrap {
            padding: 0 18px 30px;
          }

          .watermark {
            font-size: clamp(36px, 10vw, 68px);
            bottom: -2px;
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
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 500,
  letterSpacing: '0.02em',
  cursor: 'pointer',
}
