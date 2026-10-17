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

  const renderSearch = (searchState) => {
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
        ...searchState,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    return render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/search?SearchableText=blog']}>
            <Search />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );
  };

  const paginationItems = (container) => {
    const footer = container.querySelector('.search-footer');
    return {
      prev: footer?.querySelector('a.item:first-child'),
      next: footer?.querySelector('a.item:last-child'),
    };
  };

  it('disables the previous page on the first page of the results', () => {
    const { container } = renderSearch({
      total: 50,
      batching: { next: '/search?b_start=25' },
    });

    const { prev, next } = paginationItems(container);
    expect(prev).toHaveClass('disabled');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(next).not.toHaveClass('disabled');
    expect(next).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables the next page on the last page of the results', () => {
    const { container } = renderSearch({
      total: 50,
      batching: { prev: '/search?b_start=0' },
    });

    const { prev, next } = paginationItems(container);
    expect(prev).not.toHaveClass('disabled');
    expect(prev).toHaveAttribute('aria-disabled', 'false');
    expect(next).toHaveClass('disabled');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  it('enables both pages in the middle of the results', () => {
    const { container } = renderSearch({
      total: 75,
      batching: { prev: '/search?b_start=0', next: '/search?b_start=50' },
    });

    const { prev, next } = paginationItems(container);
    expect(prev).not.toHaveClass('disabled');
    expect(next).not.toHaveClass('disabled');
  });

  it('does not render the paginator when the results fit in one page', () => {
    const { container } = renderSearch({ total: 10, batching: {} });

    expect(container.querySelector('.search-footer')).toBeNull();
  });

  it('renders the number of results from the store', () => {
    const { container } = renderSearch({ total: 50, batching: {} });

    expect(container.querySelector('.items_total')).toHaveTextContent('50');
  });
});
