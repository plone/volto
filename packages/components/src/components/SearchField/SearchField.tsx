import React from 'react';
import {
  Button,
  FieldError,
  Input,
  Label,
  SearchField as RACSearchField,
  type SearchFieldProps as RACSearchFieldProps,
  Text,
  type ValidationResult,
} from 'react-aria-components';

export interface SearchFieldProps extends RACSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function SearchField({
  label,
  description,
  errorMessage,
  ...props
}: SearchFieldProps) {
  return (
    <RACSearchField {...props}>
      <Label>{label}</Label>
      <Input />
      <Button>✕</Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACSearchField>
  );
}
