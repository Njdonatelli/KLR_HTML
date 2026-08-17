import React from 'react';

export function SectionHeading({ eyebrow, title, intro, align = 'left', onDark = false }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 640 : undefined, margin: align === 'center' ? '0 auto' : undefined }}>
      {eyebrow && (
        <div style={{ fontFamily: 'var(--font-label)', fontSize: 'var(--text-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: onDark ? 'var(--tan)' : 'var(--navy)', marginBottom: 10 }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 800, lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', color: onDark ? 'var(--white)' : 'var(--charcoal)', margin: 0 }}>
        {title}
      </h2>
      {intro && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)', color: onDark ? 'var(--stone-200)' : 'var(--text-secondary)', marginTop: 14 }}>
          {intro}
        </p>
      )}
    </div>
  );
}
