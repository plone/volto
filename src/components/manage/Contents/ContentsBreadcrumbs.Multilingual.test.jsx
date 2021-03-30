import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import ContentsBreadcrumbs from './ContentsBreadcrumbs';

beforeAll(() => {
  config.settings.isMultilingual = true;
});

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
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <ContentsBreadcrumbs items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
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
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <ContentsBreadcrumbs items={breadcrumbs} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
