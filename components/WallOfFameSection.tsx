'use client'

import { useEffect, useRef, useState } from 'react'

export default function WallOfFameSection() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const legacyRef = useRef<HTMLDivElement | null>(null)

  const [heroVisible, setHeroVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [legacyVisible, setLegacyVisible] = useState(false)

  useEffect(() => {
    const entries = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: cardRef, setter: setCardVisible },
      { ref: legacyRef, setter: setLegacyVisible },
    ]
    const observers = entries.map(({ ref, setter }) => {
      const node = ref.current
      if (!node) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true) },
        { threshold: 0.1 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <section className="wof">
      {/* Hero */}
      <div ref={heroRef} className={`heroSection ${heroVisible ? 'visible' : ''}`}>
        <h1 className="heroTitle">Gold Cup Alumni</h1>
        <p className="heroDesc">
          These are the players who walked through our gates as rising talent and left as something more. Their stories are the reason the Gold Cup matters. Their careers are proof that this stage is real.
        </p>
      </div>

      {/* Featured Alumni Card */}
      <div ref={cardRef} className={`featuredWrap ${cardVisible ? 'visible' : ''}`}>
        <div className="featuredCard">
          <div className="featuredImage" aria-hidden="true" />
          <div className="featuredContent">
            <div className="featuredBlock">
              <h2 className="featuredTitle">
                From Gold Cup to World Cup: The Journey of MS Dhoni
              </h2>
              <p className="featuredBody">
                Before he was Captain Cool. Before the 2011 World Cup six that ended a 28-year wait. Before three ICC titles, 200 ODIs as captain, and induction into the ICC Hall of Fame, there was a young cricketer from Jharkhand who needed a stage worthy of his talent.
              </p>
              <p className="featuredBody">
                The Gold Cup was part of that stage. A tournament played at Ranji level. High pressure. Real competition. Exactly the kind of environment that separates those who belong from those who truly shine.
              </p>
              <p className="featuredBody">MS Dhoni shone. The rest, as they say, is history.</p>
            </div>
            <div className="featuredMeta">
              <div className="metaItem">
                <span className="metaLabel">Year Played</span>
                <span className="metaValue">1999-2000</span>
              </div>
              <div className="metaItem">
                <span className="metaLabel">Achievements</span>
                <span className="metaValue">ICC Hall of Famer · Three ICC Titles · World Cup Winner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Every Legend Has A Starting Point */}
      <div ref={legacyRef} className={`legacySection ${legacyVisible ? 'visible' : ''}`}>
        <div className="legacyLeft">
          <div className="legacyTitleWrap">
            <h2 className="legacyTitle">
              Every Legend Has<br />
              <span className="goldText">A Starting Point</span>
            </h2>
            <p className="legacyDesc">
              The Gold Cup has never been about finding finished products. It has been about providing the conditions under which extraordinary players reveal themselves. Over 42 editions, more than 100 alumni have gone on to represent at district, state, and national levels. A track record that speaks louder than any tagline.
            </p>
          </div>
          <p className="legacyQuote">
            {`"When you watch a Gold Cup match, you are watching someone's story begin."`}
          </p>
        </div>

        <div className="statsGrid">
          {[
            { num: '42', label: 'Edition Played' },
            { num: '100+', label: 'Alumni on Record' },
            { num: '28', label: 'National Selections' },
            { num: '01', label: 'Hall of Famer' },
          ].map((s, i) => (
            <div key={i} className="statCard">
              <span className="statNum">{s.num}</span>
              <span className="statLabel">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wof {
          background: #000;
          color: #fffbf2;
          overflow: hidden;
        }

        /* ── Hero ── */
        .heroSection {
          padding: 100px 128px 74px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .heroSection.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .heroTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(52px, 7vw, 90px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          margin: 0;
          text-align: center;
          background:linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .heroDesc {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #fffbf2;
          text-align: center;
          max-width: 836px;
          margin: 0;
        }

        /* ── Featured Card ── */
        .featuredWrap {
          padding: 0 128px 80px;
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
        }
        .featuredWrap.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .featuredCard {
          display: grid;
          grid-template-columns: 481px 1fr;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          background: #0e0e0e;
          min-height: 451px;
          max-width: 987px;
          max-width: 987px;
  margin: 0 auto;
        }
        .featuredImage {
          background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
          min-height: 451px;
        }
        .featuredContent {
          padding: 43px 44px 43px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 35px;
        }
        .featuredBlock {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .featuredTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(26px, 2.9vw, 38px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 380px;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .featuredBody {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.8);
          max-width: 399px;
          margin: 0;
        }
        .featuredMeta {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        .metaItem {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .metaLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: -0.01em;
        }
        .metaValue {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: -0.01em;
        }

        /* ── Legacy / Stats ── */
        .legacySection {
          padding: 80px 70px 100px;
          display: flex;
          gap: 144px;
          align-items: center;
          justify-content: center;
        }
        .legacyLeft {
          flex: 0 0 418px;
          max-width: 418px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .legacySection.visible .legacyLeft {
          opacity: 1;
          transform: translateX(0);
        }
        .legacyTitleWrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .legacyTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(40px, 5.4vw, 70px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #fffbf2;
          margin: 0;
        }
        .goldText {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .legacyDesc {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          margin: 0;
        }
        .legacyQuote {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          margin: 0;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: 282px 282px;
          gap: 14px;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
        .legacySection.visible .statsGrid {
          opacity: 1;
          transform: translateX(0);
        }
        .statCard {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 21px 40px;
          min-height: 142px;
          gap: 2px;
          text-align: center;
          transition: border-color 0.3s ease;
        }
        .statCard:hover {
          border-color: rgba(162, 120, 54, 0.5);
        }
        .statNum {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(38px, 4.5vw, 60px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          background:linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .statLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ── Reduced Motion ── */
        @media (prefers-reduced-motion: reduce) {
          .heroSection,
          .featuredWrap,
          .legacyLeft,
          .statsGrid {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .heroSection {
            padding: 80px 20px 48px;
          }
          .heroDesc {
            font-size: 15px;
          }
          .featuredWrap {
            padding: 0 16px 48px;
          }
          .featuredCard {
            grid-template-columns: 1fr;
          }
          .featuredImage {
            min-height: 220px;
          }
          .featuredContent {
            padding: 24px 20px;
            gap: 24px;
          }
          .featuredTitle {
            font-size: 26px;
            max-width: 100%;
          }
          .featuredMeta {
            flex-direction: column;
            gap: 12px;
          }
          .legacySection {
            flex-direction: column;
            gap: 48px;
            padding: 48px 16px 64px;
          }
          .legacyLeft {
            flex: none;
            max-width: 100%;
          }
          .statsGrid {
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }
          .statCard {
            padding: 16px 12px;
            min-height: 110px;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 640px) and (max-width: 1024px) {
          .heroSection {
            padding: 80px 40px 60px;
          }
          .featuredWrap {
            padding: 0 40px 60px;
          }
          .featuredCard {
            grid-template-columns: 1fr 1fr;
          }
          .featuredImage {
            min-height: 380px;
          }
          .legacySection {
            flex-direction: column;
            gap: 48px;
            padding: 60px 40px 80px;
          }
          .legacyLeft {
            flex: none;
            max-width: 100%;
          }
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
            max-width: 640px;
          }
        }
      `}</style>
    </section>
  )
}
