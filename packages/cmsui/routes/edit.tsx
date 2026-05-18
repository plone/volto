import { flattenToAppURL } from '@plone/helpers';
import { requireAuthCookie } from '@plone/react-router';
import {
  data,
  redirect,
  RouterContextProvider,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ploneClientContext,
  ploneContentContext,
} from 'seven/app/middleware.server';
import ContentForm from '../components/ContentForm/ContentForm';

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);
  const content = context.get(ploneContentContext);

  const { data: schema } = await cli.getType({ type: content['@type'] });

  return data(flattenToAppURL({ content, schema }));
}

export async function action({
  params,
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);

  const path = `/${params['*'] || ''}`;
  const formData = await request.json();

  await cli.updateContent({
    path,
    data: formData,
  });

  return redirect(path);
}

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <ContentForm
      content={content}
      schema={schema}
      heading={`${content.title} - ${t('cmsui.edit')}`}
      submitMethod="patch"
    />
  );
}
