import { data, type ActionFunctionArgs } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';

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
    //todo: handle errors
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
    // eslint-disable-next-line no-console
    console.error('Error', e);
    // errors.push({ message: 'Error on delete' });
    //ToDO: display error. Do redirect with querystring to display toast error.
    //return redirect('/@@contents' + path + '?error=');
  }

  return data(null, 204);
}
