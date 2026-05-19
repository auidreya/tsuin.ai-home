import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

/*
  Supabase schema — run in SQL editor:

  create table if not exists waitlist (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    source text not null default 'landing',
    created_at timestamptz not null default now()
  );

  alter table waitlist enable row level security;

  -- Allow service role to insert (used by this API route)
  create policy "service role insert" on waitlist
    for insert to service_role with check (true);
*/

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('landing'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = schema.parse(body)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { error } = await supabase
      .from('waitlist')
      .insert({ email, source })

    if (error) {
      if (error.code === '23505') {
        // Unique violation — already on the list
        return NextResponse.json(
          { message: 'This email is already on the waitlist.' },
          { status: 409 },
        )
      }
      throw error
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid email address.' },
        { status: 400 },
      )
    }

    console.error('[waitlist] POST error:', err)
    return NextResponse.json(
      { message: 'Server error. Please try again.' },
      { status: 500 },
    )
  }
}
