import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const setupSteps = [
  {
    title: 'Connect your tools',
    body: 'Link Jira, Notion, Slack, WhatsApp, or GitHub, and add the model keys you want to use.',
    href: '/dashboard/integrations',
    cta: 'Go to Integrations',
  },
  {
    title: 'Build your RAG',
    body: 'Connect a GitHub repo, upload PDFs and screenshots, or add wiki docs to index into your private knowledge base.',
    href: '/dashboard/sources',
    cta: 'Go to Data Sources',
  },
  {
    title: 'Ask your private AI',
    body: 'Once a Jira or Notion board is connected, chat with a grounded assistant about it here.',
    href: '/dashboard/chat',
    cta: 'Go to Chat',
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const email = data?.claims?.email as string | undefined

  return (
    <div>
      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
        Dashboard
      </span>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        Welcome{email ? `, ${email}` : ''}.
      </h1>
      <p className="mt-3 text-muted">Let&apos;s get AI Work For Me connected to your tools and data.</p>

      <div className="mt-10 space-y-4">
        {setupSteps.map((step, i) => (
          <div
            key={step.title}
            className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-border font-mono text-sm text-muted">
              {i + 1}
            </span>
            <div className="flex-1">
              <h2 className="font-display text-base font-medium text-ink">{step.title}</h2>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </div>
            {step.href ? (
              <Link
                href={step.href}
                className="shrink-0 self-center rounded-full border border-border px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-bg-soft"
              >
                {step.cta}
              </Link>
            ) : (
              <span className="shrink-0 self-center rounded-full border border-border px-4 py-2 text-xs font-medium text-muted">
                {step.cta}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
