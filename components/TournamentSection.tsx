'use client'

import { Fragment, useEffect, useRef, useState } from 'react'

// Figma asset – swap with a permanent /public/images/ path when ready
const HERO_BG = './images/optimized/backdummy.jpg'

type StageInfo = { label: string; w: number }

const STAGES: StageInfo[] = [
  { label: 'Group Stage', w: 150 },
  { label: 'Quarterfinals', w: 170 },
  { label: 'Semifinals', w: 148 },
  { label: 'Grand Final', w: 157 },
]

const GROUPS = ['GROUP A', 'GROUP B', 'GROUP C', 'GROUP D']

type TableRow = { rank: string; team: string; p: number; w: number; l: number; nrr: string; pts: string }

const GROUP_DATA: TableRow[][] = [
  [
    { rank: '01', team: 'Royal Club XI',    p: 3, w: 3, l: 0, nrr: '+1.67', pts: '06' },
    { rank: '02', team: 'City Warriors',    p: 3, w: 2, l: 1, nrr: '+0.54', pts: '04' },
    { rank: '03', team: 'Thunder Strikers', p: 3, w: 1, l: 2, nrr: '-0.23', pts: '02' },
    { rank: '04', team: 'Golden Eagles',    p: 3, w: 0, l: 3, nrr: '-1.98', pts: '00' },
  ],
  [
    { rank: '01', team: 'Lahore Lions',     p: 3, w: 3, l: 0, nrr: '+2.10', pts: '06' },
    { rank: '02', team: 'Karachi Kings',    p: 3, w: 2, l: 1, nrr: '+0.88', pts: '04' },
    { rank: '03', team: 'Multan Sultans',   p: 3, w: 1, l: 2, nrr: '-0.45', pts: '02' },
    { rank: '04', team: 'Peshawar Zalmi',   p: 3, w: 0, l: 3, nrr: '-2.53', pts: '00' },
  ],
  [
    { rank: '01', team: 'Northern Hawks',   p: 3, w: 3, l: 0, nrr: '+1.92', pts: '06' },
    { rank: '02', team: 'Southern Stars',   p: 3, w: 2, l: 1, nrr: '+0.31', pts: '04' },
    { rank: '03', team: 'Eastern Blaze',    p: 3, w: 1, l: 2, nrr: '-0.67', pts: '02' },
    { rank: '04', team: 'Western Wolves',   p: 3, w: 0, l: 3, nrr: '-1.56', pts: '00' },
  ],
  [
    { rank: '01', team: 'Capital Colts',    p: 3, w: 3, l: 0, nrr: '+2.34', pts: '06' },
    { rank: '02', team: 'Frontier Force',   p: 3, w: 2, l: 1, nrr: '+0.72', pts: '04' },
    { rank: '03', team: 'Desert Falcons',   p: 3, w: 1, l: 2, nrr: '-0.18', pts: '02' },
    { rank: '04', team: 'Valley Vipers',    p: 3, w: 0, l: 3, nrr: '-2.88', pts: '00' },
  ],
]

const MATCH_STATS = [
  { value: 24, label: 'Group Stage' },
  { value: 4,  label: 'Quarterfinals' },
  { value: 2,  label: 'Semifinals' },
  { value: 1,  label: 'Final' },
  { value: 31, label: 'Total' },
]

function StagePill({ label, w }: StageInfo) {
  const h = 44
  const tip = 13
  const d = `M${tip} 1 H${w - tip} L${w} ${h / 2} L${w - tip} ${h - 1} H${tip} L0 ${h / 2} Z`
  return (
    <div className="pill">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
        <path d={d} stroke="rgba(255,255,255,0.38)" strokeWidth="1" strokeDasharray="4 3" />
      </svg>
      <span className="pillLbl">{label}</span>
      <style jsx>{`
        .pill { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .pillLbl {
          position: absolute;
          color: #fffbf2;
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: -0.16px;
          line-height: 1;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}

function ArrowConnector() {
  return (
    <svg width="31" height="44" viewBox="0 0 31 44" fill="none" aria-hidden="true">
      <polyline points="3,15 13,22 3,29"  stroke="rgba(255,255,255,0.42)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="13,15 23,22 13,29" stroke="rgba(255,255,255,0.42)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function TournamentSection() {
  const heroRef  = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)

  const [heroVisible,  setHeroVisible]  = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [activeGroup,  setActiveGroup]  = useState(0)
  const [counts, setCounts] = useState(MATCH_STATS.map(() => 0))

  useEffect(() => {
    const heroNode  = heroRef.current
    const statsNode = statsRef.current
    if (!heroNode || !statsNode) return

    const heroObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroVisible(true); heroObs.disconnect() } },
      { threshold: 0.1 }
    )
    heroObs.observe(heroNode)

    let animated = false
    const statsObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !animated) {
          animated = true
          setStatsVisible(true)
          statsObs.disconnect()

          const targets = MATCH_STATS.map(s => s.value)
          const duration = 1400
          const t0 = performance.now()
          const tick = (now: number) => {
            const prog  = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - prog, 3)
            setCounts(targets.map(t => Math.round(t * eased)))
            if (prog < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.25 }
    )
    statsObs.observe(statsNode)

    return () => { heroObs.disconnect(); statsObs.disconnect() }
  }, [])

  return (
    <div className={`ts${heroVisible ? ' hv' : ''}${statsVisible ? ' sv' : ''}`}>

      {/* ── Hero card ─────────────────────────────────────────── */}
      <div ref={heroRef} className="hero">
        <img src={HERO_BG} alt="Tournament banner" className="heroBg" />
        <div className="heroOverlay" aria-hidden="true" />
        <div className="heroContent">
          <p className="heroSub">Gold Cup: 42nd Edition</p>
          <h1 className="heroTitle">THE ROAD TO GLORY</h1>
          <p className="heroTagline">Every match is a stepping stone. Only the best reach the end.</p>
        </div>
      </div>

      {/* ── Journey breadcrumb ───────────────────────────────── */}
      <div className="journey">
        {STAGES.map((s, i) => (
          <Fragment key={s.label}>
            <span className="jPill"><StagePill {...s} /></span>
            {i < STAGES.length - 1 && (
              <span className="jArrow"><ArrowConnector /></span>
            )}
          </Fragment>
        ))}
      </div>

      {/* ── Four Groups heading ──────────────────────────────── */}
      <div className="fourGroups">
        <h2 className="fgTitle">
          <span className="gradGold">Four Groups.&nbsp;</span>No Easy Games.
        </h2>
        <p className="fgDesc">
          Sixteen teams are divided into four groups of four. Every team plays every other team
          in their group. Only the top teams advance. Consistency here is not optional.
          It is the price of entry to the knockout rounds.
        </p>
      </div>

      {/* ── Group tabs ───────────────────────────────────────── */}
      <div className="groupTabs">
        {GROUPS.map((g, i) => (
          <button
            key={g}
            className={`groupTab${activeGroup === i ? ' active' : ''}`}
            onClick={() => setActiveGroup(i)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* ── Standings table ──────────────────────────────────── */}
      <div className="tableWrap">
        <div className="tHead">
          <span>#</span>
          <span>TEAM</span>
          <span>P</span>
          <span>W</span>
          <span>L</span>
          <span>NRR</span>
          <span>POINTS</span>
        </div>
        {GROUP_DATA[activeGroup].map(row => (
          <div key={row.rank} className="tRow">
            <span>{row.rank}</span>
            <span>{row.team}</span>
            <span>{row.p}</span>
            <span>{row.w}</span>
            <span>{row.l}</span>
            <span className={row.nrr.startsWith('+') ? 'pos' : 'neg'}>{row.nrr}</span>
            <span>{row.pts}</span>
          </div>
        ))}
      </div>

      {/* ── Match stats ──────────────────────────────────────── */}
      <div ref={statsRef} className="statsSection">
        <h2 className="statsTitle">
          <span className="gradGold">31 Matches&nbsp;</span>of Elite Cricket
        </h2>
        <div className="statsDivider" />
        <div className="statsGrid">
          {MATCH_STATS.map((stat, i) => (
            <div key={stat.label} className={`statItem si${i}`}>
              <div className="statBar" />
              <div className="statBody">
                <p className="statNum">{counts[i]}</p>
                <p className="statLbl">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Watermark ────────────────────────────────────────── */}
      

      <style jsx>{`
        /* ─── Container ────────────────────────────────────────── */
        .ts {
          background: #000;
          color: #fff;
          overflow-x: hidden;
          position: relative;
        }

        /* gradient helper */
        .gradGold {
          background: linear-gradient(180deg, #8d5c18 20.647%, #f8e5ac 99.503%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        /* ─── Hero ─────────────────────────────────────────────── */
        .hero {
          position: relative;
          margin: 10px;
          border-radius: 16px;
          height: 350px;
          overflow: hidden;
        }

        .heroBg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.32);
          border-radius: 16px;
        }

        .heroContent {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding-top: 150px;
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s ease 0.05s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.05s;
        }

        .hv .heroContent {
          opacity: 1;
          transform: translateY(0);
        }

        .heroSub {
          font-family: var(--font-coluna), sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(90deg, #fdeb7f, #ffb812);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .heroTitle {
          font-family: var(--font-coluna), sans-serif;
          font-size: clamp(52px, 7vw, 90px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          background: linear-gradient(182.58deg, #fffbf2 53.317%, #999691 135%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          margin: 0;
          text-transform: uppercase;
        }

        .heroTagline {
          font-family: var(--font-manrope), sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #fffbf2;
          letter-spacing: -0.18px;
          line-height: 1;
          margin: 0;
        }

        /* ─── Journey ──────────────────────────────────────────── */
        .journey {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 52px 20px 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.75s ease 0.2s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }

        .hv .journey {
          opacity: 1;
          transform: translateY(0);
        }

        .jPill  { display: inline-flex; align-items: center; }
        .jArrow { display: inline-flex; align-items: center; }

        /* ─── Four Groups ──────────────────────────────────────── */
        .fourGroups {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 11px;
          padding: 130px 80px 0;
          text-align: center;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease 0.3s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.3s;
        }

        .hv .fourGroups {
          opacity: 1;
          transform: translateY(0);
        }

        .fgTitle {
          font-family: var(--font-coluna), sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          color: #fff;
          text-transform: uppercase;
          margin: 0;
        }

        .fgDesc {
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: -0.16px;
          line-height: 1.4;
          max-width: 656px;
          margin: 0;
        }

        /* ─── Group tabs ───────────────────────────────────────── */
        .groupTabs {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 9px;
          padding: 43px 20px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s ease 0.38s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.38s;
        }

        .hv .groupTabs {
          opacity: 1;
          transform: translateY(0);
        }

        .groupTab {
          padding: 10px 18px;
          height: 38px;
          border-radius: 5px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.2;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #191919;
          color: rgba(255, 255, 255, 0.5);
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          white-space: nowrap;
        }

        .groupTab.active {
          background: #fff;
          color: #000;
          border-color: #fff;
          font-weight: 700;
        }

        .groupTab:hover:not(.active) {
          border-color: rgba(255, 255, 255, 0.45);
          color: rgba(255, 255, 255, 0.75);
        }

        /* ─── Table ────────────────────────────────────────────── */
        .tableWrap {
          margin: 28px auto 0;
          max-width: 946px;
          width: calc(100% - 160px);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.44s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s;
        }

        .hv .tableWrap {
          opacity: 1;
          transform: translateY(0);
        }

        .tHead,
        .tRow {
          display: grid;
          grid-template-columns: 52px 1fr 58px 58px 58px 84px 64px;
          align-items: center;
          padding: 18px 36px;
        }

        .tHead {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: -0.14px;
          line-height: 1.2;
        }

        .tRow {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: -0.14px;
          line-height: 1.2;
          transition: background 0.18s ease;
        }

        .tRow + .tRow {
          border-top: none;
        }

        .tRow:hover { background: #111; }

        .pos { color: #35ce02 !important; }
        .neg { color: rgba(255,255,255,0.5); }

        /* ─── Stats ────────────────────────────────────────────── */
        .statsSection {
          padding: 120px 70px 80px;
        }

        .statsTitle {
          font-family: var(--font-coluna), sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 34px;
        }

        .statsDivider {
          width: 100%;
          max-width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin-bottom: 34px;
        }

        .statsGrid {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          max-width: 100%;
          margin: 0 auto;
        }

        .statItem {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(28px);
        }

        .sv .statItem { animation: statRise 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
        .sv .si0 { animation-delay: 0.18s; }
        .sv .si1 { animation-delay: 0.3s; }
        .sv .si2 { animation-delay: 0.42s; }
        .sv .si3 { animation-delay: 0.54s; }
        .sv .si4 { animation-delay: 0.66s; }

        .statBar {
          width: 5px;
          height: 104px;
          border-radius: 1px;
          background: linear-gradient(191.79deg, #8d5c18 20.647%, #f8e5ac 99.503%);
          flex-shrink: 0;
        }

        .statBody {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .statNum {
          font-family: var(--font-coluna), sans-serif;
          font-size: 80px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          margin: 0;
        }

        .statLbl {
          font-family: var(--font-manrope), sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.18px;
          line-height: 1;
          margin: 0;
          white-space: nowrap;
        }

        /* ─── Watermark ────────────────────────────────────────── */
        .watermarkWrap {
          position: relative;
          overflow: hidden;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .watermark {
          font-family: var(--font-coluna), sans-serif;
          font-size: 200px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -4px;
          color: rgba(255, 255, 255, 0.1);
          white-space: nowrap;
          text-transform: uppercase;
          margin: 0;
          opacity: 0;
          transform: translateY(60%);
          transition: transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.05s, opacity 0.9s ease 0.05s;
        }

        .sv .watermark {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── Keyframes ────────────────────────────────────────── */
        @keyframes statRise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Reduced motion ───────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .heroContent, .journey, .fourGroups, .groupTabs,
          .tableWrap, .statItem, .watermark {
            opacity: 1;
            transform: none;
            transition: none;
            animation: none;
          }
        }

        /* ─── Mobile (<640px) ──────────────────────────────────── */
        @media (max-width: 639px) {
          .hero {
            margin: 8px;
            height: 250px;
          }
          .heroContent {
            padding-top: 72px;
            gap: 8px;
          }
          .heroSub  { font-size: 22px; }
          .heroTitle { font-size: 44px; letter-spacing: -1px; }
          .heroTagline { font-size: 14px; }

          .journey {
            flex-direction: column;
            align-items: center;
            padding: 36px 12px 0;
            gap: 0;
          }
          .jArrow {
            transform: rotate(90deg);
          }

          .fourGroups {
            padding: 64px 20px 0;
          }
          .fgTitle  { font-size: 34px; letter-spacing: -0.5px; }
          .fgDesc   { font-size: 14px; }

          .groupTabs { padding: 32px 16px 0; gap: 8px; }

          .tableWrap {
            width: calc(100% - 32px);
            overflow-x: auto;
          }

          .tHead,
          .tRow {
            grid-template-columns: 36px 1fr 36px 36px 36px 56px 48px;
            padding: 14px 16px;
            font-size: 12px;
          }

          .statsSection {
            padding: 72px 20px 52px;
          }
          .statsTitle { font-size: 34px; letter-spacing: -0.5px; }
          .statsGrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 16px;
            justify-items: start;
          }
          .si4 {
            grid-column: 1 / -1;
            justify-self: start;
          }
          .statNum  { font-size: 56px; }
          .statBar  { height: 80px; }

          .watermarkWrap { height: 120px; }
          .watermark {
            font-size: 14vw;
            letter-spacing: -0.02em;
          }
        }

        /* ─── Tablet (640–900px) ───────────────────────────────── */
        @media (min-width: 640px) and (max-width: 900px) {
          .hero    { height: 275px; }
          .heroTitle { font-size: 68px; }

          .fourGroups { padding: 100px 40px 0; }
          .fgTitle { font-size: 48px; }

          .tableWrap { width: calc(100% - 80px); overflow-x: auto; }
          .tHead,
          .tRow { grid-template-columns: 44px 1fr 46px 46px 46px 70px 56px; padding: 16px 24px; }

          .statsSection { padding: 100px 40px 64px; }
          .statsTitle { font-size: 48px; }
          .statsGrid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px 16px;
          }
          .statNum { font-size: 64px; }
          .statBar { height: 90px; }

          .watermarkWrap { height: 160px; }
          .watermark { font-size: 13vw; }
        }
      `}</style>
    </div>
  )
}
