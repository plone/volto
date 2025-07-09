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
  /** A layout section the container belongs to outside the content area (e.g. header or footer). */
  section?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Container width */
  width?: 'layout' | 'default' | 'narrow' | 'full';
} & React.ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

const Container = <T extends React.ElementType = 'div'>(
  props: ContainerProps<T>,
) => {
  const {
    as: Component = 'div',
    children,
    className,
    section,
    width,
    ...rest
  } = props;
  const baseClass = section ? `${section}-block` : 'block';
  const containerClasses = cx(baseClass, className, {
    [width || '']: true,
  });

  return (
    <Component {...rest} className={containerClasses}>
      <div className="block-inner-container">{children}</div>
    </Component>
  );
};

export default Container;
