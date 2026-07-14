'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      })
      if (signUpError) throw signUpError
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create your account.')
    } finally {
      setSubmitting(false)
    }
  }

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
            Create your account
          </h1>
          <p className="mt-4 text-white/85">
            Free to start — connect your tools and models once you&apos;re in.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto -mt-12 max-w-md rounded-3xl border border-border bg-surface p-8 shadow-[0_30px_80px_rgba(28,23,48,0.12)]"
        >
          {submitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent-2">
                ✓
              </div>
              <h2 className="font-display mt-5 text-xl font-semibold text-ink">
                Check your inbox
              </h2>
              <p className="mt-3 text-sm text-muted">
                We sent a confirmation link to <strong>{email}</strong>. Click
                it to activate your account.
              </p>
            </div>
          ) : (
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
                  placeholder="At least 8 characters"
                  className={inputClass}
                />
              </Field>
              <Field label="Confirm password">
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className={inputClass}
                />
              </Field>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? 'Creating account…' : 'Create account'}
              </button>

              <p className="text-center text-xs text-muted">
                Already have an account?{' '}
                <Link href="/sign-in" className="font-medium text-accent-2 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}
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
