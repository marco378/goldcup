'use client'

import { useEffect, useRef, useState } from 'react'

const ALUMNI_FORM_URL = 'https://forms.gle/MhZyrVj5YaKN5CbS6'

export default function AlumniRegisterBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`alumniRegisterSection${isVisible ? ' isVisible' : ''}`}
    >
      <div className="alumniRegisterInner">
        <h2 className="alumniRegisterTitle">Are You a Gold Cup Alumni?</h2>
        <a
          href={ALUMNI_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btnPrimary"
        >
          <span className="btnPrimaryContent">Register Here</span>
        </a>
      </div>

      <style jsx>{`
        .alumniRegisterSection {
          padding: 15px 60px 110px;
          background: #000;
        }

        .alumniRegisterInner {
          width: 1140px;
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 24px 28px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(14, 14, 14, 0.95) 0%, rgba(8, 8, 8, 0.98) 100%);
          opacity: 0;
          transform: translateY(28px) scale(0.985);
        }

        .alumniRegisterSection.isVisible .alumniRegisterInner {
          animation: bannerReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .alumniRegisterTitle {
          margin: 0;
          font-family: var(--font-coluna), 'Coluna', 'Barlow Condensed', sans-serif;
          font-size: clamp(28px, 4.2vw, 46px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(181deg, #8d5c18 -20.65%, #f8e5ac 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(18px);
        }

        .alumniRegisterSection.isVisible .alumniRegisterTitle {
          animation: contentReveal 0.7s ease 0.16s both;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 193px;
          height: 44px;
          padding: 0 20px;
          position: relative;
          isolation: isolate;
          border: none;
          background: transparent;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(18px);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .alumniRegisterSection.isVisible .btnPrimary {
          animation: contentReveal 0.7s ease 0.28s both;
        }

        .btnPrimary::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: url('/images/cta-btn-fill.svg') no-repeat center / 100% 100%;
        }

        .btnPrimary::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.25s ease;
          background: #000;
          -webkit-mask: url('/images/cta-btn-fill.svg') no-repeat center / 100% 100%;
          mask: url('/images/cta-btn-fill.svg') no-repeat center / 100% 100%;
        }

        .btnPrimaryContent {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #111;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        .alumniRegisterInner:hover {
          box-shadow: 0 22px 44px rgba(0, 0, 0, 0.22);
        }

        .btnPrimary:hover {
          transform: translateY(-4px) rotateX(8deg);
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.24);
        }

        .btnPrimary:hover::after {
          opacity: 1;
        }

        .btnPrimary:hover .btnPrimaryContent {
          color: #fff;
        }

        @keyframes bannerReveal {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .alumniRegisterInner,
          .alumniRegisterTitle,
          .btnPrimary,
          .alumniRegisterSection.isVisible .alumniRegisterInner,
          .alumniRegisterSection.isVisible .alumniRegisterTitle,
          .alumniRegisterSection.isVisible .btnPrimary {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .alumniRegisterSection {
            padding: 0 12px 24px;
          }

          .alumniRegisterInner {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            gap: 14px;
            padding: 18px 16px;
          }

          .alumniRegisterTitle {
            font-size: 34px;
          }

          .btnPrimary {
            width: 138px;
            height: 36px;
            padding: 0 12px;
            margin: 0 auto;
          }

          .btnPrimaryContent {
            font-size: 10px;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .alumniRegisterSection {
            padding: 0 20px 32px;
          }

          .alumniRegisterInner {
            padding: 22px 24px;
          }
        }
      `}</style>
    </section>
  )
}
