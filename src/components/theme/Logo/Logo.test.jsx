import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import config from '@plone/volto/registry';

import Logo from './Logo';

const mockStore = configureStore();

beforeAll(() => {
  config.settings.publicURL = 'http://127.0.0.1:3000';
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
          id: 'http://127.0.0.1:3000/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000',
            title: 'Plone Site',
          },
        },
      },
      router: {
        location: {
          pathname: '/',
        },
      },
      site: {
        data: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
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
          id: 'http://127.0.0.1:3000/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000',
            title: 'Plone Site',
          },
        },
      },
      router: {
        location: {
          pathname: '/',
        },
      },
      site: {
        data: {
          'plone.site_logo':
            'http://127.0.0.1:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
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
          id: 'http://127.0.0.1:3000/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000',
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
            'http://127.0.0.1:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
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
          id: 'http://127.0.0.1:3000/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000',
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
            'http://127.0.0.1:3000/@@site-logo/logo.cab945d8.svg',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
