import type { Route } from './+types/content';
import { data, useLoaderData, useLocation } from 'react-router';
import type { MetaFunction } from 'react-router';
import PloneClient from '@plone/client';
import App from '@plone/slots/components/App';
import config from '@plone/registry';

export const meta: MetaFunction = () => {
  return [
    { title: 'Plone on React Router 7' },
    { name: 'description', content: 'Welcome to Plone!' },
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
