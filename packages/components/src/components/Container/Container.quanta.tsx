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
  /** Additional CSS classes. */
  className?: string;
  /** Container width */
  width?: 'layout' | 'default' | 'narrow' | 'full';
} & React.ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

export const Container = <T extends React.ElementType = 'div'>(
  props: ContainerProps<T>,
) => {
  const { as: Component = 'div', children, width, ...rest } = props;

  const container = tv({
    base: '@container mx-auto',
    variants: {
      width: {
        layout: 'max-w-(--layout-container-width)',
        default: 'max-w-(--default-container-width)',
        narrow: 'max-w-(--narrow-container-width)',
        full: 'w-full',
      },
    },
    defaultVariants: {
      width: 'full',
    },
  });

  return (
    <Component
      {...rest}
      className={twMerge(props.className, container({ width }))}
    >
      {children}
    </Component>
  );
};
