'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className={`ctaSection${isVisible ? ' isVisible' : ''}`}>
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
          box-shadow: 0 28px 56px rgba(0, 0, 0, 0.24);
          opacity: 0;
          transform: translateY(34px) scale(0.98);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .ctaSection.isVisible .ctaBox {
          animation: ctaReveal 0.95s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .ctaBg {
          position: absolute;
          inset: 0;
          background: url('/images/optimized/cta-banner-bg.jpg') lightgray 50% / cover no-repeat;
          filter: brightness(0.65);
          z-index: 0;
          transition: transform 0.5s ease, filter 0.5s ease;
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
          transform: translateZ(30px);
        }

        h2 {
          text-align: center;
          font-family: var(--font-coluna),'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 80px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
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
          opacity: 0;
          transform: translateY(22px);
        }

        .ctaSection.isVisible h2 {
          animation: ctaTextReveal 0.8s ease 0.14s both;
        }

        p {
          font-family: var(--font-manrope);
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 44px;
          opacity: 0;
          transform: translateY(22px);
        }

        .ctaSection.isVisible p {
          animation: ctaTextReveal 0.8s ease 0.24s both;
        }

        .ctaActions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(22px);
        }

        .ctaSection.isVisible .ctaActions {
          animation: ctaTextReveal 0.8s ease 0.34s both;
        }

        .btnPrimary,
        .btnSecondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 193px;
          height: 44px;
          text-decoration: none;
          font-family: var(--font-manrope);
          font-weight: 600;
          font-size: 14px;
          line-height: 1;
          padding: 0 20px;
          position: relative;
          isolation: isolate;
          border: none;
          background: transparent;
          overflow: hidden;
          transition: 
  transform 0.25s ease, 
  filter 0.25s ease, 
  box-shadow 0.25s ease,
  background 0.25s ease,
  color 0.25s ease;
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
          transition: opacity 0.25s ease;
          
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
          font-family: var(--font-manrope);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
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
          transform: translateY(-4px) rotateX(8deg);
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.24);
        }
        
        /* KEEP SHAPE, CHANGE COLOR VIA OVERLAY */
.btnPrimary::after,
.btnSecondary::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.25s ease;

  -webkit-mask: var(--btn-shape) no-repeat center / 100% 100%;
  mask: var(--btn-shape) no-repeat center / 100% 100%;
}

/* PRIMARY → black fill */
.btnPrimary::after {
  background: #000;
}

.btnPrimary:hover::after {
  opacity: 1;
}

.btnPrimary:hover .btnPrimaryContent {
  color: #fff;
}


/* SECONDARY → white fill */
.btnsSecondary::after{
  --btn-shape: url('/images/cta-btn-fill.svg'); /* switch to filled shape for masking */}
.btnSecondary::after {
  background: #ffffff; /* fixed */
  --btn-shape: url('/images/cta-btn-fill.svg'); /* ensure outline shape is used for masking */
}

.btnSecondary:hover::after {
  opacity: 1;
}

.btnSecondary:hover .btnSecondaryContent {
  color: #000000;
}

        .ctaBox:hover {
          transform: translateY(-6px);
          box-shadow: 0 38px 72px rgba(0, 0, 0, 0.32);
        }

        .ctaBox:hover .ctaBg {
          transform: scale(1.05);
          filter: brightness(0.72);
        }

        @keyframes ctaReveal {
          from {
            opacity: 0;
            transform: translateY(34px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ctaTextReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctaBox,
          h2,
          p,
          .ctaActions,
          .ctaSection.isVisible .ctaBox,
          .ctaSection.isVisible h2,
          .ctaSection.isVisible p,
          .ctaSection.isVisible .ctaActions {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .ctaSection {
            padding: 0 12px 28px;
          }

          .ctaBox {
            height: 200px;
            border-radius: 10px;
            transform: none;
          }

          .ctaContent {
            padding: 20px 12px;
          }

          h2 {
            font-size: 30px;
            letter-spacing: -0.48px;
            margin-bottom: 6px;
          }

          p {
            font-size: 13px;
            margin-bottom: 16px;
          }

          .ctaActions {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
          }

          .btnPrimary,
          .btnSecondary {
            width: 150px;
            height: 40px;
          }
            
        }
        

        @media (min-width: 640px) and (max-width: 900px) {
          .ctaSection {
            padding: 0 20px 40px;
          }

          .ctaBox {
            height: 240px;
            transform: none;
          }

          .ctaContent {
            padding: 30px 16px;
          }

          h2 {
            font-size: 48px;
            letter-spacing: -0.95px;
          }

          p {
            font-size: 14px;
            margin-bottom: 18px;
          }

          .ctaActions {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .btnPrimary,
          .btnSecondary {
            width: 170px;
            height: 42px;
          }
          
      `}</style>
    </section>
  )
}
