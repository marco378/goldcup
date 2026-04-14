'use client'

interface SnapshotCard {
  id: string
  title: string
  description: string
  size: 'small' | 'large'
  position?: string
  image: string 
}

const cards: SnapshotCard[] = [
  {
    id: 'teams',
    title: 'Teams',
    description: '16 Elite Teams. Sixteen of the region\'s finest squads, assembled for one purpose: to compete, to impress, and to be remembered.',
    size: 'small',
    position: '8% 25%',
    image: '/images/untitled folder 3/Team.JPG',
  },
  {
    id: 'player-level',
    title: 'Player Level',
    description: 'Ranji-Level Talent. Every squad features players operating at the highest tier of domestic cricket, the same arena where India\'s international stars were forged.',
    size: 'large',
    position: '50% 50%',
    image: '/images/untitled folder 3/DSC_0191.JPG',
  },
  {
    id: 'opening-day',
    title: 'Opening Day',
    description: 'Opening Ceremony: 15th May. The stage is set. The teams are ready. The legacy continues.',
    size: 'small',
    position: '86% 20%',
    image: '/images/untitled folder 3/DSC_0892.JPG',
  },
  {
    id: 'groups',
    title: 'Groups 4',
    description: 'Competitive Groups. Balanced, fierce, and unpredictable. Every group stage match is a statement.',
    size: 'small',
    position: '12% 78%',
    image: '/images/untitled folder 3/DSC_0892.JPG',
  },
  {
    id: 'scale',
    title: 'Scale',
    description: '31 Matches of Pure Cricket. Every delivery matters. Every innings tells a story.',
    size: 'small',
    position: '84% 54%',
    image: '/images/untitled folder 3/DSC_2262.JPG',
  },
  {
    id: 'format',
    title: 'Format',
    description: 'Multi-Day Tournament. Not a sprint. A test of skill, temperament, and character. The way real cricket is meant to be played.',
    size: 'small',
    position: '84% 82%',
    image: '/images/untitled folder 3/DSC_9984.JPG',
  },
]

function SnapshotCard({ card }: { card: SnapshotCard }) {
  return (
    <div className={`card ${card.size}`}>
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
        }

        .cardBg {
          position: absolute;
          inset: 0;
          
          background-size: cover;
          filter: brightness(0.7) saturate(0.9);
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
        }

        h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 2vw, 42px);
          letter-spacing: 0;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1;
        }

        p {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.3;
        }
      `}</style>
    </div>
  )
}

export default function TournamentSnapshot() {
  return (
    <section className="snapshotSection">
      <div className="headingWrap">
        <div className="line" />
        <h2>
          Tournament <span>Snapshot</span> Section
        </h2>
        <div className="line" />
      </div>

      <div className="grid">
        <div className="leftCol">
          <div className="h280"><SnapshotCard card={cards[0]} /></div>
          <div className="h280"><SnapshotCard card={cards[3]} /></div>
        </div>

        <div className="h572"><SnapshotCard card={cards[1]} /></div>

        <div className="rightCol">
          <div className="h180"><SnapshotCard card={cards[2]} /></div>
          <div className="h180"><SnapshotCard card={cards[4]} /></div>
          <div className="h180"><SnapshotCard card={cards[5]} /></div>
        </div>
      </div>

      <style jsx>{`
        .snapshotSection {
          background: #0a0a0a;
          padding: 80px 60px;
        }

        .headingWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 48px;
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
          font-family: 'Coluna', 'Barlow Condensed', sans-serif;
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
          font-family: 'Coluna', 'Barlow Condensed', sans-serif;
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

        @media (max-width: 900px) {
          .snapshotSection {
            padding: 40px 18px;
          }

          .headingWrap {
            gap: 12px;
            margin-bottom: 20px;
          }

          h2 {
            font-size: 34px;
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

          .h180,
          .h280,
          .h572 {
            height: 230px;
          }
        }
      `}</style>
    </section>
  )
}
