import React from 'react';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import {
  type DropZoneProps,
  DropZone as RACDropZone,
  Text as DropZoneText,
} from 'react-aria-components/DropZone';
import { tv } from 'tailwind-variants';

const dropZone = tv({
  base: `
    flex min-h-24 w-full items-center justify-center rounded-md bg-quanta-aqua p-8 text-center
    font-sans text-base text-balance
    read-only:bg-quanta-air
    hover:bg-quanta-spa
    disabled:bg-quanta-air
    dark:bg-neutral-900
  `,
  variants: {
    isFocusVisible: {
      true: `
        outline-2 -outline-offset-1 outline-quanta-cobalt
        forced-colors:outline-[Highlight]
      `,
    },
    isDropTarget: {
      true: `
        outline-2 -outline-offset-1 outline-quanta-cobalt
        forced-colors:outline-[Highlight]
      `,
    },
  },
});

export function DropZone(props: DropZoneProps) {
  return (
    <RACDropZone
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropZone({ ...renderProps, className }),
      )}
    />
  );
}

export { DropZoneText };
