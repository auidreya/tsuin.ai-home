import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

/*
  Supabase schema — run in SQL editor:

  create table if not exists cookie_consent (
    id uuid primary key default gen_random_uuid(),
    session_id text not null,
    essential boolean not null default true,
    analytics boolean not null default false,
    marketing boolean not null default false,
    user_agent text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

  create unique index if not exists cookie_consent_session_id_idx
    on cookie_consent(session_id);

  alter table cookie_consent enable row level security;

  create policy "service role insert" on cookie_consent
    for insert to service_role with check (true);

  create policy "service role upsert" on cookie_consent
    for update to service_role using (true);
*/

const schema = z.object({
  session_id: z.string().min(1).max(128),
  analytics: z.boolean(),
  marketing: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id, analytics, marketing } = schema.parse(body)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const user_agent = request.headers.get('user-agent') ?? null

    const { error } = await supabase
      .from('cookie_consent')
      .upsert(
        {
          session_id,
          essential: true,
          analytics,
          marketing,
          user_agent,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'session_id' },
      )

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 })
    }
    console.error('[cookie-consent] POST error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
