import { Header } from './components/Header/Header.tsx'
import { Hero } from './components/Hero/Hero.tsx'
import { Courts } from './components/Courts/Courts.tsx'
import { Benefits } from './components/Benefits/Benefits.tsx'
import { Services } from './components/Services/Services.tsx'
import { HowItWorks } from './components/HowItWorks/HowItWorks.tsx'
import { Pricing } from './components/Pricing/Pricing.tsx'
import { Gallery } from './components/Gallery/Gallery.tsx'
import { Testimonials } from './components/Testimonials/Testimonials.tsx'
import { FAQ } from './components/FAQ/FAQ.tsx'
import { CTASection } from './components/CTASection/CTASection.tsx'
import { BookingForm } from './components/BookingForm/BookingForm.tsx'
import { Footer } from './components/Footer/Footer.tsx'
import { FloatActions } from './components/FloatActions/FloatActions.tsx'

function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Courts />
        <Benefits />
        <Services />
        <HowItWorks />
        <Pricing />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CTASection />
        <BookingForm />
      </main>
      <Footer />
      <FloatActions />
    </>
  )
}

export default App