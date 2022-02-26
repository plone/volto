import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';
import { getBaseUrl } from '@plone/volto/helpers';
import SearchBlockView from './SearchBlockView';
import RightColumnFacets from './layout/RightColumnFacets';

const subscriptionsblock_props = {
  variation: {
    id: 'facetsRightSide',
    title: 'Facets on right side',
    view: RightColumnFacets,
    isDefault: true,
  },
  id: 'abc123',
  data: {
    '@type': 'search',
    listingBodyTemplate: 'listing_for_admins',
    query: {
      b_size: '10',
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['News Item'],
        },
      ],
      sort_on: 'effective',
      sort_order: 'descending',
      sort_order_boolean: true,
    },
    showSearchInput: true,
    showSortOn: true,
    sortOnLabel: 'Search for',
    sortOnOptions: ['modified'],
    variation: 'facetsRightSide',
    facets: [],
  },
  path: '/',
  querystring: {},
  facets: {},
};
subscriptionsblock_props.extensions =
  config.blocks.blocksConfig.listing.extensions;

beforeAll(() => {
  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'listing_for_all',
        isDefault: false,
        title: 'Fancy listing variation for general use',
        template: () => <div className="mocked-general-listing-template"></div>,
      },
    ],
    variations_internal: [
      ...(config.blocks.blocksConfig.listing.variations_internal || []),
      {
        id: 'listing_for_admins',
        isDefault: false,
        title: 'Admin listing variation',
        template: () => <div className="mocked-admin-listing-template"></div>,
      },
    ],
  };
});

const mockStore = configureStore();

describe('SearchBlock', () => {
  it('renders a search block with special admin list variation template', () => {
    const store = mockStore({
      querystringsearch: {
        subrequests: {
          abc123: {
            items: [
              {
                '@id': 'http://localhost:8080/Plone/the-page',
                '@type': 'Document',
                description: '',
                review_state: 'private',
                title: 'the page',
              },
              {
                '@id': 'http://localhost:8080/Plone/front-page',
                '@type': 'Document',
                description:
                  'Congratulations! You have successfully installed Plone.',
                review_state: 'published',
                title: 'Welcome to Plone',
              },
            ],
            total: 2,
          },
        },
      },
      content: {
        data: {
          is_folderish: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      breadcrumbs: [],
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBlockView
            {...subscriptionsblock_props}
            path={getBaseUrl(subscriptionsblock_props.path)}
            mode="view"
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
