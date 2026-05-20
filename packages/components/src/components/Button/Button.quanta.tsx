import React from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'neutral' | 'primary' | 'destructive' | 'icon';
  size?: 'S' | 'L';
  accent?: boolean;
}

const button = tv({
  extend: focusRing,
  base: `
    cursor-default rounded-md px-3 py-1.5 text-center text-base font-medium transition
    hover:shadow-sm
    focus:shadow-sm
    active:shadow-md
    has-[svg]:rounded-full has-[svg]:p-1.5 has-[svg]:text-xs
  `,
  variants: {
    variant: {
      neutral: `
        bg-quanta-air text-quanta-iron
        hover:bg-quanta-snow
        focus:bg-quanta-snow
        active:bg-quanta-silver
        has-[svg]:text-quanta-iron
        pressed:bg-quanta-silver
      `,
      primary: `
        focus:bg-quanta-artic focus:text-quanta-royal
        bg-quanta-air text-quanta-sapphire
        hover:bg-quanta-arctic hover:text-quanta-royal
        active:bg-quanta-sky active:text-quanta-royal
        pressed:bg-quanta-cobalt
      `,
      destructive: `
        bg-quanta-air text-quanta-candy
        hover:bg-quanta-ballet hover:text-quanta-wine
        focus:bg-quanta-ballet focus:text-quanta-wine
        active:bg-quanta-flamingo active:text-quanta-wine
        pressed:bg-quanta-rose
      `,
      icon: `
        focus:bg-quanta-artic
        flex items-center justify-center border-0 bg-quanta-air p-1 text-quanta-iron
        hover:bg-quanta-snow
        active:bg-quanta-silver
        has-[svg]:text-quanta-iron
        pressed:bg-quanta-cobalt pressed:[&_svg]:text-white
      `,
    },
    accent: {
      true: '',
    },
    size: {
      S: `
        text-xs
        has-[svg]:p-1.5
        [&_svg]:size-5
      `,
      L: `
        px-4.5 py-3 text-xl/6
        has-[svg]:p-3 has-[svg]:text-xs
      `,
    },
    isDisabled: {
      true: `
        cursor-not-allowed bg-quanta-air text-quanta-smoke
        hover:bg-quanta-air hover:text-quanta-silver
        has-[svg]:text-quanta-smoke has-[svg]:hover:text-quanta-silver
      `,
    },
  },
  compoundVariants: [
    {
      variant: 'neutral',
      accent: true,
      class: `
        bg-quanta-snow text-quanta-iron
        hover:bg-quanta-smoke
        focus:bg-quanta-smoke
        active:bg-quanta-silver
        pressed:bg-quanta-smoke
      `,
    },
    {
      variant: 'primary',
      accent: true,
      class: `
        bg-quanta-sapphire text-quanta-air
        hover:bg-quanta-royal hover:text-quanta-air
        focus:bg-quanta-royal focus:text-quanta-air
        active:bg-quanta-cobalt active:text-quanta-air
        pressed:bg-quanta-cobalt
      `,
    },
    {
      variant: 'icon',
      accent: true,
      class: `
        focus:bg-quanta-artic
        flex items-center justify-center border-0 bg-quanta-air p-1 text-quanta-iron
        hover:bg-quanta-snow
        active:bg-quanta-silver
        has-[svg]:text-quanta-iron
        pressed:bg-quanta-cobalt pressed:[&_svg]:text-white
      `,
    },
    {
      variant: 'destructive',
      accent: true,
      class: `
        bg-quanta-candy text-quanta-air
        hover:bg-quanta-wine hover:text-quanta-air
        focus:bg-quanta-wine focus:text-quanta-air
        active:bg-quanta-rose active:text-quanta-air
        pressed:bg-quanta-rose
      `,
    },
    {
      isDisabled: true,
      accent: true,
      class: `
        bg-quanta-snow text-quanta-silver
        hover:bg-quanta-smoke
      `,
    },
  ],
  defaultVariants: {
    variant: 'neutral',
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
          accent: props.accent,
          className,
        }),
      )}
    />
  );
}
