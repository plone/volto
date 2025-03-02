// import type { Route } from './+types/content';
import { useRouteLoaderData, useLocation } from 'react-router';
import type { Content } from '@plone/types';
// import App from '@plone/slots/components/App';

export default function Content() {
  const data = useRouteLoaderData('root') as Content;
  const pathname = useLocation().pathname;

  return (
    <>
      <h1>{data.title}</h1>
      <div className="bg-amber-400">HELLO</div>
    </>
  );
}
