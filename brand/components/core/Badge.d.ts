import React from 'react';
export interface BadgeProps {
  children: React.ReactNode;
  tone?: 'navy' | 'olive' | 'bronze' | 'tan' | 'outline';
}
export function Badge(props: BadgeProps): JSX.Element;
