import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';
import jwt from 'jsonwebtoken';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PersonalTools from './PersonalTools';

const mockStore = configureStore();

describe('Toolbar Personal Tools component', () => {
  it('renders an Toolbar Personal Tools component', () => {
    const store = mockStore({
      users: {
        user: {
          fullname: 'admin',
          email: 'admin@plone.org',
          roles: ['Manager'],
        },
      },
      userSession: {
        token: jwt.sign({ sub: 'admin' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PluggablesProvider>
          <MemoryRouter initialEntries={[{ pathname: '' }]}>
            <PersonalTools
              loadComponent={() => {}}
              theToolbar={{
                current: { getBoundingClientRect: () => ({ width: '320' }) },
              }}
            />
          </MemoryRouter>
        </PluggablesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an Toolbar Personal Tools component - in a non-root path', () => {
    const store = mockStore({
      users: {
        user: {
          fullname: 'admin',
          email: 'admin@plone.org',
          roles: ['Manager'],
        },
      },
      userSession: {
        token: jwt.sign({ sub: 'admin' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PluggablesProvider>
          <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
            <PersonalTools
              loadComponent={() => {}}
              theToolbar={{
                current: { getBoundingClientRect: () => ({ width: '320' }) },
              }}
            />
          </MemoryRouter>
        </PluggablesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an Toolbar Personal Tools component with portrait set', () => {
    const store = mockStore({
      users: {
        user: {
          fullname: 'admin',
          email: 'admin@plone.org',
          roles: ['Manager'],
          portrait: 'http://127.0.0.1:8080/Plone/@portrait/admin',
        },
      },
      userSession: {
        token: jwt.sign({ sub: 'admin' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PluggablesProvider>
          <MemoryRouter>
            <PersonalTools
              loadComponent={() => {}}
              theToolbar={{
                current: { getBoundingClientRect: () => ({ width: '320' }) },
              }}
            />
          </MemoryRouter>
        </PluggablesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
