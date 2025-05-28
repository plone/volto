import { useAppRouter } from '@plone/providers';
import { ContentsTable } from '../components/ContentsTable';
import Indexes, { defaultIndexes } from '../components/Indexes';
import { requireAuthCookie } from '@plone/cmsui/routes/auth/auth';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { useLocation, type LoaderFunctionArgs } from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { ContentsProvider } from '../providers/contents';

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

  const content = flattenToAppURL((await cli.getContent({ path })).data);
  const breadcrumbs = flattenToAppURL(
    (await cli.getBreadcrumbs({ path })).data,
  );
  const searchableText =
    new URLSearchParams(new URL(request.url).search).get('SearchableText') ||
    null;

  const search = flattenToAppURL(
    (
      await cli.search({
        query: {
          path: {
            query: path,
            depth: 1,
          },
          SearchableText: searchableText ? searchableText + '**' : undefined,
          sort_on: 'getObjPositionInParent',
          sort_order: 'ascending',
          metadata_fields: '_all',
          show_inactive: true,
          b_size: 100000000,
        },
      })
    ).data,
  );

  return { content, search, breadcrumbs, searchableText };
}

export default function Contents(props) {
  const location = useLocation();

  const state = {};
  const upload = () => {};
  const properties = () => {};
  const workflow = () => {};
  const tags = () => {};
  const rename = () => {};
  const deleteItem = () => {};
  const onSelectIndex = () => {};
  const onSelectAll = () => {};
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
    <ContentsProvider toast={{ error: () => 'error' }}>
      <ContentsTable
        pathname={location.pathname}
        objectActions={props.objectActions}
        // loading={loading}
        selected={new Set(state.selected)}
        setSelected={(selected) => {
          if (selected === 'all') {
            onSelectAll();
          } else {
            setState({ selected: [...selected] });
          }
        }}
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
        deleteItem={(id) => Promise.resolve(delete (undefined, { value: id }))}
        // addableTypes={props.addableTypes}
      />
    </ContentsProvider>
  );
}
