import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { useDebounceValue } from 'usehooks-ts';
import type { QuerystringValue } from '@plone/cmsui/components/QuerystringWidget';
import type { QuerystringSearchResult } from '../../cmsui/routes/querystringSearch';

export function useQuerystringResults(
  querystring: QuerystringValue | undefined,
) {
  const fetcher = useFetcher<QuerystringSearchResult>();

  const querySignature = JSON.stringify(querystring?.query ?? []);
  const [debouncedQuerySignature] = useDebounceValue(querySignature, 400);

  useEffect(() => {
    const criteria = JSON.parse(debouncedQuerySignature);
    if (!criteria || criteria.length === 0) return;

    fetcher.load(
      `/@querystringSearch?query=${encodeURIComponent(debouncedQuerySignature)}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuerySignature]);

  const items = fetcher.data?.items ?? [];
  const total = fetcher.data?.items_total ?? 0;
  const loading = fetcher.state !== 'idle';

  return { items, total, loading };
}
