import React from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary';
}

const styles = tv({
  extend: focusRing,
  base: `
    rounded-xs underline transition
    disabled:cursor-default disabled:no-underline
    forced-colors:disabled:text-[GrayText]
  `,
  variants: {
    variant: {
      primary: `
        text-quanta-sapphire underline decoration-quanta-sapphire/40
        hover:text-quanta-royal hover:decoration-quanta-royal
        focus:text-quanta-royal focus:decoration-quanta-royal
        active:text-quanta-cobalt active:decoration-quanta-cobalt
      `,
      secondary: `
        text-gray-700 underline decoration-gray-700/50
        hover:decoration-gray-700
      `,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant }),
      )}
    />
  );
}
