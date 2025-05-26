import { useLocation, useRouteLoaderData } from 'react-router';
import App from '@plone/layout/components/App';
import type { RootLoader } from 'seven/app/root';

export default function Content() {
  const contentData = useRouteLoaderData<RootLoader>('root');
  const location = useLocation();

  if (!contentData) {
    return null;
  }
  const { content } = contentData;

  return <App content={content} location={location}></App>;
}
