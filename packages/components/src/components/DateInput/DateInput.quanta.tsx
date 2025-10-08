import React from 'react';
import {
  DateInput as AriaDateInput,
  type DateInputProps as AriaDateInputProps,
  composeRenderProps,
  DateSegment,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { fieldGroupStyles } from '../Field/Field.quanta';

const segmentStyles = tv({
  base: `
    inline rounded-xs p-0.5 text-gray-800 caret-transparent outline-0 forced-color-adjust-none
    dark:text-zinc-200
    forced-colors:text-[ButtonText]
    type-literal:px-0
  `,
  variants: {
    isPlaceholder: {
      true: `
        text-gray-600 italic
        dark:text-zinc-400
      `,
    },
    isDisabled: {
      true: `
        text-gray-200
        dark:text-zinc-600
        forced-colors:text-[GrayText]
      `,
    },
    isFocused: {
      true: `
        bg-blue-600 text-white
        dark:text-white
        forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]
      `,
    },
  },
});
// Review styles
export function DateInput(props: Omit<AriaDateInputProps, 'children'>) {
  return (
    <AriaDateInput
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  );
}
