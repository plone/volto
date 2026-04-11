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

export const installServerMiddleware: Route.MiddlewareFunction = async (
  { request, context },
  next,
) => {
  installServer();
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
  const token = await getAuthFromRequest(request);
  const expand = ['navroot', 'breadcrumbs', 'navigation', 'actions'];

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

  const path = `/${params['*'] || ''}`;

  try {
    const [content, site] = await Promise.all([
      cli.getContent({ path, expand }),
      cli.getSite(),
    ]);

    migrateContent(content.data);

    context.set(ploneClientContext, cli);
    context.set(ploneContentContext, flattenToAppURL(content.data));
    context.set(ploneSiteContext, flattenToAppURL(site.data));
  } catch (error: any) {
    throw data('Content Not Found', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
};
