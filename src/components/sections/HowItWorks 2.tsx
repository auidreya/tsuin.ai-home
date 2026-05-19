'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/components/animations/variants'

const STEPS = [
  {
    num: '01',
    title: 'Tell Your AI Twin',
    lines: [
      "Talk to your AI Twin like you'd talk to a teammate.",
      'Your context, your thinking, your decisions.',
    ],
  },
  {
    num: '02',
    title: 'Your Twin Learns',
    lines: [
      'Your AI Twin builds a model of how you think,',
      'not just what you know.',
    ],
  },
  {
    num: '03',
    title: 'Your Twin Has Your Back',
    lines: [
      "When you're stuck, overwhelmed, or facing something too big",
      'to hold in your head alone — your Twin is already there.',
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="bg-[#1a1b26] px-[10px] py-[10px]">
      <div className="flex items-center justify-center p-[10px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="w-[332px] flex flex-col gap-[38px]"
        >
          {/* Section heading */}
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-display font-bold text-[28px] text-[#7aa2f7] leading-normal"
          >
            How It Works
          </motion.p>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              custom={i * 0.1}
              className="flex flex-col gap-[4px]"
            >
              <p className="font-mono font-bold text-[18px] text-[#cbd1e6] leading-normal">
                {step.num}
              </p>
              <p className="font-mono font-bold text-[18px] text-[#7aa2f7] leading-normal">
                {step.title}
              </p>
              {step.lines.map((line, j) => (
                <p key={j} className="font-mono font-bold text-[18px] text-[#797ea6] leading-normal">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Single centered blob separator */}
      <div className="flex justify-center py-[40px]">
        <img src="/assets/blob-separator.png" alt="" className="w-auto" />
      </div>
    </section>
  )
}
