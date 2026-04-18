import Navbar from '@/components/Navbar'
import TeamsAndPlayersSection from '@/components/TeamsAndPlayersSection'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export const metadata = {
  title: 'Teams & Players – Gold Cup 42nd Edition',
  description: 'Meet the sixteen squads. Browse team rosters, study player statistics, and follow the journeys of the Gold Cup 42nd Edition.',
}

export default function TeamsAndPlayersPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <TeamsAndPlayersSection />
        <CTABanner />
        <Footer />
      </main>
    </HomePageShell>
  )
}
