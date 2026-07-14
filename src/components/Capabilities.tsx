'use client'

import { motion } from 'framer-motion'

const capabilities = [
  {
    title: 'Connect Your Tools',
    description:
      'Link Jira, Notion, Slack, WhatsApp, and GitHub with your own API keys or tokens — no shared accounts, nothing leaves your workspace.',
  },
  {
    title: 'Bring Your Own Model',
    description:
      'Plug in OpenAI, Anthropic, or any provider you already pay for. Your keys, your usage, your bill — we never proxy or mark up model calls.',
  },
  {
    title: 'Build Your Own RAG',
    description:
      'Point it at a GitHub repo, upload PDFs, screenshots, and wiki docs, and it indexes everything into a private knowledge base scoped to your account.',
  },
  {
    title: 'Deep-Read Summaries',
    description:
      'It pulls your connected Notion or Jira board, reads every linked doc, and hands you a grounded summary instead of a wall of tickets.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-24 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            What your account gets you
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Four things that make <span className="text-gradient">AI Work For Me</span> yours
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-border bg-surface p-7 shadow-sm"
            >
              <h3 className="font-display text-lg font-medium text-ink">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
