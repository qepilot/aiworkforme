import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5eead4 0%, #7c5cff 55%, #4f46e5 100%)',
          borderRadius: 40,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 100 100">
          <path
            d="M29 51.5L43 65.5L75 33.5"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
