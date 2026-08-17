function ValueSection() {
  const stats = [
    ['8–15%', 'Typical patio / outdoor living ROI', 'Outdoor living spaces are regularly valued because they expand usable square footage and buyer appeal.', 'var(--navy)'],
    ['3 costs', 'That waiting can trigger', 'Inflation, site damage, and the inefficiency of revisiting demolition, material selection, and scheduling later.', 'var(--bronze)'],
    ['1 vision', 'Delivered together', 'Bundling layout, drainage, hardscape, and planting keeps the job cohesive and avoids mismatched phases.', 'var(--olive)'],
  ];
  const features = [
    ['Tailored Design', 'No generic packages. Projects are shaped around lifestyle, taste, budget, and how each family actually uses the home.', 'var(--navy)'],
    ['Responsive Service', 'Questions are answered, updates are shared, and clients stay connected from planning through completion.', 'var(--olive)'],
    ['Family-Owned', 'Clients are not passed through a giant system. They work with a team that values trust, flexibility, and accountability.', 'var(--bronze)'],
  ];
  return (
    <section id="Value" style={{ background: 'var(--stone-100)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 10 }}>Add Value Now</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h2)', color: 'var(--charcoal)', margin: '0 0 48px', maxWidth: 640 }}>Avoid paying more later.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginBottom: 64 }}>
          {stats.map(([stat, label, desc, color]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'var(--text-h1)', lineHeight: 1, color }}>{stat}</div>
              <div style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--charcoal)', margin: '8px 0' }}>{label}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h3)', color: 'var(--charcoal)', margin: '0 0 28px' }}>Why customers choose KLR Build</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {features.map(([title, desc, color]) => (
            <div key={title} style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', borderTop: `3px solid ${color}`, padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--charcoal)', marginBottom: 8 }}>{title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ValueSection = ValueSection;
