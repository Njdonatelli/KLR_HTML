function TestimonialSection() {
  return (
    <section style={{ background: 'var(--surface-page)', padding: '88px 24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 640, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--tan-dark)', lineHeight: 1 }}>&ldquo;</div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--charcoal)', margin: '0 0 18px' }}>
          We couldn't be more impressed with the transformation of our front and backyard into a truly elevated outdoor living space. The craftsmanship — from the beautiful concrete and paver hardscape to the turf, thoughtfully selected plants, and seamless irrigation system — is exceptional.
        </p>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--navy)' }}>Oceanside, CA homeowner</div>
      </div>
    </section>
  );
}
window.TestimonialSection = TestimonialSection;
