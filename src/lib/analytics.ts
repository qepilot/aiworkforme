type EventParams = Record<string, string | number | boolean | undefined>

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return
  const gtag = (window as GtagWindow).gtag
  if (typeof gtag !== 'function') return
  gtag('event', name, params)
}
