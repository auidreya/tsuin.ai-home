'use client'

import { useEffect, useState } from 'react'

const LINES = [
  <>Shibasuke says this page got <span className="text-[#ff7050] font-bold">fragmented memory</span>. Classic pre-AGI behavior, honestly.</>,
  <>We rotated the URL during a perf fix and forgot to log <span className="text-[#cbd1e6] font-bold">why</span>. A Twin would have <span className="text-[#ff7050] font-bold">remembered</span>.</>,
  <><span className="text-[#cbd1e6] font-bold">404</span> · the page existed once, in a Slack thread no one can find. <span className="text-[#ff7050] font-bold">Including us.</span></>,
  <>AGI ships features in hours. <span className="text-[#cbd1e6] font-bold">URLs disappear</span> in <span className="text-[#ff7050] font-bold">minutes</span>.</>,
  <>The dog is fine. <span className="text-[#cbd1e6] font-bold">The route is not.</span> Try one of these instead.</>,
]

export function RotatingSubhead() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % LINES.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative h-12 w-full max-w-[560px] mx-auto mb-10 overflow-hidden flex items-center justify-center">
      {LINES.map((line, idx) => (
        <p
          key={idx}
          className={`absolute inset-x-0 font-mono font-medium text-[14px] leading-[1.55] text-[#797ea6] text-center
                      transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
                      ${i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          {line}
        </p>
      ))}
    </div>
  )
}
