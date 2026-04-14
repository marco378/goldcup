'use client'

import { useState } from 'react'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="videoSection">
      <div>
        <h2>
          <span>The Next Legend</span>
          <br />
          <strong>Plays Here</strong>
        </h2>
        <p>
          For over four decades, the Gold Cup has been more than a cricket tournament.
          It has been a proving ground where raw talent meets elite competition, and
          where careers are quietly born before the world takes notice.
        </p>
      </div>

      <div
        onClick={() => setPlaying(!playing)}
        className="videoShell"
      >
        <div className="thumb" />
        <div className="videoFade" />

        {!playing && (
          <div className="playOverlay">
            <div className="playButton">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {playing && (
          <video
            autoPlay
            controls
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
          >
            <source src="/videos/highlight.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <style jsx>{`
        .videoSection {
          background: var(--bg);
          padding: 80px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        h2 {
          align-self: stretch;
          font-family: 'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 100px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 24px;
        }

        h2 span {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        h2 strong {
          color: #fff;
          font-family: 'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 100px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -2px;
        }

        p {
          color: rgba(255, 255, 255, 0.80);
          font-family: 'Manrope', 'Barlow', sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 140%;
          letter-spacing: -0.16px;
          max-width: 520px;
        }

        .videoShell {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 2px solid rgba(201, 168, 76, 0.8);
          cursor: pointer;
          background: #111;
        }

        .thumb {
          position: absolute;
          inset: 0;
          background-image: url('/images/untitled folder 3/DSC_2485.JPG');
          background-size: cover;
          background-position: center;
          filter: brightness(0.75);
        }

        .videoFade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.08));
        }

        .playOverlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .playButton {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .videoSection {
            padding: 40px 18px;
            grid-template-columns: 1fr;
            gap: 20px;
          }

          h2 {
            font-size: 56px;
          }

          h2 strong {
            font-size: 56px;
          }

          p {
            font-size: 16px;
            line-height: 1.5;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
