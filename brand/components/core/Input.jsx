import React from 'react';

export function Input({ label, placeholder, type = 'text', multiline = false, value, onChange, required = false }) {
  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-body-sm)',
    color: 'var(--text-primary)',
    background: 'var(--white)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    padding: '11px 14px',
    outline: 'none',
    transition: 'border-color 120ms ease',
  };
  const [focused, setFocused] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
      {label && (
        <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {label}{required && <span style={{ color: 'var(--bronze)' }}> *</span>}
        </span>
      )}
      <Tag
        type={multiline ? undefined : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={multiline ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...fieldStyle, borderColor: focused ? 'var(--navy)' : 'var(--border-default)', resize: multiline ? 'vertical' : undefined }}
      />
    </label>
  );
}
