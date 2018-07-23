import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import View from './View';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('./SummaryView', () => {
  const dummyComponent = jest.fn(() => <div id="SummaryView" />);
  dummyComponent.displayName = 'dummyComponent';
  return dummyComponent;
});
jest.mock('./TabularView', () => {
  const dummyComponent = jest.fn(() => <div id="TabularView" />);
  dummyComponent.displayName = 'dummyComponent';
  return dummyComponent;
});
jest.mock('./DocumentView', () => {
  const dummyComponent = jest.fn(() => <div id="DocumentView" />);
  dummyComponent.displayName = 'dummyComponent';
  return dummyComponent;
});
jest.mock('../SocialSharing/SocialSharing', () =>
  jest.fn(() => <div id="SocialSharing" />),
);
jest.mock('../Comments/Comments', () => jest.fn(() => <div id="Comments" />));
jest.mock('../Tags/Tags', () => jest.fn(() => <div id="Tags" />));

const actions = {
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
};

describe('View', () => {
  it('renders an empty view', () => {
    const store = mockStore({
      actions: { actions },
      content: { get: { error: null } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a summary view', () => {
    const store = mockStore({
      actions: { actions },
      content: { data: { layout: 'summary_view' }, get: { error: null } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a tabular view', () => {
    const store = mockStore({
      actions: { actions },
      content: { data: { layout: 'tabular_view' }, get: { error: null } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a document view', () => {
    const store = mockStore({
      actions: { actions },
      content: { data: {}, get: { error: null } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
