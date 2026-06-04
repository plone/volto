import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import type { Brain, Query } from '@plone/types';

export interface QuerystringSearchResult {
  items: Brain[];
  items_total: number;
}

function parseQuery(raw: string | null): Query[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((c) => c && typeof c.i === 'string' && typeof c.o === 'string')
      .map((c) => ({
        i: c.i,
        o: c.o,
        v: Array.isArray(c.v) ? c.v.map(String) : String(c.v ?? ''),
      }));
  } catch {
    return [];
  }
}

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

  const url = new URL(request.url);
  const query = parseQuery(url.searchParams.get('query'));

  const empty: QuerystringSearchResult = { items: [], items_total: 0 };

  if (query.length === 0) {
    return data(empty, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { data: results } = await cli.querystringSearch({
      query,
      post: true,
    });

    return data(
      {
        items: results?.items ?? [],
        items_total: results?.items_total ?? 0,
      } satisfies QuerystringSearchResult,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch querystring-search results:', error);
    return data(empty, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
