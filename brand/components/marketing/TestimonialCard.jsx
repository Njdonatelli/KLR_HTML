import React from 'react';

export function TestimonialCard({ quote, attribution }) {
  return (
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-8)', boxShadow: 'var(--shadow-sm)', maxWidth: 560,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--tan-dark)', lineHeight: 1, marginBottom: 4 }}>&ldquo;</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--charcoal)', margin: 0 }}>
        {quote}
      </p>
      {attribution && (
        <div style={{ marginTop: 18, fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--navy)' }}>
          {attribution}
        </div>
      )}
    </div>
  );
}
