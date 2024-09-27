import { useMutation, useQuery } from '@tanstack/react-query';
import { usePloneClient } from '@plone/providers';

export function useContentQuery(pathname: string) {
  const { getContentQuery } = usePloneClient();
  return useQuery({
    ...getContentQuery({
      path: pathname,
    }),
    staleTime: 0,
  });
}

export function useBreadcrumbsQuery(pathname: string) {
  const { getBreadcrumbsQuery } = usePloneClient();
  return useQuery(
    getBreadcrumbsQuery({
      path: pathname,
    }),
  );
}

export function useSearchQuery(pathname: string, textFilter?: string) {
  const { getSearchQuery } = usePloneClient();
  return useQuery(
    getSearchQuery({
      query: {
        path: {
          query: pathname,
          depth: 1,
        },
        sort_on: 'getObjPositionInParent',
        sort_order: 'ascending',
        metadata_fields: '_all',
        show_inactive: true,
        b_size: 100000000,
        ...(textFilter && { SearchableText: `${textFilter}*` }),
      },
    }),
  );
}
