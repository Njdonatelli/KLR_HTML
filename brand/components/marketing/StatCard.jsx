import React from 'react';

export function StatCard({ stat, label, description, tone = 'navy' }) {
  const tones = { navy: 'var(--navy)', olive: 'var(--olive)', bronze: 'var(--bronze)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 900, lineHeight: 1, color: tones[tone] }}>
        {stat}
      </div>
      <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
        {label}
      </div>
      {description && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)', margin: 0, maxWidth: 260 }}>
          {description}
        </p>
      )}
    </div>
  );
}
