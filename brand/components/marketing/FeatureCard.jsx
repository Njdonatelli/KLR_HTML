import React from 'react';

export function FeatureCard({ title, description, tone = 'outline' }) {
  const accents = { navy: 'var(--navy)', olive: 'var(--olive)', bronze: 'var(--bronze)', outline: 'var(--border-strong)' };
  return (
    <div style={{
      background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', border: `1px solid var(--border-default)`,
      borderTop: `3px solid ${accents[tone]}`, padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--charcoal)', marginBottom: 8 }}>
        {title}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)', margin: 0 }}>
        {description}
      </p>
    </div>
  );
}
