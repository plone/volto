import { createCookie, redirect } from 'react-router';
import type { Route } from './+types/login';

let secret = process.env.COOKIE_SECRET || 'default';
if (secret === 'default') {
  console.warn(
    '🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production.',
  );
  secret = 'default-secret';
}

const cookie = createCookie('auth_seven', {
  secrets: [secret],
  // 30 days
  maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});

export async function getAuthFromRequest(request: Request): Promise {
  let token;
  try {
    token = await cookie.parse(request.headers.get('Cookie'));
  } catch (error) {
    // asd
  }
  return token ?? null;
}

export async function setAuthOnResponse(
  response: Response,
  token: string,
): Promise {
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

export async function redirectIfLoggedInLoader({ request }: Route.LoaderArgs) {
  const token = await getAuthFromRequest(request);
  if (token) {
    throw redirect('/');
  }
  return null;
}

export async function redirectWithClearedCookie(): Promise {
  return redirect('/', {
    headers: {
      'Set-Cookie': await cookie.serialize(null, {
        expires: new Date(0),
      }),
    },
  });
}
