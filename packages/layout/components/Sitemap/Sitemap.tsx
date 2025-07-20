import { Link } from '@plone/components/quanta';

// TODO translations

interface SitemapItem {
  '@id': string;
  description: string;
  items?: SitemapItem[];
  review_state: string | null;
  title: string;
  // use_view_action_in_listings?: boolean;
  // Additional properties can be added as needed
  [key: string]: any;
}

interface SitemapProps {
  items?: SitemapItem[];
}

const renderItems = (items: SitemapItem[]) => {
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

export default function Sitemap({ items }: SitemapProps) {
  return <div id="sitemap">{items && renderItems(items)}</div>;
}
