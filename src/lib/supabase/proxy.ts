import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard']
const AUTH_ROUTES = ['/sign-in', '/sign-up']

// Refreshes the Supabase session on every navigation and redirects
// unauthenticated visitors away from protected routes. Runs once per
// navigation (see src/proxy.ts matcher) so downstream Server Components see
// an up-to-date session without each needing to trigger their own refresh.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: getClaims() must be called to refresh the session before any
  // response is generated — see @supabase/ssr's setAll docs.
  const { data } = await supabase.auth.getClaims()
  const isAuthed = !!data?.claims
  const path = request.nextUrl.pathname

  const isProtected = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
  if (isProtected && !isAuthed) {
    const redirectUrl = new URL('/sign-in', request.url)
    redirectUrl.searchParams.set('next', path)
    return NextResponse.redirect(redirectUrl)
  }

  if (AUTH_ROUTES.includes(path) && isAuthed) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}
