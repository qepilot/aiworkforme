import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog-posts'
import BlogBody from '@/components/blog/BlogBody'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} — AI Work For Me`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'AI Work For Me',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Work For Me',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aiworkforme.com/favicon.ico',
      },
    },
    mainEntityOfPage: `https://aiworkforme.com/blog/${post.slug}`,
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm font-medium text-accent-2 hover:underline">
          ← Back to blog
        </Link>

        <p className="mt-6 text-xs text-muted">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {post.readingTime}
        </p>
        <h1 className="font-display mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
          {post.title}
        </h1>

        <div className="mt-8">
          <BlogBody blocks={post.body} />
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">
            AI Work For Me connects your tools, uses your own model keys, and builds a private RAG from
            your own docs.
          </p>
          <Link
            href="/sign-up"
            className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
          >
            Create your account
          </Link>
        </div>
      </article>
    </div>
  )
}
