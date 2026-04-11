import { type LoaderFunctionArgs } from 'react-router';
import {
  getAuthFromRequest,
  redirectWithClearedCookie,
} from '@plone/react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);

  if (token) {
    // this does not exist yet in @plone/client
    // but it's also not needed by default
    // see https://6.docs.plone.org/plone.restapi/docs/source/usage/authentication.html
    // await cli.logout();
  }

  return redirectWithClearedCookie();
}
