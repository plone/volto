import React from 'react';
import ContactFormComponent from './ContactForm';
import { injectIntl } from 'react-intl';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContactFormComponent = injectIntl(ContactFormComponent);

const actions = {
  actions: {
    error: null,
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
      object_buttons: [],
      portal_tabs: [
        {
          icon: '',
          id: 'index_html',
          title: 'Home',
        },
      ],
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
    loaded: true,
    loading: false,
  },
};

function StoryComponent(props) {
  return (
    <Wrapper customStore={{ actions, unlockRequest: {} }}>
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlContactFormComponent
        {...props}
        pathname="/contact"
        error={props.error ? { message: props.error } : null}
      />
    </Wrapper>
  );
}

export const ContactForm = StoryComponent.bind({});
ContactForm.args = {
  error: { message: 'Something' },
  loading: false,
  loaded: true,
};

export default {
  title: 'Public components/Contact Form',
  component: ContactFormComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    error: { control: 'text' },
  },
};
