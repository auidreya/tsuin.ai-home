import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-[#1a1b26] text-[#cbd1e6]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-[24px] text-center">

        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="block h-px w-10 bg-[#797ea6]/30" />
          <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-[#7aa2f7] font-bold">
            Manifesto
          </p>
          <span className="block h-px w-10 bg-[#797ea6]/30" />
        </div>

        <h1 className="font-display font-bold text-[36px] sm:text-[48px] leading-[1.1] tracking-tight text-[#cbd1e6] max-w-[600px] mx-auto">
          The best AI in your world should be the one that knows you best.
        </h1>

        <div className="mt-14 flex justify-center">
          <span className="block h-12 w-px bg-gradient-to-b from-[#797ea6]/30 to-transparent" />
        </div>
      </section>

      {/* ── Essay ────────────────────────────────────────────────────────── */}
      <section className="px-[24px] pb-[80px]">
        <div className="max-w-[600px] mx-auto space-y-14">

          {/* Thesis */}
          <p className="font-mono font-bold text-[18px] text-[#cbd1e6] leading-[1.75]">
            We believe the thinking you do, the work you produce, and the
            patterns that make you uniquely you are yours —{' '}
            <span className="text-[#7aa2f7]">
              not an asset to train big AI models.
            </span>
          </p>

          {/* Block 1 */}
          <div className="border-l-2 border-[#7aa2f7]/40 pl-7 space-y-5">
            <p className="font-mono text-[17px] text-[#797ea6] leading-[1.85]">
              Every time you use an AI tool, you are generating an
              extraordinarily valuable signal. Whether you are writing a prompt,
              refining an output, solving a problem, or building a workflow, you
              are teaching the model what good looks like, what real-world
              problems sound like, and how intelligent people think through
              complex decisions. That behavioral data, at scale, is what makes
              frontier models smarter with every generation.
            </p>
            <p className="font-mono text-[17px] text-[#797ea6] leading-[1.85]">
              But here's the paradox: the person doing the teaching gets nothing
              back. You don't own the interaction, you don't receive a share of
              the model's improved value, and you have no say in how your inputs
              are stored, used, or monetized. Meanwhile, the platform capturing
              your prompts is building a more valuable product on the back of
              your expertise, and then charging you a higher subscription to
              access it. It's the ultimate asymmetry:{' '}
              <em className="text-[#cbd1e6]">you bring the intelligence, they keep the asset.</em>
            </p>
          </div>

          {/* Block 2 */}
          <div className="border-l-2 border-[#797ea6]/30 pl-7">
            <p className="font-mono text-[17px] text-[#797ea6] leading-[1.85]">
              The world has never had a model of intelligence that is truly
              yours. Every tool ever built for thinking — notebooks, databases,
              knowledge management systems, even the best AI assistants today —
              operates on the same fundamental assumption: you input, it stores,
              you retrieve. It is passive. It does not learn you. It does not
              internalize how you think, how you connect ideas, how you make
              decisions, or what patterns run through five years of your best
              work. Today's LLMs came closest to changing that, but took a wrong
              turn. Instead of the model coming to you and learning from you
              privately, you were asked to go to the model, re-explain yourself
              every session, and unknowingly donate your thinking patterns to a
              centralized system that uses them to serve everyone else. The
              result is an AI that gets smarter about humanity in general while
              remaining permanently ignorant about you specifically.
            </p>
          </div>

          {/* Pull quote */}
          <div className="py-8 text-center border-t border-b border-[#797ea6]/20">
            <p
              className="text-[56px] leading-none text-[#7aa2f7]/20 mb-2 select-none"
              aria-hidden
              style={{ fontFamily: 'Georgia, serif' }}
            >
              "
            </p>
            <p className="font-display font-bold text-[22px] sm:text-[26px] text-[#cbd1e6] leading-[1.5] tracking-tight">
              A continuously self-learning personal intelligence layer that
              internalizes your unique thought process, automates your workflows
              in your voice, and keeps you in control —{' '}
              <span className="text-[#7aa2f7]">
                without ever exposing your data to the outside world.
              </span>
            </p>
          </div>

          {/* Block 3 */}
          <div className="border-l-2 border-[#797ea6]/30 pl-7">
            <p className="font-mono text-[17px] text-[#797ea6] leading-[1.85]">
              The entire architecture of current AI — how it stores, learns,
              prices, and improves — was engineered to maximise platform data
              accumulation, user dependency, and revenue extraction. The entire
              architecture of the Personal Intelligence Layer is engineered
              around a single inverse principle:{' '}
              <span className="text-[#cbd1e6] font-bold">
                every design decision compounds your sovereignty, not their
                valuation.
              </span>
            </p>
          </div>

          {/* Closing quote */}
          <div className="pt-10 border-t border-[#797ea6]/20 text-center space-y-5">
            <p
              className="text-[56px] leading-none text-[#7aa2f7]/20 select-none"
              aria-hidden
              style={{ fontFamily: 'Georgia, serif' }}
            >
              "
            </p>
            <p className="font-display font-bold text-[26px] sm:text-[32px] tracking-tight leading-[1.25] text-[#cbd1e6]">
              The people generating the most valuable data have the least
              control, ownership, and benefit from it.
            </p>
            <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-[#7aa2f7] font-bold">
              Tsuin.ai
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
