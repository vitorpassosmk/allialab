import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ALLiA LAB — Inteligência Aliada. Impacto Real.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080A11',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse at center top, rgba(53,112,181,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#EAF0FF',
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          ALL<span style={{ color: '#4D8FD6' }}>i</span>A{' '}
          <span style={{ color: '#4D8FD6' }}>LAB</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#8C98BC',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          Inteligência Aliada. Impacto Real.
        </div>

        {/* Separator */}
        <div
          style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #3570B5, transparent)',
            marginBottom: 48,
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: '#8C98BC',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Sites · Automações · Agentes de IA · MicroSaaS · Marketing Digital
        </div>
      </div>
    ),
    { ...size },
  )
}
