import { matchPath } from 'react-router-dom';
import type { Content } from '@plone/types';
import type { Location } from 'history';

export function RouteCondition(path: string, exact?: boolean) {
  return ({ location }: { location: Location }) =>
    Boolean(matchPath(location.pathname, { path, exact }));
}

export function ContentTypeCondition(contentType: string[]) {
  return ({ content, location }: { content: Content; location: Location }) => {
    return (
      contentType.includes(content?.['@type']) ||
      contentType.some((type) => {
        return location.search.includes(`type=${encodeURIComponent(type)}`);
      })
    );
  };
}
