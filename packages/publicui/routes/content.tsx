import {
  RouterContextProvider,
  useLoaderData,
  useLocation,
  type LoaderFunctionArgs,
} from 'react-router';
import SlotRenderer from '@plone/layout/slots/SlotRenderer';
import { ploneContentContext } from 'seven/app/middleware.server';

export async function loader({
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const { data: content } = context.get(ploneContentContext);
  return { content };
}

export default function Content() {
  const { content } = useLoaderData<typeof loader>();
  const location = useLocation();

  return <SlotRenderer name="main" content={content} location={location} />;
}
