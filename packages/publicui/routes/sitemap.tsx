import { useTranslation } from 'react-i18next';
import {
  data,
  useLocation,
  useRouteLoaderData,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import type PloneClient from '@plone/client';
import { Sitemap } from '@plone/components';
import type { NavigationResponse } from '@plone/types';
import SlotRenderer from '@plone/layout';
import { flattenToAppURL } from '@plone/helpers';

import type { RootLoader } from 'seven/app/root';
import config from '@plone/registry';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  // TODO path for getNavigation
  const path = `/${params['*'] || ''}`;
  // const path = '/';
  const depth = 3; // TODO: make this configurable

  try {
    return {
      sitemapnavigation: flattenToAppURL(
        (await cli.getNavigation({ path, depth })).data,
      ),
    };
  } catch (error: any) {
    throw data('Sitemap / Navigation Not Found', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
}

export const meta = () => {
  return [{ title: 'Sitemap' }];
};

interface SitemapRouteProps {
  loaderData: {
    sitemapnavigation: NavigationResponse;
  };
}

export default function SitemapRoute({ loaderData }: SitemapRouteProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const contentData = useRouteLoaderData<RootLoader>('root');
  if (!contentData) return null;
  const { content, locale } = contentData;
  const { sitemapnavigation } = loaderData;

  const kwargs = {
    page_title: t('publicui.sitemap'),
  };
  // TODO header and footer for sitemap

  return (
    <div className="app-slot">
      {/* <header className="header-slot">
        <SlotRenderer name="header" content={content} location={location} />
      </header> */}
      <Sitemap items={sitemapnavigation.items} {...kwargs} />
      {/* <footer id="footer">
        <SlotRenderer name="footer" content={content} location={location} />
      </footer> */}
    </div>
  );
}
