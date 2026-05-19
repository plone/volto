import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { __test__ as Search } from './Search';

const mockStore = configureStore();

vi.mock('../../manage/Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('./SearchTags', () => ({
  default: vi.fn(() => <div id="search-tags" />),
}));

describe('Search', () => {
  it('renders an empty search component', () => {
    const store = mockStore({
      search: {
        loaded: false,
        items: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/search?SearchableText=blog']}>
            <Search />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
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
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/search?SearchableText=blog']}>
            <Search />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
