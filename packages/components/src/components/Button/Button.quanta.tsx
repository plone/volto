import React from 'react';
import {
  composeRenderProps,
  Link,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  type LinkProps as AriaLinkProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

// Use a discriminated union to avoid conflicting keys between RAC Button and Link props
// - Button variant: no `href`
// - Link variant: requires `href`
export type ButtonProps = (
  | (RACButtonProps & { href?: never })
  | (AriaLinkProps & { href: string })
) & {
  /** Visual variant (style only) */
  variant?: 'neutral' | 'primary' | 'destructive' | 'icon';
  /** Size variant (style only) */
  size?: 'S' | 'L';
  /** Accent state (style only) */
  accent?: boolean;
};

const button = tv({
  extend: focusRing,
  base: 'cursor-default rounded-md px-3 py-1.5 text-center text-base font-medium transition hover:shadow-sm focus:shadow-sm active:shadow-md has-[svg]:rounded-full has-[svg]:p-1.5 has-[svg]:text-xs',
  variants: {
    variant: {
      neutral:
        'pressed:bg-quanta-cobalt bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-snow text-quanta-iron has-[svg]:text-quanta-iron',
      primary:
        'pressed:bg-quanta-cobalt bg-quanta-air hover:bg-quanta-arctic hover:text-quanta-royal active:bg-quanta-sky active:text-quanta-royal focus:bg-quanta-artic focus:text-quanta-royal text-quanta-sapphire',
      destructive:
        'pressed:bg-quanta-rose active:bg-quanta-flamingo bg-quanta-air hover:bg-quanta-ballet hover:text-quanta-wine active:text-quanta-wine focus:bg-quanta-ballet focus:text-quanta-wine text-quanta-candy',
      icon: 'pressed:bg-quanta-cobalt pressed:[&_svg]:text-white bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-artic text-quanta-iron has-[svg]:text-quanta-iron flex items-center justify-center border-0 p-1',
    },
    accent: {
      true: '',
    },
    size: {
      S: 'text-xs has-[svg]:p-1.5 [&_svg]:size-5',
      L: 'px-4.5 py-3 text-xl/6 has-[svg]:p-3 has-[svg]:text-xs',
    },
    isDisabled: {
      true: 'bg-quanta-air hover:bg-quanta-air hover:text-quanta-silver has-[svg]:hover:text-quanta-silver text-quanta-smoke has-[svg]:text-quanta-smoke cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      variant: 'neutral',
      accent: true,
      class:
        'pressed:bg-quanta-smoke focus:bg-quanta-smoke bg-quanta-snow hover:bg-quanta-smoke active:bg-quanta-silver text-quanta-iron',
    },
    {
      variant: 'primary',
      accent: true,
      class:
        'text-quanta-air pressed:bg-quanta-cobalt bg-quanta-sapphire hover:bg-quanta-royal hover:text-quanta-air active:text-quanta-air focus:text-quanta-air active:bg-quanta-cobalt focus:bg-quanta-royal',
    },
    {
      variant: 'icon',
      accent: true,
      class:
        'pressed:bg-quanta-cobalt pressed:[&_svg]:text-white bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-artic text-quanta-iron has-[svg]:text-quanta-iron flex items-center justify-center border-0 p-1',
    },
    {
      variant: 'destructive',
      accent: true,
      class:
        'pressed:bg-quanta-rose active:bg-quanta-rose bg-quanta-candy hover:bg-quanta-wine focus:bg-quanta-wine text-quanta-air hover:text-quanta-air active:text-quanta-air focus:text-quanta-air',
    },
    {
      isDisabled: true,
      accent: true,
      class: 'bg-quanta-snow hover:bg-quanta-smoke text-quanta-silver',
    },
  ],
  defaultVariants: {
    variant: 'neutral',
  },
});

export function Button(props: ButtonProps) {
  const isLink = !!props.href;
  const Element = isLink ? Link : RACButton;
  return (
    <Element
      {...(isLink ? (({ type, ...rest }) => rest)(props as any) : props)}
      isDisabled={props.isDisabled}
      className={composeRenderProps(
        props.className as any,
        (className, renderProps) =>
          button({
            ...renderProps,
            variant: props.variant,
            size: props.size,
            accent: props.accent,
            className,
          }),
      )}
    />
  );
}
