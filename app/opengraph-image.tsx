import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EasyInvofy - Free Online Invoice Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🧾
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
            EasyInvofy
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          <span style={{ color: 'white' }}>Free Online </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #34d399)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Invoice Generator
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          No signup required · 100% free · Works offline
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['10+ Currencies', 'PDF Export', 'Privacy First'].map((badge) => (
            <div
              key={badge}
              style={{
                padding: '8px 20px',
                borderRadius: 999,
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.35)',
                color: '#a78bfa',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <p style={{ position: 'absolute', bottom: 32, color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>
          easyinvofy.com
        </p>
      </div>
    ),
    { ...size }
  );
}
