'use client'

import { useState, useTransition } from 'react'
import { addRepoSource, addWikiSource, addFileSource } from '@/app/dashboard/sources/actions'

const tabs = [
  { id: 'repo', label: 'GitHub repo' },
  { id: 'file', label: 'Upload file' },
  { id: 'wiki', label: 'Wiki / doc link' },
] as const

type Tab = (typeof tabs)[number]['id']

export default function AddSourceForm({ preview = false }: { preview?: boolean }) {
  const [tab, setTab] = useState<Tab>('repo')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function submit(action: (formData: FormData) => Promise<void>, formData: FormData, form: HTMLFormElement) {
    if (preview) {
      setError('Preview mode — connect a real Supabase project to add data sources.')
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        await action(formData)
        form.reset()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              tab === t.id ? 'bg-ink text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'repo' ? (
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            submit(addRepoSource, new FormData(e.currentTarget), e.currentTarget)
          }}
        >
          <input
            name="source_url"
            placeholder="https://github.com/you/your-repo"
            className="flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isPending ? 'Adding…' : 'Add repo'}
          </button>
        </form>
      ) : null}

      {tab === 'file' ? (
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            submit(addFileSource, new FormData(e.currentTarget), e.currentTarget)
          }}
        >
          <input
            name="file"
            type="file"
            accept="application/pdf,image/*"
            className="flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink outline-none file:mr-3 file:rounded-full file:border-0 file:bg-border file:px-3 file:py-1.5 file:text-xs"
          />
          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isPending ? 'Uploading…' : 'Upload'}
          </button>
        </form>
      ) : null}

      {tab === 'wiki' ? (
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            submit(addWikiSource, new FormData(e.currentTarget), e.currentTarget)
          }}
        >
          <input
            name="source_url"
            placeholder="https://your-wiki.example.com/page"
            className="flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isPending ? 'Adding…' : 'Add link'}
          </button>
        </form>
      ) : null}

      {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
    </div>
  )
}
