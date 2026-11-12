import React from 'react';
import { render } from '@testing-library/react';
import { toast } from 'react-toastify';
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

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

vi.mock('../Form/Form', () => ({
  default: vi.fn(() => <div className="Form" />),
}));

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

  it('shows an error that is not JSON when creating the content fails', () => {
    const state = (create) => ({
      schema: { schema: { some: 'field' } },
      content: { data: {}, create },
      intl: { locale: 'en', messages: {} },
    });
    const location = { pathname: '/blog', search: { type: 'Document' } };
    // Browsers have document.all, which Add uses to get the text of an error
    // in HTML; jsdom has not.
    vi.spyOn(DOMParser.prototype, 'parseFromString').mockImplementation(
      (text) => ({ all: [{ textContent: text }] }),
    );
    const { rerender } = render(
      <Provider store={mockStore(state({ loading: true, loaded: false }))}>
        <Add location={location} />
      </Provider>,
    );
    // For example an exception that an event handler of the backend raised.
    rerender(
      <Provider
        store={mockStore(
          state({
            loading: false,
            loaded: false,
            error: { response: { body: { message: 'wrong_sheets' } } },
          }),
        )}
      >
        <Add location={location} />
      </Provider>,
    );
    expect(toast.error).toHaveBeenCalled();
  });
});
