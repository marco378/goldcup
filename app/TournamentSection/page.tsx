import Navbar from '@/components/Navbar'
import TournamentSection from '@/components/TournamentSection'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export const metadata = {
  title: 'Match Summary Gold Cup 42nd Edition',
  description: 'The Road to Glory — 31 matches of elite cricket across groups, quarterfinals, semifinals and the grand final.',
}

export default function TournamentSectionPage() {
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
