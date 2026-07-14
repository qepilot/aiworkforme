'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Create your account',
    body: 'Sign up with your work email — free to start, no credit card required.',
  },
  {
    title: 'Connect your tools',
    body: 'Add Jira, Notion, Slack, WhatsApp, or GitHub with your own keys and tokens.',
  },
  {
    title: 'Feed your RAG',
    body: 'Link a repo, upload PDFs and screenshots, or paste wiki docs to build your private knowledge base.',
  },
  {
    title: 'Get grounded answers',
    body: 'Ask questions or let it pull your board — every answer is grounded in your own connected data.',
  },
]

export default function Workflow() {
  return (
    <section id="workflow" className="px-6 py-24 bg-bg">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            How it works
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Live on your data in a day.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-surface p-6 shadow-sm"
            >
              <span className="font-mono text-xs text-accent-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-2 text-base font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
