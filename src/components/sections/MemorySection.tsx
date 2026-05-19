'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/components/animations/variants'

export function MemorySection() {
  return (
    <section className="bg-[#1a1b26] px-[10px] py-[10px]">
      <div className="flex justify-center py-[40px]">
        <img src="/assets/blob-separator.png" alt="" className="w-auto" />
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="font-mono font-bold text-[24px] leading-normal w-[332px]"
        >
          <span className="text-[#797ea6]">The problem is human have fragmented memory and their memory fades as time goes by, </span>
          <span className="text-[#cbd1e6]">your AI Twin will not forget </span>
          <span className="text-[#797ea6]">what the human told them, because the AI Twin objective is to </span>
          <span className="text-[#cbd1e6]">continuously learning</span>
          <span className="text-[#797ea6]"> from the human and will help the human whenever they need.</span>
        </motion.p>
      </div>
    </section>
  )
}
