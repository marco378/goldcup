'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const featuredCards = [
  {
    badge: 'REPORTS',
    title: 'Match Reports',
    description: 'Full post-match analysis from every fixture: statistics, standout performances, and key talking points.',
  },
  {
    badge: 'REPORTS',
    title: 'Match Reports',
    description: 'Full post-match analysis from every fixture: statistics, standout performances, and key talking points.',
  },
  {
    badge: 'REPORTS',
    title: 'Match Reports',
    description: 'Full post-match analysis from every fixture: statistics, standout performances, and key talking points.',
  },
]

const latestUpdates = [
  { date: '20 JAN 2026', title: 'Group A Opener: A Statement of Intent', body: 'A commanding performance sets the tone for the 42nd edition. Full analysis inside.' },
  { date: '20 JAN 2026', title: 'Group A Opener: A Statement of Intent', body: 'A commanding performance sets the tone for the 42nd edition. Full analysis inside.' },
  { date: '20 JAN 2026', title: 'Group A Opener: A Statement of Intent', body: 'A commanding performance sets the tone for the 42nd edition. Full analysis inside.' },
  { date: '20 JAN 2026', title: 'Group A Opener: A Statement of Intent', body: 'A commanding performance sets the tone for the 42nd edition. Full analysis inside.' },
]

export default function NewsSection() {
  const [mounted, setMounted] = useState(false)
  const { ref: dividerRef, inView: dividerInView } = useInView(0)
  const { ref: updatesRef, inView: updatesInView } = useInView(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="newsSection">
      {/* HERO */}
      <div className={`heroBlock ${mounted ? 'heroVisible' : ''}`}>
        <div className="heroText">
          <h1 className="heroHeading">From the Ground</h1>
          <p className="heroSub">
            Match reports. Player stories. Tournament announcements. Everything Gold Cup, as it happens.
          </p>
        </div>
      </div>

      {/* FEATURED CARDS */}
      <div className="featuredWrap">
        <div className="featuredGrid">
          {featuredCards.map((card, i) => (
            <div
              key={i}
              className={`featuredCard ${mounted ? 'cardVisible' : ''}`}
              style={mounted ? { transitionDelay: `${i * 100}ms` } : {}}
            >
              <div className="cardImage">
                <img
                  src="/images/news-card-bg.jpg"
                  alt=""
                  className="cardImg"
                  aria-hidden="true"
                />
                <div className="cardOverlay" />
              </div>
              <div className="cardContent">
                <span className="cardBadge">{card.badge}</span>
                <div className="cardTextGroup">
                  <p className="cardTitle">{card.title}</p>
                  <p className="cardDesc">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="dividerWrap" ref={dividerRef}>
        <div className={`dividerLine ${dividerInView ? 'lineExpand' : ''}`} />
        <h2 className={`dividerText ${dividerInView ? 'dividerVisible' : ''}`}>LATEST UPDATES</h2>
        <div className={`dividerLine ${dividerInView ? 'lineExpand' : ''}`} />
      </div>

      {/* UPDATES GRID */}
      <div className="updatesWrap" ref={updatesRef}>
        <div className="updatesGrid">
          {latestUpdates.map((item, i) => (
            <div
              key={i}
              className={`updateCard ${updatesInView ? 'updateVisible' : ''}`}
              style={updatesInView ? { transitionDelay: `${i * 80}ms` } : {}}
            >
              <div className="updateInner">
                <span className="dateBadge">{item.date}</span>
                <div className="updateTextGroup">
                  <p className="updateTitle">{item.title}</p>
                  <p className="updateBody">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .newsSection {
          background: var(--bg);
          padding-bottom: 80px;
        }

        /* HERO */
        .heroBlock {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 150px 98px 45px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .heroBlock.heroVisible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .heroBlock {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .heroText {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          max-width: 493px;
        }

        .heroHeading {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 90px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          text-align: center;
          margin: 0;
          display: inline-block;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .heroSub {
          font-family: var(--font-manrope), sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #fffbf2;
          line-height: 1.2;
          letter-spacing: -0.18px;
          text-align: center;
          margin: 0;
          width: 100%;
        }

        /* FEATURED CARDS */
        .featuredWrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 58px;
        }

        .featuredGrid {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .featuredCard {
          flex: 1;
          min-width: 0;
          position: relative;
          display: grid;
          grid-template-rows: max-content;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .featuredCard.cardVisible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .featuredCard { opacity: 1; transform: none; transition: none; }
        }

        .cardImage {
          grid-column: 1;
          grid-row: 1;
          height: 238px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .cardImg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cardOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(3.73deg, #000 5.83%, rgba(0,0,0,0) 55.59%),
            linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%);
          border-radius: 10px;
        }

        .cardContent {
          grid-column: 1;
          grid-row: 1;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
          margin-top: 128px;
          margin-left: 5.28%;
          width: 89.15%;
          padding-bottom: 16px;
        }

        .cardBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 8px;
          border-radius: 2px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          color: #000;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          white-space: nowrap;
        }

        .cardTextGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .cardTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.6px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .cardDesc {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.12px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* DIVIDER */
        .dividerWrap {
          display: flex;
          gap: 34px;
          align-items: center;
          justify-content: center;
          margin: 65px auto 20px;
          max-width: 1280px;
          padding: 0 58px;
        }

        .dividerLine {
          width: 0;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          transition: width 0.8s ease;
        }
        .dividerLine.lineExpand {
          width: 103px;
        }
        @media (prefers-reduced-motion: reduce) {
          .dividerLine { width: 103px; transition: none; }
        }

        .dividerText {
          display: inline-block;
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 60px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          text-align: center;
          white-space: nowrap;
          margin: 0;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }
        .dividerText.dividerVisible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .dividerText { opacity: 1; transform: none; transition: none; }
        }

        /* UPDATES GRID */
        .updatesWrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 58px;
        }

        .updatesGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .updateCard {
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s;
        }
        .updateCard:hover {
          border-color: rgba(201, 168, 76, 0.4);
        }
        .updateCard.updateVisible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .updateCard { opacity: 1; transform: none; transition: border-color 0.2s; }
        }

        .updateInner {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
          padding: 16px 18px;
        }

        .dateBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 8px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }

        .updateTextGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .updateTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.6px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .updateBody {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.12px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* RESPONSIVE */
        @media (max-width: 639px) {
          .heroBlock {
            padding: 60px 18px 24px;
          }

          .heroHeading {
            font-size: 36px;
            letter-spacing: -0.5px;
          }

          .heroSub {
            font-size: 16px;
            letter-spacing: -0.09px;
          }

          .featuredWrap,
          .updatesWrap {
            padding: 0 18px;
          }

          .dividerWrap {
            padding: 0 18px;
            gap: 12px;
            margin: 40px auto 16px;
          }

          .featuredGrid {
            flex-direction: column;
          }

          .cardTitle {
            font-size: 18px;
            letter-spacing: -0.15px;
          }

          .updatesGrid {
            grid-template-columns: 1fr;
          }

          .updateTitle {
            font-size: 18px;
            letter-spacing: -0.15px;
          }

          .dividerText {
            font-size: 28px;
            letter-spacing: -0.3px;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .heroBlock {
            padding: 80px 40px 30px;
          }

          .heroHeading {
            font-size: 56px;
            letter-spacing: -1.0px;
          }

          .heroSub {
            letter-spacing: -0.09px;
          }

          .featuredWrap,
          .updatesWrap {
            padding: 0 40px;
          }

          .dividerWrap {
            padding: 0 40px;
            gap: 20px;
          }

          .featuredGrid {
            flex-direction: column;
          }

          .cardTitle {
            font-size: 24px;
            letter-spacing: -0.3px;
          }

          .updatesGrid {
            grid-template-columns: 1fr;
          }

          .updateTitle {
            font-size: 24px;
            letter-spacing: -0.3px;
          }

          .dividerText {
            font-size: 42px;
            letter-spacing: -0.6px;
          }
        }
      `}</style>
    </section>
  )
}
