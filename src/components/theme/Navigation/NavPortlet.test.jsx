import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import NavPortlet from './NavPortlet';

const mockStore = configureStore();

jest.mock('~/config', () => ({
  settings: {
    nonContentRoutes: [],
    supportedLanguages: ['en'],
    navDepth: 1,
  },
}));

describe('NavPortlet', () => {
  it('renders a navigation portlet component without active items', () => {
    const store = mockStore({
      navPortlet: {
        '/@navportlet': {
          data: {
            '@id': 'http://localhost:8080/Plone/@navportlet',
            title: 'Navigation',
            items: [
              {
                '@id': '/front-page',
                title: 'Welcome to Plone!',
                href: '/front-page',
              },
              { '@id': '/blog', title: 'Blog', href: '/blog' },
              { '@id': '/users', title: 'Users', href: '/users' },
            ],
          },
          error: undefined,
          loaded: true,
          loading: false,
        },
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
          <NavPortlet params={{}} url="/" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with an active item', () => {
    const store = mockStore({
      navPortlet: {
        '/blog/@navportlet': {
          data: {
            '@id': 'http://localhost:8080/Plone/blog/@navportlet',
            title: 'Navigation',
            items: [
              {
                '@id': '/front-page',
                title: 'Welcome to Plone!',
                href: '/front-page',
              },
              {
                '@id': '/blog',
                title: 'Blog',
                href: '/blog',
                is_current: true,
                is_folderish: true,
                is_in_path: true,
              },
              { '@id': '/users', title: 'Users', href: '/users' },
            ],
          },
          error: undefined,
          loaded: true,
          loading: false,
        },
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
          <NavPortlet pathname="/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  // it('renders a navigation component with an active item when its subchildren are accessed', () => {
  //   const store = mockStore({
  //     navigation: {
  //       items: [
  //         { title: 'Blog', url: '/blog' },
  //         { title: 'Users', url: '/users' },
  //       ],
  //     },
  //     userSession: { token: '1234' },
  //     intl: {
  //       locale: 'en',
  //       messages: {},
  //     },
  //   });
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={[{ pathname: '/blog/2017/12/27' }]}>
  //         <Navigation pathname="/blog/2017/12/27" />
  //       </MemoryRouter>
  //     </Provider>,
  //   );
  //   const json = component.toJSON();
  //   expect(json).toMatchSnapshot();
  // });
  //
  // it('renders a navigation component with only one active item even if there are similar item names', () => {
  //   const store = mockStore({
  //     navigation: {
  //       items: [
  //         { title: 'Blog', url: '/blog' },
  //         { title: 'Blog of mine', url: '/blog-of-mine' },
  //         { title: 'Users', url: '/users' },
  //       ],
  //     },
  //     userSession: { token: '1234' },
  //     intl: {
  //       locale: 'en',
  //       messages: {},
  //     },
  //   });
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={[{ pathname: '/blog' }]}>
  //         <Navigation pathname="/blog" />
  //       </MemoryRouter>
  //     </Provider>,
  //   );
  //   const json = component.toJSON();
  //   expect(json).toMatchSnapshot();
  // });
});
