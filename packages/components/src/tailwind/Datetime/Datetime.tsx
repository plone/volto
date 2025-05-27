import React from 'react';
import { CalendarIcon } from '../../components/icons/CalendarIcon';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  DateInput as AriaDateInput,
  type DateInputProps,
  type DateValue,
  type ValidationResult,
  DateSegment,
} from 'react-aria-components';
import { Button } from '../Button/Button';
import {
  Description,
  FieldError,
  FieldGroup,
  Label,
  fieldGroupStyles,
} from '../Field/Field';
import { tv } from 'tailwind-variants';

import { composeTailwindRenderProps } from '../utils';
import { Popover } from '../Popover/Popover';
import { Dialog } from '../Dialog/Dialog';
import { Calendar } from '../Calendar/Calendar';

export interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const segmentStyles = tv({
  base: 'type-literal:px-0 inline rounded-xs p-0.5 text-gray-800 caret-transparent outline outline-0 forced-color-adjust-none dark:text-zinc-200 forced-colors:text-[ButtonText]',
  variants: {
    isPlaceholder: {
      true: 'text-gray-600 italic dark:text-zinc-400',
    },
    isDisabled: {
      true: 'text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
    isFocused: {
      true: 'bg-blue-600 text-white dark:text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
  },
});

function DateInput(props: Omit<DateInputProps, 'children'>) {
  return (
    <AriaDateInput
      className={(renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          class: 'block min-w-[150px] px-2 py-1.5 text-sm',
        })
      }
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  );
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
