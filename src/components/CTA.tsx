'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" className="mesh-gradient px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Ready to build your own AI?
        </h2>
        <p className="mt-4 text-white/85 max-w-md mx-auto">
          Create your account, connect your tools, and start indexing your
          own data — no commitment required.
        </p>
        <Link
          href="/sign-up"
          data-analytics-event="cta_section_sign_up_click"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-105 active:scale-95"
        >
          Create your account
        </Link>
      </motion.div>
    </section>
  )
}
