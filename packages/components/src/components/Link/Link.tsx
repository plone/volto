import React from 'react';
import { forwardRef, ForwardedRef } from 'react';
import { Link as RACLink, LinkProps } from 'react-aria-components';
import { useFlattenToAppURL } from '../../providers/flattenToAppURL';

type forwardRefType = typeof forwardRef;

const Link = (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { flattenToAppURL } = useFlattenToAppURL();
  const flattenedURL = flattenToAppURL(props.href);

  return (
    <RACLink ref={ref} {...props} href={flattenedURL}>
      {props.children}
    </RACLink>
  );
};

const _Link = /*#__PURE__*/ (forwardRef as forwardRefType)(Link);
export { _Link as Link };
