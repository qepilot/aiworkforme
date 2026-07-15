import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — AI Work For Me',
  description:
    'Practical guides on private RAG, bring-your-own-key AI, and connecting your tools to build an assistant that actually knows your work.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndexPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
          Blog
        </span>
        <h1 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
          Guides on private RAG and BYOK AI.
        </h1>
        <p className="mt-3 text-muted">
          Practical writing on building your own knowledge base and connecting your own model keys — no
          fluff, no vendor pitch dressed up as an article.
        </p>

        <div className="mt-10 space-y-4">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-border bg-surface p-6 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                · {post.readingTime}
              </p>
              <h2 className="font-display mt-2 text-lg font-medium text-ink">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
