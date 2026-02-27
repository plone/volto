import { data, type ActionFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';

type CreateContentRequest = {
  path?: string;
  data?: Record<string, unknown>;
};

export async function action({ params, request }: ActionFunctionArgs) {
  const token = await getAuthFromRequest(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const body = (await request.json()) as CreateContentRequest;
  const pathFromParams = `/${params['*'] || ''}`;
  const path = body.path ?? pathFromParams;

  if (!body.data || typeof body.data !== 'object') {
    return data(
      {
        message: 'Invalid payload: expected a "data" object',
      },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  try {
    const response = await cli.createContent({
      path,
      data: body.data,
    });

    return data(flattenToAppURL(response.data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    const status = Number(error?.status) || 500;
    const message =
      error?.data?.message ||
      error?.message ||
      'Could not create content from upload payload';

    return data(
      {
        message,
        ...(error?.data ? { details: flattenToAppURL(error.data) } : {}),
      },
      {
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
