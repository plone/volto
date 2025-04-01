import * as React from 'react';
import {
  ColorField as RACColorField,
  type ColorFieldProps as RACColorFieldProps,
  FieldError,
  Input,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components';

export interface ColorFieldProps extends RACColorFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function ColorField({
  label,
  description,
  errorMessage,
  ...props
}: ColorFieldProps) {
  return (
    <RACColorField {...props}>
      {label && <Label>{label}</Label>}
      <Input />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACColorField>
  );
}
