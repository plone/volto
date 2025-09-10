import { data, type ActionFunctionArgs } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';

export async function action({ params, request }: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const payload = await request.json();
  const errors = [];

  try {
    //todo: handle errors
    const options = {
      path,
      data: {
        source: payload.source,
      },
    };
    if (payload.action === 'copy') {
      await cli.copyContent(options);
    } else if (payload.action === 'cut') {
      await cli.moveContent(options);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error', e);
    // errors.push({ message: 'Error on delete' });
    //ToDO: display error. Do redirect with querystring to display toast error.
    //return redirect('/@@contents' + path + '?error=');
  }

  return data(payload, 200);
}
