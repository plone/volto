import { data } from 'react-router';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';
import type { Route } from './+types/root';
import installServer from './config.server';

export const installServerMiddleware: Route.MiddlewareFunction = async (
  { request, context },
  next,
) => {
  installServer();
  // const locale = await i18next.getLocale(request);
  // context.setData({ locale });

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
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

  console.log(path);

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

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
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

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
};
