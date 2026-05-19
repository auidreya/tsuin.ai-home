'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { PortalMascot } from '@/components/not-found/PortalMascot'
import { RotatingSubhead } from '@/components/not-found/RotatingSubhead'

export default function NotFound() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return
      if (e.key === '1') window.location.href = '/'
      if (e.key === '3') window.location.href = '/waitlist'
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col bg-[#1a1b26] text-[#cbd1e6] font-mono"
      style={{
        background:
          'radial-gradient(900px 500px at 80% -100px, rgba(122,162,247,0.10), transparent 60%), radial-gradient(700px 500px at 0% 110%, rgba(255,112,80,0.08), transparent 60%), #1a1b26',
      }}
    >
      {/* NAV */}
      <nav className="h-[62px] px-[24px] w-full flex items-center justify-between flex-shrink-0 max-w-[475px] mx-auto">
        <Link href="/" aria-label="tsuin.ai home">
          <Image
            src="/assets/tsuin.ai-logo copy.ai/tsuin-white-horizontal-full.png"
            alt="tsuin.ai"
            width={128}
            height={36}
            className="h-[24px] w-auto"
          />
        </Link>
        <span className="flex items-center gap-[8px] font-mono text-[10px] uppercase tracking-[0.14em] text-[#ff7050] border border-[#ff7050]/40 px-3 py-1">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#ff7050] animate-pulse-dot" />
          SIGNAL LOST
        </span>
      </nav>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center px-[24px] pb-10 pt-4 text-center">
        <PortalMascot />

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ff7050] mb-4">
          // ERROR · PAST URL NOT FOUND
        </p>

        <h1
          className="font-mono font-bold text-[#cbd1e6] mb-4 mx-auto max-w-[560px] leading-[1.3]"
          style={{ fontSize: 'clamp(20px,3.2vw,30px)' }}
        >
          Remember to train your AI Twin.
        </h1>

        <RotatingSubhead />

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-[22px] py-3
                       font-mono font-bold text-[13px] tracking-[0.06em]
                       bg-[#7aa2f7] text-[#1a1b26]
                       hover:bg-[#cbd1e6] transition-colors"
          >
            ← TAKE ME HOME
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-[22px] py-3
                       font-mono font-bold text-[13px] tracking-[0.06em]
                       bg-transparent text-[#cbd1e6] border border-[#797ea6]/40
                       hover:border-[#7aa2f7] hover:text-[#7aa2f7] transition-colors"
          >
            JOIN BETA WAITLIST
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-[24px] py-4 w-full max-w-[475px] mx-auto flex items-center justify-between flex-shrink-0 border-t border-[#797ea6]/20">
        <span className="font-mono text-[11px] text-[#797ea6]">
          © 2026 TSUIN.AI · Cognitive AI Twin is around the corner
        </span>
        <Link href="/" className="font-mono text-[11px] text-[#797ea6] hover:text-[#7aa2f7] transition-colors">
          HOME
        </Link>
      </footer>
    </div>
  )
}
