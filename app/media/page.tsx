import Navbar from '@/components/Navbar'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export const metadata = {
  title: 'News & Updates – Gold Cup 42nd Edition',
  description: 'Match reports, player stories, and tournament announcements. Everything Gold Cup, as it happens.',
}

export default function MediaPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <NewsSection />
        <Footer />
      </main>
    </HomePageShell>
  )
}
