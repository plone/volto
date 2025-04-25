import React from 'react';
import {
  FieldError,
  TextArea,
  Label,
  Text,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';

export interface TextAreaFieldProps extends RACTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function TextAreaField({
  label,
  description,
  errorMessage,
  ...props
}: TextAreaFieldProps) {
  return (
    <RACTextField {...props}>
      <Label>{label}</Label>
      <TextArea />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
