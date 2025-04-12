import { redirect, type LoaderFunctionArgs } from 'react-router';
import { cookie, getAuthFromRequest } from '@plone/react-router';

export async function setAuthOnResponse(response: Response, token: string) {
  const header = await cookie.serialize(token);
  response.headers.append('Set-Cookie', header);
  return response;
}

export async function requireAuthCookie(request: Request) {
  const token = await getAuthFromRequest(request);
  if (!token) {
    throw redirect('/login', {
      headers: {
        'Set-Cookie': await cookie.serialize('', {
          maxAge: 0,
        }),
      },
    });
  }
  return token;
}

export async function redirectIfLoggedInLoader({
  request,
}: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);
  if (token) {
    throw redirect('/');
  }
  return null;
}

export async function redirectWithClearedCookie() {
  return redirect('/', {
    headers: {
      'Set-Cookie': await cookie.serialize('', {
        maxAge: 0,
      }),
    },
  });
}
