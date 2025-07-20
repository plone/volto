import { useLocation, useRouteLoaderData } from 'react-router';
import SlotRenderer from '@plone/layout/SlotRenderer';
import type { RootLoader } from 'seven/app/root';

export default function Content() {
  const contentData = useRouteLoaderData<RootLoader>('root');
  const location = useLocation();

  if (!contentData) {
    return null;
  }
  const { content } = contentData;

  return (
    <SlotRenderer
      name="App"
      content={content}
      location={location}
    ></SlotRenderer>
  );
}
