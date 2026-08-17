import React from 'react';
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. 'tan' is a warm accent CTA, use sparingly. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'tan';
  size?: 'sm' | 'md' | 'lg';
  /** Set true when placed on the navy or charcoal surface so outline/ghost text stays legible. */
  onDark?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
export function Button(props: ButtonProps): JSX.Element;
