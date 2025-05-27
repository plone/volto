import React, { useState, useEffect, useCallback } from 'react';
import { CalendarIcon } from '../../components/icons/CalendarIcon';
import { CloseIcon } from '../../components/icons/CloseIcon';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult,
} from 'react-aria-components';
import { Button } from '../Button/Button';
import { Description, FieldError, FieldGroup, Label } from '../Field/Field';
import { TimeField } from '../TimeField/TimeField';

import { composeTailwindRenderProps } from '../utils';
import { Popover } from '../Popover/Popover';
import { Dialog } from '../Dialog/Dialog';
import { Calendar } from '../Calendar/Calendar';
import { DateInput } from '../DateField/DateField';
import type { Time } from '@internationalized/date';
import {
  parseDate,
  parseTime,
  today,
  now,
  getLocalTimeZone,
} from '@internationalized/date';

// Helper function to pad numbers with leading zeros
const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

// Helper functions to convert between Date and DateValue/Time
const dateToDateValue = (date: Date | null): DateValue | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  return parseDate(`${year}-${padZero(month)}-${padZero(day)}`);
};

const dateToTime = (date: Date | null): Time | null => {
  if (!date) return null;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return parseTime(`${padZero(hours)}:${padZero(minutes)}`);
};

const combineDateAndTime = (
  dateValue: DateValue | null,
  timeValue: Time | null,
): Date | null => {
  if (!dateValue) return null;

  const year = dateValue.year;
  const month = dateValue.month - 1; // Date constructor expects 0-11
  const day = dateValue.day;

  if (timeValue) {
    return new Date(year, month, day, timeValue.hour, timeValue.minute);
  } else {
    // If no time, use current time in the correct timezone
    const currentTimeInTimezone = now(getLocalTimeZone());
    return new Date(
      year,
      month,
      day,
      currentTimeInTimezone.hour,
      currentTimeInTimezone.minute,
      currentTimeInTimezone.second,
    );
  }
};

export interface DateTimePickerProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  dateOnly?: boolean;
  resettable?: boolean;
  widget?: 'date' | 'datetime';

  // Controlled component props
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;

  // Other props from AriaDatePickerProps
  name?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export function DateTimePicker({
  label,
  description,
  errorMessage,
  dateOnly = false,
  resettable = true,
  widget,
  value,
  defaultValue,
  onChange,
  isDisabled,
  ...props
}: DateTimePickerProps) {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue || null,
  );

  // Determine if this is controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Convert current Date to DateValue and Time for the inputs
  const currentDateValue = dateToDateValue(currentValue);
  const currentTimeValue = dateToTime(currentValue);

  const isDateOnly = dateOnly || widget === 'date';

  const handleValueChange = useCallback(
    (newDate: Date | null) => {
      if (!isControlled) {
        setInternalValue(newDate);
      }
      if (onChange) {
        onChange(newDate);
      }
    },
    [isControlled, onChange],
  );

  const handleDateChange = useCallback(
    (newDateValue: DateValue | null) => {
      if (newDateValue) {
        // When a date is selected, automatically set current time in the correct timezone
        const currentTimeInTimezone = now(getLocalTimeZone());
        const newDate = new Date(
          newDateValue.year,
          newDateValue.month - 1,
          newDateValue.day,
          currentTimeInTimezone.hour,
          currentTimeInTimezone.minute,
          currentTimeInTimezone.second,
        );
        handleValueChange(newDate);
      } else {
        handleValueChange(null);
      }
    },
    [handleValueChange],
  );

  const handleTimeChange = useCallback(
    (newTimeValue: Time | null) => {
      if (currentDateValue && newTimeValue) {
        const newDate = combineDateAndTime(currentDateValue, newTimeValue);
        handleValueChange(newDate);
      }
    },
    [currentDateValue, handleValueChange],
  );

  const handleReset = useCallback(() => {
    handleValueChange(null);
  }, [handleValueChange]);
  return (
    <div className="date-time-widget-wrapper">
      <AriaDatePicker
        {...props}
        value={currentDateValue}
        onChange={handleDateChange}
        isDisabled={isDisabled}
        className={composeTailwindRenderProps(
          props.className,
          'group flex flex-col gap-1',
        )}
      >
        {label && <Label>{label}</Label>}
        <div className="flex items-start gap-2">
          <FieldGroup className="w-auto min-w-[208px]">
            <DateInput className="min-w-[150px] flex-1 px-2 py-1.5 text-sm" />
            <Button className="mr-1 w-6 rounded-xs outline-offset-0">
              <CalendarIcon aria-hidden className="h-4 w-4" />
            </Button>
          </FieldGroup>

          {!isDateOnly && (
            <div className="flex-shrink-0">
              <TimeField
                value={currentTimeValue}
                onChange={handleTimeChange}
                isDisabled={isDisabled}
                isInvalid={props.isInvalid}
                aria-label="Time"
              />
            </div>
          )}

          {resettable && (
            <Button
              variant="neutral"
              className="h-8 w-8 flex-shrink-0 p-1"
              onPress={handleReset}
              isDisabled={isDisabled || !currentValue}
              aria-label="Clear date and time"
            >
              <CloseIcon className="h-4 w-4" />
            </Button>
          )}
        </div>

        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
        <Popover>
          <Dialog>
            <Calendar />
          </Dialog>
        </Popover>
      </AriaDatePicker>
    </div>
  );
}

// Keep the original DatePicker for backward compatibility
export interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="w-auto min-w-[208px]">
        <DateInput className="min-w-[150px] flex-1 px-2 py-1.5 text-sm" />
        <Button className="mr-1 w-6 rounded-xs outline-offset-0">
          <CalendarIcon aria-hidden className="h-4 w-4" />
        </Button>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <Calendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}
