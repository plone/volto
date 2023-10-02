import config from '@plone/volto/registry';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import ContextNavigation from './ContextNavigation';

const mockStore = configureStore();

beforeAll(() => {
  config.settings.apiPath = 'http://127.0.0.1:3000/api';
  config.settings.navDepth = 1;
});

describe('ContextNavigation', () => {
  it('renders a navigation slot component without active items', () => {
    const store = mockStore({
      contextNavigation: {
        '/@contextnavigation': {
          data: {
            '@id': 'http://127.0.0.1:8080/Plone/@contextnavigation',
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
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContextNavigation params={{}} url="/" />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a navigation component with an active item', () => {
    const store = mockStore({
      contextNavigation: {
        '/blog/@contextnavigation': {
          data: {
            '@id': 'http://127.0.0.1:8080/Plone/blog/@contextnavigation',
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
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/blog' }]}>
          <ContextNavigation pathname="/blog" />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a navigation component with an active item when its subchildren are accessed', () => {
    const store = mockStore({
      contextNavigation: {
        '/folder2/folder21/doc212/@contextnavigation': {
          data: {
            '@id':
              'http://127.0.0.1:3000/api/folder2/folder21/doc212/@contextnavigation',
            available: true,
            has_custom_name: false,
            items: [
              {
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21',
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
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21/doc211',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21/doc211',
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
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21/doc212',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21/doc212',
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
            url: 'http://127.0.0.1:3000/api/folder2/sitemap',
          },
        },
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: '/folder2/folder21/doc212' }]}
        >
          <ContextNavigation pathname="/folder2/folder21/doc212" />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a navigation component with only one active item even if there are similar item names', () => {
    const store = mockStore({
      contextNavigation: {
        '/folder2/folder21/doc212/@contextnavigation': {
          data: {
            '@id':
              'http://127.0.0.1:3000/api/folder2/folder21/doc212/@contextnavigation',
            available: true,
            has_custom_name: false,
            items: [
              {
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21',
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
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21/doc211',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21/doc211',
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
                '@id': 'http://127.0.0.1:3000/api/folder2/folder21/doc211-copy',
                description: '',
                href: 'http://127.0.0.1:3000/api/folder2/folder21/doc211-copy',
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
            url: 'http://127.0.0.1:3000/api/folder2/sitemap',
          },
        },
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: '/folder2/folder21/doc211' }]}
        >
          <ContextNavigation />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
