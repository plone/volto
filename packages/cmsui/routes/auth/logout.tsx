import { RouterContextProvider, type LoaderFunctionArgs } from 'react-router';
import {
  getAuthFromRequest,
  redirectWithClearedCookie,
} from '@plone/react-router';
// import { ploneClientContext } from 'seven/app/middleware.server';

export async function loader({
  request,
  // context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await getAuthFromRequest(request);
  // const token = await getAuthFromRequest(request);

  // if (token) {
  // const cli = context.get(ploneClientContext);

  // this does not exist yet in @plone/client
  // but it's also not needed by default
  // see https://6.docs.plone.org/plone.restapi/docs/source/usage/authentication.html
  // await cli.logout();
  // }

  return redirectWithClearedCookie();
}
