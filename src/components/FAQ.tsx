'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Is it really free to create an account?',
    a: 'Yes — signing up is free. You bring your own model API keys, so you only ever pay your model provider directly for what you use.',
  },
  {
    q: 'What happens to my data?',
    a: 'Everything you connect or upload — tickets, repos, PDFs, wiki docs — is indexed into a private knowledge base scoped to your account only, and used solely to answer your questions or build your summaries.',
  },
  {
    q: 'Do I need to connect anything to sign up?',
    a: 'No — you can create an account first and connect tools, models, or data sources afterward from your dashboard, whenever you’re ready.',
  },
  {
    q: 'Which tools can I connect?',
    a: 'Jira, Notion, Slack, WhatsApp, and GitHub today via API keys or tokens — more integrations are on the way.',
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-6 py-24 bg-bg-soft">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-center text-3xl md:text-4xl font-semibold tracking-tight text-ink">
          FAQ
        </h2>

        <div className="mt-10 divide-y divide-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span
                    className={`font-display text-base font-medium ${isOpen ? 'text-accent-2' : 'text-ink'}`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 shrink-0 text-muted"
                  >
                    ⌄
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-8 text-sm leading-relaxed text-muted">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
