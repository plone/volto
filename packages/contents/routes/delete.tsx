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
  const errors: Array<Record<string, any>> = [];
  const ok: Array<any> = [];
  let responses: Array<any> = [];

  try {
    //todo: handle errors
    responses = await Promise.allSettled(
      payload.paths.map(async (i: string) => {
        await cli.deleteContent({ path: i });
      }),
    );
  } catch (e) {
    HandleCatchedError(e, 'Error on delete');
  }

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
