import React from 'react';

const tones = {
  navy: { background: 'var(--navy)', color: 'var(--white)' },
  olive: { background: 'var(--olive)', color: 'var(--white)' },
  bronze: { background: 'var(--bronze)', color: 'var(--white)' },
  tan: { background: 'var(--tan)', color: 'var(--charcoal)' },
  outline: { background: 'transparent', color: 'var(--navy)', border: '1px solid var(--border-strong)' },
};

export function Badge({ children, tone = 'navy' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 14px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-label)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}
