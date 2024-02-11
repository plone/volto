import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { flattenToAppURL } from '../utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePloneClient } from '@plone/client/provider';

const expand = ['breadcrumbs', 'navigation'];

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient, ploneClient }, params }) => {
    console.log(params);
    const { getContentQuery } = ploneClient;
    return queryClient.ensureQueryData(
      getContentQuery({ path: flattenToAppURL('/'), expand }),
    );
  },
  component: IndexComponent,
});

function IndexComponent() {
  const { getContentQuery } = usePloneClient();
  const postsQuery = useSuspenseQuery(
    getContentQuery({ path: flattenToAppURL('/'), expand }),
  );
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {postsQuery.data.title}
    </div>
  );
}
