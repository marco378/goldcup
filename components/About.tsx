'use client'

import { useEffect, useRef, useState } from 'react'

/* ── IntersectionObserver helper ── */
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Inline SVG icons (no external deps) ── */
const IconLegacy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconOpportunity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.55 20.78 21.05 20.41 21.41C20.05 21.78 19.55 22 19 22H5C4.45 22 3.95 21.78 3.59 21.41C3.22 21.05 3 20.55 3 20V9Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconExcellence = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="6" stroke="#C9A84C" strokeWidth="1.5"/>
    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconCompetition = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4C3.45 9 3 9.45 3 10V20C3 20.55 3.45 21 4 21H6C6.55 21 7 20.55 7 20V10C7 9.45 6.55 9 6 9Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 3H11C10.45 3 10 3.45 10 4V20C10 20.55 10.45 21 11 21H13C13.55 21 14 20.55 14 20V4C14 3.45 13.55 3 13 3Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 6H18C17.45 6 17 6.45 17 7V20C17 20.55 17.45 21 18 21H20C20.55 21 21 20.55 21 20V7C21 6.45 20.55 6 20 6Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Data ── */
const foundingMembers = [
  { name: 'A.S. Menswal', role: 'In Memoriam' },
  { name: 'B.K. Sharma',  role: 'In Memoriam' },
  { name: 'C.R. Patel',   role: 'In Memoriam' },
  { name: 'D.L. Verma',   role: 'In Memoriam' },
  { name: 'E.S. Kumar',   role: 'In Memoriam' },
  { name: 'F.P. Singh',   role: 'In Memoriam' },
  { name: 'G.R. Nair',    role: 'In Memoriam' },
  { name: 'H.C. Joshi',   role: 'In Memoriam' },
  { name: 'I.B. Mehta',   role: 'In Memoriam' },
  { name: 'J.K. Rao',     role: 'In Memoriam' },
  { name: 'K.S. Iyer',    role: 'In Memoriam' },
  { name: 'L.D. Gupta',   role: 'In Memoriam' },
  { name: 'M.R. Bose',    role: 'In Memoriam' },
  { name: 'N.K. Das',     role: 'In Memoriam' },
  { name: 'O.P. Tiwari',  role: 'In Memoriam' },
  { name: 'P.C. Varma',   role: 'Secretary' },
]

const officeBearers = [
  { name: 'P.C. Varma',   role: 'Secretary' },
  { name: 'R.K. Sharma',  role: 'President' },
  { name: 'S.L. Mehta',   role: 'Vice President' },
  { name: 'T.R. Singh',   role: 'Treasurer' },
  { name: 'U.S. Kumar',   role: 'Joint Secretary' },
  { name: 'V.D. Patel',   role: 'Committee Member' },
  { name: 'W.C. Nair',    role: 'Committee Member' },
  { name: 'X.B. Rao',     role: 'Committee Member' },
  { name: 'Y.S. Iyer',    role: 'Committee Member' },
  { name: 'Z.K. Bose',    role: 'Committee Member' },
  { name: 'A.R. Das',     role: 'Committee Member' },
  { name: 'B.S. Gupta',   role: 'Committee Member' },
  { name: 'C.K. Joshi',   role: 'Committee Member' },
  { name: 'D.P. Verma',   role: 'Committee Member' },
  { name: 'E.R. Kumar',   role: 'Committee Member' },
  { name: 'F.S. Tiwari',  role: 'Committee Member' },
]

const valueCards = [
  { Icon: IconLegacy,      title: 'Legacy',      body: 'The Gold Cup has been running for 42 years, longer than most players have been alive. That continuity is not accidental. We are proud custodians of a tradition that has consistently elevated the game.' },
  { Icon: IconOpportunity, title: 'Opportunity', body: 'Every team that steps onto a Gold Cup ground does so on equal footing. Sixteen squads. Thirty-one matches. Perform here, and the right people will notice. Over 100 alumni have gone on to higher honours.' },
  { Icon: IconExcellence,  title: 'Excellence',  body: "Gold Cup fields Ranji-level players by design. We don't lower the standard of competition — we raise the standard of every player who participates. That's why our alumni compete at the highest levels." },
  { Icon: IconCompetition, title: 'Competition', body: 'Four groups. A knockout bracket. A trophy. The format is built around pressure, because it is pressure that reveals character, and character that builds careers. This is not friendly — it is a fight worth winning.' },
]

export default function About() {
  const heroVis     = useVisible(0.1)
  const legacyVis   = useVisible(0.08)
  const careersVis  = useVisible(0.08)
  const platformVis = useVisible(0.08)
  const founderVis  = useVisible(0.08)
  const foundingVis = useVisible(0.05)
  const officersVis = useVisible(0.05)

  return (
    <div className="aboutWrap">

      {/* ══ HERO ══ */}
      <section ref={heroVis.ref as React.RefObject<HTMLElement>} className={`hero ${heroVis.visible ? 'vis' : ''}`}>
        <h1 className="heroTitle">One Prestigious Cup Gold Cup</h1>
        <p className="heroSub">
          Gold Cup, established in 1981, is a gold-plated symbol of excellence and pride. Born from
          the vision of true cricket lovers, it continues to celebrate talent and passion.
        </p>
        <div className="pillsRow">
          {['Est. 1981', '42 Editions', '100+ Alumni'].map((label) => (
            <div className="pill" key={label}>
              <span className="pillDot" aria-hidden="true" />
              <span className="pillLabel">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ LEGACY ══ */}
      <section ref={legacyVis.ref as React.RefObject<HTMLElement>} className={`legacy ${legacyVis.visible ? 'vis' : ''}`}>
        <div className="legacyLeft">
          <h2 className="legacyHeading">
            <span className="lhWhite">More Than a Tournament.{'\u00A0'}</span>
            <span className="lhGold">A Legacy.</span>
          </h2>
          <div className="legacyBody">
            <p>Gold Cup isn't just another cricket tournament; it's a 42‑year legacy of competition,
            character, and careers. Over the years, it has become one of the region's most respected
            stages, where Ranji-level players sharpen their game and new talent gets a real test
            against serious opposition.</p>
            <p>It has quietly done what great institutions do: create opportunity, reward excellence,
            and let the results speak. One of its most famous alumni is MS Dhoni, now known worldwide
            for his leadership, three ICC titles, and a place in the ICC Hall of Fame.</p>
            <p>Gold Cup understands what cricket means in India: it's not only a sport, it's a
            pathway — a chance to play today for something much bigger tomorrow.</p>
          </div>
        </div>

        <div className="statsGrid">
          {[
            { num: '16',   label: 'Elite Squads' },
            { num: '31',   label: 'Matches Per Edition' },
            { num: '100+', label: 'Alumni At Higher Honours' },
            { num: '04',   label: 'Competitive Groups' },
          ].map(({ num, label }) => (
            <div className="statCard" key={label}>
              <span className="statNum">{num}</span>
              <span className="statLabel">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CAREERS ══ */}
      <section ref={careersVis.ref as React.RefObject<HTMLElement>} className={`careers ${careersVis.visible ? 'vis' : ''}`}>
        <div className="secHeader">
          <span className="divLine" />
          <h2 className="secTitle">
            <span className="stWhite">The Tournament </span>
            <span className="stGold">That Built Careers</span>
          </h2>
          <span className="divLine" />
        </div>
        <p className="secSub">Four values. Forty-two years. One consistent truth.</p>

        <div className="valueGrid">
          {valueCards.map(({ Icon, title, body }) => (
            <div className="valueCard" key={title}>
              <div className="valueIconBox">
                <Icon />
              </div>
              <div className="valueText">
                <h3 className="valueTitle">{title}</h3>
                <p className="valueBody">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PLATFORM ══ */}
      <section ref={platformVis.ref as React.RefObject<HTMLElement>} className={`platform ${platformVis.visible ? 'vis' : ''}`}>
        <div className="secHeader">
          <span className="divLine" />
          <h2 className="secTitle">
            <span className="stWhite">A Platform the Game </span>
            <span className="stGold">Can Count On</span>
          </h2>
          <span className="divLine" />
        </div>
        <div className="platformBody">
          <p>Indian cricket's greatest strength has always been its domestic pipeline. Players like Sunil
          Gavaskar, Sachin Tendulkar, Rahul Dravid and Virat Kohli — legends who illuminated the
          international stage — all sharpened their edges in exactly the kind of high-intensity domestic
          competition that Gold Cup provides.</p>
          <p>The Gold Cup is part of that ecosystem. For 42 editions, it has brought together the best
          regional talent, created match conditions that mirror the pressures of first-class cricket,
          and delivered a platform where serious players can be seriously evaluated.</p>
          <p>This is where coaches watch closely, where selectors take note, and where young cricketers
          take the step from potential to performance.</p>
        </div>
        <p className="platformQuote">
          "When you watch a Gold Cup match, you are watching someone's story begin."
        </p>
      </section>

      {/* ══ FOUNDER ══ */}
      <section ref={founderVis.ref as React.RefObject<HTMLElement>} className={`founder ${founderVis.visible ? 'vis' : ''}`}>
        <h2 className="founderHeading">
          <span className="fhWhite">The Man Behind </span>
          <span className="fhGold">the Gold Cup</span>
        </h2>

        <div className="founderCard">
          <div className="founderTop">
            <div className="founderAvatarPlaceholder" aria-hidden="true">PC</div>
            <div className="founderMeta">
              <p className="founderLabel">Founding Member</p>
              <p className="founderName">P.C. Varma</p>
              <p className="founderRole">Secretary · Gold Cup</p>
            </div>
          </div>
          <div className="founderRule" aria-hidden="true" />
          <div className="founderQuoteWrap">
            <p className="founderQuote">
              "The first thing is to love your sport. Never do it to please someone else. It has to be yours."
            </p>
            <p className="founderAttrib">— P.C. Varma, Secretary &amp; Founding Member</p>
          </div>
        </div>
      </section>

      {/* ══ FOUNDING MEMBERS ══ */}
      <section ref={foundingVis.ref as React.RefObject<HTMLElement>} className={`members ${foundingVis.visible ? 'vis' : ''}`}>
        <div className="secHeader">
          <span className="divLine" />
          <h2 className="secTitle">
            <span className="stGold">Founding</span>
            <span className="stWhite"> Members</span>
          </h2>
          <span className="divLine" />
        </div>
        <div className="membersGrid">
          {foundingMembers.map((m, i) => (
            <div className="memberCard" key={i}>
              <p className="memberName">{m.name}</p>
              <p className="memberRole">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ OFFICE BEARERS ══ */}
      <section ref={officersVis.ref as React.RefObject<HTMLElement>} className={`members ${officersVis.visible ? 'vis' : ''}`}>
        <div className="secHeader">
          <span className="divLine" />
          <h2 className="secTitle">
            <span className="stWhite">Current </span>
            <span className="stGold">Office Bearers</span>
          </h2>
          <span className="divLine" />
        </div>
        <div className="membersGrid">
          {officeBearers.map((m, i) => (
            <div className="memberCard" key={i}>
              <p className="memberName">{m.name}</p>
              <p className="memberRole">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`

        /* ── wrapper ── */
        .aboutWrap {
          background: #000;
          color: #fffbf2;
          overflow: hidden;
        }

        /* ── shared reveal animation ── */
        .hero, .legacy, .careers, .platform, .founder, .members {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .hero.vis, .legacy.vis, .careers.vis, .platform.vis,
        .founder.vis, .members.vis {
          opacity: 1;
          transform: translateY(0);
        }

        /* ══════════════════════════════
            HERO
        ══════════════════════════════ */
        .hero {
          padding: 150px 20px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 836px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .heroTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(44px, 7vw, 90px);
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -1.8px;
          text-transform: uppercase;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 20px;
        }
        .heroSub {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.18px;
          color: #fffbf2;
          margin: 0 0 36px;
          max-width: 600px;
        }
        .pillsRow {
          display: flex;
          gap: 73px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .pill {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .pillDot {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(180deg, #8D5C18, #F8E5AC);
          flex-shrink: 0;
        }
        .pillLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
        }

        /* ══════════════════════════════
            LEGACY
        ══════════════════════════════ */
        .legacy {
          display: flex;
          gap: 78px;
          align-items: flex-start;
          padding: 60px 70px 100px;
          max-width: 1280px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .legacyLeft {
          flex: 0 0 484px;
          max-width: 484px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .legacyHeading {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(34px, 4.7vw, 60px);
          font-weight: 700;
          font-style: normal;
          letter-spacing: -1.2px;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        .lhWhite {
          line-height: 1;
          background: linear-gradient(183.65deg, rgb(255,251,242) 53.317%, rgb(153,150,145) 135%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lhGold {
          line-height: 1;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .legacyBody {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .legacyBody p {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.14px;
          color: #fffbf2;
          margin: 0;
        }
        .statsGrid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 282px);
          gap: 14px;
          align-content: start;
        }
        .statCard {
          width: 282px;
          height: 142px;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 21px 40px;
          box-sizing: border-box;
        }
        .statNum {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 60px;
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -1.2px;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .statLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.16px;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }

        /* ══════════════════════════════
            SHARED SECTION HEADER
        ══════════════════════════════ */
        .secHeader {
          display: flex;
          gap: 34px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .divLine {
          display: block;
          width: 103px;
          height: 2px;
          border-radius: 1px;
          flex-shrink: 0;
          background: linear-gradient(207.32deg, #8D5C18 20.647%, #F8E5AC 99.503%);
        }
        .secTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(26px, 4.7vw, 60px);
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -1.2px;
          margin: 0;
          text-align: center;
          white-space: nowrap;
        }
        .stWhite {
          background: linear-gradient(183.65deg, rgb(255,251,242) 53.317%, rgb(153,150,145) 135%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stGold {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .secSub {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.16px;
          color: rgba(255,255,255,0.8);
          text-align: center;
          margin: 0;
        }

        /* ══════════════════════════════
            CAREERS
        ══════════════════════════════ */
        .careers {
          padding: 100px 111px;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
          box-sizing: border-box;
        }
        .valueGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          width: 100%;
        }
        .valueCard {
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: flex-start;
        }
        .valueIconBox {
          background: #0a0a0a;
          border: 1px solid #8D5C18;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .valueText {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .valueTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 30px;
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -0.6px;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        .valueBody {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.14px;
          color: rgba(255,255,255,0.8);
          margin: 0;
        }

        /* ══════════════════════════════
            PLATFORM
        ══════════════════════════════ */
        .platform {
          padding: 100px 111px;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          box-sizing: border-box;
        }
        .platformBody {
          max-width: 860px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .platformBody p {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.14px;
          color: #fffbf2;
          margin: 0;
        }
        .platformQuote {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.16px;
          color: #fffbf2;
          text-align: center;
          margin: 0;
        }

        /* ══════════════════════════════
            FOUNDER
        ══════════════════════════════ */
        .founder {
          padding: 0 20px 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .founderHeading {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(34px, 4.7vw, 60px);
          font-weight: 700;
          font-style: normal;
          letter-spacing: -1px;
          margin: 0;
          text-align: center;
          line-height: 0;
        }
        .fhWhite {
          line-height: 1;
          background: linear-gradient(181.68deg, rgb(255,251,242) 53.317%, rgb(153,150,145) 135%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fhGold {
          line-height: 1;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .founderCard {
          width: 463px;
          max-width: calc(100% - 32px);
          background: linear-gradient(-4.96deg, rgb(14,14,14) 51.14%, rgb(162,120,54) 221.18%);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .founderTop {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .founderAvatarPlaceholder {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(180deg, #8D5C18, #F8E5AC);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
          letter-spacing: 0;
        }
        .founderMeta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .founderLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.9;
          letter-spacing: 1.68px;
          text-transform: uppercase;
          color: #fffbf2;
          margin: 0;
          white-space: nowrap;
        }
        .founderName {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 30px;
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -0.6px;
          color: rgba(255,255,255,0.9);
          margin: 0;
        }
        .founderRole {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.12px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .founderRule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        }
        .founderQuoteWrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          text-align: center;
        }
        .founderQuote {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.14px;
          color: #fffbf2;
          width: 371px;
          max-width: 100%;
          margin: 0;
        }
        .founderAttrib {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.12px;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        /* ══════════════════════════════
            MEMBERS
        ══════════════════════════════ */
        .members {
          padding: 80px 70px;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
        }
        .membersGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          row-gap: 20px;
          column-gap: 13px;
          width: 100%;
        }
        .memberCard {
          background: linear-gradient(-2.02deg, rgb(14,14,14) 51.14%, rgb(162,120,54) 221.18%);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .memberName {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 24px;
          font-weight: 700;
          font-style: normal;
          line-height: 1;
          letter-spacing: -0.48px;
          color: rgba(255,255,255,0.9);
          margin: 0;
        }
        .memberRole {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: 1.56px;
          text-transform: uppercase;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        /* ══════════════════════════════
            REDUCED MOTION
        ══════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .hero, .legacy, .careers, .platform, .founder, .members {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ══════════════════════════════
            MOBILE ≤ 639px
        ══════════════════════════════ */
        @media (max-width: 639px) {
          .hero {
            padding: 100px 20px 60px;
          }
          .heroTitle { font-size: 36px; letter-spacing: -0.72px; }
          .heroSub   { font-size: 15px; }
          .pillsRow  { gap: 20px; }

          .legacy {
            flex-direction: column;
            padding: 40px 20px 60px;
            gap: 40px;
          }
          .legacyLeft { flex: none; max-width: 100%; }
          .legacyHeading { font-size: 32px; }
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
          }
          .statCard  { width: 100%; height: 110px; }
          .statNum   { font-size: 40px; }
          .statLabel { font-size: 12px; }

          .careers  { padding: 60px 20px; }
          .secHeader {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 8px;
            align-items: center;
          }
          .divLine  { display: block; width: 30px; flex-shrink: 0; }
          .secTitle {
            flex: 1;
            font-size: clamp(18px, 6.5vw, 60px);
            white-space: normal;
            line-height: 1.1;
            letter-spacing: -0.4px;
          }
          .secSub { font-size: 14px; }
          .valueGrid{ grid-template-columns: 1fr; }

          .platform { padding: 60px 20px; }

          .founder  { padding: 0 20px 60px; }
          .founderHeading {
            font-size: clamp(28px, 7vw, 40px);
            white-space: normal;
            line-height: 1.05;
          }
          .fhWhite, .fhGold { line-height: 1.05; }
          .founderCard    { width: 100%; }
          .founderQuote   { width: 100%; }

          .members  { padding: 50px 20px; }
          .membersGrid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 12px;
          }
          .memberCard { padding: 12px 14px; }
          .memberName { font-size: 17px; }
        }

        /* ══════════════════════════════
            TABLET 640 – 1024px
        ══════════════════════════════ */
        @media (min-width: 640px) and (max-width: 1024px) {
          .hero { padding: 120px 40px 60px; }
          .heroTitle { font-size: 58px; }
          .pillsRow  { gap: 36px; }

          .legacy {
            flex-direction: column;
            padding: 60px 40px 80px;
            gap: 40px;
          }
          .legacyLeft { flex: none; max-width: 100%; }
          .statsGrid  { grid-template-columns: repeat(2, 1fr); width: 100%; }
          .statCard   { width: 100%; }

          .careers  { padding: 80px 40px; }
          .secTitle { font-size: clamp(28px, 4vw, 48px); white-space: normal; line-height: 1.05; }
          .platform { padding: 80px 40px; }
          .founder  { padding: 0 40px 80px; }
          .members  { padding: 60px 40px; }
          .membersGrid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}
