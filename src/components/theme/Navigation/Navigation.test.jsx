import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Navigation from './Navigation';

const mockStore = configureStore();

jest.mock('~/config', () => ({
  settings: {
    nonContentRoutes: [],
    supportedLanguages: ['en'],
    navDepth: 1,
  },
}));

describe('Navigation', () => {
  it('renders a navigation component without active items', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Blog', url: '/blog' },
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
        <MemoryRouter>
          <Navigation pathname="/" />
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
          { title: 'Blog', url: '/blog' },
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
        <MemoryRouter initialEntries={[{ pathname: '/blog' }]}>
          <Navigation pathname="/blog" />
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
          { title: 'Blog', url: '/blog' },
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
        <MemoryRouter initialEntries={[{ pathname: '/blog/2017/12/27' }]}>
          <Navigation pathname="/blog/2017/12/27" />
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
          { title: 'Blog', url: '/blog' },
          { title: 'Blog of mine', url: '/blog-of-mine' },
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
        <MemoryRouter initialEntries={[{ pathname: '/blog' }]}>
          <Navigation pathname="/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
