import React from 'react';
import {
  DateField as RACDateField,
  type DateFieldProps as RACDateFieldProps,
  DateInput,
  DateSegment,
  type DateValue,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components';

export interface DateFieldProps<T extends DateValue>
  extends RACDateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) {
  return (
    <RACDateField {...props}>
      <Label>{label}</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACDateField>
  );
}
