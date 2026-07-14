export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="aiWorkForMeLogoGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="55%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#aiWorkForMeLogoGrad)" />
      <path
        d="M29 51.5L43 65.5L75 33.5"
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
