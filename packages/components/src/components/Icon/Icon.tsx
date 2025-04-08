import React, { type ReactElement } from 'react';
import type {
  AriaLabelingProps,
  DOMProps,
  IconColorValue,
  StyleProps,
} from '@react-types/shared';
import {
  baseStyleProps,
  type StyleHandlers,
  useSlotProps,
  useStyleProps,
} from '@react-spectrum/utils';
import { filterDOMProps } from '@react-aria/utils';
import _clsx from 'clsx';

export interface IconProps extends DOMProps, AriaLabelingProps, StyleProps {
  /**
   * A screen reader only label for the Icon.
   */
  'aria-label'?: string;
  /**
   * The content to display. Should be an SVG.
   */
  children: ReactElement;
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
   * Color of the Icon.
   */
  color?: IconColorValue;
}

export type IconPropsWithoutChildren = Omit<IconProps, 'children'>;

function iconColorValue(value: IconColorValue) {
  return `var(--quanta-color-icon-${value})`;
}

const iconStyleProps: StyleHandlers = {
  ...baseStyleProps,
  color: ['color', iconColorValue],
};

/**
 * Spectrum icons are clear, minimal, and consistent across platforms. They follow the focused and rational principles of the design system in both metaphor and style.
 */
export function Icon(props: IconProps) {
  props = useSlotProps(props, 'icon');
  let {
    children,
    size,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...otherProps
  } = props;
  let { styleProps } = useStyleProps(otherProps, iconStyleProps);

  if (!ariaHidden) {
    ariaHidden = undefined;
  }

  let iconSize = size ? size : 'M';

  return React.cloneElement(children, {
    ...filterDOMProps(otherProps),
    ...styleProps,
    focusable: 'false',
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? ariaHidden || undefined : true,
    role: 'img',
    className: _clsx(
      'q icon',
      `icon--size${iconSize}`,
      children.props.className,
      styleProps.className,
    ),
  });
}
