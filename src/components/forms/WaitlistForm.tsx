'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { FormState } from '@/types'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

interface WaitlistFormProps {
  compact?: boolean
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-teal" aria-hidden="true">
      <motion.circle
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <motion.path
        d="M7.5 12l3 3 6-6"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  )
}

export function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [shake, setShake] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }, [])

  const onSubmit = async (data: FormData) => {
    setState('loading')
    try {
      const res = await fetch('/api/waitlist/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Something went wrong')
      }

      setState('success')

      // Confetti burst
      if (typeof window !== 'undefined') {
        const confetti = (await import('canvas-confetti')).default
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#4ecdc4', '#fff', '#d8d4cc', '#3ab5ac'],
          ticks: 200,
          scalar: 0.8,
        })
      }

      toast.success('You\'re on the list!', {
        description: 'We\'ll notify you when your Twin is ready.',
      })

      setTimeout(() => {
        reset()
        setState('idle')
      }, 4000)
    } catch (err) {
      setState('error')
      triggerShake()
      toast.error(err instanceof Error ? err.message : 'Failed to join. Try again.')
      setTimeout(() => setState('idle'), 2000)
    }
  }

  // Compact = hero CTA bar button
  if (compact) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <style>{`
          .slanted-waitlist-btn {
            clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
            background: linear-gradient(90deg, #123840 0%, #00ffff 100%);
            color: #0d0d0d;
            font-weight: 700;
            border: none;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
          }
          .slanted-waitlist-btn:hover:not(:disabled) {
            background: linear-gradient(90deg, #1a4f5a 0%, #33ffff 100%);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.45);
          }
          .slanted-waitlist-btn:active:not(:disabled) {
            transform: scale(0.98);
          }
          .slanted-waitlist-btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px #00ffff, 0 0 15px rgba(0, 255, 255, 0.6);
            filter: brightness(1.1);
          }
        `}</style>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="slanted-waitlist-btn w-full h-[52px] font-mono text-[12px] tracking-[0.15em] flex items-center justify-center select-none uppercase disabled:opacity-40 focus-visible:outline-none"
        >
          {state === 'loading' ? (
            <span className="flex items-center gap-2 text-black">
              <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
              Processing…
            </span>
          ) : state === 'success' ? (
            <span className="flex items-center gap-2 text-black font-bold">
              <SuccessIcon />
              YOU&apos;RE ON THE LIST
            </span>
          ) : (
            'JOIN BETA WAITLIST'
          )}
        </button>
      </form>
    )
  }

  // Full form — used in final CTA section
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 border border-teal/40 bg-teal/5 px-4 py-4"
          >
            <SuccessIcon />
            <div>
              <p className="font-mono text-sm text-teal tracking-wide">You&apos;re on the list.</p>
              <p className="font-mono text-xs text-ink-muted mt-0.5">We&apos;ll reach out when your Twin is ready.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex gap-0">
              <label htmlFor="email" className="sr-only">Email Address</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="EMAIL ADDRESS (e.g., name@domain.com)…"
                error={!!errors.email}
                shake={shake}
                {...register('email')}
                className="flex-1 placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase focus-visible:ring-1 focus-visible:ring-teal/60"
              />
              <Button
                type="submit"
                loading={state === 'loading'}
                className="flex-shrink-0 px-6 text-[11px] tracking-widest focus-visible:ring-1 focus-visible:ring-teal/60"
              >
                OK
              </Button>
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-mono text-[10px] tracking-widest text-red-400 uppercase"
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
