import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "tan";
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  className?: string;
};

const sizes = {
  sm: "px-4 py-2 text-eyebrow",
  md: "px-6 py-3 text-body-sm",
  lg: "px-8 py-3.75 text-body",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  disabled = false,
  onClick,
  type = "button",
  href,
  className = "",
}: ButtonProps) {
  const variants = {
    primary: "bg-navy text-white hover:bg-navy-light",
    secondary: onDark
      ? "bg-transparent text-white border-white hover:bg-white/12"
      : "bg-transparent text-navy border-navy hover:bg-stone-100",
    ghost: onDark
      ? "bg-transparent text-white hover:bg-white/12"
      : "bg-transparent text-navy hover:bg-stone-100",
    tan: "bg-tan text-charcoal hover:bg-tan-dark",
  };
  const classes = [
    "inline-flex items-center justify-center gap-2",
    "font-label font-semibold tracking-wide uppercase",
    "border border-transparent rounded-sm",
    "transition-colors duration-120 ease-linear",
    disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer",
    sizes[size],
    variants[variant],
    className,
  ].join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
