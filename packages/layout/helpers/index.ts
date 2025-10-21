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

export function isSameDay(start: string, end: string): boolean {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return (
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  );
}

export function getDate(date: string | Date, locale: string): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  const dateTimeFormat = Intl.DateTimeFormat([locale], {
    dateStyle: 'medium',
  });

  return dateTimeFormat.format(dateObject);
}
