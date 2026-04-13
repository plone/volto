import { jwtDecode } from 'jwt-decode';
import { data, createContext } from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { getAuthFromRequest } from '@plone/react-router';
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
    return await fetch(`${config.settings.apiPath}${path}`, {
      method: 'GET',
      headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const fetchPloneContent: Route.MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  const expand = ['navroot', 'breadcrumbs', 'navigation', 'actions'];
  const token = await getAuthFromRequest(request);

  const cli = context.get(ploneClientContext);

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

  try {
    const [content, site, user] = await Promise.all([
      cli.getContent({ path, expand }),
      cli.getSite(),
      userId ? cli.getUser({ id: userId }) : Promise.resolve(null),
    ]);

    migrateContent(content.data);

    context.set(ploneContentContext, flattenToAppURL(content.data));
    context.set(ploneSiteContext, flattenToAppURL(site.data));
    context.set(ploneUserContext, user?.data ?? null);
  } catch (error: any) {
    throw data('Content Not Found', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
};
