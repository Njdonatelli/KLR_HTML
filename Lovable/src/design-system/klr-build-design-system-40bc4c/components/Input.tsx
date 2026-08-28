import React from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  disabled?: boolean;
  /** Error text rendered under the field; also switches the border to the accent tone. */
  error?: string;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Input({
  label,
  placeholder,
  type = "text",
  multiline = false,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  error,
  id,
  name,
  className,
  style,
}: InputProps) {
  const [focused, setFocused] = React.useState(false);
  const Tag = (multiline ? "textarea" : "input") as React.ElementType;

  const borderColor = error
    ? "var(--bronze)"
    : focused
      ? "var(--navy)"
      : "var(--border-default)";

  return (
    <label
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        fontFamily: "var(--font-body)",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: "var(--text-caption)",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {label}
          {required && <span style={{ color: "var(--bronze)" }}> *</span>}
        </span>
      )}
      <Tag
        id={id}
        name={name}
        type={multiline ? undefined : type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={multiline ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body-sm)",
          color: "var(--text-primary)",
          background: "var(--white)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-sm)",
          padding: "11px 14px",
          outline: "none",
          boxShadow: focused ? "var(--focus-ring)" : "none",
          transition: "border-color 120ms ease, box-shadow 120ms ease",
          resize: multiline ? "vertical" : undefined,
        }}
      />
      {error && (
        <span
          style={{ fontSize: "var(--text-caption)", color: "var(--bronze)" }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
