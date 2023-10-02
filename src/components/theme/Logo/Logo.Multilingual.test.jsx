import config from '@plone/volto/registry';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Logo from './Logo';

beforeAll(() => {
  config.settings.isMultilingual = true;
});

const mockStore = configureStore();

describe('Multilingual Logo', () => {
  it('renders a logo component in a multilingual site root', () => {
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

  it('renders a logo component in a multilingual site language root', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://127.0.0.1:3000/en/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000/en',
            title: 'English',
          },
        },
      },
      router: {
        location: {
          pathname: '/en',
        },
      },
      site: {
        data: {
          'plone.site_title': 'Plone Site',
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
          id: 'http://127.0.0.1:3000/en/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000/en',
            title: 'English',
          },
        },
      },
      router: {
        location: {
          pathname: '/en',
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

  it('renders a logo component with a custom logo in a non-root url with path', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      navroot: {
        data: {
          id: 'http://127.0.0.1:3000/en/@navroot',
          navroot: {
            '@id': 'http://127.0.0.1:3000/en',
            title: 'English',
          },
        },
      },
      router: {
        location: {
          pathname: '/en/my/path',
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
