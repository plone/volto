import React from 'react';
import {
  Toolbar as RACToolbar,
  composeRenderProps,
  type ToolbarProps as RACToolbarProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

export type ToolbarProps = RACToolbarProps;

const toolbarStyles = tv({
  base: `
    flex w-fit flex-wrap gap-1.5
    [&_.react-aria-Group]:contents
    [&_.react-aria-Separator]:shrink-0 [&_.react-aria-Separator]:self-stretch
    [&_.react-aria-Separator]:border-0 [&_.react-aria-Separator]:bg-quanta-silver
    [&_.react-aria-Separator]:dark:bg-quanta-smoke
    [&_.react-aria-Separator]:forced-colors:bg-[ButtonBorder]
    [&_.react-aria-Separator:not([aria-orientation='vertical'])]:my-2.5
    [&_.react-aria-Separator:not([aria-orientation='vertical'])]:h-px
    [&_.react-aria-Separator:not([aria-orientation='vertical'])]:w-full
    [&_.react-aria-Separator[aria-orientation='vertical']]:mx-2.5
    [&_.react-aria-Separator[aria-orientation='vertical']]:w-px
  `,
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-start',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Toolbar(props: ToolbarProps) {
  return (
    <RACToolbar
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toolbarStyles({
          orientation: props.orientation ?? renderProps.orientation,
          className,
        }),
      )}
    />
  );
}
