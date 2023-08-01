import { injectIntl } from 'react-intl';
import React from 'react';
import ActionsComponent from './Actions';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlActionsComponent = injectIntl(ActionsComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
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
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlActionsComponent {...args} pathname="/test" />
    </Wrapper>
  );
}

export const Actions = StoryComponent.bind({});

export default {
  title: 'Public components/Actions',
  component: Actions,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
