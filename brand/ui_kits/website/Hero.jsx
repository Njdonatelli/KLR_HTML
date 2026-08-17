function Hero() {
  return (
    <section id="Home" style={{ background: 'var(--navy)', padding: '96px 24px 88px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--tan)', marginBottom: 16 }}>A Family Company</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '3.75rem', lineHeight: 1.02, letterSpacing: 'var(--tracking-tight)', color: '#fff', margin: 0 }}>
            Great spaces come to life here.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--stone-200)', margin: '22px 0 32px', maxWidth: 480 }}>
            KLR Build LLC is a family-owned company specializing in exterior and interior living spaces. Quality, integrity, and reliability aren't just words here — they're the standard.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <button style={{ fontFamily: 'var(--font-label)', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', fontSize: '0.9375rem', padding: '14px 28px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--tan)', color: 'var(--charcoal)', cursor: 'pointer' }}>Schedule a Visit</button>
            <button style={{ fontFamily: 'var(--font-label)', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', fontSize: '0.9375rem', padding: '14px 28px', borderRadius: 'var(--radius-sm)', border: '1px solid #fff', background: 'transparent', color: '#fff', cursor: 'pointer' }}>See Our Process</button>
          </div>
        </div>
        <image-slot id="hero-image" shape="rounded" radius="14" placeholder="Finished patio or backyard project photo" style={{ display: 'block', width: '100%', height: 340 }}></image-slot>
      </div>
    </section>
  );
}
window.Hero = Hero;
