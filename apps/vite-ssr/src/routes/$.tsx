import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { flattenToAppURL } from '../utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePloneClient } from '@plone/client/provider';
import { Breadcrumbs } from '@plone/components';

const expand = ['breadcrumbs', 'navigation'];

export const Route = createFileRoute('/$')({
  loader: ({ context: { queryClient, ploneClient }, location }) => {
    const { getContentQuery } = ploneClient;
    return queryClient.ensureQueryData(
      getContentQuery({ path: flattenToAppURL(location.pathname), expand }),
    );
  },
  component: SplatRouteComponent,
});

function SplatRouteComponent() {
  const { _splat: path } = Route.useParams();
  const { getContentQuery } = usePloneClient();
  const { data } = useSuspenseQuery(
    getContentQuery({ path: flattenToAppURL(`/${path}`), expand }),
  );
  return (
    <div className="p-2">
      <Breadcrumbs
        items={data['@components'].breadcrumbs.items || []}
        root={data['@components'].breadcrumbs.root}
        includeRoot
      />

      <h1> {data.title}</h1>
    </div>
  );
}
