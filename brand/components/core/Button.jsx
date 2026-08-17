import React from 'react';

export function Button({ children, variant = 'primary', size = 'md', onDark = false, disabled = false, onClick, type = 'button' }) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: '0.8125rem' },
    md: { padding: '12px 24px', fontSize: '0.9375rem' },
    lg: { padding: '15px 32px', fontSize: '1.0625rem' },
  };
  const base = {
    fontFamily: 'var(--font-label)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...sizes[size],
  };
  const variants = {
    primary: { background: 'var(--navy)', color: 'var(--white)' },
    secondary: onDark
      ? { background: 'transparent', color: 'var(--white)', borderColor: 'var(--white)' }
      : { background: 'transparent', color: 'var(--navy)', borderColor: 'var(--navy)' },
    ghost: { background: 'transparent', color: onDark ? 'var(--white)' : 'var(--navy)' },
    tan: { background: 'var(--tan)', color: 'var(--charcoal)' },
  };
  const hover = {
    primary: { backgroundColor: 'var(--navy-light)' },
    secondary: onDark ? { backgroundColor: 'rgba(255,255,255,0.12)' } : { backgroundColor: 'var(--stone-100)' },
    ghost: { backgroundColor: onDark ? 'rgba(255,255,255,0.12)' : 'var(--stone-100)' },
    tan: { backgroundColor: 'var(--tan-dark)' },
  };
  const [isHover, setHover] = React.useState(false);
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(isHover && !disabled ? hover[variant] : {}) }}
    >
      {children}
    </button>
  );
}
