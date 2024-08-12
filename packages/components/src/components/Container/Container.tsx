import React from 'react';
import cx from 'clsx';

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
  const {
    as: Component = 'div',
    children,
    className,
    layout,
    narrow,
    ...rest
  } = props;
  const classes = cx('q', 'container', className, { layout, narrow });

  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
};
