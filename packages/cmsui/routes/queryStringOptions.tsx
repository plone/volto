import { data, type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';

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

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  try {
    const qs = await cli.getQuerystring();
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
