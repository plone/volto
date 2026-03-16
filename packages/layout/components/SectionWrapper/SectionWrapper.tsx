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
  /** Inline styles for the wrapper. (not wired yet) */
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

const SectionWrapper = (props: SectionWrapperProps<T>) => {
  const {
    as: Component = 'div',
    children,
    className,
    section,
    width,
    style,
    ...rest
  } = props;
  const sectionClasses = cx(
    'section',
    {
      [`
        section-${section}
      `]: section,
    },
    width,
    className,
  );

  return (
    <Component {...rest} className={sectionClasses} style={style}>
      <div className="section-inner-container">{children}</div>
    </Component>
  );
};

export default SectionWrapper;
