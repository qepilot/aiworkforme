import { createBrowserClient } from '@supabase/ssr'

// Browser-side Supabase client. The anon key is safe to expose client-side —
// Supabase's security model is enforced by Row Level Security policies on
// the database, not by keeping this key secret.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
