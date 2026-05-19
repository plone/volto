import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';

export interface BackendOperator {
  title: string;
  description?: string;
  widget?: string | null;
  operation?: string;
}

export interface BackendIndex {
  title: string;
  description?: string;
  enabled: boolean;
  sortable: boolean;
  operators: Record<string, BackendOperator>;
  operations?: string[];
  group?: string;
  values?: Record<string, { title: string }>;
  vocabulary?: string | null;
  fetch_vocabulary?: boolean;
}

export interface QuerystringOptionsResponse {
  '@id': string;
  indexes: Record<string, BackendIndex>;
  sortable_indexes?: Record<string, BackendIndex>;
}

export async function loader({
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

  try {
    const { data: qs } = await cli.getQuerystring();
    const response = qs as unknown as QuerystringOptionsResponse;

    return data(
      { indexes: response?.indexes || {} },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch querystring options:', error);
    return data(
      { indexes: {} },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
