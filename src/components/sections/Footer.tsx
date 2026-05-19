'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/components/animations/variants'
import { toast } from 'sonner'

const SOCIALS = [
  { label: 'TWITTER / X', href: 'https://x.com/tsuinAI' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/company/tsuin-ai/' },
  { label: 'DISCORD', href: 'https://discord.gg/5DyMNFum44' },
]

const NAV_LEFT = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'MANIFESTO', href: '/manifesto' },
]

const NAV_RIGHT = [
  { label: 'BLOG', href: '/blog' },
  { label: 'RESEARCH', href: 'https://www.linkedin.com/company/tsuin-research', external: true },
  { label: 'LEGALS', href: '/legals' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Something went wrong')
      }
      toast.success('You\'re on the list!')
      setEmail('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to join.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-[#1a1b26] px-[24px] pt-[40px] pb-[48px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex flex-col"
      >
        {/* Large intro quote */}
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-display font-bold text-[26px] leading-[1.25] text-[#cbd1e6] mb-[40px]"
        >
          The best developer is not the one who codes the fastest, but the one who{' '}
          <span className="text-[#7aa2f7]">thinks</span> the deepest.
        </motion.p>

        {/* Social links with arrows */}
        <motion.div variants={fadeUp} custom={0.05} className="flex flex-col gap-[16px] mb-[40px]">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-bold text-[18px] text-[#797ea6] hover:text-[#cbd1e6] transition-colors"
            >
              {s.label} →
            </a>
          ))}
        </motion.div>

        {/* Nav links — two open columns */}
        <motion.div variants={fadeUp} custom={0.1} className="flex justify-between mb-[40px]">
          <div className="flex flex-col gap-[20px]">
            {NAV_LEFT.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="font-mono font-bold text-[18px] text-[#797ea6] hover:text-[#cbd1e6] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-[20px] items-end">
            {NAV_RIGHT.map((n) => (
              <a
                key={n.label}
                href={n.href}
                {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-mono font-bold text-[18px] text-[#797ea6] hover:text-[#cbd1e6] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Beta CTA — sentence case */}
        <motion.p
          variants={fadeUp}
          custom={0.15}
          className="font-display font-bold text-[18px] text-[#cbd1e6] leading-snug mb-[16px]"
        >
          Join the beta and be the first to build your cognitive AI Twin.
        </motion.p>

        {/* Email form */}
        <motion.div variants={fadeUp} custom={0.2} className="mb-[16px]">
          <form
            id="footer-email-form"
            onSubmit={handleSubmit}
            className="flex items-center border border-[#797ea6]/50 w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              required
              className="flex-1 bg-transparent px-[16px] py-[14px] font-mono font-bold text-[13px] text-[#cbd1e6] placeholder:text-[#797ea6]/70 outline-none tracking-widest uppercase"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-[16px] py-[14px] font-mono font-bold text-[13px] text-[#7aa2f7] tracking-widest whitespace-nowrap hover:text-[#cbd1e6] transition-colors disabled:opacity-50"
            >
              {loading ? 'WAIT...' : 'SUBMIT →'}
            </button>
          </form>
        </motion.div>

        {/* Fine print */}
        <motion.div variants={fadeUp} custom={0.25} className="flex flex-col gap-[8px]">
          <p className="font-mono text-[12px] text-[#797ea6] leading-relaxed">
            By joining, you understand and agree to our{' '}
            <a href="/privacy" className="text-[#cbd1e6] underline hover:text-[#7aa2f7] transition-colors">
              Privacy Policy
            </a>
            .
          </p>
          <p className="font-mono text-[12px] text-[#797ea6]">© 2026 TSUIN.AI</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
