import {
  data,
  RouterContextProvider,
  type ActionFunctionArgs,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { HandleCatchedError } from '../helpers/Errors';

interface UploadFilePayload {
  name: string;
  type: string;
  data: string; // base64-encoded content
  title: string;
}

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
      payload.files.map(async (file: UploadFilePayload) => {
        const isImage = file.type.startsWith('image/');
        const contentData = isImage
          ? {
              '@type': 'Image' as const,
              title: file.title,
              image: {
                'content-type': file.type,
                data: file.data,
                encoding: 'base64' as const,
                filename: file.name,
              },
            }
          : {
              '@type': 'File' as const,
              title: file.title,
              file: {
                'content-type': file.type,
                data: file.data,
                encoding: 'base64' as const,
                filename: file.name,
              },
            };

        return cli.createContent({ path: payload.path, data: contentData });
      }),
    );
  } catch (e) {
    HandleCatchedError(e, 'Error on upload');
  }

  responses.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      ok.push(payload.files[i]);
    } else {
      errors.push({ ...payload.files[i], __error: r.reason });
    }
  });

  return data({ ok, errors }, 200);
}
