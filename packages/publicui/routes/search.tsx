import { useTranslation } from 'react-i18next';
import {
  data,
  Form,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import type PloneClient from '@plone/client';

import config from '@plone/registry';
import { Container, Input } from '@plone/components/quanta';

export const handle = {
  bodyClass: 'search-route',
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const path = `/${params['*'] || ''}`;
  const url = new URL(request.url);
  const query = url.searchParams.get('SearchableText') || '';

  try {
    const results = await cli.search({
      query: {
        SearchableText: query ? `${query}*` : '',
        path: {
          query: path || '/',
        },
      },
    });

    return {
      search: results.data.items,
      params: query,
    };
  } catch (error: any) {
    throw data('Search failed', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
}

export const meta = () => {
  return [{ title: 'Search' }];
};

export default function SearchRoute() {
  const { t } = useTranslation();
  const { search, params } = useLoaderData<typeof loader>();

  return (
    <Container width="default" className="route-search">
      <h1 className="documentFirstHeading">
        {params
          ? `${t('publicui.search.title')} "${params}"`
          : t('publicui.search.results')}
      </h1>
      <Form>
        <Input
          type="search"
          id="search"
          name="SearchableText"
          placeholder={t('publicui.search.placeholder')}
        />
        {/* <Icon name={zoomSVG} size="18px" /> */}
      </Form>
      {/*  */}
      {/* <Search items={sitemapnavigation.items} /> */}
      {search?.length > 0 ? (
        search.map((item) => (
          <article className="tileItem" key={item['@id']}>
            <h2 className="tileHeadline">
              {/* <UniversalLink
                      item={item}
                      className="summary url"
                      title={item['@type']}
                    > */}
              {item.title}
              {/* </UniversalLink> */}
            </h2>
            {item.description && (
              <div className="tileBody">
                <span className="description">{item.description}</span>
              </div>
            )}
            <div className="tileFooter">
              Read more
              {/* <UniversalLink item={item}>
                      <FormattedMessage
                        id="Read More…"
                        defaultMessage="Read More…"
                      />
                    </UniversalLink> */}
            </div>
            <div className="visualClear" />
          </article>
        ))
      ) : (
        <div>
          <p className="noResults">{t('publicui.search.noResults')}</p>
        </div>
      )}
    </Container>
  );
}
