'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function AnalyticsListener() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest<HTMLElement>('[data-analytics-event]')
      if (!el) return
      const event = el.dataset.analyticsEvent
      if (!event) return
      const label = el.dataset.analyticsLabel
      trackEvent(event, label ? { label } : undefined)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
