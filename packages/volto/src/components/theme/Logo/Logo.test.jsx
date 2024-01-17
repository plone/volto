import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import config from '@plone/volto/registry';

import Logo from './Logo';

const mockStore = configureStore();

beforeAll(() => {
  config.settings.publicURL = 'http://localhost:3000';
});

describe('Logo', () => {
  it('renders a logo component with default config', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://localhost:3000/@navroot',
          navroot: {
            '@id': 'http://localhost:3000',
            title: 'Plone Site',
          },
        },
      },
      site: {
        data: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Logo />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders a logo component with a custom logo', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://localhost:3000/@navroot',
          navroot: {
            '@id': 'http://localhost:3000',
            title: 'Plone Site',
          },
        },
      },
      site: {
        data: {
          'plone.site_logo':
            'http://localhost:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Logo />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a logo component with default config in a non-root url', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://localhost:3000/@navroot',
          navroot: {
            '@id': 'http://localhost:3000',
            title: 'Plone Site',
          },
        },
      },
      router: {
        location: {
          pathname: '/some-page',
        },
      },
      site: {
        data: {
          'plone.site_logo':
            'http://localhost:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/some-page' }]}>
          <Logo />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a logo component with a custom logo in a non-root url', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://localhost:3000/@navroot',
          navroot: {
            '@id': 'http://localhost:3000',
            title: 'Plone Site',
          },
        },
      },
      site: {
        data: {
          'plone.site_logo':
            'http://localhost:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/some-page' }]}>
          <Logo />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
