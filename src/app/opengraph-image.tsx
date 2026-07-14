import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5eead4 0%, #7c5cff 55%, #4f46e5 100%)',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.15)',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 100 100">
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
          <div style={{ display: 'flex', fontSize: 56, fontWeight: 600, color: 'white' }}>
            AI Work For Me
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Your tools, your data, your own RAG.
        </div>
      </div>
    ),
    { ...size }
  )
}
