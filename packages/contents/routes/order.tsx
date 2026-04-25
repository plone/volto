import {
  data,
  RouterContextProvider,
  type ActionFunctionArgs,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { HandleCatchedError } from '../helpers/Errors';

export async function action({
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);

  const payload = await request.json();
  const errors = [];

  try {
    await cli.updateContent({
      path: payload.path,
      data: {
        ordering: {
          obj_id: payload.obj_id,
          delta: payload.delta,
          subset_ids: payload.subset_ids,
        },
      },
    });
  } catch (e) {
    HandleCatchedError(e, 'Error on order');
  }

  return data(null, 204);
}
