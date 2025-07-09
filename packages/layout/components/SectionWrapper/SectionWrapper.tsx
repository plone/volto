import React from 'react';
import cx from 'clsx';

/**
 * Props Types for the SectionWrapper component.
 * They are able to infer the props of the element type passed to the `as` prop.
 */
type SectionWrapperProps<T extends React.ElementType> = {
  /** Primary content. */
  children: React.ReactNode;
  /** An element type to render as (string or function). */
  as?: T;
  /** A layout section the container belongs to outside the content area (e.g. header or footer). */
  section?: string;
  /** Additional CSS classes. */
  className?: string;
  /** SectionWrapper width */
  width?: 'layout' | 'default' | 'narrow' | 'full';
} & React.ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

const SectionWrapper = <T extends React.ElementType = 'div'>(
  props: SectionWrapperProps<T>,
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
  const sectionClasses = cx(baseClass, className, {
    [width || '']: true,
  });

  return (
    <Component {...rest} className={sectionClasses}>
      <div className="block-inner-container">{children}</div>
    </Component>
  );
};

export default SectionWrapper;
