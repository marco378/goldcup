import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'
import CTABanner from '@/components/CTABanner'

export default function AboutPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <About />
        <CTABanner />
        <Footer />
      </main>
    </HomePageShell>
  )
}
