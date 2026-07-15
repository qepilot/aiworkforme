'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    trackEvent('sign_in_attempt')
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      trackEvent('login', { method: 'password' })
      router.push(next)
      router.refresh()
    } catch (err) {
      trackEvent('sign_in_error')
      setError(err instanceof Error ? err.message : 'Could not sign in.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Work email">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jamie@company.com"
          className={inputClass}
        />
      </Field>
      <Field label="Password">
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          className={inputClass}
        />
      </Field>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center text-xs text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-medium text-accent-2 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <section className="mesh-gradient px-6 pt-32 pb-20">
        <div className="mx-auto max-w-md text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            ← Back to AI Work For Me
          </Link>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-4 text-white/85">Sign in to your dashboard.</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto -mt-12 max-w-md rounded-3xl border border-border bg-surface p-8 shadow-[0_30px_80px_rgba(28,23,48,0.12)]"
        >
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </motion.div>
      </section>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-border bg-bg-soft px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}
