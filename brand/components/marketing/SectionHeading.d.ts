import React from 'react';
export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
