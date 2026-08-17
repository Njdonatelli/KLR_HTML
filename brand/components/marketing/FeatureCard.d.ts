import React from 'react';
export interface FeatureCardProps {
  title: string;
  description: string;
  tone?: 'navy' | 'olive' | 'bronze' | 'outline';
}
export function FeatureCard(props: FeatureCardProps): JSX.Element;
