import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Work For Me',
    short_name: 'AI Work For Me',
    description:
      'Connects Jira, Notion, Slack, WhatsApp, and GitHub to a private RAG built from your own docs, code, and boards.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c5cff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
