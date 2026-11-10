import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { CookiesProvider } from 'react-cookie';
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

vi.mock('../Form/Form', () => ({
  default: vi.fn(() => <div className="Form" />),
}));

vi.mock('@plone/volto/components/theme/Unauthorized/Unauthorized', () => ({
  default: vi.fn(() => <div className="Unauthorized" />),
}));

vi.mock('@plone/volto/components/theme/Forbidden/Forbidden', () => ({
  default: vi.fn(() => <div className="Forbidden" />),
}));

const { mockApiGet } = vi.hoisted(() => ({ mockApiGet: vi.fn() }));

vi.mock('@plone/volto/helpers/Api/Api', () => ({
  default: vi.fn(function () {
    return { get: mockApiGet };
  }),
}));

const schema = { properties: {}, fieldsets: [], required: [] };

const makeStore = ({ token = 'a-token', schemaState = {}, types } = {}) =>
  mockStore({
    userSession: { token },
    ...(types && { types }),
    schema: { schema, loading: false, loaded: true, ...schemaState },
    content: { data: {}, create: { loading: false, loaded: false } },
    intl: { locale: 'en', messages: {} },
  });

const renderAdd = (store, pathname = '/add') =>
  render(
    <Provider store={store}>
      <CookiesProvider>
        <MemoryRouter>
          <Add location={{ pathname, search: '?type=Document' }} />
        </MemoryRouter>
      </CookiesProvider>
    </Provider>,
  );

describe('Add', () => {
  beforeEach(() => {
    const toolbar = document.createElement('div');
    toolbar.id = 'toolbar';
    document.body.appendChild(toolbar);
    mockApiGet.mockReset();
    mockApiGet.mockResolvedValue([{ id: 'Document', addable: true }]);
  });

  afterEach(() => {
    document.getElementById('toolbar')?.remove();
  });

  it('checks the @types of the add target', () => {
    renderAdd(makeStore(), '/de/folder/add');
    expect(mockApiGet).toHaveBeenCalledWith('/de/folder/@types');
  });

  it('renders the form when the type is addable', async () => {
    const { container } = renderAdd(makeStore());
    await waitFor(() =>
      expect(container.querySelector('.Form')).not.toBeNull(),
    );
    expect(container.querySelector('.Forbidden')).toBeNull();
  });

  it('does not render the form while the @types check is pending', () => {
    mockApiGet.mockReturnValue(new Promise(() => {}));
    const { container } = renderAdd(makeStore());
    expect(container.querySelector('.Form')).toBeNull();
    expect(container.querySelector('.Forbidden')).toBeNull();
  });

  it('renders Forbidden with a toolbar when the type is not addable', async () => {
    mockApiGet.mockResolvedValue([{ id: 'Document', addable: false }]);
    const { container } = renderAdd(makeStore());
    await waitFor(() =>
      expect(container.querySelector('.Forbidden')).not.toBeNull(),
    );
    expect(container.querySelector('.Form')).toBeNull();
    expect(document.querySelector('#toolbar #Portal')).not.toBeNull();
  });

  it('ignores stale types of a previously visited page in the store', async () => {
    const { container } = renderAdd(
      makeStore({
        types: { loaded: true, types: [{ id: 'Document', addable: false }] },
      }),
      '/de/folder/add',
    );
    await waitFor(() =>
      expect(container.querySelector('.Form')).not.toBeNull(),
    );
    expect(container.querySelector('.Forbidden')).toBeNull();
  });

  it('renders Unauthorized for anonymous users when the schema fetch fails', async () => {
    mockApiGet.mockRejectedValue({ status: 401 });
    const { container } = renderAdd(
      makeStore({
        token: null,
        schemaState: { loaded: false, schema: null, error: { status: 401 } },
      }),
    );
    expect(container.querySelector('.Unauthorized')).not.toBeNull();
  });

  it('renders Unauthorized for a 401 even when a token is present', () => {
    const { container } = renderAdd(
      makeStore({
        schemaState: { loaded: false, schema: null, error: { status: 401 } },
      }),
    );
    expect(container.querySelector('.Unauthorized')).not.toBeNull();
    expect(container.querySelector('.Forbidden')).toBeNull();
  });

  it('renders Forbidden for authenticated users on a 403', () => {
    const { container } = renderAdd(
      makeStore({
        schemaState: { loaded: false, schema: null, error: { status: 403 } },
      }),
    );
    expect(container.querySelector('.Forbidden')).not.toBeNull();
  });

  it('still renders the form if the @types check fails unexpectedly', async () => {
    mockApiGet.mockRejectedValue({ status: 500 });
    const { container } = renderAdd(makeStore());
    await waitFor(() =>
      expect(container.querySelector('.Form')).not.toBeNull(),
    );
  });

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
        <CookiesProvider>
          <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
        </CookiesProvider>
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
        <CookiesProvider>
          <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
        </CookiesProvider>
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
        <CookiesProvider>
          <Add location={{ pathname: '/blog', search: { type: 'Document' } }} />
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
