import { type LoaderFunctionArgs, useRouteLoaderData } from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { ContentsTable } from '../components/ContentsTable/ContentsTable';
import Indexes, { defaultIndexes } from '../components/Indexes';
import { ContentsProvider } from '../providers/contents';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import ErrorToast from '../components/ErrorToast/ErrorToast';

import {
  Text,
  Button,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import type { RootLoader } from 'seven/app/root';
import type { ToastContent as MyToastContent } from '../types';

// This is needed because to prevent circular import loops
export type ContentsLoaderType = typeof loader;
// Create a global ToastQueue.
export const queue = new ToastQueue<MyToastContent>();

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
    <ContentsProvider toast={queue}>
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

      <ToastRegion queue={queue}>
        {({ toast }) => (
          <Toast toast={toast}>
            <ToastContent>
              <Text slot="title">{toast.content.title}</Text>
              <Text slot="description">{toast.content.description}</Text>
            </ToastContent>
            <Button slot="close">x</Button>
          </Toast>
        )}
      </ToastRegion>
    </ContentsProvider>
  );
}

//todo: fix handling errors with toast
export function ErrorBoundary(queue) {
  console.log('handle errors');
  return ErrorToast(queue);
}
