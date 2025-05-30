/**
 * Sitemap displays a hirarchy of links to all the pages in the site.
 */

import React from 'react';
import { Link } from '../Link/Link';

export function getSitemapPath(pathname = '', lang) {
  const prefix = pathname.replace(/\/sitemap$/gm, '').replace(/^\//, '');
  const path = prefix || lang || '';
  return path;
}

interface SitemapItem {
  '@id': string;
  title: string;
  description: string;
  items?: SitemapItem[];
}

const renderItems = (items: SitemapItem[]): JSX.Element => {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item['@id']}
          className={(item.items?.length ?? 0) > 0 ? 'with-children' : ''}
        >
          <Link href={item['@id']}>{item.title}</Link>
          {item.items && renderItems(item.items)}
        </li>
      ))}
    </ul>
  );
};

/**
 * Sitemap displays a hierarchy of links to all the pages in the site.
 * { getNavigation, location, intl, lang, items }
 * TODO translations
 */
interface SitemapProps {
  items?: any[];
  page_title?: string;
}

export function Sitemap({
  items,
  page_title = 'default title of Sitemap',
}: SitemapProps) {
  return (
    <div id="sitemap">
      {/* TODO translate title sitemap */}
      <h1>{page_title}</h1>
      {items && renderItems(items)}
    </div>
  );
}
