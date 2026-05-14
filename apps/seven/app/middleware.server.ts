import { jwtDecode } from 'jwt-decode';
import { data, createContext } from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { clearAuthOnResponse, getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';
import type PloneClient from '@plone/client';
import type { Route } from './+types/root';
import installServer from './config/server.server';
import { migrateContent } from './config/server/content-migrations.server';

export const ploneClientContext = createContext<PloneClient>();
export const ploneContentContext =
  createContext<Awaited<ReturnType<PloneClient['getContent']>>['data']>();
export const ploneSiteContext =
  createContext<Awaited<ReturnType<PloneClient['getSite']>>['data']>();
export const ploneUserContext = createContext<
  Awaited<ReturnType<PloneClient['getUser']>>['data'] | null
>(null);
export const ploneClearAuthCookieContext = createContext<boolean>(false);

function getAuthorizedResourceHeaders(
  request: Request,
  token?: string,
): HeadersInit {
  const headers = new Headers(request.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    headers.delete('Authorization');
  }

  return headers;
}

export const installServerMiddleware: Route.MiddlewareFunction = async (
  { request, context },
  next,
) => {
  installServer();
};

export const PloneClientMiddleware: Route.MiddlewareFunction = async (
  { request, context },
  next,
) => {
  const token = await getAuthFromRequest(request);

  const PloneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method();

  const cli = PloneClient.initialize({
    apiPath: config.settings.apiPath,
    token,
  });

  context.set(ploneClientContext, cli);
};

export const otherResources: Route.MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  const path = `/${params['*'] || ''}`;

  // Ignore requests for some specific paths
  if (/.well-known\/appspecific\/com.chrome.devtools.json/.test(path)) {
    throw Response.json({});
  }

  if (
    /^https?:\/\//.test(path) ||
    /^favicon.ico\/\//.test(path) ||
    /expand/.test(path) ||
    /^\/assets/.test(path) ||
    /\.(css|css\.map)$/.test(path)
  ) {
    // eslint-disable-next-line no-console
    console.log('matched path not fetched', path);
    throw data('Content Not Found', { status: 404 });
  }
};

export const getAPIResourceWithAuth: Route.MiddlewareFunction = async (
  { request, params },
  next,
) => {
  const path = `/${params['*'] || ''}`;

  if (
    /\/@@images\//.test(path) ||
    /\/@@download\//.test(path) ||
    /\/@@site-logo\//.test(path) ||
    /\/@portrait\//.test(path)
  ) {
    const token = await getAuthFromRequest(request);
    const url = `${config.settings.apiPath}${path}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthorizedResourceHeaders(request, token),
    });

    if (token && response.status === 401) {
      const anonymousResponse = await fetch(url, {
        method: 'GET',
        headers: getAuthorizedResourceHeaders(request),
      });

      if (anonymousResponse.ok) {
        return clearAuthOnResponse(
          new Response(anonymousResponse.body, {
            status: anonymousResponse.status,
            statusText: anonymousResponse.statusText,
            headers: anonymousResponse.headers,
          }),
        );
      }

      return clearAuthOnResponse(
        new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        }),
      );
    }

    return response;
  }
};

export const fetchPloneContent: Route.MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  const expand = ['navroot', 'breadcrumbs', 'navigation', 'actions'];
  const token = await getAuthFromRequest(request);

  let cli = context.get(ploneClientContext);

  const path = `/${params['*'] || ''}`;

  let userId = '';
  if (token) {
    try {
      const decodedToken = jwtDecode<{
        sub: string;
        exp: number;
        fullname: string | null;
      }>(token);
      userId = decodedToken.sub || '';
    } catch {}
  }

  if (userId) expand.push('types');

  const setPloneContext = (
    content: Awaited<ReturnType<PloneClient['getContent']>>,
    site: Awaited<ReturnType<PloneClient['getSite']>>,
    user: Awaited<ReturnType<PloneClient['getUser']>>['data'] | null,
  ) => {
    migrateContent(content.data);

    context.set(ploneContentContext, flattenToAppURL(content.data));
    context.set(ploneSiteContext, flattenToAppURL(site.data));
    context.set(ploneUserContext, user);
  };

  try {
    const [content, site] = await Promise.all([
      cli.getContent({ path, expand }),
      cli.getSite(),
    ]);
    const user = userId
      ? await cli.getUser({ id: userId }).catch(() => null)
      : null;

    setPloneContext(content, site, user?.data ?? null);
  } catch (error: any) {
    if (token && error?.status === 401) {
      const PloneClient = config
        .getUtility({
          name: 'ploneClient',
          type: 'client',
        })
        .method();
      cli = PloneClient.initialize({
        apiPath: config.settings.apiPath,
      });
      context.set(ploneClientContext, cli);

      try {
        const [content, site] = await Promise.all([
          cli.getContent({
            path,
            expand: expand.filter((item) => item !== 'types'),
          }),
          cli.getSite(),
        ]);

        setPloneContext(content, site, null);
        context.set(ploneClearAuthCookieContext, true);
        return;
      } catch (anonymousError: any) {
        throw data('Content Not Found', {
          status:
            typeof anonymousError.status === 'number'
              ? anonymousError.status
              : 500,
        });
      }
    }

    throw data('Content Not Found', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
};
