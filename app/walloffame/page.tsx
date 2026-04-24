import Navbar from '@/components/Navbar'
import WallOfFameSection from '@/components/WallOfFameSection'
import AlumniRegisterBanner from '@/components/AlumniRegisterBanner'
import AlumniRegisterTab from '@/components/AlumniRegisterTab'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'

export const metadata = {
  title: 'Wall of Fame – Gold Cup 42nd Edition',
  description: 'Celebrating the alumni who walked through our gates as rising talent and left as legends. The Gold Cup Wall of Fame.',
}

export default function WallOfFamePage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <AlumniRegisterTab />
        <WallOfFameSection />
        <AlumniRegisterBanner />
        <CTABanner />
        <Footer />
      </main>
    </HomePageShell>
  )
}
