import {
  useLocation,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';

export async function action({
  params,
  request,
  ...others
}: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);
  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;
  const path = `/${params['*'] || ''}`;

  const data = await request.json();

  try {
    data.items.forEach(async (i) => {
      await cli.deleteContent({ path: i });
    });
  } catch (e) {
    //ToDO: display error. Do redirect with querystring to display toast error.
  }

  return redirect('/@@contents' + path);
}
