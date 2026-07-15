'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-24 px-6">
      <div className="mesh-gradient absolute inset-0 -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Your tools. Your data. Your own AI.
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white"
        >
          An AI that
          <br />actually works for you.
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
          Connect Jira, Notion, Slack, WhatsApp, and GitHub, bring your own
          model keys, and build a private RAG from your docs, code, and
          boards — then let it pull your backlog and hand you the summary.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            data-analytics-event="hero_sign_up_click"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            Create your account
          </Link>
          <Link
            href="/sign-in"
            data-analytics-event="hero_sign_in_click"
            className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Sign in
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75"
        >
          <span>Free to start</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>No credit card required</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>Bring your own model keys</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
