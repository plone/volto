import {
  useLocation,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from 'react-router';
import { useAppRouter } from '@plone/providers';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { ContentsTable } from '../components/ContentsTable';
import Indexes, { defaultIndexes } from '../components/Indexes';
import { ContentsProvider } from '../providers/contents';
import DeleteModal from '../components/DeleteModal';
//styles
//import '@plone/components/dist/basic.css'; //commentato perchè è gia incluso in @plone/theming/styles/simple/main.css
import '@plone/theming/styles/simple/main.css';
import '@plone/components/dist/quanta.css';
import '../styles/main.css';

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

  const content = flattenToAppURL(
    (await cli.getContent({ path })).data,
    config.settings.apiPath,
  );
  const breadcrumbs = flattenToAppURL(
    (await cli.getBreadcrumbs({ path })).data,
    config.settings.apiPath,
  );
  const searchableText =
    new URLSearchParams(new URL(request.url).search).get('SearchableText') ||
    null;

  const searchQuery = {
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
  if (searchableText?.length > 0) {
    searchQuery.SearchableText = searchableText + '**';
  }

  const search = flattenToAppURL(
    (
      await cli.search({
        query: searchQuery,
      })
    ).data,
    config.settings.apiPath,
  );

  return { content, search, breadcrumbs, searchableText };
}

export async function action({
  params,
  request,
  ...others
}: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);
  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;
  const path = `/${params['*'] || ''}`;
  console.log(params, request, others);
  //qui deve fare la delete
  //await cli.deleteContent();
  // await cli.updateContent({
  //   path,
  //   data: formData,
  // });

  //deve ritornare alla vista corrente
  //return redirect(path);
}

export default function Contents(props) {
  const location = useLocation();

  const state = {};
  const upload = () => {};
  const properties = () => {};
  const workflow = () => {};
  const tags = () => {};
  const rename = () => {};

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
      <DeleteModal />
      <ContentsTable
        pathname={location.pathname}
        objectActions={props.objectActions}
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
