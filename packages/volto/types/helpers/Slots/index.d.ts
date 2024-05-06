import type { Content } from '@plone/types';
export declare function RouteCondition(path: string, exact?: boolean): ({ pathname }: {
    pathname: string;
}) => boolean;
export declare function ContentTypeCondition(contentType: string[]): ({ content }: {
    content: Content;
}) => boolean;
