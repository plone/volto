import { flattenToAppURL } from '@plone/helpers';
import { requireAuthCookie } from '@plone/react-router';
import type { Content } from '@plone/types';
import {
  data,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type RouterContextProvider,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { ploneClientContext } from 'seven/app/middleware.server';
import ContentForm from '../components/ContentForm/ContentForm';

export async function loader({
  params,
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const path = `/${params['*'] || ''}`;
  const cli = context.get(ploneClientContext);
  const query = Object.fromEntries(new URL(request.url).searchParams.entries());

  if (!query.type) {
    // TODO warn about the problem? Or maybe return error 400?
    throw redirect(path);
  }

  const { data: schema } = await cli.getType({ type: query.type });

  return data(flattenToAppURL({ schema, type: query.type }));
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

  const createdContent = await cli.createContent({
    path,
    data: formData,
  });

  const isRoot = /\/$/.test(path);
  const redir = `${isRoot ? path : `${path}/`}${createdContent.data.id}`;
  return redirect(redir);
}

export default function Add() {
  const { schema, type } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const emptyContent = {
    '@type': type,
    title: '',
    blocks: {},
    blocks_layout: { items: [] },
  } as unknown as Content;

  return (
    <ContentForm
      content={emptyContent}
      schema={schema}
      heading={`${t('cmsui.add')} ${type} - ${schema.title}`}
      submitMethod="post"
    />
  );
}
