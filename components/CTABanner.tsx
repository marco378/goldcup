'use client'

import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="ctaSection">
      <div className="ctaBox">
        <div className="ctaBg" />
        <div className="ctaOverlay" />

        <div className="ctaContent">
          <h2>Be Part of Cricket History</h2>

          <p>42 editions. 100+ alumni. Counting.</p>

          <div className="ctaActions">
            <Link href="/sponsors" legacyBehavior passHref>
              <a className="btnPrimary">
                <span className="btnPrimaryContent">Partner with Us</span>
              </a>
            </Link>

            <Link href="/tournament" legacyBehavior passHref>
              <a className="btnSecondary">
                <span className="btnSecondaryContent">Explore Tournament</span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ctaSection {
          padding: 0 60px 80px;
          background: var(--bg);
        }

        .ctaBox {
          position: relative;
          width: 1000px;
          max-width: 100%;
          height: 305px;
          margin: 0 auto;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .ctaBg {
          position: absolute;
          inset: 0;
          background: url('/images/untitled folder 3/DSC_2050.JPG') lightgray 50% / cover no-repeat;
          filter: brightness(0.65);
          z-index: 0;
        }

        .ctaOverlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at top,
            rgba(255, 255, 255, 0.03),
            rgba(0, 0, 0, 0.78)
          );
          z-index: 1;
        }

        .ctaContent {
          position: relative;
          z-index: 2;
          padding: 58px 24px;
        }

        h2 {
          text-align: center;
          font-family: 'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 80px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -1.6px;
          background: linear-gradient(
            181deg,
            #8d5c18 -20.65%,
            #f8e5ac 39.43%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin-bottom: 14px;
        }

        p {
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 32px;
        }

        .ctaActions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnSecondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 193px;
          height: 44px;
          text-decoration: none;
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 1;
          padding: 0 20px;
          position: relative;
          isolation: isolate;
          border: none;
          background: transparent;
          overflow: visible;
          transition: transform 0.25s ease, filter 0.25s ease;
          cursor: pointer;
        }

        .btnPrimary::before,
        .btnSecondary::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image: var(--btn-shape);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
        }

        .btnPrimary {
          --btn-shape: url('/images/cta-btn-fill.svg');
        }

        .btnSecondary {
          --btn-shape: url('/images/cta-btn-outline.svg');
        }

        .btnPrimaryContent,
        .btnSecondaryContent {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .btnPrimaryContent {
          color: #111;
        }

        .btnSecondaryContent {
          color: #fff;
        }

        .btnPrimary:hover,
        .btnSecondary:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .ctaSection {
            padding: 0 18px 40px;
          }

          .ctaBox {
            height: 230px;
          }

          .ctaContent {
            padding: 30px 14px;
          }

          p {
            font-size: 14px;
            margin-bottom: 18px;
          }

          .btnPrimary,
          .btnSecondary {
            font-size: 13px;
            width: 166px;
            height: 38px;
            padding: 0 14px;
          }

          h2 {
            font-size: 46px;
          }
        }
      `}</style>
    </section>
  )
}