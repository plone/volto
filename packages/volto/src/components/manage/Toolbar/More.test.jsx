import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';
import { waitFor, render } from '@testing-library/react';
import config from '@plone/volto/registry';

import More from './More';

jest.mock('../../manage/Display/Display', () =>
  jest.fn(() => <div id="display-select" />),
);

jest.mock('../../manage/Workflow/Workflow', () =>
  jest.fn(() => <div id="state-select" />),
);

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
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
        {
          icon: 'plone-redirection',
          id: 'redirection',
          title: 'URL Management',
        },
        {
          icon: '',
          id: 'rules',
          title: 'Rules',
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
  content: {
    data: {
      '@type': 'Folder',
      is_folderish: true,
    },
  },
  workflow: { history: [], transition: { loaded: true } },
});

describe('Toolbar More component', () => {
  it('renders a Toolbar More component', async () => {
    const { container } = render(
      <PluggablesProvider>
        <Provider store={store}>
          <MemoryRouter>
            <More
              pathname="/blah"
              loadComponent={() => {}}
              theToolbar={{
                current: { getBoundingClientRect: () => ({ width: '320' }) },
              }}
              closeMenu={() => {}}
            />
          </MemoryRouter>
        </Provider>
      </PluggablesProvider>,
    );
    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  it('renders a Toolbar More component with manage content (working copy)', async () => {
    config.settings.hasWorkingCopySupport = true;

    const { container } = render(
      <PluggablesProvider>
        <Provider store={store}>
          <MemoryRouter>
            <More
              pathname="/blah"
              loadComponent={() => {}}
              theToolbar={{
                current: { getBoundingClientRect: () => ({ width: '320' }) },
              }}
              closeMenu={() => {}}
            />
          </MemoryRouter>
        </Provider>
      </PluggablesProvider>,
    );
    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
});
