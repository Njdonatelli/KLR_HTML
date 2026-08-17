const steps = [
  ['Initial Design Consultation', 'We schedule the first visit to learn what you are envisioning, how you want the space to feel, and what priorities matter most.'],
  ['Design Preview', 'In 5–7 days we return with 2D and 3D renderings plus a detailed, itemized estimate that brings the ideas to life.'],
  ['Deposit and HOA Submission', 'After the deposit is received, HOA plans are typically submitted within 3–4 days so the approval process can begin quickly.'],
  ['Commencement', 'Construction generally starts 1–2 weeks after approval while materials, site logistics, and the timeline are finalized.'],
  ['Delivery and Installment', 'Materials are delivered and installed. The second payment is due at this time.'],
  ['Plants and Turf', 'We meet at the nursery to choose plants together. The third payment is due at this time.'],
  ['Final Walk Through', 'We meet at the property to go over the final results. The final payment is due at this time.'],
];
function ProcessSection() {
  return (
    <section id="Process" style={{ background: 'var(--surface-page)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 10 }}>Our Process</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h2)', color: 'var(--charcoal)', margin: '0 0 48px', maxWidth: 640 }}>Seven steps, one team, start to finish.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {steps.map(([title, desc], i) => (
            <div key={title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ flex: 'none', width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem' }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h4)', color: 'var(--charcoal)', marginBottom: 4 }}>{title}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProcessSection = ProcessSection;
