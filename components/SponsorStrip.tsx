'use client'

export default function SponsorStrip() {
  const message = 'Proud Title Sponsor of Uttarakhand Gold Cup 2026'
  const tickerItems = Array.from({ length: 8 }, (_, i) => i)

  return (
    <section className="sponsorStrip" aria-label="Title sponsor announcement">
      <div className="tickerWindow">
        <div className="tickerTrack">
          {tickerItems.map((item, i) => (
            <div className="tickerItem" aria-hidden={i !== 0} key={item}>
              <img
                src="/images/optimized/nxtgenstrip.png"
                alt={i === 0 ? 'Next Gen Academy logo' : ''}
                className="sponsorLogo"
              />
              <p className="sponsorText">{message}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sponsorStrip {
          position: absolute;
          top: 100px;
          left: 0;
          right: 0;
          z-index: 3;
          width: 100%;
          border-top: 1px solid rgba(141, 92, 24, 0.45);
          border-bottom: 1px solid rgba(141, 92, 24, 0.45);
          background:
            linear-gradient(90deg, rgba(10, 32, 58, 0.25) 0%, rgba(141, 92, 24, 0.18) 50%, rgba(10, 32, 58, 0.25) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .tickerWindow {
          position: relative;
          height: 40px;
          overflow: hidden;
        }

        .tickerTrack {
          display: flex;
          align-items: center;
          width: max-content;
          animation: tickerLoop 28s linear infinite;
          will-change: transform;
        }

        .tickerItem {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          padding: 0 42px;
          height: 40px;
        }

        .sponsorLogo {
          width: 102px;
          height: 102px;
          object-fit: contain;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .sponsorText {
          margin: 0;
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          white-space: nowrap;
          background: linear-gradient(181deg, #8d5c18 -20.65%, #f8e5ac 39.43%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .sponsorStrip:hover .tickerTrack {
          animation-play-state: paused;
        }

        @keyframes tickerLoop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tickerTrack {
            animation: none;
          }
        }

        @media (max-width: 639px) {
          .sponsorStrip {
            top: 62px;
          }

          .tickerWindow {
            height: 32px;
          }

          .tickerItem {
            height: 32px;
            padding: 0 22px;
          }

          .sponsorLogo {
            width: 18px;
            height: 18px;
          }

          .sponsorText {
            font-size: 12px;
            letter-spacing: 0.01em;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .sponsorStrip {
            top: 82px;
          }

          .sponsorText {
            font-size: 13px;
          }

          .sponsorLogo {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </section>
  )
}
