'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, imageFrame } from '@/components/animations/variants'
import type { EraData } from '@/types'

interface EraSectionProps {
  data: EraData
}

export function EraSection({ data }: EraSectionProps) {
  return (
    <section className="bg-[#1a1b26] px-[10px] py-[10px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-[38px]"
      >
        <div className="flex flex-col items-start">
          {data.eyebrow && (
            <div className="flex items-center justify-center p-[10px]">
              <motion.p
                variants={fadeUp}
                custom={0}
                className="font-mono font-normal text-[12px] text-[#cbd1e6] whitespace-nowrap"
              >
                {data.eyebrow}
              </motion.p>
            </div>
          )}

          <div className="flex items-center justify-center p-[10px]">
            <motion.p
              variants={fadeUp}
              custom={0.05}
              className="font-display font-bold text-[28px] text-[#7aa2f7] leading-normal whitespace-nowrap"
            >
              {data.title}
            </motion.p>
          </div>

          <div className="flex items-center justify-center p-[10px] w-full">
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className="font-mono font-bold text-[18px] text-[#797ea6] leading-normal w-full"
            >
              {data.paragraphs.map((para, i) =>
                para === ''
                  ? <div key={i} className="h-[8px]" />
                  : <p key={i}>{para}</p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center p-[10px]">
          <motion.div variants={imageFrame}>
            <img
              src={data.shapes}
              alt=""
              className="block"
              style={{ width: 311, height: 378, objectFit: 'contain' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
