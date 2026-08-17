import React from 'react';
export interface StatCardProps {
  stat: string;
  label: string;
  description?: string;
  tone?: 'navy' | 'olive' | 'bronze';
}
export function StatCard(props: StatCardProps): JSX.Element;
