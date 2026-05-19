'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import type { FormState } from '@/types'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

type FormData = z.infer<typeof schema>
type AuthMode = 'login' | 'register'

export function AuthModal() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>('login')
  const [formState, setFormState] = useState<FormState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const supabase = createClient()

  const onSubmit = async (data: FormData) => {
    setFormState('loading')

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        })
        if (error) throw error
        toast.success('Account created!', { description: 'Check your email to confirm.' })
        setOpen(false)
        reset()
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })
        if (error) throw error
        toast.success('Welcome back.')
        setOpen(false)
        reset()
        window.location.href = '/dashboard'
      }

      setFormState('success')
    } catch (err: unknown) {
      setFormState('error')
      const message = err instanceof Error ? err.message : 'Authentication failed.'
      toast.error(message)
      setTimeout(() => setFormState('idle'), 2000)
    }
  }

  const toggleMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    reset()
    setFormState('idle')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="font-mono text-xs tracking-widest uppercase text-teal hover:text-teal-dark transition-colors">
          Sign In
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Welcome back.' : 'Create account.'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Sign in to access your Cognitive AI Twin.'
              : 'Join the closed beta. Build your Twin.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              error={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="font-mono text-[10px] tracking-widest text-red-400 uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              error={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="font-mono text-[10px] tracking-widest text-red-400 uppercase">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="full"
            loading={formState === 'loading'}
            className="mt-2"
          >
            {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="font-mono text-[10px] tracking-widest text-ink-muted uppercase hover:text-teal transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Register" : 'Already registered? Sign in'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
