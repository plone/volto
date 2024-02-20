import React from 'react';
import {
  FieldError,
  Label,
  RadioGroup as RACRadioGroup,
  RadioGroupProps as RACRadioGroupProps,
  Text,
  ValidationResult,
} from 'react-aria-components';

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props}>
      <Label>{label}</Label>
      {children}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACRadioGroup>
  );
}
