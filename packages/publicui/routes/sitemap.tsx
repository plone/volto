import { useTranslation } from 'react-i18next';
import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import Sitemap from '@plone/layout/components/Sitemap/Sitemap';
import { Container } from '@plone/components/quanta';
import type { NavigationResponse } from '@plone/types';
import { flattenToAppURL } from '@plone/helpers';

export const handle = {
  bodyClass: 'sitemap-route',
};

export async function loader({
  params,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

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
