import {
  OverlayArrow,
  Popover as RACPopover,
  composeRenderProps,
  PopoverContext,
  useSlottedContext,
  type PopoverProps as RACPopoverProps,
} from 'react-aria-components';
import React from 'react';
import { tv } from 'tailwind-variants';

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
  showArrow?: boolean;
  children: React.ReactNode;
}

const styles = tv({
  base: 'rounded-xl border border-black/10 bg-white bg-clip-padding text-slate-700 shadow-2xl dark:border-white/[15%] dark:bg-zinc-900/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]',
  variants: {
    isEntering: {
      true: 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 duration-200 ease-out',
    },
    isExiting: {
      true: 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 duration-150 ease-in',
    },
  },
});

export function Popover({
  children,
  showArrow,
  className,
  ...props
}: PopoverProps) {
  const popoverContext = useSlottedContext(PopoverContext)!;
  const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger';
  let offset = showArrow ? 12 : 8;
  offset = isSubmenu ? offset - 6 : offset;
  return (
    <RACPopover
      offset={offset}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 block fill-white stroke-black/10 stroke-1 dark:fill-[#1f1f21] dark:stroke-zinc-600 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACPopover>
  );
}
