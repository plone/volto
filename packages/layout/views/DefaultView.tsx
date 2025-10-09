import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';

export default function DefaultView() {
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  return <h1>{content.title}</h1>;
}
