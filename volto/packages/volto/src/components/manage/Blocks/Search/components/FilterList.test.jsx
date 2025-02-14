import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

import FilterList from './FilterList';
import SelectFacet from './SelectFacet';
import SelectFacetFilterListEntry from './SelectFacetFilterListEntry';

const mockStore = configureStore();

config.blocks.blocksConfig = {
  search: {
    id: 'search',
    title: 'Search',
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    variations: [],
    extensions: {
      facetWidgets: {
        types: [
          {
            id: 'selectFacet',
            title: 'Select',
            view: SelectFacet,
            isDefault: true,
            schemaEnhancer: SelectFacet.schemaEnhancer,
            stateToValue: SelectFacet.stateToValue,
            valueToQuery: SelectFacet.valueToQuery,
            filterListComponent: SelectFacetFilterListEntry,
          },
        ],
      },
    },
  },
};

describe('FilterList', () => {
  it('renders filters listing component for search block', () => {
    const store = mockStore({
      userSession: { token: null },
      content: { data: { '@id': 'myid' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const data = {
      facets: [
        {
          '@id': 'a',
          field: {
            value: 'portal_type',
            label: 'Portal type',
          },
        },
      ],
    };
    const component = renderer.create(
      <Provider store={store}>
        <FilterList
          data={data}
          facets={{ portal_type: ['Document', 'Folder'] }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
