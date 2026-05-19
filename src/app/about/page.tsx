'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn } from '@/components/animations/variants'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

// ─── Data ─────────────────────────────────────────────────────────────────────

const BELIEFS = [
  {
    num: '01',
    title: 'Memory is infrastructure.',
    desc: 'Not a feature. Not a sidebar. The thing you build the company around.',
  },
  {
    num: '02',
    title: 'A Twin is not an assistant.',
    desc: "It doesn't help you work. It holds the part of you that already did the work.",
  },
  {
    num: '03',
    title: 'Context belongs to the human.',
    desc: 'Your Twin trains on you. It speaks only for you. It leaves with you.',
  },
  {
    num: '04',
    title: 'We are building for the post-AGI human.',
    desc: 'When machines run the codebase, the person who knew why still matters most.',
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function BlobSeparator() {
  return (
    <div className="flex justify-center py-[40px]" aria-hidden>
      <img src="/assets/blob-separator.png" alt="" className="w-auto" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="bg-[#1a1b26] text-[#cbd1e6]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative px-[24px] pt-[130px] pb-[60px] overflow-hidden"
        style={{
          background:
            'radial-gradient(600px 320px at 70% 10%, rgba(255,112,80,0.10), transparent 60%), radial-gradient(600px 320px at 10% 90%, rgba(122,162,247,0.12), transparent 60%), #1a1b26',
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-[20px]"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-mono font-medium text-[12px] text-[#797ea6] tracking-[0.12em] uppercase"
          >
            // THE PEOPLE BEHIND TSUIN.AI
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={0.05}
            className="font-mono font-bold text-[32px] leading-[1.1] tracking-tight uppercase text-[#cbd1e6]"
          >
            WE ARE BUILDING PRE-AGI AI TWINS THAT CAPTURE THAT THOUGHT PROCESS.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="font-display font-normal text-[15px] text-[#797ea6] leading-relaxed"
          >
            Two people. One objective. To build an AI Twin that continuously learns from the human.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.15}
            className="flex gap-[24px] font-mono font-bold text-[12px] text-[#cbd1e6] tracking-[0.12em] uppercase mt-[14px]"
          >
            <span>FOUNDED 2024</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Opener ───────────────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="px-[24px] pt-[60px] pb-[30px]"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-mono font-bold text-[20px] leading-[1.35]"
        >
          <span className="text-[#797ea6]">We are not building </span>
          <span className="text-[#cbd1e6]">another AI assistant or agents</span>
          <span className="text-[#797ea6]">.</span>
          <br />
          <span className="text-[#797ea6]">We are building </span>
          <span className="text-[#7aa2f7]">the part of you</span>
          <span className="text-[#797ea6]"> that fades when the codebase grows past what one head can hold —</span>
          <br />
          <span className="text-[#797ea6]">and bringing it </span>
          <span className="text-[#ff7050]">back to you</span>
          <span className="text-[#797ea6]">.</span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="font-mono font-medium text-[14px] text-[#797ea6] leading-[1.6] mt-[28px]"
        >
          Tsuin (双) means twin in Japanese. A second brain that remembers what you decided, why
          you decided it, and what you'd say if the same question came again. Not your replacement.
          Your continuity.
        </motion.p>
      </motion.section>

      <BlobSeparator />

      {/* ── Founder 1 — Audrey ───────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="px-[24px] pb-[60px]"
      >
        {/* Rule + label */}
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-[12px] mb-[24px]">
          <span className="font-mono font-bold text-[12px] text-[#797ea6] tracking-[0.1em] uppercase">
            CEO
          </span>
          <span className="flex-1 h-px bg-[#797ea6]/25" />
        </motion.div>

        {/* Founder card */}
        <motion.div
          variants={fadeUp}
          custom={0.05}
          className="border border-[#797ea6]/25 p-[16px] mb-[28px]"
        >
          <p className="font-mono font-bold text-[18px] text-[#cbd1e6] uppercase tracking-wide">
            AUDREY AUI YONG
          </p>
          <p className="font-mono font-medium text-[13px] text-[#797ea6] mt-[4px]">
            Co-founder · CEO
          </p>
          <p className="font-mono font-medium text-[12px] text-[#797ea6] mt-[4px]">
            // previously: product manager
          </p>
        </motion.div>

        {/* Lede */}
        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="font-mono font-bold text-[20px] leading-[1.35] mb-[28px]"
        >
          <span className="text-[#797ea6]">She'd solved that bug before.</span>
          <br />
          She just{' '}
          <span className="text-[#ff7050]">couldn't remember</span> she'd solved it.
        </motion.p>

        {/* Pullquote */}
        <motion.blockquote
          variants={fadeUp}
          custom={0.15}
          className="border-t border-[#797ea6]/25 pt-[18px] font-mono font-bold text-[16px] text-[#cbd1e6] leading-[1.35]"
        >
          The best engineers who left the team. We lost the reasoning that got them there.
          <cite className="block mt-[12px] font-mono font-medium text-[11px] text-[#797ea6] not-italic tracking-[0.1em] uppercase">
            — AUDREY, ON WHY SHE NEVER GOT RAISED OR PROMOTION AS A PM. DEVELOPER LEFT, HER PROJECT
            WAS STALLED.
          </cite>
        </motion.blockquote>
      </motion.section>

      <BlobSeparator />

      {/* ── Founder 2 — David ────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="px-[24px] pb-[60px]"
      >
        {/* Rule + label */}
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-[12px] mb-[24px]">
          <span className="font-mono font-bold text-[12px] text-[#797ea6] tracking-[0.1em] uppercase">
            CAIO
          </span>
          <span className="flex-1 h-px bg-[#797ea6]/25" />
        </motion.div>

        {/* Founder card */}
        <motion.div
          variants={fadeUp}
          custom={0.05}
          className="border border-[#797ea6]/25 p-[16px] mb-[28px]"
        >
          <p className="font-mono font-bold text-[18px] text-[#cbd1e6] uppercase tracking-wide">
            DAVID FU
          </p>
          <p className="font-mono font-medium text-[13px] text-[#797ea6] mt-[4px]">
            Co-founder · Chief AI Officer
          </p>
          <p className="font-mono font-medium text-[12px] text-[#797ea6] mt-[4px]">
            // previously: software &amp; AI/ML engineer
          </p>
        </motion.div>

        {/* Lede */}
        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="font-mono font-bold text-[20px] leading-[1.35] mb-[28px]"
        >
          <span className="text-[#797ea6]">AI ships features in hours.</span>
          <br />
          Humans{' '}
          <span className="text-[#ff7050]">context-switch</span> in{' '}
          <span className="text-[#7aa2f7]">minutes</span>.
        </motion.p>

        {/* Pullquote */}
        <motion.blockquote
          variants={fadeUp}
          custom={0.15}
          className="border-t border-[#797ea6]/25 pt-[18px] font-mono font-bold text-[16px] text-[#cbd1e6] leading-[1.35]"
        >
          Memory is the last moat. Build it well, and you'll outlast every model that replaces you.
          <cite className="block mt-[12px] font-mono font-medium text-[11px] text-[#797ea6] not-italic tracking-[0.1em] uppercase">
            — David, internal memo · jan '26
          </cite>
        </motion.blockquote>
      </motion.section>

      <BlobSeparator />

      {/* ── Beliefs ──────────────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="px-[24px] pt-[40px] pb-[50px]"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="font-display font-bold text-[28px] text-[#7aa2f7] mb-[8px]"
        >
          What We Believe
        </motion.h2>

        <div className="flex flex-col">
          {BELIEFS.map((b, i) => (
            <motion.div
              key={b.num}
              variants={fadeUp}
              custom={i * 0.08}
              className="flex gap-[14px] py-[18px] border-t border-[#797ea6]/25 last:border-b"
            >
              <span className="font-mono font-bold text-[14px] text-[#797ea6] shrink-0 w-[28px]">
                {b.num}
              </span>
              <div>
                <p className="font-mono font-bold text-[16px] text-[#cbd1e6] leading-snug mb-[6px]">
                  {b.title}
                </p>
                <p className="font-mono font-medium text-[14px] text-[#797ea6] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="px-[24px] pt-[50px] pb-[60px]"
        style={{
          background:
            'radial-gradient(500px 300px at 80% 50%, rgba(122,162,247,0.08), transparent 60%), #1a1b26',
        }}
      >
        <motion.h3
          variants={fadeUp}
          custom={0}
          className="font-mono font-bold text-[24px] text-[#cbd1e6] leading-[1.25] mb-[12px]"
        >
          Build your <span className="text-[#7aa2f7]">Twin</span> with us.
        </motion.h3>
        <motion.p
          variants={fadeUp}
          custom={0.05}
          className="font-mono font-medium text-[14px] text-[#797ea6] mb-[28px]"
        >
          We're in closed beta. A small group. High signal.
        </motion.p>
        <motion.a
          variants={scaleIn}
          custom={0.1}
          href="/waitlist"
          className="inline-block font-mono font-bold text-[14px] text-[#1a1b26] bg-[#7aa2f7] px-[28px] py-[14px] tracking-widest uppercase hover:bg-[#cbd1e6] transition-colors"
        >
          JOIN THE WAITLIST →
        </motion.a>
      </motion.section>

      <Footer />
    </main>
  )
}
