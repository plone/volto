import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import Delete from './Delete';

const mockStore = configureStore();

vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

describe('Delete', () => {
  it('renders an empty delete component', () => {
    const store = mockStore({
      content: {
        data: undefined,
        delete: {
          loading: false,
          loaded: true,
        },
        get: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      actions: {
        actions: {},
      },
      userSession: {
        token: null,
      },
      types: {
        types: [],
        get: {
          loading: false,
          loaded: true,
        },
      },
    });

    store.dispatch = vi.fn(() => Promise.resolve());

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Delete location={{ pathname: '/blog', search: '' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders a delete component', () => {
    const store = mockStore({
      content: {
        data: {
          title: 'Blog',
        },
        delete: {
          loading: false,
          loaded: true,
        },
        get: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      actions: {
        actions: {},
      },
      userSession: {
        token: null,
      },
      types: {
        types: [],
        get: {
          loading: false,
          loaded: true,
        },
      },
    });

    store.dispatch = vi.fn(() => Promise.resolve());

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Delete location={{ pathname: '/blog', search: '' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
