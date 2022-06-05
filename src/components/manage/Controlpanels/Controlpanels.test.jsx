import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Controlpanels from './Controlpanels';
import config from '@plone/volto/registry';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

jest.mock('./VersionOverview', () =>
  jest.fn(() => <div className="VersionOverview" />),
);

describe('Controlpanels', () => {
  it('renders a controlpanels component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanels: [
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/date-and-time',
            group: 'General',
            title: 'Date and Time',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/lang',
            group: 'General',
            title: 'Language',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/editing',
            group: 'Content',
            title: 'Editing',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/security',
            group: 'Security',
            title: 'Security',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Controlpanels location={{ pathname: '/blog' }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an additional control panel', () => {
    const store = mockStore({
      controlpanels: {
        controlpanels: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const FooComponent = () => {
      return <div>Foo</div>;
    };

    config.settings.controlpanels = [
      {
        '@id': '/manage-myaddon-foo',
        group: 'Add-on Configuration',
        title: 'Foo Management',
      },
    ];
    config.addonRoutes = [
      {
        path: '/controlpanel/manage-myaddon-foo',
        component: FooComponent,
      },
    ];
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Controlpanels location={{ pathname: '/blog' }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
