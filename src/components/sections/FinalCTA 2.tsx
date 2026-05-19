'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/components/animations/variants'
import { WaitlistForm } from '@/components/forms/WaitlistForm'

const HEADLINE_LINES = ['CLAIM YOUR', 'COGNITIVE', 'AI TWIN']

export function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="border-t border-ink-faint/30 px-6 py-20 bg-[#0c0c0c]"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal leading-relaxed mb-6"
        >
          YOU WILL NEED THIS.
          <br />
          NOT EVENTUALLY. NOW.
        </motion.p>

        {/* Headline */}
        <div className="mb-6">
          {HEADLINE_LINES.map((line, i) => (
            <motion.h2
              key={line}
              variants={fadeUp}
              custom={i * 0.08}
              className="font-display font-black text-white uppercase leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(40px, 11vw, 56px)' }}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="font-mono font-light text-[14px] leading-[1.8] text-ink-muted mb-11"
        >
          The era of cognitive overload is already here.
          <br />
          The developers who survive it won&apos;t be the ones who work harder —
          <br />
          they&apos;ll be the ones who have a Twin.
        </motion.p>

        {/* Waitlist form */}
        <motion.div variants={fadeUp} custom={0.4}>
          <WaitlistForm />
        </motion.div>

        {/* Note */}
        <motion.p
          variants={fadeUp}
          custom={0.5}
          className="mt-5 text-center font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase"
        >
          CLOSED BETA &nbsp;·&nbsp; LIMITED ACCESS
        </motion.p>
      </motion.div>
    </section>
  )
}
