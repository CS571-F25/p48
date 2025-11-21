import { StarfieldBackground } from '../components/StarfieldBackground'
import { Hero } from '../components/Hero'
import { Pricing } from '../components/Pricing'
import { Testimonials } from '../components/Testimonials'
import '../App.css'

export function Home() {
  return (
    <>
      <StarfieldBackground />
      <Hero />
      <Pricing />
      <Testimonials />
    </>
  )
}

