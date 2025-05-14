import React from 'react';
import type { UniversalLinkProps } from '@plone/volto/components/manage/UniversalLink/UniversalLink';
type ConditionalLinkProps = UniversalLinkProps & {
    condition: boolean;
    to: string;
};
declare const ConditionalLink: React.ForwardRefExoticComponent<ConditionalLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export default ConditionalLink;
