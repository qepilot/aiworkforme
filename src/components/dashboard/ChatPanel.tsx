'use client'

import { useState, useTransition } from 'react'
import { sendChatMessage, clearChatHistory } from '@/app/dashboard/chat/actions'

export type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string }

export default function ChatPanel({
  messages,
  hasModelProvider,
  preview = false,
}: {
  messages: ChatMessage[]
  hasModelProvider: boolean
  preview?: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function submit(formData: FormData, form: HTMLFormElement) {
    if (preview) {
      setError('Preview mode — connect a real Supabase project and a model key to chat.')
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        await sendChatMessage(formData)
        form.reset()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  function clear() {
    if (preview) return
    startTransition(async () => {
      try {
        await clearChatHistory()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {!hasModelProvider && !preview ? (
        <p className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Connect an OpenAI or Anthropic key in{' '}
          <a href="/dashboard/integrations" className="underline">
            Integrations
          </a>{' '}
          before chatting.
        </p>
      ) : null}

      <div className="min-h-[16rem] rounded-3xl border border-border bg-surface p-6 shadow-sm">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">No messages yet — ask something below.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === 'user' ? 'bg-ink text-white' : 'bg-bg-soft text-text'
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          submit(new FormData(e.currentTarget), e.currentTarget)
        }}
      >
        <textarea
          name="content"
          rows={2}
          placeholder="Ask about your connected tools and docs…"
          className="flex-1 resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={isPending || (!hasModelProvider && !preview)}
          className="shrink-0 self-end rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isPending ? 'Thinking…' : 'Send'}
        </button>
      </form>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}

      {messages.length > 0 ? (
        <button
          onClick={clear}
          disabled={isPending}
          className="self-start text-xs font-medium text-muted transition-colors hover:text-ink disabled:opacity-50"
        >
          Clear history
        </button>
      ) : null}
    </div>
  )
}
