import {
  data,
  RouterContextProvider,
  type ActionFunctionArgs,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { HandleCatchedError } from '../helpers/Errors';

export async function action({
  params,
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);

  const path = `/${params['*'] || ''}`;

  const payload = await request.json();
  const errors = [];
  let response = null;

  try {
    const options = {
      path,
      data: {
        source: payload.source,
      },
    };

    if (payload.action === 'copy') {
      response = await cli.copyContent(options);
    } else if (payload.action === 'cut') {
      response = await cli.moveContent(options);
    }
  } catch (e) {
    HandleCatchedError(e, 'Error on paste');
  }

  return data(payload, 200);
}
