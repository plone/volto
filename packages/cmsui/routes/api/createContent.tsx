import {
  data,
  RouterContextProvider,
  type ActionFunctionArgs,
} from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { ploneClientContext } from 'seven/app/middleware.server';

type CreateContentRequest = {
  path?: string;
  data?: Record<string, unknown>;
};

export async function action({
  params,
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

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
      data: body.data as any,
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
