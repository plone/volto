import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';

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
      site: {
        data: {
          'plone.image_scales': { preview: {}, listing: {} },
        },
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      actions: {
        actions: {
          user: [
            {
              id: 'plone_setup',
              title: 'Site Setup',
            },
          ],
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
      site: {
        data: {
          'plone.image_scales': { preview: {}, listing: {} },
        },
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      actions: {
        actions: {
          user: [
            {
              id: 'plone_setup',
              title: 'Site Setup',
            },
          ],
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
          portrait: 'http://localhost:8080/Plone/@portrait/admin',
        },
      },
      userSession: {
        token: jwt.sign({ sub: 'admin' }, 'secret'),
      },
      site: {
        data: {
          'plone.image_scales': { preview: {}, listing: {} },
        },
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
        },
      },
      actions: {
        actions: {
          user: [
            {
              id: 'plone_setup',
              title: 'Site Setup',
            },
          ],
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

  it('renders an Toolbar Personal Tools component without Site Setup access', () => {
    const store = mockStore({
      users: {
        user: {
          fullname: 'regular_user',
          email: 'user@plone.org',
          roles: ['Member'],
        },
      },
      userSession: {
        token: jwt.sign({ sub: 'regular_user' }, 'secret'),
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

  const renderWithPersonalTools = (personalTools) => {
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
      actions: {
        actions: {
          user: [
            {
              id: 'plone_setup',
              title: 'Site Setup',
            },
          ],
          ...(personalTools !== undefined && {
            personal_tools: personalTools,
          }),
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    return renderer.create(
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
  };

  const menuLinks = (component) =>
    component.root.findAllByType('a').map((link) => link.props.href);

  it('renders the entries from the personal_tools actions', () => {
    const component = renderWithPersonalTools([
      {
        id: 'preferences',
        title: 'Preferences',
        url: 'http://localhost:8080/Plone/@@personal-preferences',
      },
      {
        id: 'dashboard',
        title: 'Dashboard',
        url: 'http://localhost:8080/Plone/dashboard',
      },
    ]);
    const hrefs = menuLinks(component);
    expect(hrefs).toEqual(
      expect.arrayContaining(['/@@personal-preferences', '/dashboard']),
    );
    expect(hrefs).not.toContain('/personal-information');
    expect(hrefs).not.toContain('/controlpanel');
  });

  it('falls back to the built-in entries when personal_tools is empty', () => {
    const component = renderWithPersonalTools([]);
    const hrefs = menuLinks(component);
    expect(hrefs).toContain('/personal-information');
    expect(hrefs).toContain('/controlpanel');
  });

  it('falls back to the built-in entries when personal_tools is missing', () => {
    const component = renderWithPersonalTools(undefined);
    const hrefs = menuLinks(component);
    expect(hrefs).toContain('/personal-information');
    expect(hrefs).toContain('/controlpanel');
  });
});
