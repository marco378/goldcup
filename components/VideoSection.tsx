'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`videoSection ${isVisible ? 'isVisible' : ''}`}>
      <div className="copyBlock">
        <h2>
          <span className="titleClip">
            <span className="titleLine titleGold">The Next Legend</span>
          </span>
          <span className="titleClip">
            <strong className="titleLine titleWhite">Plays Here</strong>
          </span>
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
          perspective: 1400px;
        }

        h2 {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          font-family: var(--font-coluna),'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 100px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 24px;
        }

        .titleClip {
          display: block;
          overflow: hidden;
          
          padding-bottom: 12px;
          padding-top: 6px;

        }

        .titleLine {
          display: block;
          opacity: 0;
          transform: translateY(110%) skewY(4deg);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease;
        }

        .titleGold {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .titleWhite {
          color: #fff;
          font-family: var(--font-coluna),'Coluna', 'Barlow Condensed', sans-serif;
          font-size: 100px;
          font-style: normal;
          font-weight: 700;
          line-height: 86%;
          letter-spacing: -2px;
        }

        p {
          opacity: 0;
          transform: translateY(24px);
          color: rgba(255, 255, 255, 0.80);
          font-family:var(--font-manrope);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 140%;
          letter-spacing: -0.16px;
          max-width: 520px;
          transition: transform 0.8s ease 0.18s, opacity 0.8s ease 0.18s;
        }

        .videoShell {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 2px solid rgba(201, 168, 76, 0.8);
          cursor: pointer;
          background: #111;
          opacity: 0;
          transform: rotateY(-10deg) rotateX(4deg);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.28);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .isVisible .titleLine {
          opacity: 1;
          transform: translateY(0) skewY(0deg);
        }

        .isVisible .titleClip:nth-child(2) .titleLine {
          transition-delay: 0.14s;
        }

        .isVisible p {
          opacity: 1;
          transform: translateY(0);
        }

        .isVisible .videoShell {
          opacity: 1;
          animation: videoShellReveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both;
        }

        .thumb {
          position: absolute;
          inset: 0;
          background-image: url('/images/optimized/video-thumb.jpg');
          background-size: cover;
          background-position: center;
          filter: brightness(0.75);
          transition: transform 0.45s ease, filter 0.45s ease;
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
          transition: transform 0.35s ease, background 0.35s ease;
        }

        .videoShell:hover {
          transform: rotateY(-4deg) rotateX(1deg) translateY(-8px);
          border-color: rgba(248, 229, 172, 0.92);
          box-shadow: 0 40px 72px rgba(0, 0, 0, 0.34);
        }

        .videoShell:hover .thumb {
          transform: scale(1.06);
          filter: brightness(0.82);
        }

        .videoShell:hover .playButton {
          transform: scale(1.08);
          background: rgba(255, 255, 255, 0.58);
        }

        @keyframes videoShellReveal {
          from {
            opacity: 0;
            transform: rotateY(-16deg) rotateX(8deg) translateY(42px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: rotateY(-10deg) rotateX(4deg) translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .titleLine,
          p,
          .videoShell {
            animation: none !important;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .videoSection {
            padding: 32px 16px;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          h2 {
            font-size: 38px;
            letter-spacing: -0.5px;
            margin-bottom: 12px;
          }

          .titleWhite {
            font-size: 38px;
            letter-spacing: -0.5px;
          }

          p {
            font-size: 14px;
            max-width: 100%;
          }

          .videoShell {
            transform: none;
          }

          .videoShell:hover {
            transform: none;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .videoSection {
            padding: 40px 24px;
            grid-template-columns: 1fr;
            gap: 28px;
          }

          h2 {
            font-size: 56px;
            letter-spacing: -1.0px;
          }

          .titleWhite {
            font-size: 56px;
            letter-spacing: -1.0px;
          }

          p {
            font-size: 16px;
            line-height: 1.5;
            max-width: 100%;
          }

          .videoShell {
            transform: none;
          }

          .videoShell:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
