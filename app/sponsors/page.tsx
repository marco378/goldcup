import Navbar from '@/components/Navbar'
import SponsorsSection from '@/components/SponsorsSection'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'
import CTABanner from '@/components/CTABanner'
import SponsorStrip from '@/components/SponsorStrip'

export const metadata = {
  title: 'Sponsors – Gold Cup 42nd Edition',
  description: 'Partner with Gold Cup — sponsorship tiers, brand placements, and partnership opportunities for the 42nd edition.',
}

export default function SponsorsPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <div className="aboutSponsorSlot">
          <SponsorStrip overlay={false} />
        </div>
        <SponsorsSection />
        
        <Footer />
      </main>
    </HomePageShell>
  )
}
