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
  let responses = [];
  try {
    //todo: handle errors
    responses = await Promise.allSettled(
      payload.paths.map(async (i: string) => {
        await cli.deleteContent({ path: i });
      }),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error', e);
    // errors.push({ message: 'Error on delete' });
    //ToDO: display error. Do redirect with querystring to display toast error.
    //return redirect('/@@contents' + path + '?error=');
  }

  console.log('return delete');
  //handle responses and put error responses in payload, and return it
  return data(payload, 200);
}
