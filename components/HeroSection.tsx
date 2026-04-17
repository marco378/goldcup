import Image from 'next/image'
import Link from 'next/link'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.heroFrame}>
      <div className={styles.heroMedia}>
        <Image
          src="/images/optimized/hero-bg.jpg"
          alt="Gold Cup batsman under stadium lights"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroOverlay} />
      <div className={styles.heroBottomFade} />

      <div className={styles.heroDeco}>
        <div className={`${styles.heroDecoCircle} ${styles.c1}`} />
        <div className={`${styles.heroDecoCircle} ${styles.c2}`} />
        <div className={`${styles.heroDecoLine} ${styles.l1}`} />
        <div className={`${styles.heroDecoLine} ${styles.l2}`} />
      </div>

      <div className={styles.goldLine} />

      <div className={styles.content}>
        <div className={styles.contentTop}>
          <span className={styles.eyebrow}>Gold Cup: 42nd Edition</span>

          <h1 className={styles.headline}>
            <span className={styles.headlineClip}>
              <span className={styles.headlineLine}>Where Legends</span>
            </span>
            <span className={styles.headlineClip}>
              <span className={styles.headlineLine}>Once Played</span>
            </span>
          </h1>

          <p className={styles.tagline}>
            From grassroots to greatness, the journey begins here.
          </p>
        </div>

        <div className={styles.ctaRow}>
          <Link href="/live" className={styles.btnWatch}>
            <svg className={styles.btnWatchBg} viewBox="0 0 165 44" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
              <path d="M164.121 11.1213C164.684 11.6839 165 12.447 165 13.2426V41C165 42.6569 163.657 44 162 44H13.2426C12.447 44 11.6839 43.6839 11.1213 43.1213L0.87868 32.8787C0.31607 32.3161 0 31.553 0 30.7574V3C0 1.34315 1.34315 0 3 0H151.757C152.553 0 153.316 0.316071 153.879 0.87868L164.121 11.1213Z" fill="#FF0000" />
            </svg>
            <span className={styles.btnWatchContent}>
              <img className={styles.btnIcon} src="/images/signal-1.svg" alt="" aria-hidden="true" />
              Watch Live
            </span>
          </Link>

          <Link href="/sponsors" className={styles.btnSponsor}>
            <svg className={styles.btnSponsorBg} viewBox="0 0 193 44" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
              <path d="M192.121 11.1213C192.684 11.6839 193 12.447 193 13.2426V41C193 42.6569 191.657 44 190 44H13.2426C12.447 44 11.6839 43.6839 11.1213 43.1213L0.87868 32.8787C0.31607 32.3161 0 31.553 0 30.7574V3C0 1.34315 1.34315 0 3 0L179.757 0C180.553 0 181.316 0.316071 181.879 0.87868L192.121 11.1213Z" fill="white" />
            </svg>
            <span className={styles.btnSponsorContent}>Become a Sponsor</span>
          </Link>

        </div>
      </div>

      <div className={styles.statsRow}>
        <Link href="/sponsors" className={styles.btnSponsor}>
            <svg className={styles.btnSponsorBg} viewBox="0 0 193 44" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
              <path d="M192.121 11.1213C192.684 11.6839 193 12.447 193 13.2426V41C193 42.6569 191.657 44 190 44H13.2426C12.447 44 11.6839 43.6839 11.1213 43.1213L0.87868 32.8787C0.31607 32.3161 0 31.553 0 30.7574V3C0 1.34315 1.34315 0 3 0L179.757 0C180.553 0 181.316 0.316071 181.879 0.87868L192.121 11.1213Z" fill="white" />
            </svg>
            <span className={styles.btnSponsorContent}>view Teams</span>
          </Link>
        

        <div className={styles.stat}>
          <div className={styles.statNum}>42nd</div>
          <div className={styles.statLabel}>Edition</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>32</div>
          <div className={styles.statLabel}>Teams</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>1981</div>
          <div className={styles.statLabel}>Est.</div>
        </div>
      </div>
    </section>
  )
}
