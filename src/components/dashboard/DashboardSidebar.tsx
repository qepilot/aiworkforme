'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebar({ basePath = '/dashboard' }: { basePath?: string }) {
  const pathname = usePathname()
  const links = [
    { label: 'Overview', href: basePath },
    { label: 'Chat', href: `${basePath}/chat` },
    { label: 'Integrations', href: `${basePath}/integrations` },
    { label: 'Data Sources', href: `${basePath}/sources` },
  ]

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 md:w-56 md:shrink-0 md:flex-col md:overflow-visible md:pb-0">
      {links.map((link) => {
        const isActive = link.href === basePath ? pathname === link.href : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-ink text-white' : 'text-text hover:bg-surface hover:text-ink'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
