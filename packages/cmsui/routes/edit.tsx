import { useTranslation } from 'react-i18next';
import {
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import { requireAuthCookie } from './auth/auth';
import { Button } from '@plone/components/tailwind';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const { data: content } = await cli.getContent({ path });
  const { data: schema } = await cli.getType({ contentType: content['@type'] });

  return { content, schema };
}

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

  const formData = await request.formData();

  await cli.updateContent({
    path,
    data: Object.fromEntries(formData),
  });

  return redirect(path);
}

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <main>
      <h1>
        {content.title} - {t('cmsui.edit')}
      </h1>
      <form method="post">
        {Object.entries(schema.properties).map(([key, value]) => {
          if (key !== 'title') return null;
          return (
            <div key={key}>
              <label htmlFor={key}>{value.title}</label>
              <input
                type={value.type}
                id={key}
                name={key}
                defaultValue={content[key]}
              />
            </div>
          );
        })}
        <Button type="submit">{t('cmsui.save')}</Button>
      </form>
    </main>
  );
}
