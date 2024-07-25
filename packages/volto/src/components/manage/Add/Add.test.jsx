import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

import Add from './Add';

const mockStore = configureStore();

beforeAll(() => {
  config.settings.supportedLanguages = ['de'];
  config.settings.lazyBundles = {
    cms: [],
  };
  config.settings.loadables = {};
});

jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

jest.mock('../Form/Form', () => jest.fn(() => <div className="Form" />));

describe('Add', () => {
  it('renders an empty add component', () => {
    const store = mockStore({
      schema: {
        schema: null,
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders an add component', () => {
    const store = mockStore({
      schema: {
        schema: {
          some: 'field',
        },
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders an add component with schema', () => {
    const store = mockStore({
      schema: {
        schema: {
          properties: {
            blocks: {
              default: {
                a: { b: 1 },
              },
            },
            blocks_layout: {
              default: {
                items: ['a'],
              },
            },
          },
        },
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
