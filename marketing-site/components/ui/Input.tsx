import type { ChangeEventHandler } from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  name?: string;
};

export function Input({
  label,
  placeholder,
  type = "text",
  multiline = false,
  value,
  onChange,
  required = false,
  name,
}: InputProps) {
  const fieldClasses =
    "w-full box-border font-body text-body-sm text-text-primary bg-white border border-border-default rounded-sm px-3.5 py-2.75 outline-none transition-colors duration-120 focus:border-navy";
  return (
    <label className="flex flex-col gap-1.5 font-body">
      {label && (
        <span className="text-eyebrow font-medium text-text-primary">
          {label}
          {required && <span className="text-bronze"> *</span>}
        </span>
      )}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          name={name}
          rows={4}
          className={`${fieldClasses} resize-y`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          name={name}
          className={fieldClasses}
        />
      )}
    </label>
  );
}
