import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

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
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const history = {
      location: { pathname: '/blog', search: '?SearchableText=blog' },
    };
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Search history={history} />
          <div id="toolbar"></div>
        </MemoryRouter>
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
    const history = {
      location: { pathname: '/blog', search: '?SearchableText=blog' },
    };
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Search history={history} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
