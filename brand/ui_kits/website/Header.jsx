function Header({ active, onNav }) {
  const links = ['Home', 'Process', 'Value', 'Contact'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--surface-page)', borderBottom: '1px solid var(--border-default)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
        <img src="../../assets/logo-full.png" alt="KLR Build LLC" style={{ height: 44 }} />
        <nav style={{ display: 'flex', gap: 28 }}>
          {links.map(l => (
            <a key={l} onClick={(e) => { e.preventDefault(); onNav(l); }} href={'#' + l}
              style={{
                fontFamily: 'var(--font-label)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
                color: active === l ? 'var(--navy)' : 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer',
                borderBottom: active === l ? '2px solid var(--navy)' : '2px solid transparent', paddingBottom: 4,
              }}>{l}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
window.Header = Header;
