import Navbar from '@/components/Navbar'
import TournamentSection from '@/components/LiveSection'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'
import SponsorStrip from '@/components/SponsorStrip'

export const metadata = {
  title: 'Tournament – Gold Cup 42nd Edition',
  description: '31 matches. Four phases. One trophy. Full schedule, live scores, and match results for Gold Cup 42nd Edition.',
}

export default function TournamentPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <div className="aboutSponsorSlot">
          <SponsorStrip overlay={false} />
        </div>
        <TournamentSection />
        <Footer />
      </main>
    </HomePageShell>
  )
}
