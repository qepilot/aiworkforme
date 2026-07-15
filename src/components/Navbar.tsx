import Link from 'next/link'
import Logo from './Logo'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from './SignOutButton'

const links = [
  { label: 'How it works', href: '/#workflow' },
  { label: 'Integrations', href: '/#capabilities' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const isAuthed = !!data?.claims

  return (
    <header className="fixed top-4 inset-x-4 z-50">
      <nav className="mx-auto max-w-5xl flex items-center justify-between rounded-full border border-white/40 bg-white/70 backdrop-blur-md px-3 py-2 pl-3 shadow-[0_8px_30px_rgba(28,23,48,0.08)]">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="font-display text-xl font-semibold tracking-tighter text-ink">
            AI Work <span className="text-accent">For Me</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-text">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-analytics-event="nav_link_click"
                data-analytics-label={link.label}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <>
              <Link
                href="/dashboard"
                data-analytics-event="nav_dashboard_click"
                className="hidden sm:inline-block rounded-full px-4 py-2.5 text-sm font-medium text-text transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                data-analytics-event="nav_sign_in_click"
                className="hidden sm:inline-block rounded-full px-4 py-2.5 text-sm font-medium text-text transition-colors hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                data-analytics-event="nav_sign_up_click"
                className="rounded-full bg-ink text-white text-sm font-medium px-5 py-2.5 transition-transform hover:scale-105 active:scale-95"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
