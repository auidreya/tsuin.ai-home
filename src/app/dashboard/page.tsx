import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  return (
    <main className="min-h-svh bg-bg text-ink-primary px-6 py-16">
      <div className="max-w-lg mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-6">
          DASHBOARD · CLOSED BETA
        </p>

        <h1 className="font-display font-black text-4xl text-white leading-tight tracking-tight mb-2">
          Your Twin
          <br />
          is waiting.
        </h1>

        <p className="font-mono font-light text-sm text-ink-muted leading-relaxed mt-4 mb-10">
          Signed in as{' '}
          <span className="text-teal">{user.email}</span>
        </p>

        <div className="border border-ink-faint p-6 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            TWIN STATUS
          </p>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-mono text-sm text-ink-primary tracking-wide">
              Initializing — Beta access pending
            </span>
          </div>
          <p className="font-mono font-light text-xs text-ink-muted leading-relaxed">
            Your Cognitive AI Twin is being prepared.
            We&apos;ll notify you at <span className="text-ink-primary">{user.email}</span> when access is granted.
          </p>
        </div>

        <form action="/api/auth/signout" method="POST" className="mt-8">
          <button
            type="submit"
            className="font-mono text-[10px] uppercase tracking-widest text-ink-muted hover:text-red-400 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  )
}
