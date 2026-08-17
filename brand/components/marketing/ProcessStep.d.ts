import React from 'react';
export interface ProcessStepProps {
  number: number | string;
  title: string;
  description: string;
}
export function ProcessStep(props: ProcessStepProps): JSX.Element;
