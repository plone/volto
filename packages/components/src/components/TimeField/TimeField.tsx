import React from 'react';
import {
  DateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
  TimeField as RACTimeField,
  type TimeFieldProps as RACTimeFieldProps,
  type TimeValue,
  type ValidationResult,
} from 'react-aria-components';

export interface TimeFieldProps<T extends TimeValue>
  extends RACTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) {
  return (
    <RACTimeField {...props}>
      <Label>{label}</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTimeField>
  );
}
