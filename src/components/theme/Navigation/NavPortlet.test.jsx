import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import NavPortlet from './NavPortlet';

const mockStore = configureStore();

jest.mock('~/config', () => ({
  settings: {
    apiPath: 'http://localhost:3000/api',
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

  it('renders a navigation component with an active item when its subchildren are accessed', () => {
    const store = mockStore({
      navPortlet: {
        '/folder2/folder21/doc212/@navportlet': {
          data: {
            '@id':
              'http://localhost:3000/api/folder2/folder21/doc212/@navportlet',
            available: true,
            has_custom_name: false,
            items: [
              {
                '@id': 'http://localhost:3000/api/folder2/folder21',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21',
                icon: '',
                is_current: false,
                is_folderish: true,
                is_in_path: true,
                items: [],
                normalized_id: 'folder21',
                review_state: 'private',
                thumb: '',
                title: 'Folder21',
                type: 'folder',
              },
              {
                '@id': 'http://localhost:3000/api/folder2/folder21/doc211',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21/doc211',
                icon: '',
                is_current: false,
                is_folderish: false,
                is_in_path: false,
                items: [],
                normalized_id: 'doc211',
                review_state: 'private',
                thumb: '',
                title: 'Doc211',
                type: 'document',
              },
              {
                '@id': 'http://localhost:3000/api/folder2/folder21/doc212',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21/doc212',
                icon: '',
                is_current: true,
                is_folderish: false,
                is_in_path: false,
                items: [],
                normalized_id: 'doc212',
                review_state: 'private',
                thumb: '',
                title: 'Doc212',
                type: 'document',
              },
            ],
            title: 'Navigation',
            url: 'http://localhost:3000/api/folder2/sitemap',
          },
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
        <MemoryRouter
          initialEntries={[{ pathname: '/folder2/folder21/doc212' }]}
        >
          <NavPortlet pathname="/folder2/folder21/doc212" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with only one active item even if there are similar item names', () => {
    const store = mockStore({
      navPortlet: {
        '/folder2/folder21/doc212/@navportlet': {
          data: {
            '@id':
              'http://localhost:3000/api/folder2/folder21/doc212/@navportlet',
            available: true,
            has_custom_name: false,
            items: [
              {
                '@id': 'http://localhost:3000/api/folder2/folder21',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21',
                icon: '',
                is_current: false,
                is_folderish: true,
                is_in_path: true,
                items: [],
                normalized_id: 'folder21',
                review_state: 'private',
                thumb: '',
                title: 'Folder21',
                type: 'folder',
              },
              {
                '@id': 'http://localhost:3000/api/folder2/folder21/doc211',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21/doc211',
                icon: '',
                is_current: false,
                is_folderish: false,
                is_in_path: false,
                items: [],
                normalized_id: 'doc211',
                review_state: 'private',
                thumb: '',
                title: 'Doc211',
                type: 'document',
              },
              {
                '@id': 'http://localhost:3000/api/folder2/folder21/doc211-copy',
                description: '',
                href: 'http://localhost:3000/api/folder2/folder21/doc211-copy',
                icon: '',
                is_current: true,
                is_folderish: false,
                is_in_path: false,
                items: [],
                normalized_id: 'doc212',
                review_state: 'private',
                thumb: '',
                title: 'Doc212',
                type: 'document',
              },
            ],
            title: 'Navigation',
            url: 'http://localhost:3000/api/folder2/sitemap',
          },
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
        <MemoryRouter
          initialEntries={[{ pathname: '/folder2/folder21/doc211' }]}
        >
          <NavPortlet />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
