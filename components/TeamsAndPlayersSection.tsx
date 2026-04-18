'use client'

import { useEffect, useRef, useState } from 'react'

const GROUPS = ['GROUP A', 'GROUP B', 'GROUP C', 'GROUP D']

const teams = [
  { name: 'Royal Club XI', style: 'Batting', group: 'Group A', players: ['Arjun Rao', 'Vikram Shah', 'Rohit Nair'], roles: ['Bat', 'Bowl', 'AR'] },
  { name: 'Northern Stars', style: 'Bowling', group: 'Group A', players: ['Pradeep Kumar', 'Suresh Yadav', 'Arjun Singh'], roles: ['Bowl', 'Bowl', 'Bat'] },
  { name: 'Meerut Titans', style: 'All-Round', group: 'Group A', players: ['Karan Mehta', 'Dev Sharma', 'Anil Patel'], roles: ['AR', 'Bat', 'Bowl'] },
  { name: 'Golden Eagles', style: 'Batting', group: 'Group A', players: ['Ramesh Gupta', 'Mohan Das', 'Vijay Rao'], roles: ['Bat', 'AR', 'Bowl'] },
  { name: 'Thunder XI', style: 'Bowling', group: 'Group A', players: ['Ravi Kumar', 'Sanjay Shah', 'Deepak Nair'], roles: ['Bowl', 'Bat', 'AR'] },
  { name: 'Warrior Squad', style: 'All-Round', group: 'Group A', players: ['Ankit Singh', 'Sunil Mehta', 'Rakesh Das'], roles: ['AR', 'Bowl', 'Bat'] },
]

const players = [
  { name: 'Kartik Malhotra', team: 'Meerut Titans', num: 45, group: 'Group A', runs: '2,434', avg: '68.2', hundreds: '8' },
  { name: 'Arjun Rao', team: 'Royal Club XI', num: 7, group: 'Group A', runs: '1,876', avg: '54.6', hundreds: '6' },
  { name: 'Vikram Shah', team: 'Royal Club XI', num: 12, group: 'Group A', runs: '2,102', avg: '61.8', hundreds: '7' },
  { name: 'Pradeep Kumar', team: 'Northern Stars', num: 22, group: 'Group A', runs: '1,543', avg: '48.2', hundreds: '4' },
  { name: 'Karan Mehta', team: 'Meerut Titans', num: 3, group: 'Group A', runs: '1,982', avg: '57.4', hundreds: '5' },
  { name: 'Dev Sharma', team: 'Meerut Titans', num: 18, group: 'Group A', runs: '1,720', avg: '52.1', hundreds: '5' },
  { name: 'Rohit Nair', team: 'Royal Club XI', num: 9, group: 'Group A', runs: '2,211', avg: '63.7', hundreds: '7' },
  { name: 'Suresh Yadav', team: 'Northern Stars', num: 14, group: 'Group A', runs: '1,654', avg: '50.3', hundreds: '4' },
]

type FilterTab = 'ALL' | 'BATSMAN' | 'BOWLERS' | 'ALL ROUNDERS' | 'WICKETKEEPERS'

export default function TeamsAndPlayersSection() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const squadsRef = useRef<HTMLDivElement | null>(null)
  const playersRef = useRef<HTMLDivElement | null>(null)

  const [heroVisible, setHeroVisible] = useState(false)
  const [squadsVisible, setSquadsVisible] = useState(false)
  const [playersVisible, setPlayersVisible] = useState(false)

  const [activeGroup, setActiveGroup] = useState('GROUP A')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCount, setShowCount] = useState(8)

  useEffect(() => {
    const sections = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: squadsRef, setter: setSquadsVisible },
      { ref: playersRef, setter: setPlayersVisible },
    ]
    const observers = sections.map(({ ref, setter }) => {
      const node = ref.current
      if (!node) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true) },
        { threshold: 0.08 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  const filteredPlayers = players
    .filter(p => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)
    })
    .slice(0, showCount)

  return (
    <section className="tap">

      {/* ── Hero: Meet The Sixteen ── */}
      <div ref={heroRef} className={`heroSection ${heroVisible ? 'visible' : ''}`}>
        <div className="heroContent">
          <h1 className="heroTitle">
            Meet <span className="goldText">The Sixteen</span>
          </h1>
          <p className="heroDesc">
            Sixteen squads. Each with Ranji-level firepower. Each with something to prove. This is the field: study it carefully. The next chapter of cricket history is being written by the names below.
          </p>
        </div>
        <div className="heroDivider" />
        <div className="statsRow">
          {[
            { num: '16', label: 'Elite Teams' },
            { num: '240+', label: 'Players Listed' },
            { num: '04', label: 'Groups' },
            { num: '31', label: 'Matches' },
          ].map((s, i) => (
            <div key={i} className="statItem" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <div className="statBar" />
              <div className="statContent">
                <span className="statNum">{s.num}</span>
                <span className="statLabel">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Sixteen Squads ── */}
      <div ref={squadsRef} className={`squadsSection ${squadsVisible ? 'visible' : ''}`}>
        <div className="sectionHeading">
          <div className="decorBar" />
          <h2 className="sectionTitle">
            The <span className="goldText">Sixteen</span> Squads
          </h2>
          <div className="decorBar" />
        </div>
        <p className="sectionDesc">
          Four groups. Four battlegrounds. Each team arrives carrying a legacy — and a hunger to write the next one.
        </p>

        <div className="groupTabs">
          {GROUPS.map((g) => (
            <button
              key={g}
              className={`groupTab ${activeGroup === g ? 'activeTab' : ''}`}
              onClick={() => setActiveGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="teamsGrid">
          {teams.map((team, i) => (
            <div
              key={i}
              className="teamCard"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="teamCardTop">
                <div className="teamInfo">
                  <div className="teamAvatar" />
                  <div className="teamNameBlock">
                    <span className="teamName">{team.name}</span>
                    <span className="teamStyle">{team.style}</span>
                  </div>
                </div>
                <div className="groupBadge">{team.group}</div>
              </div>
              <div className="cardDivider" />
              <div className="teamRoster">
                <ul className="rosterList">
                  {team.players.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <div className="rosterRoles">
                  {team.roles.map((r, j) => <span key={j}>{r}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Players Behind the Competition ── */}
      <div ref={playersRef} className={`playersSection ${playersVisible ? 'visible' : ''}`}>
        <div className="sectionHeading">
          <div className="decorBar" />
          <h2 className="sectionTitle">
            The Players <span className="goldText">Behind the Competition</span>
          </h2>
          <div className="decorBar" />
        </div>
        <p className="sectionDesc">
          {`Behind every great tournament are great players. Browse the rosters, study the form, and follow the journeys. Because today's Gold Cup standout could be tomorrow's household name.`}
        </p>

        <div className="filterBar">
          <div className="filterTabs">
            {(['ALL', 'BATSMAN', 'BOWLERS', 'ALL ROUNDERS', 'WICKETKEEPERS'] as FilterTab[]).map((f) => (
              <button
                key={f}
                className={`filterTab ${activeFilter === f ? 'activeFilter' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="searchBox">
            <svg className="searchIcon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search players or teams"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchInput"
            />
          </div>
        </div>

        <div className="playersGrid">
          {filteredPlayers.map((player, i) => (
            <div
              key={i}
              className="playerCard"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="playerImageWrap">
                <div className="playerImage" />
                <div className="playerGroupBadge">{player.group}</div>
              </div>
              <div className="playerCardBody">
                <div className="playerNameBlock">
                  <span className="playerName">{player.name}</span>
                  <span className="playerTeam">{player.team}  |  #{player.num}</span>
                </div>
                <div className="playerDivider" />
                <div className="playerStats">
                  <div className="pStat">
                    <span className="pStatNum">{player.runs}</span>
                    <span className="pStatLabel">Runs</span>
                  </div>
                  <div className="pStat">
                    <span className="pStatNum">{player.avg}</span>
                    <span className="pStatLabel">Avg</span>
                  </div>
                  <div className="pStat">
                    <span className="pStatNum">{player.hundreds}</span>
                    <span className="pStatLabel">Hundreds</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCount < players.length && (
          <div className="loadMoreWrap">
            <button className="loadMoreBtn" onClick={() => setShowCount(c => c + 4)}>
              Load More Players
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .tap {
          background: #000;
          color: #fffbf2;
          overflow: hidden;
        }

        /* ── Hero ── */
        .heroSection {
          padding: 100px 128px 80px;
        }
        .heroContent {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 1140px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .heroSection.visible .heroContent {
          opacity: 1;
          transform: translateY(0);
        }
        .heroTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(52px, 7vw, 90px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }
        .goldText {
          background: linear-gradient(180deg, #8d5c18 20%, #f8e5ac 39%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .heroDesc {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          max-width: 679px;
          margin: 0;
        }
        .heroDivider {
          width: 100%;
          max-width: 1140px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin: 32px 0;
          transform-origin: left;
          opacity: 0;
          transform: scaleX(0.15);
          transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
        }
        .heroSection.visible .heroDivider {
          opacity: 1;
          transform: scaleX(1);
        }
        .statsRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1140px;
        }
        .statItem {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .heroSection.visible .statItem {
          opacity: 1;
          transform: translateY(0);
        }
        .statBar {
          width: 5px;
          height: 104px;
          border-radius: 1px;
          background: linear-gradient(192deg, #8d5c18 20%, #f8e5ac 99%);
          flex-shrink: 0;
        }
        .statContent {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .statNum {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          color: #fff;
        }
        .statLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.01em;
          color: #fff;
        }

        /* ── Squads Section ── */
        .squadsSection {
          padding: 80px 128px 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 50px;
        }
        .sectionHeading {
          display: flex;
          align-items: center;
          gap: 34px;
          justify-content: center;
          width: 100%;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .squadsSection.visible .sectionHeading,
        .playersSection.visible .sectionHeading {
          opacity: 1;
          transform: translateY(0);
        }
        .decorBar {
          flex: 0 0 103px;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(207deg, #8d5c18 20%, #f8e5ac 99%);
        }
        .sectionTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(36px, 4.7vw, 60px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
          text-align: center;
          white-space: nowrap;
        }
        .sectionDesc {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          text-align: center;
          max-width: 472px;
          margin: -30px 0 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        .squadsSection.visible .sectionDesc,
        .playersSection.visible .sectionDesc {
          opacity: 1;
          transform: translateY(0);
        }

        /* Group tabs */
        .groupTabs {
          display: flex;
          gap: 9px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .groupTab {
          padding: 10px 18px;
          border-radius: 5px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #191919;
          color: rgba(255, 255, 255, 0.5);
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .groupTab.activeTab {
          background: #fff;
          color: #000;
          border-color: #fff;
          font-weight: 700;
        }

        /* Teams grid */
        .teamsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
        }
        .teamCard {
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 20px;
          background: linear-gradient(-4deg, #0e0e0e 51%, #a27836 221%);
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
        }
        .squadsSection.visible .teamCard {
          opacity: 1;
          transform: translateY(0);
        }
        .teamCard:hover {
          border-color: rgba(162, 120, 54, 0.4);
        }
        .teamCardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .teamInfo {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .teamAvatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #2a2a2a;
          flex-shrink: 0;
        }
        .teamNameBlock {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .teamName {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.9);
        }
        .teamStyle {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.5);
        }
        .groupBadge {
          border: 1px solid #a27836;
          border-radius: 4px;
          padding: 8px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #a27836;
          white-space: nowrap;
        }
        .cardDivider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }
        .teamRoster {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .rosterList {
          list-style: disc;
          padding-left: 20px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rosterList li {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.9;
          letter-spacing: -0.01em;
          color: #fffbf2;
        }
        .rosterRoles {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: right;
        }
        .rosterRoles span {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.9;
          letter-spacing: -0.01em;
          color: #fffbf2;
        }

        /* ── Players Section ── */
        .playersSection {
          padding: 80px 128px 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 50px;
        }
        .filterBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s ease 0.2s, transform 0.75s ease 0.2s;
        }
        .playersSection.visible .filterBar {
          opacity: 1;
          transform: translateY(0);
        }
        .filterTabs {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }
        .filterTab {
          padding: 10px 18px;
          height: 41px;
          border-radius: 5px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #191919;
          color: rgba(255, 255, 255, 0.5);
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .filterTab.activeFilter {
          background: #fff;
          color: #000;
          border-color: #fff;
        }
        .searchBox {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 15px;
          height: 41px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          background: #191919;
        }
        .searchIcon {
          flex-shrink: 0;
        }
        .searchInput {
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          width: 200px;
        }
        .searchInput::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Players Grid */
        .playersGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          width: 100%;
        }
        .playerCard {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
        }
        .playersSection.visible .playerCard {
          opacity: 1;
          transform: translateY(0);
        }
        .playerCard:hover {
          border-color: rgba(162, 120, 54, 0.5);
        }
        .playerImageWrap {
          position: relative;
        }
        .playerImage {
          height: 220px;
          background: #1f1f1f;
          width: 100%;
        }
        .playerGroupBadge {
          position: absolute;
          top: 7px;
          right: 7px;
          background: #a27836;
          border: 1px solid #a27836;
          border-radius: 4px;
          padding: 5px 8px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #000;
          white-space: nowrap;
        }
        .playerCardBody {
          padding: 14px;
          background: linear-gradient(-4deg, #0e0e0e 51%, #a27836 221%);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .playerNameBlock {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .playerName {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.9);
        }
        .playerTeam {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.5);
        }
        .playerDivider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }
        .playerStats {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .pStat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pStatNum {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.9);
        }
        .pStatLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Load More */
        .loadMoreWrap {
          display: flex;
          justify-content: center;
        }
        .loadMoreBtn {
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.1);
          padding: 12px 24px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .loadMoreBtn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.9);
        }

        /* ── Reduced Motion ── */
        @media (prefers-reduced-motion: reduce) {
          .heroContent,
          .heroDivider,
          .statItem,
          .sectionHeading,
          .sectionDesc,
          .teamCard,
          .filterBar,
          .playerCard {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .heroSection {
            padding: 80px 16px 48px;
          }
          .heroTitle {
            font-size: clamp(40px, 10vw, 60px);
          }
          .heroDesc {
            font-size: 14px;
          }
          .statsRow {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .statNum {
            font-size: 40px;
          }
          .statLabel {
            font-size: 14px;
          }
          .statBar {
            height: 72px;
          }
          .squadsSection {
            padding: 48px 16px 64px;
            gap: 32px;
          }
          .sectionTitle {
            font-size: clamp(28px, 7vw, 44px);
            white-space: normal;
            text-align: center;
          }
          .decorBar {
            flex: 0 0 40px;
          }
          .teamsGrid {
            grid-template-columns: 1fr;
          }
          .playersSection {
            padding: 48px 16px 64px;
            gap: 32px;
          }
          .playersGrid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .playerImage {
            height: 160px;
          }
          .filterBar {
            flex-direction: column;
            align-items: flex-start;
          }
          .filterTabs {
            gap: 6px;
          }
          .filterTab {
            font-size: 10px;
            padding: 8px 12px;
          }
          .searchInput {
            width: 140px;
          }
          .sectionDesc {
            max-width: 100%;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 640px) and (max-width: 1024px) {
          .heroSection {
            padding: 80px 40px 60px;
          }
          .statsRow {
            gap: 32px;
            justify-content: flex-start;
          }
          .statNum {
            font-size: clamp(40px, 5vw, 60px);
          }
          .squadsSection {
            padding: 60px 40px 80px;
            gap: 40px;
          }
          .teamsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .playersSection {
            padding: 60px 40px 80px;
            gap: 40px;
          }
          .playersGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sectionTitle {
            font-size: clamp(32px, 5vw, 50px);
            white-space: normal;
          }
          .decorBar {
            flex: 0 0 60px;
          }
          .sectionDesc {
            max-width: 100%;
          }
          .filterBar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
