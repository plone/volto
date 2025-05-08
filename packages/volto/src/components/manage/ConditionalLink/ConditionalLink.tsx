import React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { UniversalLinkProps } from '@plone/volto/components/manage/UniversalLink/UniversalLink';

type ConditionalLinkProps = UniversalLinkProps & {
  condition: boolean;
  to: string;
};

const ConditionalLink = React.forwardRef<
  HTMLAnchorElement,
  ConditionalLinkProps
>(({ condition, to, ...props }, ref) => {
  if (condition) {
    if (!props.item && to) {
      return (
        // @ts-ignore If not here, the build:types fails
        <UniversalLink {...props} href={to} ref={ref}>
          {props.children}
        </UniversalLink>
      );
    } else {
      return (
        <UniversalLink {...props} ref={ref}>
          {props.children}
        </UniversalLink>
      );
    }
  } else {
    return <>{props.children}</>;
  }
});

export default ConditionalLink;
