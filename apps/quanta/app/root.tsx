import { data, useLoaderData } from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from './i18next.server';
import type { Route } from './+types/root';
import { flattenToAppURL } from './utils';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import installServer from './config.server';

const otherResources: Route.unstable_MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  const path = `/${params['*'] || ''}`;

  if (
    /^https?:\/\//.test(path) ||
    /^favicon.ico\/\//.test(path) ||
    /expand/.test(path) ||
    /\/@@images\//.test(path) ||
    /\/@@download\//.test(path) ||
    /^\/assets/.test(path) ||
    /\.(css|css\.map)$/.test(path)
  ) {
    console.log('matched path not fetched', path);
    throw data('Content Not Found', { status: 404 });
  }

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
};

export const unstable_middleware = [otherResources];

export async function loader({ params, request, context }: Route.LoaderArgs) {
  installServer();
  const locale = await i18next.getLocale(request);

  const expand = ['navroot', 'breadcrumbs', 'navigation'];

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const path = `/${params['*'] || ''}`;

  try {
    return {
      content: flattenToAppURL((await cli.getContent({ path, expand })).data),
      locale,
    };
  } catch (error) {
    console.log(error);
    throw data('Content Not Found', { status: 404 });
  }
}

export type RootLoader = typeof loader;

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useLoaderData<typeof loader>();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return children;
}
