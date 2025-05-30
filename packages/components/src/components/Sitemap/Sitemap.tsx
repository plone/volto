import React from 'react';
import { Link } from '../Link/Link';

// TODO translations

interface SitemapItem {
  '@id': string;
  title: string;
  description: string;
  items?: SitemapItem[];
}

interface SitemapProps {
  items?: SitemapItem[];
  page_title?: string;
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
