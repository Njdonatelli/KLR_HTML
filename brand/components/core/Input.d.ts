import React from 'react';
export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
}
export function Input(props: InputProps): JSX.Element;
