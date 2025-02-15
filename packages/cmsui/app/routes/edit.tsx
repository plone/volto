import type { Route } from './+types/edit';
import { useLocation, useRouteLoaderData } from 'react-router';

import type { Content } from '@plone/types';

export const meta: Route.MetaFunction = () => {
  return [];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {}

export default function Edit() {
  const data = useRouteLoaderData('root') as Content;
  const pathname = useLocation().pathname;
  return <h1>{data.title}</h1>;
  // return <App content={data} location={{ pathname }} />;
}
