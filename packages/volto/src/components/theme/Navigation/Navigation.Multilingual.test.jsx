import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import Navigation from './Navigation';

beforeAll(() => {
  config.settings.isMultilingual = true;
});

const mockStore = configureStore();

describe('Navigation Multilingual', () => {
  it('renders a navigation component without active items', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/bla' }]}>
          <Navigation pathname="/en/bla" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with an active item', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <Navigation pathname="/en/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with an active item when its subchildren are accessed', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog/2017/12/27' }]}>
          <Navigation pathname="/en/blog/2017/12/27" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with only one active item even if there are similar item names', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Blog of mine', url: '/en/blog-of-mine' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <Navigation pathname="/en/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
