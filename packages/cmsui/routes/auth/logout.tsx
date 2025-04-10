import { type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';
import { redirectWithClearedCookie } from './auth';

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);

  if (token) {
    const cli = config
      .getUtility({
        name: 'ploneClient',
        type: 'client',
      })
      .method() as PloneClient;

    // this does not exist yet in @plone/client
    // but it's also not needed by default
    // see https://6.docs.plone.org/plone.restapi/docs/source/usage/authentication.html
    // await cli.logout();
  }

  return redirectWithClearedCookie();
}
