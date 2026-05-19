import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    })
  } catch (err) {
    console.error('[user] GET error:', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
