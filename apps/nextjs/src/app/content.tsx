'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { flattenToAppURL } from './utils';
import { usePloneClient } from '@plone/client/provider';
import { Breadcrumbs } from '@plone/components';
import '@plone/components/dist/basic.css';

export default function Content() {
  const { getContentQuery } = usePloneClient();
  const pathname = usePathname();
  const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));

  if (data) {
    return (
      <div style={{ fontSize: '20px' }}>
        <h1>{data.title}</h1>
        {/* <Input
          name="field1"
          title="field 1 title"
          placeholder="Type something…"
          description="Optional help text"
          isRequired
        /> */}
        <Breadcrumbs
          items={data['@components'].breadcrumbs.items || []}
          root={data['@components'].breadcrumbs.root}
          includeRoot
        />
        <ul>
          {data?.['@components']?.navigation?.items?.map((item) => (
            <li key={item['@id']}>
              <Link href={flattenToAppURL(item['@id'])}>
                {flattenToAppURL(item['@id'])}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return '';
}
