import { data, type ActionFunctionArgs } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { HandleCatchedError } from '../helpers/Errors';

export async function action({ request }: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

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
