import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ContentsBreadcrumbs from './ContentsBreadcrumbs';

const mockStore = configureStore();

describe('ContentsBreadcrumbs Multilingual', () => {
  const breadcrumbs = [
    { title: 'Blog', url: '/en/blog' },
    { title: 'My first blog', url: '/en/blog/my-first-blog' },
  ];
  it('renders a ContentsBreadcrumbs component - Multilingual', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          navroot: {
            '@type': 'LRF',
            '@id': '/en',
            title: 'English',
          },
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <ContentsBreadcrumbs items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders a breadcrumbs component containing items with nav_title - Multilingual', () => {
    const breadcrumbs = [
      { title: 'Blog', url: '/en/blog' },
      {
        title: 'My first blog',
        url: '/en/blog/my-first-blog',
        nav_title: 'First one',
      },
    ];
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          navroot: {
            '@type': 'LRF',
            '@id': '/en',
            title: 'English',
          },
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <ContentsBreadcrumbs items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
