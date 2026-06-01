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
  const errors: Array<Record<string, any>> = [];
  const ok: Array<any> = [];
  let responses: Array<any> = [];

  try {
    responses = await Promise.allSettled(
      payload.paths.map(async (i: string) => {
        await cli.deleteContent({ path: i });
      }),
    );
  } catch (e) {
    HandleCatchedError(e, 'Error on delete');
  }

  responses.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      ok.push(payload.items[i]);
    } else {
      errors.push({ ...payload.items[i], __error: r.reason });
    }
  });

  return data({ ok, errors }, 200);
}
