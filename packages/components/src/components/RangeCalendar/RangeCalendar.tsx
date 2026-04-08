import React from 'react';
import {
  Button,
  CalendarCell,
  CalendarGrid,
  type DateValue,
  Heading,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps,
  Text,
} from 'react-aria-components';

export interface RangeCalendarProps<T extends DateValue>
  extends RACRangeCalendarProps<T> {
  errorMessage?: string;
}

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RACRangeCalendar {...props}>
      <header>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </RACRangeCalendar>
  );
}
