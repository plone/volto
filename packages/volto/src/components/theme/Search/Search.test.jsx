import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import { __test__ as Search } from './Search';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('./SearchTags', () => jest.fn(() => <div id="search-tags" />));

describe('Search', () => {
  it('renders an empty search component', () => {
    const store = mockStore({
      search: {
        loaded: false,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const history = {
      location: { pathname: '/blog', search: '?SearchableText=blog' },
    };
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Search history={history} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a search component', () => {
    const store = mockStore({
      search: {
        loaded: true,
        items: [
          {
            '@id': '/blog',
            '@type': 'Folder',
            title: 'Blog',
            description: 'My blog',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const history = {
      location: { pathname: '/blog', search: '?SearchableText=blog' },
    };
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Search history={history} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
