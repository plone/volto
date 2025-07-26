import { useTranslation } from 'react-i18next';
import { data, type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import Sitemap from '@plone/layout/components/Sitemap/Sitemap';
import type { NavigationResponse } from '@plone/types';
import { flattenToAppURL } from '@plone/helpers';

import config from '@plone/registry';
import { Container } from '@plone/components/quanta';

export const handle = {
  bodyClass: 'sitemap-route',
};

export async function loader({ params }: LoaderFunctionArgs) {
  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  // TODO path for getNavigation
  const path = `/${params['*'] || ''}`;
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
  const { t } = useTranslation();
  const { sitemapnavigation } = loaderData;

  return (
    <Container width="default" className="route-sitemap">
      <h1 className="documentFirstHeading">{t('publicui.sitemap')}</h1>
      <Sitemap items={sitemapnavigation.items} />
    </Container>
  );
}
