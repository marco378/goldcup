'use client'

export default function LegacySection() {
  const stats = [
    { number: '42', label: 'Years of Legacy' },
    { number: '31', label: 'Total Matches' },
    { number: '16', label: 'Competing Teams' },
    { number: '100+', label: 'Alumni Players' },
  ]

  return (
    <section className="legacySection">
      <h2 className="headline">
        A platform that shaped legends like{' '}
        <span>MS Dhoni</span>
        , and the next one could be you
      </h2>

      <div className="divider" />

      <div className="statsGrid">
        {stats.map((stat, i) => (
          <div key={i} className="stat">
            <div className="statNumber">{stat.number}</div>
            <div className="statLabel">{stat.label}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .legacySection {
          background: var(--bg);
          padding: 72px 80px 80px;
        }

        .headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 4.5vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #fff;
          max-width: 1100px;
          margin-bottom: 48px;
        }

        .headline span {
          color: var(--gold-light);
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.85);
          margin-bottom: 34px;
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
        }

        .statNumber {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(48px, 5vw, 82px);
          line-height: 1;
          color: #fff;
          margin-bottom: 10px;
        }

        .statLabel {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 900px) {
          .legacySection {
            padding: 40px 18px;
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
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 20px;
          }

          .statLabel {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  )
}
