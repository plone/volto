import type { Route } from './+types/content';
import { data, useLoaderData, useLocation } from 'react-router';
import PloneClient from '@plone/client';
import App from '@plone/slots/components/App';
import config from '@plone/registry';

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: data?.title },
    { name: 'description', content: data?.description },
  ];
};

const expand = ['navroot', 'breadcrumbs', 'navigation'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {
  const ploneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method();

  const { getContent } = ploneClient as PloneClient;

  const path = new URL(request.url).pathname;

  if (
    !(
      /^https?:\/\//.test(path) ||
      /^favicon.ico\/\//.test(path) ||
      /expand/.test(path) ||
      /\/@@images\//.test(path) ||
      /\/@@download\//.test(path) ||
      /^\/assets/.test(path) ||
      /\.(css|css\.map)$/.test(path)
    )
  ) {
    console.log('prefetching', path);
    try {
      return await getContent({ path, expand });
    } catch (error) {
      throw data('Content Not Found', { status: 404 });
    }
  } else {
    console.log('path not prefetched', path);
    throw data('Content Not Found', { status: 404 });
  }
}

export default function Content() {
  const data = useLoaderData<typeof loader>();
  const pathname = useLocation().pathname;

  return <App content={data} location={{ pathname }} />;
}
