import React from 'react';
import type { ObjectBrowserItem } from '@plone/types';
type BaseProps = {
    openLinkInNewTab?: boolean;
    download?: boolean;
    children: React.ReactNode;
    className?: string;
    title?: string;
    smooth?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
};
type HrefOnly = {
    href: string;
    item?: never;
} & BaseProps;
type ItemOnly = {
    href?: never;
    item: Partial<ObjectBrowserItem> & {
        remoteUrl?: string;
    };
} & BaseProps;
export type UniversalLinkProps = HrefOnly | ItemOnly;
export interface AppState {
    content: {
        data?: {
            '@components'?: {
                translations?: {
                    items?: {
                        language: string;
                        '@id': string;
                    }[];
                };
            };
        };
    };
    navroot: {
        data: {
            navroot: {
                id: string;
            };
        };
    };
    intl: {
        locale: string;
    };
    userSession: {
        token: string | null;
    };
}
export declare const __test: {
    renderCounter: () => void;
};
export declare function getUrl(props: UniversalLinkProps, token: string | null, item: UniversalLinkProps['item'], children: React.ReactNode): string;
declare const UniversalLink: React.MemoExoticComponent<React.ForwardRefExoticComponent<UniversalLinkProps & React.RefAttributes<HTMLAnchorElement | HTMLDivElement>>>;
export default UniversalLink;
