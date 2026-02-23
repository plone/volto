import React from 'react';
import {
  Button,
  Calendar as RACCalendar,
  CalendarCell,
  CalendarGrid,
  type CalendarProps as RACCalendarProps,
  type DateValue,
  Heading,
  Text,
} from 'react-aria-components';

export interface CalendarProps<T extends DateValue>
  extends RACCalendarProps<T> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <RACCalendar {...props}>
      <header>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </RACCalendar>
  );
}
