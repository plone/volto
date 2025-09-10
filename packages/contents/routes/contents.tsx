import React, { useEffect } from 'react';
import { type LoaderFunctionArgs, useRouteLoaderData } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { CloseIcon, HomeIcon } from '@plone/components/Icons';
import { ContentsTable } from '../components/ContentsTable/ContentsTable';
import Indexes, { defaultIndexes } from '../components/Indexes';
import { ContentsProvider, useContentsContext } from '../providers/contents';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import ErrorToast from '@plone/layout/components/Toast/ErrorToast';

import type { RootLoader } from 'seven/app/root';

// This is needed because to prevent circular import loops
export type ContentsLoaderType = typeof loader;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const searchableText =
    new URLSearchParams(new URL(request.url).search).get('SearchableText') ||
    '';

  const searchQuery: Parameters<typeof cli.search>[0]['query'] = {
    path: {
      query: path,
      depth: 1,
    },
    sort_on: 'getObjPositionInParent',
    sort_order: 'ascending',
    metadata_fields: '_all',
    show_inactive: true,
    b_size: 10,
  };
  if (searchableText.length > 0) {
    searchQuery.SearchableText = searchableText + '**';
  }

  const search = flattenToAppURL(
    (
      await cli.search({
        query: searchQuery,
      })
    ).data,
  );

  const types = await cli.getTypes();
  const addableTypes = types.data.filter((type) => type.addable);

  return { addableTypes, search, searchableText };
}

export default function Contents() {
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  const upload = () => {};
  const properties = () => {};
  const workflow = () => {};
  const tags = () => {};
  const rename = () => {};

  const onSelectIndex = () => {};
  const onSortItems = () => {};

  const indexes = {
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

  return (
    <ContentsProvider>
      <DeleteModal />
      <ContentsTable
        pathname={content['@id']}
        // objectActions={props.objectActions}
        objectActions={[]}
        // loading={loading}
        indexes={indexes}
        onSelectIndex={(index) => {
          onSelectIndex(undefined, { value: index });
        }}
        sortItems={(id) => onSortItems(undefined, { value: id })}
        upload={upload}
        rename={rename}
        workflow={workflow}
        tags={tags}
        properties={properties}

        // addableTypes={props.addableTypes}
      />
    </ContentsProvider>
  );
}

//todo: fix handling errors with toast
export function ErrorBoundary() {
  const queue = config.getUtility({ name: 'queue', type: 'toast' }).method();
  return ErrorToast(queue);
}
