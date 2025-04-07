import React from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
}

const button = tv({
  extend: focusRing,
  base: 'cursor-default rounded-lg px-5 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none',
  variants: {
    variant: {
      primary:
        'pressed:bg-blue-800 bg-quanta-sapphire text-white hover:bg-blue-700 has-[svg]:rounded-full has-[svg]:p-3 has-[svg]:text-white',
      secondary:
        'pressed:bg-gray-300 dark:pressed:bg-zinc-400 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500',
      destructive: 'pressed:bg-red-900 bg-red-700 text-white hover:bg-red-800',
    },
    isDisabled: {
      true: 'border-black/5 bg-gray-100 text-gray-300 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}
