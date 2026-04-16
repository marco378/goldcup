import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LegacySection from '@/components/LegacySection'
import TournamentSnapshot from '@/components/TournamentSnapshot'
import VideoSection from '@/components/VideoSection'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export default function Home() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <HeroSection />
        <LegacySection />
        <TournamentSnapshot />
        <VideoSection />
        <CTABanner />
        
        <Footer />
      </main>
    </HomePageShell>
  )
}
