'use client'

import { useEffect, useState } from 'react'

const ALUMNI_FORM_URL = 'https://forms.gle/MhZyrVj5YaKN5CbS6'

export default function AlumniRegisterTab() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <a
      href={ALUMNI_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`alumniTab${isVisible ? ' isVisible' : ''}`}
      aria-label="Gold Cup Alumni Register"
    >
      <span className="alumniTabLabel">Register as Alumni?</span>

      <style jsx>{`
        .alumniTab {
          position: fixed;
          right: 18px;
          top: 110px;
          z-index: 90;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          min-height: 44px;
          padding: 0 16px;
          border: 1px solid rgba(248, 229, 172, 0.35);
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(14, 14, 14, 0.94) 0%, rgba(8, 8, 8, 0.98) 100%);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
          text-decoration: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateX(18px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .alumniTab.isVisible {
          animation:
            tabReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards,
            tabPulse 3.6s ease-in-out 1.1s infinite;
        }

        .alumniTab:hover {
          transform: translateX(-3px);
          border-color: rgba(248, 229, 172, 0.55);
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.34);
        }

        .alumniTabLabel {
          font-family: var(--font-coluna), 'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          white-space: nowrap;
          background: linear-gradient(181deg, #8d5c18 -20.65%, #f8e5ac 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes tabReveal {
          from {
            opacity: 0;
            transform: translateX(18px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes tabPulse {
          0%,
          100% {
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
          }

          50% {
            box-shadow: 0 18px 36px rgba(0, 0, 0, 0.34);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .alumniTab,
          .alumniTab.isVisible {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .alumniTab {
            right: 12px;
            bottom: 18px;
            top: auto;
            min-width: 0;
            min-height: 34px;
            padding: 8px 12px;
            border-radius: 10px;
            transform: translateY(12px);
          }

          .alumniTab.isVisible {
            animation:
              tabRevealMobile 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards,
              tabPulse 3.6s ease-in-out 1.1s infinite;
          }

          .alumniTab:hover {
            transform: translateY(-2px);
          }

          .alumniTabLabel {
            font-size: 12px;
            letter-spacing: 0.02em;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .alumniTab {
            right: 14px;
            top: 96px;
            min-width: 0;
            min-height: 42px;
            padding: 0 12px;
          }

          .alumniTabLabel {
            font-size: 14px;
          }
        }

        @keyframes tabRevealMobile {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </a>
  )
}
