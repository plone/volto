import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Actions from './Actions';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Contents');

describe('Actions', () => {
  it('renders an actions component', () => {
    const store = mockStore({
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
      clipboard: {},
      content: { data: { id: 'blog', title: 'Blog' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Actions pathname="/test" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
