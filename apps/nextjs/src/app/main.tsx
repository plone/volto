import ploneClient from '@plone/client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import getQueryClient from './getQueryClient';
import Content from './content';
import config from './config';

const cli = ploneClient.initialize({
  apiPath: config.settings.apiPath,
});

const expand = ['breadcrumbs', 'navigation'];

export default async function Main() {
  const { getContentQuery } = cli;
  const queryClient = getQueryClient();
  const headersList = headers();
  const path = headersList.get('x-pathname') || '/';
  console.log(`Visiting: ${path}`);
  await queryClient.prefetchQuery(getContentQuery({ path, expand }));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="">
        apiPath in main RSC: {cli.config.apiPath}
        <br /> the content path in main RSC: {path}
        <Content />
      </main>
    </HydrationBoundary>
  );
}
