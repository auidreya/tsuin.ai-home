'use client'

import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-[62px] flex items-center justify-between bg-transparent px-[16px] max-w-[475px]"
    >
      {/* Logo */}
      <div className="flex flex-col justify-center pl-[10px] py-[5px] w-[148px]">
        <img
          src="/assets/tsuin.ai-logo copy.ai/tsuin-white-horizontal-full.png"
          alt="Tsuin.AI"
          className="w-full h-auto object-contain object-left"
        />
      </div>

      {/* Status indicator — right-aligned, no hamburger */}
      <div className="flex items-center gap-[8px]">
        <span className="block h-[5px] w-[5px] rounded-full bg-green-400 animate-pulse-dot flex-shrink-0" />
        <div className="font-mono font-medium text-[10px] leading-normal text-[#cbd1e6]">
          <p>INITIALIZING</p>
          <p>CLOSED BETA ACCESS</p>
        </div>
      </div>
    </motion.nav>
  )
}
