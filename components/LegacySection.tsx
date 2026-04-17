'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: '42', label: 'Years of Legacy' },
  { number: '31', label: 'Total Matches' },
  { number: '16', label: 'Competing Teams' },
  { number: '100+', label: 'Alumni Players' },
]

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [counts, setCounts] = useState(() => stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) {
      return
    }

    let frameId = 0
    let hasAnimated = false

    const runCounter = () => {
      const startedAt = performance.now()
      const duration = 1400
      const targets = stats.map((stat) => Number.parseInt(stat.number, 10))

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)

        setCounts(targets.map((target) => Math.round(target * eased)))

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick)
        }
      }

      frameId = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true
          setIsVisible(true)
          runCounter()
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section ref={sectionRef} className={`legacySection${isVisible ? ' isVisible' : ''}`}>
      <h2 className="headline">
        A platform that shaped legends like{' '}
        <span>MS Dhoni</span>
        , and the next one could be you
      </h2>

      <div className="divider" />

      <div className="statsGrid">
        {stats.map((stat, i) => (
          <div key={i} className="stat">
            <div className="statNumber">
              {counts[i]}
              {stat.number.includes('+') ? '+' : ''}
            </div>
            <div className="statLabel">{stat.label}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .legacySection {
          background: var(--bg);
          padding: 72px 80px 80px;
          position: relative;
          overflow: hidden;
        }

        .headline {
          font-family: var(--font-coluna);
          font-weight: 900;
          font-size: clamp(32px, 4.5vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #fff;
          max-width: 1100px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(26px);
        }

        .isVisible .headline {
          animation: legacyReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .headline span {
          color: var(--gold-light);
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.85);
          margin-bottom: 34px;
          transform-origin: left center;
          opacity: 0;
          transform: scaleX(0.2);
        }

        .isVisible .divider {
          animation: dividerGrow 1s ease 0.15s both;
        }

        .statsGrid {
          display: flex;
          width: 2140px;
          max-width: 100%;
          justify-content: space-between;
          align-items: center;
          gap: 0;
        }

        .stat {
          border-left: 4px solid var(--gold);
          padding: 0 16px 0 20px;
          transform: translateY(28px);
          opacity: 0;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .isVisible .stat {
          animation: statRise 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .isVisible .stat:nth-child(1) { animation-delay: 0.2s; }
        .isVisible .stat:nth-child(2) { animation-delay: 0.32s; }
        .isVisible .stat:nth-child(3) { animation-delay: 0.44s; }
        .isVisible .stat:nth-child(4) { animation-delay: 0.56s; }

        .stat:hover {
          transform: translateY(-6px);
          border-color: var(--gold-light);
        }

        .statNumber {
          font-family: var(--font-coluna);
          font-weight: 900;
          font-size: 60px;
          line-height: 1;
          color: #fff;
          margin-bottom: 10px;
          text-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
        }

        .statLabel {
          font-family: var(--font-manrope);
          font-size: 14px;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.9);
        }

        @keyframes legacyReveal {
          from {
            opacity: 0;
            transform: translateY(26px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dividerGrow {
          from {
            opacity: 0;
            transform: scaleX(0.2);
          }

          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes statRise {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .headline,
          .divider,
          .stat,
          .isVisible .headline,
          .isVisible .divider,
          .isVisible .stat {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .legacySection {
            padding: 32px 16px;
          }

          .headline {
            margin-bottom: 24px;
          }

          .divider {
            margin-bottom: 18px;
          }

          .statsGrid {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr;
            row-gap: 20px;
          }

          .statNumber {
            font-size: 40px;
            letter-spacing: -0.3px;
          }

          .stat {
            padding: 0 8px 0 12px;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .legacySection {
            padding: 40px 24px;
          }

          .headline {
            margin-bottom: 24px;
          }

          .divider {
            margin-bottom: 20px;
          }

          .statsGrid {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 24px;
          }

          .statNumber {
            font-size: 48px;
            letter-spacing: -0.5px;
          }

          .stat {
            padding: 0 12px 0 16px;
          }

          .statLabel {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  )
}
