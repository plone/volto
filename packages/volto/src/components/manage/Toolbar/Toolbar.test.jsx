import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';

import Toolbar from './Toolbar';

const mockStore = configureStore([thunk]);

describe('Toolbar', () => {
  it('renders the Toolbar component', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document', addable: true }] },
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'view',
              title: 'View',
            },
            {
              icon: '',
              id: 'edit',
              title: 'Edit',
            },
            {
              icon: '',
              id: 'folderContents',
              title: 'Contents',
            },
            {
              icon: '',
              id: 'history',
              title: 'History',
            },
            {
              icon: '',
              id: 'local_roles',
              title: 'Sharing',
            },
          ],
          object_buttons: [
            {
              icon: '',
              id: 'cut',
              title: 'Cut',
            },
            {
              icon: '',
              id: 'copy',
              title: 'Copy',
            },
            {
              icon: '',
              id: 'delete',
              title: 'Delete',
            },
            {
              icon: '',
              id: 'rename',
              title: 'Rename',
            },
            {
              icon: '',
              id: 'ical_import_enable',
              title: 'Enable icalendar import',
            },
          ],
          portal_tabs: [],
          site_actions: [
            {
              icon: '',
              id: 'sitemap',
              title: 'Site Map',
            },
            {
              icon: '',
              id: 'accessibility',
              title: 'Accessibility',
            },
            {
              icon: '',
              id: 'contact',
              title: 'Contact',
            },
          ],
          user: [
            {
              icon: '',
              id: 'preferences',
              title: 'Preferences',
            },
            {
              icon: '',
              id: 'dashboard',
              title: 'Dashboard',
            },
            {
              icon: '',
              id: 'plone_setup',
              title: 'Site Setup',
            },
            {
              icon: '',
              id: 'logout',
              title: 'Log out',
            },
          ],
        },
      },
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
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
        <CookiesProvider>
          <PluggablesProvider>
            <MemoryRouter>
              <Toolbar pathname="/test" inner={<span />} />
            </MemoryRouter>
          </PluggablesProvider>
        </CookiesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders the Toolbar component with lock', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document', addable: true }] },
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'view',
              title: 'View',
            },
            {
              icon: '',
              id: 'edit',
              title: 'Edit',
            },
            {
              icon: '',
              id: 'folderContents',
              title: 'Contents',
            },
            {
              icon: '',
              id: 'history',
              title: 'History',
            },
            {
              icon: '',
              id: 'local_roles',
              title: 'Sharing',
            },
          ],
          object_buttons: [
            {
              icon: '',
              id: 'cut',
              title: 'Cut',
            },
            {
              icon: '',
              id: 'copy',
              title: 'Copy',
            },
            {
              icon: '',
              id: 'delete',
              title: 'Delete',
            },
            {
              icon: '',
              id: 'rename',
              title: 'Rename',
            },
            {
              icon: '',
              id: 'ical_import_enable',
              title: 'Enable icalendar import',
            },
          ],
          portal_tabs: [],
          site_actions: [
            {
              icon: '',
              id: 'sitemap',
              title: 'Site Map',
            },
            {
              icon: '',
              id: 'accessibility',
              title: 'Accessibility',
            },
            {
              icon: '',
              id: 'contact',
              title: 'Contact',
            },
          ],
          user: [
            {
              icon: '',
              id: 'preferences',
              title: 'Preferences',
            },
            {
              icon: '',
              id: 'dashboard',
              title: 'Dashboard',
            },
            {
              icon: '',
              id: 'plone_setup',
              title: 'Site Setup',
            },
            {
              icon: '',
              id: 'logout',
              title: 'Log out',
            },
          ],
        },
      },
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
          lock: {
            locked: true,
            stealable: true,
            creator: 'joe',
          },
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <CookiesProvider>
          <PluggablesProvider>
            <MemoryRouter>
              <Toolbar pathname="/test" inner={<span />} />
            </MemoryRouter>
          </PluggablesProvider>
        </CookiesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  describe('personal tools button with hideDefaultViewButtons', () => {
    const renderToolbar = (pathname) => {
      const store = mockStore({
        types: { types: [] },
        actions: {
          actions: {
            object: [],
            user: [],
          },
        },
        userSession: {
          token: jwt.sign({ sub: 'admin' }, 'secret'),
        },
        users: {
          user: { fullname: 'admin', roles: ['Manager'] },
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
      return renderer.create(
        <Provider store={store}>
          <CookiesProvider>
            <PluggablesProvider>
              <MemoryRouter>
                <Toolbar
                  pathname={pathname}
                  inner={<span />}
                  hideDefaultViewButtons
                />
              </MemoryRouter>
            </PluggablesProvider>
          </CookiesProvider>
        </Provider>,
      );
    };

    const hasPersonalToolsButton = (component) =>
      component.root
        .findAllByType('button')
        .some((button) => button.props.id === 'toolbar-personal');

    it('is shown on a site setup page', () => {
      const component = renderToolbar('/controlpanel/users');
      expect(hasPersonalToolsButton(component)).toBe(true);
    });

    it('is shown on a site setup page with a language prefix', () => {
      const component = renderToolbar('/en/controlpanel/rules');
      expect(hasPersonalToolsButton(component)).toBe(true);
    });

    it('is hidden while editing content', () => {
      const component = renderToolbar('/folder/edit');
      expect(hasPersonalToolsButton(component)).toBe(false);
    });
  });
});
