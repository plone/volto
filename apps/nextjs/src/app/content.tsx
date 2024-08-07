'use client';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { usePloneClient, usePloneProvider } from '@plone/providers';
import { Breadcrumbs, RenderBlocks } from '@plone/components';
import config from '@plone/registry';

import '@plone/components/dist/basic.css';

export default function Content() {
  const { getContentQuery } = usePloneClient();
  const pathname = usePathname();
  const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));

  if (data) {
    return (
      <div style={{ fontSize: '20px' }}>
        <Breadcrumbs
          items={data['@components'].breadcrumbs.items || []}
          root={data['@components'].breadcrumbs.root}
          includeRoot
        />
        <RenderBlocks
          content={data}
          blocksConfig={config.blocks.blocksConfig}
          pathname={pathname}
        />
      </div>
    );
  }

  return '';
}
