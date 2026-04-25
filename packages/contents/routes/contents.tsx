import { useState } from 'react';
import {
  type LoaderFunctionArgs,
  RouterContextProvider,
  useLoaderData,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import { flattenToAppURL } from '@plone/helpers';
import { ContentsTable } from '../components/ContentsTable/ContentsTable';
import Indexes, { defaultIndexes } from '../components/Indexes';
import { ContentsProvider } from '../providers/contents';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import ErrorToast from '@plone/layout/components/Toast/ErrorToast';

import type { TableIndexes } from '../types';

import {
  ploneClientContext,
  ploneContentContext,
} from 'seven/app/middleware.server';

// This is needed because to prevent circular import loops
export type ContentsLoaderType = typeof loader;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({
  params,
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);
  const b_size = 10;
  const cli = context.get(ploneClientContext);
  const content = context.get(ploneContentContext);

  const path = `/${params['*'] || ''}`;

  const searchParams = new URL(request.url).searchParams;
  const searchableText = searchParams.get('SearchableText') || '';

  const page = searchParams.get('page') || '';

  const searchQuery: Parameters<typeof cli.search>[0]['query'] = {
    path: {
      query: path,
      depth: 1,
    },
    sort_on: 'getObjPositionInParent',
    sort_order: 'ascending',
    metadata_fields: '_all',
    show_inactive: true,
    b_size,
  };
  if (searchableText.length > 0) {
    searchQuery.SearchableText = searchableText + '**';
  }
  if (page.length > 0) {
    searchQuery.b_start = Number(page) * b_size;
  }

  const search = flattenToAppURL(
    (
      await cli.search({
        query: searchQuery,
      })
    ).data,
  );

  return { content, search, searchableText, page, b_size };
}

const DEFAULT_TABLE_INDEXES: TableIndexes = {
  order: Object.keys(Indexes),
  values: Object.fromEntries(
    Object.entries(Indexes).map(([key, value]) => [
      key,
      {
        ...value,
        selected: defaultIndexes.indexOf(key) !== -1,
      },
    ]),
  ),
  selectedCount: defaultIndexes.length + 1,
};

export default function Contents() {
  const { content } = useLoaderData<typeof loader>();
  const [indexes, setIndexes] = useState(DEFAULT_TABLE_INDEXES);

  const upload = () => Promise.resolve();
  const properties = () => Promise.resolve();
  const workflow = () => Promise.resolve();
  const tags = () => Promise.resolve();
  const rename = () => Promise.resolve();

  const onSortItems = (_: any, { value }: { value: string }) => {};

  //Indexes

  const onSelectIndex = (index: string) => {
    const new_indexes = { ...indexes };

    new_indexes.values[index].selected = !new_indexes.values[index].selected;
    setIndexes(new_indexes);
  };

  return (
    <main id="main">
      <ContentsProvider>
        <DeleteModal />
        <ContentsTable
          title={content.title}
          pathname={content['@id']}
          // objectActions={props.objectActions}
          // objectActions={[]}
          // loading={loading}
          indexes={indexes}
          onSelectIndex={onSelectIndex}
          sortItems={(id) => onSortItems(undefined, { value: id })}
          upload={upload}
          rename={rename}
          workflow={workflow}
          tags={tags}
          properties={properties}

          // addableTypes={props.addableTypes}
        />
      </ContentsProvider>
    </main>
  );
}

//todo: fix handling errors with toast
export function ErrorBoundary() {
  const queue = config.getUtility({ name: 'queue', type: 'toast' }).method();
  return ErrorToast(queue);
}
