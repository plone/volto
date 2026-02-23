import React from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  Text,
  type ValidationResult,
} from 'react-aria-components';

export interface DatePickerProps<T extends DateValue>
  extends RACDatePickerProps<T> {
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
    <RACDatePicker {...props}>
      <Label>{label}</Label>
      <Group>
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button>▼</Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <Calendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </RACDatePicker>
  );
}
