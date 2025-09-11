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
  const ok = [];
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
  // responses è fatto così:
  // [
  //   { status: 'rejected', reason: { status: 404, data: [Object] } },
  //   { status: 'fulfilled', value: undefined },
  //   { status: 'fulfilled', value: undefined }
  // ]

  responses.forEach((r, i) => {
    if (r.status == 'fulfilled') {
      ok.push(payload.items[i]);
    } else {
      errors.push({ ...payload.items[i], __error: r.reason });
    }
  });

  //handle responses and put error responses in payload, and return it
  return data({ ok, errors }, 200);
}
