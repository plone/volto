import React, { type JSX, type ReactElement } from 'react';
import type { AriaLabelingProps, DOMProps } from '@react-types/shared';
import { useSlotProps } from '@react-spectrum/utils';
import { filterDOMProps } from '@react-aria/utils';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

export interface IconProps extends DOMProps, AriaLabelingProps {
  /**
   * A screen reader only label for the Icon.
   */
  'aria-label'?: string;
  /**
   * The content to display. Should be an SVG.
   */
  children: ReactElement<any>;
  /**
   * Size of Icon (changes based on scale).
   */
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  /**
   * A slot to place the icon in.
   * @default 'icon'
   */
  slot?: string;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true';
  /**
   * Color of the Icon. It can be a HEX color or a CSS custom property.
   */
  color?: string;
  /**
   * Custom class name to apply to the icon.
   */
  className?: string;
  style?: React.CSSProperties;
}

export type IconPropsWithoutChildren = Omit<IconProps, 'children'>;

const icon = tv({
  base: 'q icon',
  variants: {
    size: {
      '2xs': 'icon-2xs',
      xs: 'icon-xs',
      sm: 'icon-sm',
      base: 'icon-base',
      lg: 'icon-lg',
      xl: 'icon-xl',
      '2xl': 'icon-2xl',
      '3xl': 'icon-3xl',
    },
  },
});

export function Icon(props: IconProps): JSX.Element {
  props = useSlotProps(props, 'icon');
  const { children, size, 'aria-label': ariaLabel, ...otherProps } = props;
  let { 'aria-hidden': ariaHidden } = props;
  if (!ariaHidden) {
    ariaHidden = undefined;
  }

  const color = props.color?.startsWith('--')
    ? `var(${props.color})`
    : props.color || 'currentColor';

  return React.cloneElement(children, {
    ...filterDOMProps(otherProps),
    focusable: 'false',
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? ariaHidden || undefined : true,
    role: 'img',
    className: icon({
      size,
      className: clsx(children.props.className, props.className),
    }),
    style: { fill: color, ...otherProps.style },
  });
}
