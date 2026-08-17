function ContactSection() {
  const [sent, setSent] = React.useState(false);
  const fieldStyle = { width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', color: 'var(--text-primary)', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '11px 14px', outline: 'none' };
  return (
    <section id="Contact" style={{ background: 'var(--charcoal)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--tan)', marginBottom: 10 }}>Choose Local</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h2)', color: '#fff', margin: '0 0 16px' }}>Build with confidence.</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', color: 'var(--stone-200)', margin: '0 0 40px' }}>
          When you support KLR Build LLC, you are choosing a small family-owned business that values flexibility, craftsmanship, clear communication, and a finished space designed around your life.
        </p>
        {sent ? (
          <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: 'var(--radius-md)', padding: '28px', fontFamily: 'var(--font-body)' }}>Thanks — we'll be in touch within a day to schedule your consultation.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, textAlign: 'left' }}>
            <input required placeholder="Name" style={fieldStyle} />
            <input required placeholder="Phone or email" style={fieldStyle} />
            <textarea placeholder="What are you envisioning?" rows={4} style={{ ...fieldStyle, gridColumn: '1 / -1', resize: 'vertical' }} />
            <button type="submit" style={{ gridColumn: '1 / -1', fontFamily: 'var(--font-label)', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', fontSize: '0.9375rem', padding: '14px 28px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--tan)', color: 'var(--charcoal)', cursor: 'pointer' }}>Request a Consultation</button>
          </form>
        )}
        <div style={{ marginTop: 40, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--stone-300)' }}>
          (619) 739-1135 &nbsp;·&nbsp; klrbuildllc@gmail.com &nbsp;·&nbsp; 697 Chimney Rock Dr, Oceanside CA 92058
        </div>
      </div>
    </section>
  );
}
window.ContactSection = ContactSection;
