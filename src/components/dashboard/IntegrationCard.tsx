'use client'

import { useState, useTransition } from 'react'
import type { IntegrationProvider } from '@/lib/integrations'
import { connectIntegration, disconnectIntegration } from '@/app/dashboard/integrations/actions'

export default function IntegrationCard({
  provider,
  connected,
  preview = false,
}: {
  provider: IntegrationProvider
  connected: boolean
  preview?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleConnect(formData: FormData) {
    if (preview) {
      setError('Preview mode — connect a real Supabase project to save credentials.')
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        await connectIntegration(formData)
        setOpen(false)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  function handleDisconnect(formData: FormData) {
    if (preview) {
      setError('Preview mode — connect a real Supabase project to manage integrations.')
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        await disconnectIntegration(formData)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-medium text-ink">{provider.label}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{provider.description}</p>
        </div>
        {connected ? (
          <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-2">
            Connected
          </span>
        ) : null}
      </div>

      {open ? (
        <form action={handleConnect} className="mt-5 space-y-3">
          <input type="hidden" name="provider" value={provider.id} />
          {provider.fields.map((field) => (
            <div key={field.key}>
              <label className="mb-1 block text-xs font-medium text-muted" htmlFor={`${provider.id}-${field.key}`}>
                {field.label}
              </label>
              <input
                id={`${provider.id}-${field.key}`}
                name={field.key}
                type={field.secret ? 'password' : 'text'}
                placeholder={field.placeholder}
                autoComplete="off"
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isPending ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-border px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-bg-soft"
          >
            {connected ? 'Update credentials' : 'Connect'}
          </button>
          {connected ? (
            <form action={handleDisconnect}>
              <input type="hidden" name="provider" value={provider.id} />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-ink disabled:opacity-50"
              >
                Disconnect
              </button>
            </form>
          ) : null}
        </div>
      )}

      {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
    </div>
  )
}
