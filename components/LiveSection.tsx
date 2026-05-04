'use client'

import { useEffect, useRef, useState } from 'react'
import { TEAM_LOGOS, TOURNAMENT_FIXTURES, type Fixture, type FixturePhase } from '@/data/tournament'

type FilterKey = 'ALL' | FixturePhase

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'ALL', label: 'ALL MATCHES' },
  { key: 'GROUP', label: 'GROUP STAGE' },
  { key: 'QF', label: 'QUARTER FINALS' },
  { key: 'SF', label: 'SEMI FINALS' },
  { key: 'FINAL', label: 'FINALS' },
]

const MATCHES = TOURNAMENT_FIXTURES

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

function getFixtureLabel(match: Fixture) {
  if (match.label) return match.label
  if (match.group) return `Group ${match.group}`
  return match.phase
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function TournamentSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL')
  const [mounted, setMounted] = useState(false)
  const scheduleRef = useInView(0.1)
  const ctaRef = useInView(0.2)

  useEffect(() => { setMounted(true) }, [])

  const filtered = MATCHES.filter(m => activeFilter === 'ALL' || m.phase === activeFilter)
  const featuredMatch = MATCHES.find(m => m.status === 'LIVE') ?? MATCHES.find(m => m.status === 'UPCOMING') ?? MATCHES[0]
  const isLive = featuredMatch.status === 'LIVE'

  return (
    <div className="page">

      {/* ── HERO ── */}
      <section className={`hero ${mounted ? 'heroVisible' : ''}`}>
        <h1 className="heroTitle">The Schedule. The Stakes.</h1>
        <p className="heroSub">
          31 matches. Four phases. One trophy. Know the fixtures,<br />
          because great cricket waits for no one.
        </p>
      </section>

      {/* ── LIVE MATCH CARD ── */}
      <section className={`liveSection ${mounted ? 'liveSectionVisible' : ''}`}>
        <div className="liveHeader">
          <p className="matchLabel">{getFixtureLabel(featuredMatch)} — {formatDate(featuredMatch.date)}</p>
          <div className="liveBadge">
            {isLive && <span className="liveDot" />}
            <span className="liveText">{isLive ? 'LIVE NOW' : 'NEXT MATCH'}</span>
          </div>
        </div>

        <div className="matchCard">
          <img src="/images/optimized/tournament-live-bgFinal.jpg" alt="" className="matchCardBg" />
          <div className="matchCardOverlay" />

          <div className="matchCardContent">
            <div className="teamsRow">
              {/* Team 1 */}
              <div className="teamBlock">
                <img
                  src={TEAM_LOGOS[featuredMatch.teams[0]] ?? '/images/team-logo-placeholder.svg'}
                  alt=""
                  className="teamLogo"
                />
                <div className="teamInfo">
                  <p className="teamName">{featuredMatch.teams[0]}</p>
                  <p className="teamStatus">{featuredMatch.status === 'UPCOMING' ? 'Scheduled' : 'Playing'}</p>
                </div>
              </div>

              {/* Score */}
              <div className="scoreBlock">
                <p className="score">{featuredMatch.time ?? 'TBD'}</p>
                <p className="overs">{featuredMatch.venue}</p>
              </div>

              {/* Team 2 */}
              <div className="teamBlock">
                <img
                  src={TEAM_LOGOS[featuredMatch.teams[1]] ?? '/images/team-logo-placeholder.svg'}
                  alt=""
                  className="teamLogo"
                />
                <div className="teamInfo">
                  <p className="teamName">{featuredMatch.teams[1]}</p>
                  <p className="teamStatus">{featuredMatch.status === 'UPCOMING' ? 'Scheduled' : 'Playing'}</p>
                </div>
              </div>
            </div>

            {/* Watch Live Button */}
            <button className="watchLiveBtn">
              <img src="/images/watch-live-btn.svg" alt="" className="watchLiveBtnShape" aria-hidden="true" />
              <span className="watchLiveBtnLabel">
                <img src="/images/icon-signal.svg" alt="" width={18} height={18} />
                Watch Live
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FULL SCHEDULE ── */}
      <section className="scheduleSection">
        <h2 className="scheduleTitle">FULL SCHEDULE</h2>

        {/* Filter tabs */}
        <div className="filterRow">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filterBtn ${activeFilter === f.key ? 'filterBtnActive' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div ref={scheduleRef.ref} className="tableWrap">
          {/* Header */}
          <div className="tableHeader">
            <span className="colDate">DATE</span>
            <span className="colTeam">TEAM</span>
            <span className="colVenue">VENUE</span>
            <span className="colTime">TIME</span>
            <span className="colStatus">STATUS</span>
          </div>

          {filtered.map((m, i) => (
            <div
              key={i}
              className={`tableRow ${scheduleRef.inView ? 'tableRowVisible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="colDate rowText">{formatDate(m.date)}</span>
              <span className="colTeam rowText">
                {m.teams[0]} <span className="vsGold">vs</span> {m.teams[1]}
              </span>
              <span className="colVenue rowText">{m.venue}</span>
              <span className="colTime rowText">{m.time ?? 'TBD'}</span>
              <span className="colStatus">
                {m.status === 'COMPLETED' && (
                  <span className="statusCompleted">
                    <span className="statusBadge">COMPLETED</span>
                    <span className="statusResult">{m.result}</span>
                  </span>
                )}
                {m.status === 'LIVE' && (
                  <span className="statusLive">
                    <span className="statusBadge">● LIVE</span>
                    <span className="statusResult">In Progress</span>
                  </span>
                )}
                {m.status === 'UPCOMING' && (
                  <span className="statusUpcoming">
                    <span className="statusBadge">UPCOMING</span>
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="ctaSection">
        <div ref={ctaRef.ref} className={`ctaBox ${ctaRef.inView ? 'ctaBoxVisible' : ''}`}>
          <div className="ctaBg" />
          <div className="ctaOverlay" />
          <div className="ctaContent">
            <h2 className="ctaTitle">Be Part of Cricket History</h2>
            <p className="ctaSub">42 editions. 100+ alumni. Counting.</p>
            <div className="ctaActions">
              <a href="/sponsors" className="btnPrimary">
                <span className="btnLabel btnLabelDark">Partner with Us</span>
              </a>
              <a href="/tournament" className="btnSecondary">
                <span className="btnLabel btnLabelLight">Explore Tournament</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page {
          background: transparent;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .hero {
          padding: 150px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .heroVisible {
          opacity: 1;
          transform: translateY(0);
        }

        .heroTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 90px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          background: linear-gradient(180.06deg, #8d5c18 20.6%, #f8e5ac 39.4%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0;
          white-space: nowrap;
        }

        .heroSub {
          font-family: var(--font-manrope), sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.18px;
          color: #fffbf2;
          max-width: 472px;
          margin: 0;
          text-align: center;
        }

        /* ── LIVE MATCH ── */
        .liveSection {
          max-width: 1000px;
          width: calc(100% - 140px);
          margin: 60px auto 0;
          padding: 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
        }

        .liveSectionVisible {
          opacity: 1;
          transform: translateY(0);
        }

        .liveHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 0 auto 12px;
          gap: 18px;
        }

        .matchLabel {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.6px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          white-space: nowrap;
        }

        .liveBadge {
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid red;
          border-radius: 2px;
          padding: 5px 8px;
        }

        .liveDot {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: red;
          animation: livePulse 1.4s ease-in-out infinite;
        }

        .liveText {
          font-family: var(--font-manrope), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          color: red;
          white-space: nowrap;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .matchCard {
          position: relative;
          width: 100%;
          height: 305px;
          margin: 0 auto;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .matchCardBg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.55);
        }

        .matchCardOverlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }

        .matchCardContent {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 42px;
          padding: 0 40px;
        }

        .teamsRow {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(140px, auto) minmax(0, 1fr);
          align-items: center;
          gap: 32px;
          width: 100%;
        }

        .teamBlock {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 19px;
          min-width: 0;
          width: 100%;
        }

        .teamLogo {
          width: 72px;
          height: 72px;
          display: block;
          flex-shrink: 0;
          border-radius: 50%;
          object-fit: contain;
          padding: 8px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
        }

        .teamInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          width: 100%;
          min-width: 0;
        }

        .teamName {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: clamp(18px, 2vw, 24px);
          font-style: normal;
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.48px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 100%;
          white-space: normal;
          overflow-wrap: anywhere;
          margin: 0;
          text-align: center;
        }

        .teamStatus {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.14px;
          color: #fffbf2;
          margin: 0;
          text-align: center;
        }

        .scoreBlock {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          min-width: 0;
          width: 100%;
        }

        .score {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: clamp(44px, 5vw, 60px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          white-space: nowrap;
          animation: scorePulse 2s ease-in-out infinite;
        }

        @keyframes scorePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }

        .overs {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.14px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          text-align: center;
          max-width: 220px;
        }

        /* Watch Live Button */
        .watchLiveBtn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 135px;
          height: 36px;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .watchLiveBtn:hover {
          transform: translateY(-2px);
        }

        .watchLiveBtnShape {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
        }

        .watchLiveBtnLabel {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.14px;
          color: white;
          white-space: nowrap;
        }

        /* ── SCHEDULE ── */
        .scheduleSection {
          max-width: 1280px;
          margin: 80px auto 0;
          padding: 0 70px;
        }

        .scheduleTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 60px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          background: linear-gradient(180.12deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0 0 28px;
        }

        .filterRow {
          display: flex;
          gap: 9px;
          align-items: center;
          margin-bottom: 26px;
        }

        .filterBtn {
          background: #0A0A0A;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          padding: 12px 15px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }

        .filterBtnActive {
          background: white;
          border-color: white;
          color: black;
          border-radius: 5px;
          padding: 10px 18px;
        }

        .tableWrap {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .tableHeader {
          display: grid;
          grid-template-columns: 130px 230px 200px 90px 1fr;
          gap: 0;
          padding: 0 36px 12px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.5);
        }

        .tableRow {
          display: grid;
          grid-template-columns: 130px 230px 200px 90px 1fr;
          gap: 0;
          align-items: center;
          padding: 18px 36px;
          background: #0A0A0A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: -1px;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s;
        }

        .tableRowVisible {
          opacity: 1;
          transform: translateX(0);
        }

        .tableRow:hover {
          background: #1e1e1e;
        }

        .rowText {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          padding-right: 18px;
          color: rgba(255, 255, 255, 0.5);
        }

        .vsGold {
          background: linear-gradient(180.05deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .statusCompleted,
        .statusLive,
        .statusUpcoming {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .statusBadge {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        .statusResult {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
        }

        .statusCompleted .statusBadge,
        .statusCompleted .statusResult {
          color: rgba(64, 255, 0, 0.8);
        }

        .statusLive .statusBadge,
        .statusLive .statusResult {
          color: red;
        }

        .statusUpcoming .statusBadge {
          color: rgba(255, 255, 255, 0.4);
        }

        /* ── CTA BANNER ── */
        .ctaSection {
          padding: 80px 60px;
        }

        .ctaBox {
          position: relative;
          width: 1000px;
          max-width: 100%;
          height: 305px;
          margin: 0 auto;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: translateY(36px) scale(0.98);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ctaBoxVisible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ctaBg {
          position: absolute;
          inset: 0;
          background: url('/images/optimized/cta-banner-bg.jpg') center / cover no-repeat;
          filter: brightness(0.65);
          z-index: 0;
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .ctaBox:hover .ctaBg {
          transform: scale(1.04);
          filter: brightness(0.72);
        }

        .ctaOverlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255,255,255,0.03), rgba(0,0,0,0.78));
          z-index: 1;
        }

        .ctaContent {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .ctaTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 80px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          background: linear-gradient(180.06deg, #8d5c18 20.6%, #f8e5ac 39.4%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0;
        }

        .ctaSub {
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.1px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .ctaActions {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-top: 29px;
        }

        .btnPrimary,
        .btnSecondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 193px;
          height: 44px;
          text-decoration: none;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .btnPrimary:hover,
        .btnSecondary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 28px rgba(0,0,0,0.24);
        }

        .btnPrimary::before,
.btnSecondary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  transition: opacity 0.25s ease;
}

.btnPrimary::before { background-image: url('/images/cta-btn-fill.svg'); }
.btnSecondary::before { background-image: url('/images/cta-btn-outline.svg'); }

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

.btnPrimary {
  --btn-shape: url('/images/cta-btn-fill.svg');
}

.btnPrimary::after {
  background: #000;
}

.btnPrimary:hover::after {
  opacity: 1;
}

.btnSecondary {
  --btn-shape: url('/images/cta-btn-fill.svg');
}

.btnSecondary::after {
  background: #ffffff;
}

.btnSecondary:hover::after {
  opacity: 1;
}

.btnLabel {
  position: relative;
  z-index: 1;
  font-family: var(--font-manrope), sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.16px;
  white-space: nowrap;
}

.btnLabelDark { 
  color: #000; 
}

.btnPrimary:hover .btnLabelDark {
  color: #fff;
}

.btnLabelLight { 
  color: #fff; 
}

.btnSecondary:hover .btnLabelLight {
  color: #000;
}

        @media (max-width: 639px) {
          .hero {
            padding: 80px 0 0;
          }

          .heroTitle {
            font-size: 36px;
            letter-spacing: -0.5px;
            white-space: normal;
            text-align: center;
            padding: 0 18px;
          }

          .heroSub {
            font-size: 14px;
            letter-spacing: -0.09px;
            padding: 0 18px;
          }

          .liveSection {
            width: 100%;
            padding: 0 18px;
          }

          .liveHeader {
            width: 100%;
          }

          .matchCard {
            width: 100%;
            height: auto;
            min-height: 180px;
          }

          .matchCardContent {
            gap: 20px;
            padding: 16px;
          }

          .teamsRow {
            gap: 8px;
            width: 100%;
            justify-content: space-between;
          }

          .teamBlock {
            width: auto;
            gap: 8px;
          }

          .teamLogo {
            width: 52px;
            height: 52px;
            padding: 6px;
          }

          .teamName {
            font-size: 13px;
            letter-spacing: -0.2px;
            white-space: normal;
            text-align: center;
          }

          .teamStatus {
            font-size: 12px;
          }

          .score {
            font-size: 32px;
            letter-spacing: -0.6px;
          }

          .overs {
            font-size: 12px;
          }

          .scoreBlock {
            width: auto;
          }

          .scheduleSection {
            padding: 0 18px;
            margin: 40px auto 0;
          }

          .scheduleTitle {
            font-size: 32px;
            letter-spacing: -0.5px;
          }

          .filterRow {
            flex-wrap: wrap;
            gap: 6px;
          }

          .filterBtn {
            font-size: 12px;
            padding: 8px 10px;
          }

          .tableHeader {
            display: none;
          }

          .tableRow {
            grid-template-columns: 100px 1fr;
            grid-template-rows: auto auto;
            padding: 12px 14px;
            gap: 4px 8px;
          }

          .colDate {
            grid-row: 1;
            grid-column: 1;
          }

          .colTeam {
            grid-row: 1;
            grid-column: 2;
          }

          .colVenue,
          .colTime {
            display: none;
          }

          .colStatus {
            grid-row: 2;
            grid-column: 2;
          }

          .ctaSection {
            padding: 40px 18px;
          }

          .ctaTitle {
            font-size: 30px;
            letter-spacing: -0.48px;
          }

          .ctaActions {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .heroTitle {
            font-size: 52px;
            letter-spacing: -1.0px;
            white-space: normal;
            text-align: center;
            padding: 0 20px;
          }

          .liveSection,
          .liveHeader,
          .matchCard {
            width: 100%;
          }

          .matchCard {
            height: auto;
            min-height: 220px;
          }

          .teamsRow {
            gap: 20px;
            width: 100%;
            justify-content: space-between;
          }

          .scoreBlock {
            width: auto;
          }

          .scheduleSection {
            padding: 0 18px;
          }

          .tableHeader,
          .tableRow {
            grid-template-columns: 1fr 1.5fr 1.5fr 0.7fr 1.2fr;
            padding: 12px 14px;
          }

          .ctaSection {
            padding: 40px 18px;
          }

          .ctaTitle {
            font-size: 46px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero, .liveSection, .ctaBox, .tableRow {
            opacity: 1; transform: none; transition: none;
          }
          .liveDot { animation: none; }
          .score { animation: none; }
        }
      `}</style>
    </div>
  )
}
