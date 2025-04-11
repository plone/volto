import React from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'S' | 'L';
}

const button = tv({
  extend: focusRing,
  base: 'cursor-default rounded-md px-5 py-3 text-center text-sm transition hover:shadow-sm focus:shadow-sm active:shadow-md',
  variants: {
    variant: {
      primary:
        'pressed:bg-quanta-cobalt bg-quanta-sapphire hover:bg-quanta-royal active:bg-quanta-cobalt focus:bg-quanta-royal text-white has-[svg]:rounded-full has-[svg]:p-3 has-[svg]:text-white',
      secondary:
        'pressed:bg-gray-300 focus:bg-quanta-smoke bg-quanta-snow hover:bg-quanta-smoke active:bg-quanta-silver text-quanta-iron has-[svg]:text-quanta-iron has-[svg]:rounded-full has-[svg]:p-3',
      destructive:
        'pressed:bg-quanta-rose active:bg-quanta-rose bg-quanta-candy hover:bg-quanta-wine focus:bg-quanta-wine text-white',
    },
    size: {
      S: 'px-4 py-2 text-xs font-medium has-[svg]:p-1.5 [&_svg]:h-5 [&_svg]:w-5',
      L: 'text-xl font-medium has-[svg]:text-xs',
    },
    isDisabled: {
      true: 'bg-quanta-snow hover:bg-quanta-smoke text-quanta-silver cursor-not-allowed',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'L',
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          className,
        }),
      )}
    />
  );
}
