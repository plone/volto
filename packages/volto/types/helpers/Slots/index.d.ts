import type { Content } from '@plone/types';
import type { Location } from 'history';
export declare function RouteCondition(path: string, exact?: boolean): ({ location }: {
    location: Location;
}) => boolean;
export declare function ContentTypeCondition(contentType: string[]): ({ content, location }: {
    content: Content;
    location: Location;
}) => boolean;
