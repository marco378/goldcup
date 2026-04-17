'use client'

const TIERS = [
  {
    tier: 'TIER 1',
    name: 'Title Sponsor',
    desc: 'The most prestigious association available. Full naming rights, premium placement across all match and digital assets, and direct alignment with the Gold Cup brand story.',
    logos: 7,
  },
  {
    tier: 'TIER 2',
    name: 'Powered By',
    desc: 'The most prestigious association available. Full naming rights, premium placement across all match and digital assets, and direct alignment with the Gold Cup brand story.',
    logos: 7,
  },
  {
    tier: 'TIER 3',
    name: 'Title Sponsor',
    desc: 'The most prestigious association available. Full naming rights, premium placement across all match and digital assets, and direct alignment with the Gold Cup brand story.',
    logos: 7,
  },
  {
    tier: 'TIER 4',
    name: 'Associate Sponsors',
    desc: 'The most prestigious association available. Full naming rights, premium placement across all match and digital assets, and direct alignment with the Gold Cup brand story.',
    logos: 7,
  },
  {
    tier: 'TIER 5',
    name: 'Media Partners',
    desc: 'The most prestigious association available. Full naming rights, premium placement across all match and digital assets, and direct alignment with the Gold Cup brand story.',
    logos: 7,
  },
]

const FEATURES = [
  { label: 'JERSEY', desc: 'Prime placement on team jerseys' },
  { label: 'DIGITAL', desc: 'Overlay & broadcast graphics' },
  { label: 'STADIUM', desc: 'Perimeter & hoarding placement' },
  { label: 'PRINT', desc: 'Collateral & programme features' },
]

const LATEST_LOGOS = Array(13).fill('LOGO 1')

export default function SponsorsSection() {
  return (
    <div className="page">

      {/* ── HERO ── */}
      <section className="hero">
        <h1 className="heroTitle">Gold Cup: Presented by [Brand Name]</h1>
        <p className="heroSub">
          For 42 years, Gold Cup has delivered one of the most credible stages in domestic cricket.
          Partnering with us means your brand stands alongside that legacy, in front of players,
          families, coaches, selectors, and a passionate cricket audience.
        </p>
      </section>

      {/* ── SPONSOR TIERS DIVIDER ── */}
      <div className="divider">
        <div className="dividerLine" />
        <h2 className="dividerTitle">Sponsor Tiers</h2>
        <div className="dividerLine" />
      </div>

      {/* ── TIER ROWS ── */}
      <section className="tiersSection">
        {TIERS.map((t) => (
          <div key={t.name} className="tierRow">
            {/* Left: accent + info */}
            <div className="tierLeft">
              <div className="tierAccentBar" />
              <div className="tierInfo">
                <p className="tierLabel">{t.tier}</p>
                <p className="tierName">{t.name}</p>
                <p className="tierDesc">{t.desc}</p>
              </div>
            </div>
            {/* Right: logo placeholders */}
            <div className="logoGrid">
              {Array(t.logos).fill(null).map((_, i) => (
                <div key={i} className="logoBox">
                  <span className="logoBoxLabel">LOGO 1</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── YOUR BRAND. OUR STAGE. ── */}
      <section className="brandSection">
        <div className="brandLeft">
          <h2 className="brandTitle">
            Your Brand.{' '}
            <span className="brandTitleGold">Our Stage.</span>
          </h2>
          <p className="brandBody">
            Gold Cup offers category-exclusive sponsorships across jersey placements, stadium
            perimeters, digital overlays, broadcast graphics, and print collateral. We do not offer
            generic packages. We offer bespoke partnerships that align your brand with one of the
            most storied domestic cricket events in the region.
          </p>
        </div>
        <div className="featuresGrid">
          {FEATURES.map((f) => (
            <div key={f.label} className="featureCard">
              <img src="/images/icon-sponsor-feature.svg" alt="" width={20} height={20} className="featureIcon" />
              <div className="featureText">
                <p className="featureLabel">{f.label}</p>
                <p className="featureDesc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST UPDATES DIVIDER ── */}
      <div className="divider">
        <div className="dividerLine" />
        <h2 className="dividerTitle">LATEST UPDATES</h2>
        <div className="dividerLine" />
      </div>

      {/* ── LOGO STRIP ── */}
      <div className="logoStrip">
        {LATEST_LOGOS.map((l, i) => (
          <div key={i} className="logoStripBox">
            <span className="logoBoxLabel">{l}</span>
          </div>
        ))}
      </div>

      {/* ── CTA BANNER ── */}
      <section className="ctaSection">
        <div className="ctaBox">
          <div className="ctaBg" />
          <div className="ctaOverlay" />
          <div className="ctaContent">
            <h2 className="ctaTitle">READY TO PARTNER</h2>
            <p className="ctaSub">{"Let's build something that lasts 42 more years."}</p>
            <div className="ctaActions">
              <a href="/contact" className="btnPrimary">
                <span className="btnLabel btnLabelDark">Become a Sponsor</span>
              </a>
              <a href="#" className="btnSecondary">
                <span className="btnLabel btnLabelLight">Download Media Kit</span>
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
          padding: 140px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .heroTitle {
          font-family: var(--font-coluna);
          font-size: 70px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.4px;
          background: linear-gradient(180.04deg, #8d5c18 20.6%, #f8e5ac 39.4%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
          white-space: nowrap;
        }

        .heroSub {
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.16px;
          color: #fffbf2;
          max-width: 646px;
          margin: 0;
        }

        /* ── DIVIDER ── */
        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          padding: 80px 0 50px;
        }

        .dividerLine {
          width: 103px;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(207.3deg, #8d5c18 20.6%, #f8e5ac 99.5%);
        }

        .dividerTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 60px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
          text-align: center;
          background: linear-gradient(180.12deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
          white-space: nowrap;
          display: inline-block;
        }

        /* ── TIERS ── */
        .tiersSection {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .tierRow {
          display: flex;
          align-items: center;
          gap: 112px;
        }

        .tierLeft {
          display: flex;
          gap: 20px;
          align-items: stretch;
          flex-shrink: 0;
          width: 420px;
        }

        .tierAccentBar {
          width: 5px;
          flex-shrink: 0;
          border-radius: 1px;
          background: linear-gradient(191.79deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          align-self: stretch;
        }

        .tierInfo {
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: center;
        }

        .tierLabel {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 2.4px;
          line-height: 1;
          background: linear-gradient(180.13deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0;
        }

        .tierName {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(180.13deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0;
        }

        .tierDesc {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.12px;
          color: rgba(255, 251, 242, 0.7);
          width: 337px;
          margin: 0;
        }

        .logoGrid {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }

        .logoBox {
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logoBoxLabel {
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 1.28px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }

        /* ── BRAND SECTION ── */
        .brandSection {
          max-width: 1280px;
          margin: 80px auto 0;
          padding: 0 70px;
          display: flex;
          gap: 144px;
          align-items: center;
        }

        .brandLeft {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          width: 418px;
        }

        .brandTitle {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 70px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.4px;
          background: linear-gradient(186.8deg, #fffbf2 53.3%, #999691 135%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
          display: inline-block;
          width: 285px;
        }

        .brandTitleGold {
          background: linear-gradient(180.24deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brandBody {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.12px;
          color: #fffbf2;
          margin: 0;
        }

        .featuresGrid {
          display: grid;
          grid-template-columns: 282px 282px;
          gap: 14px;
        }

        .featureCard {
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 7px;
          padding: 21px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          text-align: center;
        }

        .featureIcon {
          display: block;
          flex-shrink: 0;
        }

        .featureText {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }

        .featureLabel {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.48px;
          background: linear-gradient(186.4deg, #fffbf2 53.3%, #999691 135%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          margin: 0;
        }

        .featureDesc {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.12px;
          color: rgba(255, 255, 255, 0.5);
          width: 137px;
          margin: 0;
        }

        /* ── LOGO STRIP ── */
        .logoStrip {
          display: flex;
          gap: 14px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          padding: 0 10px 80px;
          
          margin: 0 auto;
        }

        .logoStripBox {
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          padding: 17px 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── CTA BANNER ── */
        .ctaSection {
          padding: 0 60px 80px;
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
        }

        .ctaBg {
          position: absolute;
          inset: 0;
          background: url('/images/optimized/cta-banner-bg.jpg') center / cover no-repeat;
          filter: brightness(0.65);
          z-index: 0;
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
          letter-spacing: -1.6px;
          background: linear-gradient(180.09deg, #8d5c18 20.6%, #f8e5ac 39.4%);
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
          letter-spacing: -0.16px;
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
        }

        .btnPrimary::before,
        .btnSecondary::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
        }

        .btnPrimary::before {
          background-image: url('/images/cta-btn-fill.svg');
        }

        .btnSecondary::before {
          background-image: url('/images/cta-btn-outline.svg');
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

        .btnLabelLight {
          color: #fff;
        }

        @media (max-width: 639px) {
          .hero {
            padding: 80px 0 0;
          }

          .heroTitle {
            font-size: 32px;
            letter-spacing: -0.6px;
            white-space: normal;
            padding: 0 18px;
          }

          .heroSub {
            font-size: 14px;
            letter-spacing: -0.08px;
            padding: 0 18px;
          }

          .divider {
            gap: 12px;
            padding: 40px 18px 24px;
          }

          .dividerTitle {
            font-size: 28px;
            letter-spacing: -0.3px;
            white-space: normal;
          }

          .tiersSection {
            padding: 0 18px;
          }

          .tierRow {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .tierLeft {
            width: 100%;
          }

          .tierName {
            font-size: 24px;
            letter-spacing: -0.25px;
          }

          .tierDesc {
            width: 100%;
          }

          .logoGrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            width: 100%;
          }

          .brandSection {
            padding: 0 18px;
            margin: 40px auto 0;
            flex-direction: column;
            gap: 24px;
          }

          .brandLeft {
            width: 100%;
          }

          .brandTitle {
            font-size: 40px;
            letter-spacing: -0.6px;
            width: 100%;
          }

          .featuresGrid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .featureCard {
            padding: 14px 16px;
          }

          .ctaSection {
            padding: 0 18px 40px;
          }

          .ctaTitle {
            font-size: 30px;
            letter-spacing: -0.48px;
          }

          .ctaActions {
            flex-direction: column;
            align-items: center;
          }

          .logoStrip {
            padding: 0 18px 40px;
          }
        }

        @media (min-width: 640px) and (max-width: 1100px) {
          .tiersSection,
          .brandSection {
            padding: 0 24px;
          }

          .heroTitle {
            font-size: 48px;
            letter-spacing: -1.0px;
            white-space: normal;
            text-align: center;
            padding: 0 24px;
          }

          .heroSub {
            padding: 0 24px;
          }

          .divider {
            gap: 20px;
            padding: 60px 24px 40px;
          }

          .dividerTitle {
            font-size: 42px;
            letter-spacing: -0.6px;
            white-space: normal;
          }

          .tierRow {
            flex-direction: column;
            gap: 24px;
            align-items: flex-start;
          }

          .tierLeft {
            width: 100%;
          }

          .tierName {
            font-size: 32px;
            letter-spacing: -0.5px;
          }

          .tierDesc {
            width: 100%;
          }

          .logoGrid {
            flex-wrap: wrap;
          }

          .brandSection {
            flex-direction: column;
            gap: 40px;
          }

          .brandLeft {
            width: 100%;
          }

          .brandTitle {
            font-size: 56px;
            letter-spacing: -1.0px;
            width: 100%;
          }

          .featuresGrid {
            grid-template-columns: 1fr 1fr;
          }

          .ctaSection {
            padding: 0 24px 60px;
          }

          .ctaTitle {
            font-size: 46px;
          }
        }
      `}</style>
    </div>
  )
}
