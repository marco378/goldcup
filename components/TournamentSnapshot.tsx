'use client'

import { useEffect, useRef, useState } from 'react'

interface SnapshotCard {
  id: string
  title: string
  description: string
  size: 'small' | 'large'
  position?: string
  image: string 
  animationDelay: string
}

const cards: SnapshotCard[] = [
  {
    id: 'teams',
    title: 'Teams',
    description: '16 Elite Teams. Sixteen of the region\'s finest squads, assembled for one purpose: to compete, to impress, and to be remembered.',
    size: 'small',
    position: '8% 25%',
    image: '/images/optimized/snapshot-team.jpg',
    animationDelay: '0.12s',
  },
  {
    id: 'player-level',
    title: 'Player Level',
    description: 'Ranji-Level Talent. Every squad features players operating at the highest tier of domestic cricket, the same arena where India\'s international stars were forged.',
    size: 'large',
    position: '50% 50%',
    image: '/images/optimized/snapshot-player-level.jpg',
    animationDelay: '0.2s',
  },
  {
    id: 'opening-day',
    title: 'Opening Day',
    description: 'Opening Ceremony: 15th May. The stage is set. The teams are ready. The legacy continues.',
    size: 'small',
    position: '86% 20%',
    image: '/images/optimized/snapshot-opening-day.jpg',
    animationDelay: '0.28s',
  },
  {
    id: 'groups',
    title: 'Groups',
    description: '4 Competitive Groups. Balanced, fierce, and unpredictable. Every group stage match is a statement.',
    size: 'small',
    position: '12% 78%',
    image: '/images/optimized/snapshot-groups.jpg',
    animationDelay: '0.36s',
  },
  {
    id: 'scale',
    title: 'Scale',
    description: '31 Matches of Pure Cricket. Every delivery matters. Every innings tells a story.',
    size: 'small',
    position: '84% 54%',
    image: '/images/optimized/snapshot-scale.jpg',
    animationDelay: '0.44s',
  },
  {
    id: 'format',
    title: 'Format',
    description: 'Multi-Day Tournament. Not a sprint. A test of skill, temperament, and character. The way real cricket is meant to be played.',
    size: 'small',
    position: '84% 82%',
    image: '/images/optimized/snapshot-format.jpg',
    animationDelay: '0.52s',
  },
]

function SnapshotCard({ card, visible }: { card: SnapshotCard; visible: boolean }) {
  return (
    <div
      className={`card ${card.size}${visible ? ' isVisible' : ''}`}
      style={visible ? { animationDelay: card.animationDelay } : {}}
    >
      <div
        className="cardBg"
        style={{backgroundImage: `url('${card.image}')`,
           backgroundPosition: card.position || 'center' }}
      />
      <div className="cardOverlay" />
      <div className="cardContent">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>

      <style jsx>{`
        .card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.22);
          height: 100%;
          transform: translateY(28px) scale(0.98);
          opacity: 0;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
        }

        .card.isVisible {
          animation: cardReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cardBg {
          position: absolute;
          inset: 0;
          background-size: cover;
          filter: brightness(0.7) saturate(0.9);
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .cardOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.93) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.06) 100%);
        }

        .cardContent {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px;
          transform: translateZ(0);
          transition: transform 0.35s ease;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.01);
          border-color: rgba(248, 229, 172, 0.55);
          box-shadow: 0 28px 48px rgba(0, 0, 0, 0.26);
        }

        .card:hover .cardBg {
          transform: scale(1.08);
          filter: brightness(0.8) saturate(1);
        }

        .card:hover .cardContent {
          transform: translateY(-4px);
        }

        h3 {
          font-family: var(--font-coluna);
          font-weight: 800;
          font-size: 30px;
          letter-spacing: 0;
          text-transform: none; !important 
          color: #fff;
          margin-bottom: 8px;
          line-height: 1;
        }

        p {
          font-family: var(--font-manrope);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.3;
        }

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default function TournamentSnapshot() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`snapshotSection${isVisible ? ' isVisible' : ''}`}>
      <div className="headingWrap">
        <div className="line" />
        <h2>
          Tournament <span>Snapshot</span> Section
        </h2>
        <div className="line" />
      </div>

      <div className="grid">
        <div className="leftCol">
          <div className="h280"><SnapshotCard card={cards[0]} visible={isVisible} /></div>
          <div className="h280"><SnapshotCard card={cards[3]} visible={isVisible} /></div>
        </div>

        <div className="h572"><SnapshotCard card={cards[1]} visible={isVisible} /></div>

        <div className="rightCol">
          <div className="h180"><SnapshotCard card={cards[2]} visible={isVisible} /></div>
          <div className="h180"><SnapshotCard card={cards[4]} visible={isVisible} /></div>
          <div className="h180"><SnapshotCard card={cards[5]} visible={isVisible} /></div>
        </div>
      </div>

      <style jsx>{`
        .snapshotSection {
          background: transparent;
          padding: 80px 60px;
          position: relative;
          overflow: hidden;
        }

        .headingWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(24px);
        }

        .isVisible .headingWrap {
          animation: snapHeadingReveal 0.8s ease both;
        }

        .line {
          flex: 1;
          height: 2px;
          background: var(--gold);
          max-width: 102px;
          opacity: 0.8;
        }

        h2 {
          color: #fff;
          text-align: center;
          font-family: var(--font-coluna);
          font-size: 60px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -1.2px;
          white-space: nowrap;
        }

        h2 span {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          font-family: var(--font-coluna);
          font-size: 60px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -1.2px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr 1fr;
          gap: 12px;
        }

        .leftCol,
        .rightCol {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .h180 {
          height: 182px;
        }

        .h280 {
          height: 280px;
        }

        .h572 {
          height: 572px;
        }

        @keyframes snapHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .headingWrap,
          .isVisible .headingWrap {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 639px) {
          .snapshotSection {
            padding: 92px 18px;
          }

          .headingWrap {
            gap: 10px;
            margin-bottom: 20px;
          }

          h2,
          h2 span {
            font-size: 26px;
            letter-spacing: -0.3px;
            white-space: normal;
            text-align: center;
          }

          .line {
            max-width: 28px;
            height: 1px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .leftCol,
          .rightCol {
            flex-direction: column;
          }

          .h180,
          .h280,
          .h572 {
            height: 200px;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .snapshotSection {
            padding: 40px 20px;
          }

          .headingWrap {
            gap: 12px;
            margin-bottom: 20px;
          }

          h2,
          h2 span {
            font-size: 38px;
            letter-spacing: -0.6px;
            white-space: normal;
            text-align: center;
          }

          .line {
            max-width: 42px;
            height: 1px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .leftCol,
          .rightCol {
            gap: 12px;
          }

          .h180 {
            height: 200px;
          }

          .h280 {
            height: 240px;
          }

          .h572 {
            height: 280px;
          }
        }
      `}</style>
    </section>
  )
}
