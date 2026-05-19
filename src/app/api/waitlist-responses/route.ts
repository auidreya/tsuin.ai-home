import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

/*
  Supabase schema — run in SQL editor:

  create table if not exists waitlist_responses (
    id            uuid primary key default gen_random_uuid(),
    first_name    text,
    last_name     text,
    email         text not null,
    role          text,
    years         text,
    codebase      text,
    blockers      text,
    context_loss  text,
    tools         text[],
    tool_gaps     text,
    use_case      text,
    feedback      text,
    interview     text,
    addr_name     text,
    addr_street   text,
    addr_city     text,
    addr_region   text,
    addr_postal   text,
    addr_country  text,
    addr_size     text,
    created_at    timestamptz not null default now()
  );

  alter table waitlist_responses enable row level security;

  create policy "service role insert" on waitlist_responses
    for insert to service_role with check (true);
*/

const addressSchema = z.object({
  name:    z.string().optional(),
  street:  z.string().optional(),
  city:    z.string().optional(),
  region:  z.string().optional(),
  postal:  z.string().optional(),
  country: z.string().optional(),
  size:    z.string().nullable().optional(),
}).optional()

const schema = z.object({
  first_name:   z.string().min(1),
  last_name:    z.string().min(1),
  email:        z.string().email(),
  role:         z.string().optional(),
  years:        z.string().optional(),
  codebase:     z.string().optional(),
  blockers:     z.string().optional(),
  context_loss: z.string().optional(),
  tools:        z.array(z.string()).optional(),
  tool_gaps:    z.string().optional(),
  use_case:     z.string().optional(),
  feedback:     z.string().optional(),
  interview:    z.string().optional(),
  address:      addressSchema,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
    const addr = data.address ?? {}

    const { error } = await supabase.from('waitlist_responses').insert({
      first_name:   data.first_name,
      last_name:    data.last_name,
      email:        data.email,
      role:         data.role,
      years:        data.years,
      codebase:     data.codebase,
      blockers:     data.blockers,
      context_loss: data.context_loss,
      tools:        data.tools ?? [],
      tool_gaps:    data.tool_gaps,
      use_case:     data.use_case,
      feedback:     data.feedback,
      interview:    data.interview,
      addr_name:    addr.name,
      addr_street:  addr.street,
      addr_city:    addr.city,
      addr_region:  addr.region,
      addr_postal:  addr.postal,
      addr_country: addr.country,
      addr_size:    addr.size ?? null,
    })

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid submission.', errors: err.errors }, { status: 400 })
    }
    console.error('[waitlist-responses] POST error:', err)
    return NextResponse.json({ message: 'Server error. Please try again.' }, { status: 500 })
  }
}
