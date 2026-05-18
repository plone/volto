import React from 'react';
import type { UniversalLinkProps } from '@plone/volto/components/manage/UniversalLink/UniversalLink';
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    condition?: boolean;
    to?: string;
    children: React.ReactNode;
} & Omit<UniversalLinkProps, "href" | "item"> & {
    href?: string;
    item?: UniversalLinkProps["item"];
} & React.RefAttributes<HTMLAnchorElement | HTMLDivElement>>>;
export default _default;
