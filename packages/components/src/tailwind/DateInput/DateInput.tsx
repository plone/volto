import React from 'react';
import {
  DateInput as AriaDateInput,
  type DateInputProps as AriaDateInputProps,
  DateSegment,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { fieldGroupStyles } from '../Field/Field';

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

export function DateInput(props: Omit<AriaDateInputProps, 'children'>) {
  return (
    <AriaDateInput
      className={(renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          class: 'block border-none px-2 py-1.5 text-sm',
        })
      }
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  );
}
