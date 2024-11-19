import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import { cache } from 'react';
import PloneClient from '@plone/client';
import config from '@plone/registry';

export const client = PloneClient.initialize({
  apiPath: config.settings.apiPath,
});

export const getServerQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
        dehydrate: {
          // per default, only successful Queries are included,
          // this includes pending Queries as well
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
      },
    }),
);

// export function flattenToAppURL(url: string | undefined) {
//   const { apiPath } = config;
//   if (!url) return '/';
//   let flattenedUrl = url;
//   for (const locale of locales) {
//     flattenedUrl = flattenedUrl.replace(`${apiPath}/${locale}`, '');
//   }
//   return flattenedUrl.replace(apiPath, '') || '/';
// }
