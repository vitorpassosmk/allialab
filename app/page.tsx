import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import Services from '@/components/sections/Services'
import Method from '@/components/sections/Method'
import CaseAnchor from '@/components/sections/CaseAnchor'
import Diferenciais from '@/components/sections/Diferenciais'
import CTAFinal from '@/components/sections/CTAFinal'

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Services />
      <Method />
      <CaseAnchor />
      <Diferenciais />
      <CTAFinal />
    </main>
  )
}
