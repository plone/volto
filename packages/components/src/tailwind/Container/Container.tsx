import React from 'react';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

/**
 * Props Types for the Container component.
 * They are able to infer the props of the element type passed to the `as` prop.
 */
type ContainerProps<T extends React.ElementType> = {
  /** Primary content. */
  children: React.ReactNode;
  /** An element type to render as (string or function). */
  as?: T;
  /** Additional classes. */
  className?: string;
  /** Layout size */
  layout?: boolean;
  /** Narrow size. */
  narrow?: boolean;
} & React.ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

export const Container = <T extends React.ElementType = 'div'>(
  props: ContainerProps<T>,
) => {
  const { as: Component = 'div', children, layout, narrow, ...rest } = props;

  const container = tv({
    base: '@container mx-auto',
    variants: {
      layout: {
        true: 'max-w-(--layout-container-width)',
      },
      default: {
        true: 'max-w-(--default-container-width)',
      },
      narrow: {
        true: 'max-w-(--narrow-container-width)',
      },
    },
    defaultVariants: {
      default: true,
      layout: false,
      narrow: false,
    },
  });

  return (
    <Component
      {...rest}
      className={twMerge(
        props.className,
        container({
          layout,
          narrow,
          default: !layout && !narrow,
        }),
      )}
    >
      {children}
    </Component>
  );
};
