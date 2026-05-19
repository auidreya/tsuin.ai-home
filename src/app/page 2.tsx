import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { EraSection } from '@/components/sections/EraSection'
import { MemorySection } from '@/components/sections/MemorySection'
import { VideoSection } from '@/components/sections/VideoSection'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Footer } from '@/components/sections/Footer'
import { StickyCtaButton } from '@/components/ui/StickyCtaButton'
import { CookieCard } from '@/components/ui/CookieCard'
import type { EraData } from '@/types'

const ERAS: EraData[] = [
  {
    eyebrow: '// THE FUTURE OF SOFTWARE DEVELOPMENT',
    title: 'Pre-AGI ERA',
    paragraphs: [
      'We stopped writing code, but we must still fix it.',
      '',
      'AI generates everything, but when it breaks, the codebase is too massive to comprehend.',
      '',
      "How do you debug what you can't understand?",
      '',
      'Your AI Twin was trained on your context and decisions before you even knew you needed it.',
    ],
    shapes: '/assets/Shapes.png',
  },
  {
    title: 'AGI ERA',
    paragraphs: [
      'AI will build entire systems overnight, but it still needs you when things break.',
      '',
      'When complex errors occur, humans excel at navigating that ambiguity.',
      '',
      'Your AI Twin bridges the gap, translating your intuition so you stay in control.',
    ],
    shapes: '/assets/Shapes (1).png',
  },
  {
    title: 'POST-AGI ERA',
    paragraphs: [
      'In a world where AGI acts freely and machines become fully autonomous, humans will be left out of the loop.',
      '',
      "When the system fails in a way we don't understand, your AI Twin is there to act as your representative to protect you.",
    ],
    shapes: '/assets/Shapes (2).png',
  },
]

export default function HomePage() {
  return (
    <main className="bg-[#1a1b26]">
      <Navbar />
      <Hero />
      <div className="flex flex-col gap-[46px] pt-[20px]">
        {ERAS.map((era) => (
          <EraSection key={era.title} data={era} />
        ))}
      </div>
      <MemorySection />
      <VideoSection />
      <HowItWorks />
      <Footer />
      <StickyCtaButton />
      <CookieCard />
    </main>
  )
}
