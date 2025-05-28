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
import { now, getLocalTimeZone } from '@internationalized/date';

import { Button } from '../Button/Button';
import { Description, FieldError, FieldGroup, Label } from '../Field/Field';

import { composeTailwindRenderProps } from '../utils';
import { Popover } from '../Popover/Popover';
import { Dialog } from '../Dialog/Dialog';
import { Calendar } from '../Calendar/Calendar';
import { DateInput } from '../DateInput/DateInput';

/*
Fer un component d'ordre superior per poder fer el time  i el date separats
Analitzar com poder configurar tb un altre component d'ordre superior que puguis triar el time zone
El nostre component sempre rebrà la data amb UTC i l'ha de guardar amb UTC
*/
export interface DateTimePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  resettable?: boolean;
}

export function DateTimePicker<T extends DateValue>({
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
}: DateTimePickerProps<T>) {
  const [internalValue, setInternalValue] = useState<DateValue | null>(
    value ?? defaultValue ?? null,
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const includesTime =
    granularity === 'minute' ||
    granularity === 'second' ||
    granularity === 'hour';

  const handleReset = useCallback(() => {
    setInternalValue(null);
    if (onChange) {
      onChange(null);
    }
  }, [onChange]);

  const handleDateChange = useCallback(
    (newValue: DateValue | null) => {
      if (includesTime && !internalValue && newValue) {
        const currentTime = now(getLocalTimeZone());
        const dateTimeValue = newValue.set({
          hour: currentTime.hour,
          minute: currentTime.minute,
          second: currentTime.second,
        });
        setInternalValue(dateTimeValue);
        if (onChange) {
          (onChange as any)(dateTimeValue);
        }
        return;
      }

      setInternalValue(newValue);
      if (onChange) {
        (onChange as any)(newValue);
      }
    },
    [onChange, includesTime, internalValue],
  );

  return (
    <div className="flex items-center">
      <AriaDatePicker
        {...props}
        value={value !== undefined ? value : (internalValue as T)}
        defaultValue={value === undefined ? defaultValue : undefined}
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
