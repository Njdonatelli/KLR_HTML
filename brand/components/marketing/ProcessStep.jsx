import React from 'react';

export function ProcessStep({ number, title, description }) {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{
        flex: 'none', width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', color: 'var(--white)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem',
      }}>
        {number}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h4)', color: 'var(--charcoal)', marginBottom: 4 }}>
          {title}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)', margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
