import React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { UniversalLinkProps } from '@plone/volto/components/manage/UniversalLink/UniversalLink';

type ConditionalLinkProps = {
  condition?: boolean;
  to?: string; // Alias for href
  children: React.ReactNode;
} & Omit<UniversalLinkProps, 'href' | 'item'> & {
    href?: string;
    item?: UniversalLinkProps['item'];
  };

const ConditionalLink = React.forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  ConditionalLinkProps
>(function ConditionalLink(
  { condition = true, to, href, item, children, ...rest },
  ref,
) {
  if (!condition) {
    return <>{children}</>;
  }

  // Normalize: prefer explicit href over "to"
  const finalHref = href ?? to;

  // Rebuild props safely to satisfy UniversalLinkProps union
  const universalLinkProps: UniversalLinkProps = finalHref
    ? { ...rest, href: finalHref, children }
    : { ...rest, item: item!, children }; // assume item is defined if href isn't

  return <UniversalLink ref={ref} {...universalLinkProps} />;
});

export default React.memo(ConditionalLink);
