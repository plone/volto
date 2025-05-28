import React, { useCallback, useState, useEffect, useRef } from 'react';
import { CalendarIcon } from '../../components/icons/CalendarIcon';
import { CloseIcon } from '../../components/icons/CloseIcon';
import {
  DatePicker as AriaDatePicker,
  Group,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult,
} from 'react-aria-components';
import {
  now,
  getLocalTimeZone,
  parseDate,
  toZoned,
  parseAbsolute,
  ZonedDateTime,
} from '@internationalized/date';

import { Button } from '../Button/Button';
import { Description, FieldError, FieldGroup, Label } from '../Field/Field';

import { composeTailwindRenderProps } from '../utils';
import { Popover } from '../Popover/Popover';
import { Dialog } from '../Dialog/Dialog';
import { Calendar } from '../Calendar/Calendar';
import { DateInput } from '../DateInput/DateInput';

type Granularity = 'day' | 'hour' | 'minute' | 'second';
function isDateOnly(granularity: Granularity) {
  return granularity === 'day';
}

// Utility functions for UTC <-> Local timezone conversion
function utcStringToLocalDateValue(
  utcString: string | null,
  isDateOnly: boolean,
): DateValue | null {
  if (!utcString) return null;

  if (isDateOnly) {
    return parseDate(utcString);
  }
  try {
    const localTimeZone = getLocalTimeZone();
    return parseAbsolute(utcString, localTimeZone);
  } catch (error) {
    console.warn('Failed to parse UTC string:', utcString, error);
    return null;
  }
}

export interface DateTimePickerProps
  extends Omit<
    AriaDatePickerProps<DateValue>,
    'value' | 'defaultValue' | 'onChange'
  > {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  resettable?: boolean;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
}

export function DateTimePicker({
  label,
  description,
  errorMessage,
  resettable = true,
  value,
  defaultValue,
  onChange,
  isDisabled,
  granularity = 'minute',
  ...props
}: DateTimePickerProps) {
  // Convert UTC string values to local DateValue for internal use
  const [internalValue, setInternalValue] = useState<DateValue | null>(() => {
    const initialValue = value ?? defaultValue ?? null;
    return utcStringToLocalDateValue(initialValue, isDateOnly(granularity));
  });

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(
        utcStringToLocalDateValue(value, isDateOnly(granularity)),
      );
    }
  }, [value, granularity]);

  const handleReset = useCallback(() => {
    setInternalValue(null);
    if (onChange) {
      onChange(null);
    }
  }, [onChange]);

  const handleDateChange = useCallback(
    (newValue: DateValue | null) => {
      if (!isDateOnly(granularity) && !internalValue && newValue) {
        const currentTime = now(getLocalTimeZone());
        const localZoned = toZoned(
          newValue as ZonedDateTime,
          getLocalTimeZone(),
        );
        // When no previous value exists and user selects a date, set current local time
        const dateTimeValue = localZoned.set({
          hour: currentTime.hour,
          minute: currentTime.minute,
          second: currentTime.second,
        });

        setInternalValue(dateTimeValue);
        console.log(
          'output values',
          (dateTimeValue as ZonedDateTime)?.toAbsoluteString() ?? null,
        );
        if (onChange) {
          onChange(dateTimeValue.toAbsoluteString());
        }
        return;
      }

      setInternalValue(newValue);

      if (onChange && newValue) {
        if (newValue instanceof ZonedDateTime) {
          onChange(newValue.toAbsoluteString());
        } else {
          onChange(newValue.toString());
        }
      }
    },
    [onChange, internalValue, granularity],
  );

  return (
    <div className="flex items-center">
      <AriaDatePicker
        {...props}
        value={value !== undefined ? internalValue : internalValue}
        defaultValue={
          value === undefined
            ? utcStringToLocalDateValue(
                defaultValue ?? null,
                isDateOnly(granularity),
              )
            : undefined
        }
        onChange={handleDateChange}
        granularity={granularity}
        isDisabled={isDisabled}
        className={composeTailwindRenderProps(
          props.className,
          'group flex flex-col gap-1',
        )}
      >
        {label && <Label>{label}</Label>}
        <div className="flex items-center gap-2">
          <FieldGroup className="w-auto min-w-[208px]">
            <DateInput className="min-w-[150px] flex-1 px-2 py-1.5 text-sm" />
            <Button
              variant="icon"
              className="mr-1 w-7 rounded-xs outline-offset-0"
              slot="trigger"
            >
              <CalendarIcon aria-hidden className="h-4 w-4" />
            </Button>
          </FieldGroup>
        </div>

        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
        <Popover>
          <Dialog>
            <Calendar />
          </Dialog>
        </Popover>
      </AriaDatePicker>
      {resettable && (
        <Button
          variant="icon"
          className="h-7 w-7 flex-shrink-0 p-1"
          onPress={handleReset}
          isDisabled={isDisabled || !internalValue || props.isReadOnly}
          aria-label="Clear date and time"
          slot="clear"
        >
          <CloseIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
