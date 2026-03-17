import { data, type ActionFunctionArgs } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { HandleCatchedError } from '../helpers/Errors';
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
