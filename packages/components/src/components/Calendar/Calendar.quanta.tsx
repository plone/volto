import React from 'react';
import { ChevronrightIcon } from '../../components/icons/ChevronrightIcon';
import { ChevronleftIcon } from '../../components/icons/ChevronleftIcon';

import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  type CalendarProps as AriaCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  type DateValue,
  Heading,
  Text,
  useLocale,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Button } from '../Button/Button.quanta';
import { focusRing } from '../utils';

const cellStyles = tv({
  extend: focusRing,
  base: `
    m-px flex h-9 w-9 cursor-default items-center justify-center rounded-full text-sm
    forced-color-adjust-none
  `,
  variants: {
    isSelected: {
      false: `
        text-zinc-900
        hover:bg-gray-100
        dark:text-zinc-200 dark:hover:bg-zinc-700
        pressed:bg-gray-200
        dark:pressed:bg-zinc-600
      `,
      true: `
        bg-blue-600 text-white
        invalid:bg-red-600
        forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]
        forced-colors:invalid:bg-[Mark]
      `,
    },
    isDisabled: {
      true: `
        text-gray-300
        dark:text-zinc-600
        forced-colors:text-[GrayText]
      `,
    },
  },
});

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, 'visibleDuration'> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid>
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className={cellStyles} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  );
}

export function CalendarHeader() {
  const { direction } = useLocale();

  return (
    <header className="flex w-full items-center gap-1 px-1 pb-4">
      <Button slot="previous">
        {direction === 'rtl' ? (
          <ChevronrightIcon aria-hidden />
        ) : (
          <ChevronleftIcon aria-hidden />
        )}
      </Button>
      <Heading
        className={`
          mx-2 flex-1 text-center text-xl font-semibold text-zinc-900
          dark:text-zinc-200
        `}
      />
      <Button slot="next">
        {direction === 'rtl' ? (
          <ChevronleftIcon aria-hidden />
        ) : (
          <ChevronrightIcon aria-hidden />
        )}
      </Button>
    </header>
  );
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className="text-xs font-semibold text-gray-500">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  );
}
