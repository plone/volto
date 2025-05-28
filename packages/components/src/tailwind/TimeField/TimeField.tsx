import React from 'react';
import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult,
} from 'react-aria-components';
import { DateInput } from '../DateInput/DateInput';
import { Description, FieldError, Label } from '../Field/Field';

export interface TimeFieldProps<T extends TimeValue>
  extends AriaTimeFieldProps<T> {
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
    <AriaTimeField {...props}>
      <Label>{label}</Label>
      <DateInput className="w-fit rounded-lg border-2 px-2 py-1.5 text-sm" />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTimeField>
  );
}
