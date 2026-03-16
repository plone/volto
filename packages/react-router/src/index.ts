import { createCookie, redirect, type LoaderFunctionArgs } from 'react-router';
import { route, index, layout, prefix } from '@react-router/dev/routes';
import type { RouteConfig, RouteConfigEntry } from '@react-router/dev/routes';
import type { ReactRouterRouteEntry } from '@plone/types';
import path from 'node:path';

export function getAddonRoutesConfig(
  routesConfig: Array<ReactRouterRouteEntry>,
  addonsInfo: Array<any>,
): Array<RouteConfigEntry> {
  const resultRoutesConfig: RouteConfig = [];

  for (const routeConfig of routesConfig) {
    if (routeConfig.type !== 'prefix') {
      const containsAddonModule = addonsInfo.find((addon) =>
        routeConfig.file.includes(addon.name),
      );
      if (containsAddonModule) {
        routeConfig.file = path.join(
          containsAddonModule.modulePath,
          routeConfig.file.replace(containsAddonModule.name, ''),
        );
      }
    }
    switch (routeConfig.type) {
      case 'route': {
        const children = routeConfig.children
          ? (getAddonRoutesConfig(
              routeConfig.children,
              addonsInfo,
            ) as Array<RouteConfigEntry>)
          : undefined;
        resultRoutesConfig.push(
          route(
            routeConfig.path,
            routeConfig.file,
            routeConfig.options || {},
            children,
          ),
        );
        break;
      }
      case 'index':
        resultRoutesConfig.push(index(routeConfig.file, routeConfig.options));
        break;

      case 'layout': {
        const children = routeConfig.children
          ? (getAddonRoutesConfig(
              routeConfig.children,
              addonsInfo,
            ) as Array<RouteConfigEntry>)
          : undefined;
        resultRoutesConfig.push(
          layout(routeConfig.file, routeConfig.options || {}, children),
        );
        break;
      }
      case 'prefix':
        resultRoutesConfig.push(
          ...prefix(
            routeConfig.path,
            getAddonRoutesConfig(routeConfig.children, addonsInfo),
          ),
        );
        break;
      default:
        break;
    }
  }
  return resultRoutesConfig;
}

const secret = process.env.COOKIE_SECRET || 'default';
if (secret === 'default' && process.env.NODE_ENV === 'production') {
  console.warn(
    '🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production.',
  );
}

export const cookie = createCookie('auth_seven', {
  secrets: [secret],
  // 30 days
  maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});

export async function getAuthFromRequest(
  request: Request,
): Promise<string | undefined> {
  let token;
  try {
    token = await cookie.parse(request.headers.get('Cookie'));
  } catch {
    // asd
  }
  return token ?? undefined;
}

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
