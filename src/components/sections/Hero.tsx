'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative w-full bg-[#1a1b26]" style={{ height: '100svh', maxHeight: 863 }}>
      <style>{`
        .hero-clip {
          clip-path: polygon(
            22px 0%,
            calc(100% - 22px) 0%,
            100% 22px,
            100% 100%,
            0% 100%,
            0% 22px
          );
        }
      `}</style>

      {/* 10px margin on all sides — background color visible around image */}
      <div className="absolute inset-[10px]">
        <div className="hero-clip relative w-full h-full overflow-hidden">
          {/* Background image */}
          <img
            src="/assets/homepage-header-image.png"
            alt="Cognitive AI Twin"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Gradient overlay for text legibility — dark at top where title sits */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b26]/80 via-[#1a1b26]/15 to-transparent" />

          {/* T-shaped corner decorations at inner image corners */}
          <img src="/assets/T shaped design.png" alt="" className="absolute pointer-events-none"
            style={{ width: 11.5, height: 11, right: 4, bottom: 4 }} />
          <img src="/assets/T shaped design.png" alt="" className="absolute pointer-events-none"
            style={{ width: 11.5, height: 11, left: 4, bottom: 4, transform: 'rotate(180deg)' }} />
          <img src="/assets/T shaped design.png" alt="" className="absolute pointer-events-none"
            style={{ width: 11.5, height: 11, right: 4, top: 4, transform: 'scaleY(-1)' }} />

          {/* Hero title block — positioned at top, safely below fixed navbar (62px) */}
          <motion.div
            className="absolute left-[15px] right-[15px]"
            style={{ top: 72 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-mono font-bold text-[#cbd1e6] leading-none tracking-tight uppercase"
              style={{ fontSize: 'clamp(38px, 11vw, 48px)' }}
            >
              COGNITIVE
            </p>
            <p
              className="font-mono font-bold text-[#cbd1e6] leading-none tracking-tight uppercase text-right"
              style={{ fontSize: 'clamp(38px, 11vw, 48px)' }}
            >
              AI TWIN
            </p>
            <p className="font-display text-[14px] text-[#cbd1e6] text-right mt-[4px] leading-normal">
              Clone the way you think.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
