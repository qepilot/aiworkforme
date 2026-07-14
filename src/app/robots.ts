import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/dashboard-preview', '/auth/'],
    },
    sitemap: 'https://aiworkforme.com/sitemap.xml',
  }
}
