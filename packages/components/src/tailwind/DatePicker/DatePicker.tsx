import React from 'react';
import { type ValidationResult } from 'react-aria-components';

import {
  DateTimePicker,
  type DateTimePickerProps,
} from '../DateTimePicker/DateTimePicker';

export interface DatePickerProps
  extends Omit<DateTimePickerProps, 'granularity'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps) {
  return (
    <DateTimePicker
      {...props}
      label={label}
      description={description}
      errorMessage={errorMessage}
      granularity="day"
    />
  );
}
