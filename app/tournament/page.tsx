import Navbar from '@/components/Navbar'
import TournamentSection from '@/components/TournamentSection'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export const metadata = {
  title: 'Tournament – Gold Cup 42nd Edition',
  description: '31 matches. Four phases. One trophy. Full schedule, live scores, and match results for Gold Cup 42nd Edition.',
}

export default function TournamentPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <TournamentSection />
        <Footer />
      </main>
    </HomePageShell>
  )
}
