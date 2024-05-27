import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { flattenToAppURL } from '../utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePloneClient } from '@plone/providers';
import { Breadcrumbs, RenderBlocks } from '@plone/components';
import config from '@plone/registry';

const expand = ['breadcrumbs', 'navigation'];

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient, ploneClient }, location }) => {
    const { getContentQuery } = ploneClient;
    return queryClient.ensureQueryData(
      getContentQuery({ path: flattenToAppURL(location.pathname), expand }),
    );
  },
  component: IndexComponent,
});

function IndexComponent() {
  const { getContentQuery } = usePloneClient();
  const { data } = useSuspenseQuery(
    getContentQuery({ path: flattenToAppURL('/'), expand }),
  );
  return (
    <div className="p-2">
      <Breadcrumbs
        items={data['@components'].breadcrumbs.items || []}
        root={data['@components'].breadcrumbs.root}
        includeRoot
      />

      <RenderBlocks
        content={data}
        blocksConfig={config.blocks.blocksConfig}
        pathname="/"
      />
    </div>
  );
}
