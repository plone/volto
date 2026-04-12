import { matchPath } from 'react-router';
import type { Content } from '@plone/types';
import type { Location, PathPattern } from 'react-router';

export function RouteCondition(path: string | PathPattern) {
  return ({ location }: { location: Location }) =>
    Boolean(matchPath(path, location.pathname));
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

export function NotContentTypeCondition(contentType: string[]) {
  return ({ content, location }: { content: Content; location: Location }) => {
    return (
      !contentType.includes(content?.['@type']) &&
      !contentType.some((type) => {
        return location.search.includes(`type=${encodeURIComponent(type)}`);
      })
    );
  };
}

export function shouldShowToolbar(content?: Content | null) {
  const actions = content?.['@components']?.actions;
  const isVisible =
    (actions?.object?.some((a) => a.id === 'edit') ?? false) ||
    (actions?.object_buttons?.some((a) => a.id === 'edit') ?? false);

  return isVisible;
}
