import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { requireAuthCookie } from '@plone/react-router';
import config from '@plone/registry';

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

  const { data: controlpanels } = await cli.getControlpanels();
  return { controlpanels };
}

export default function ControlPanels() {
  const { controlpanels } = useLoaderData<typeof loader>();
  return <p>Hello! I am the route controlpanels.</p>;
}
