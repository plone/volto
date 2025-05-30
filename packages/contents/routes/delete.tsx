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
  const errors = [];

  try {
    data.items.forEach(async (i: string) => {
      const res = await cli.deleteContent({ path: i });
      //todo: handle erorrs
      if (res.status >= 400) {
        throw new Response('Error', { status: 400 }); //this may will intercepted from ErrorBoundary in contents.tsx route
        // errors.push({
        //   message: 'Error on deleting ' + i + ': ' + res.status,
        // });
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error', e);
    // errors.push({ message: 'Error on delete' });
    //ToDO: display error. Do redirect with querystring to display toast error.
    //return redirect('/@@contents' + path + '?error=');
  }

  return redirect('/@@contents' + path);
}
