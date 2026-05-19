'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

const SAYINGS = [
  'woof?',
  'the URL ran that way →',
  'i ate the page. sorry.',
  'have you tried /?',
  'my twin would know',
  'this is fine 🔥',
  'ハッ ハッ',
  '404 in japanese is しし',
]

export function PortalMascot() {
  const [sayingIdx, setSayingIdx] = useState(0)
  const [wiggling, setWiggling] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = () => {
    setSayingIdx((i) => (i + 1) % SAYINGS.length)
    setWiggling(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setWiggling(false), 600)
  }

  return (
    <div className="relative flex items-center justify-center gap-[clamp(4px,2vw,20px)] mb-8 leading-none select-none">
      {/* Left 4 */}
      <span
        className="font-mono font-bold text-[#cbd1e6] leading-none"
        style={{ fontSize: 'clamp(100px,22vw,200px)', letterSpacing: '-0.04em' }}
      >
        4
      </span>

      {/* Portal + mascot (the 0) */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Mascot portal — click for a surprise"
        className={`relative flex items-center justify-center flex-shrink-0 cursor-pointer
                    transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                    hover:scale-[1.06] active:scale-[0.96] active:-rotate-2 group
                    ${wiggling ? 'animate-wiggle' : 'animate-bob'}`}
        style={{ width: 'clamp(140px,26vw,240px)', height: 'clamp(140px,26vw,240px)' }}
      >
        {/* Speech bubble */}
        <span
          className="absolute z-10 px-3 py-1.5 bg-[#cbd1e6] text-[#1a1b26]
                     font-mono font-bold text-[11px] whitespace-nowrap
                     rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px]
                     opacity-0 translate-y-2 scale-90 pointer-events-none
                     group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                     transition-all duration-200 ease-out"
          style={{ top: '-8px', right: '-30%' }}
        >
          {SAYINGS[sayingIdx]}
        </span>

        <Image
          src="/assets/mascot/zero-portal.png"
          alt="Shibasuke mascot inside a cyberpunk portal forming the zero of 404"
          width={480}
          height={480}
          priority
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 0 28px rgba(122,162,247,0.4)) drop-shadow(0 14px 32px rgba(0,0,0,0.5))',
          }}
        />
      </button>

      {/* Right 4 */}
      <span
        className="font-mono font-bold text-[#cbd1e6] leading-none"
        style={{ fontSize: 'clamp(100px,22vw,200px)', letterSpacing: '-0.04em' }}
      >
        4
      </span>
    </div>
  )
}
