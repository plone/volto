import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ContentsBreadcrumbs from './ContentsBreadcrumbs';

const mockStore = configureStore();

describe('ContentsBreadcrumbs', () => {
  const breadcrumbs = [
    { title: 'Blog', url: '/blog' },
    { title: 'My first blog', url: '/blog/my-first-blog' },
  ];
  it('renders a ContentsBreadcrumbs component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          navroot: {
            '@type': 'Plone Site',
          },
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentsBreadcrumbs pathname="/blog" items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders a breadcrumbs component containing items with nav_title', () => {
    const breadcrumbs = [
      { title: 'Blog', url: '/blog' },
      {
        title: 'My first blog',
        url: '/blog/my-first-blog',
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
            '@type': 'Plone Site',
          },
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentsBreadcrumbs pathname="/blog" items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
