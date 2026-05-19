import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import HomePageShell from '@/components/HomePageShell'
import SponsorStrip from '@/components/SponsorStrip'

export const metadata = {
  title: 'Contact – Gold Cup 42nd Edition',
  description: 'Get in touch with the Gold Cup team for sponsorship, team registration, or general enquiries.',
}

export default function ContactPage() {
  return (
    <HomePageShell>
      <main style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar />
        <div className="aboutSponsorSlot">
          <SponsorStrip overlay={false} />
        </div>
        <ContactSection />
        <CTABanner />
        <Footer />
      </main>
    </HomePageShell>
  )
}
