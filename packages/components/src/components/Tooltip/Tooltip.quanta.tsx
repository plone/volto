import React from 'react';
import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  OverlayArrow,
} from 'react-aria-components/Tooltip';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  children: React.ReactNode;
}

const styles = tv({
  base: `
    group box-border rounded bg-quanta-denim px-2 py-0.5 text-quanta-air drop-shadow-lg
    will-change-transform
  `,
  variants: {
    isEntering: {
      true: `
        duration-200 ease-out animate-in fade-in
        placement-left:slide-in-from-right-0.5
        placement-right:slide-in-from-left-0.5
        placement-top:slide-in-from-bottom-0.5
        placement-bottom:slide-in-from-top-0.5
      `,
    },
    isExiting: {
      true: `
        duration-150 ease-in animate-out fade-out
        placement-left:slide-out-to-right-0.5
        placement-right:slide-out-to-left-0.5
        placement-top:slide-out-to-bottom-0.5
        placement-bottom:slide-out-to-top-0.5
      `,
    },
  },
});

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={10}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      <OverlayArrow>
        <svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          className={`
            block fill-quanta-denim stroke-quanta-denim
            group-placement-left:-rotate-90
            group-placement-right:rotate-90
            group-placement-bottom:rotate-180
            forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]
          `}
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  );
}
