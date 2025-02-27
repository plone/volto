import React, { type ReactElement } from 'react';
import type { AriaLabelingProps, DOMProps } from '@react-types/shared';
import { useSlotProps } from '@react-spectrum/utils';
import { filterDOMProps } from '@react-aria/utils';
import _clsx from 'clsx';

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
  size?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
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
}

export type IconPropsWithoutChildren = Omit<IconProps, 'children'>;

export function Icon(props: IconProps) {
  props = useSlotProps(props, 'icon');
  const { children, size, 'aria-label': ariaLabel, ...otherProps } = props;
  let { 'aria-hidden': ariaHidden } = props;
  if (!ariaHidden) {
    ariaHidden = undefined;
  }

  const iconSize = size ? size : 'M';
  const color = props.color?.startsWith('--')
    ? `var(${props.color})`
    : props.color;
  console.log(color);

  return React.cloneElement(children, {
    ...filterDOMProps(otherProps),
    focusable: 'false',
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? ariaHidden || undefined : true,
    role: 'img',
    className: _clsx(
      'q icon',
      `icon--size${iconSize}`,
      children.props.className,
      props.className,
    ),
    style: { color },
  });
}
