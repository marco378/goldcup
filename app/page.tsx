import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LegacySection from '@/components/LegacySection'
import TournamentSnapshot from '@/components/TournamentSnapshot'
import VideoSection from '@/components/VideoSection'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <LegacySection />
      <TournamentSnapshot />
      <VideoSection />
      <CTABanner />
      <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }}
>
  <h1
    style={{
      color: 'rgba(255, 255, 255, 0.10)',
      fontFamily: 'Coluna',
      fontSize: '200px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '86%',
      letterSpacing: '-4px',
      margin: 0,
      textAlign: 'center',
    }}
  >
    Gold Cup: 42nd Edition
  </h1>
</div>
      <Footer />
    </main>
  )
}
