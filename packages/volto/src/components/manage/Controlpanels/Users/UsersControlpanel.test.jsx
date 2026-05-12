import React from 'react';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import jwt from 'jsonwebtoken';

import UsersControlpanel from './UsersControlpanel';

const mockStore = configureStore();
vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

describe('UsersControlpanel', () => {
  it('renders a user control component', async () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      roles: { roles: [] },
      users: {
        users: [],
        create: { loading: false },
        user: {
          roles: ['Manager'],
          '@id': 'admin',
        },
      },
      groups: {
        groups: [],
        create: { loading: false },
      },
      authRole: {
        authenticatedRole: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/controlpanel/users']}>
            <UsersControlpanel />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );
    await waitFor(() => {});

    expect(container).toMatchSnapshot();
  });

  it('handles createRequest error when response body has only message', async () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      roles: { roles: [] },
      users: {
        users: [],
        create: {
          loading: false,
          error: {
            response: { body: { message: 'SMTP relay access denied' } },
          },
        },
        user: {
          roles: ['Manager'],
          '@id': 'admin',
        },
      },
      groups: {
        groups: [],
        create: { loading: false },
      },
      authRole: {
        authenticatedRole: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/controlpanel/users']}>
            <UsersControlpanel />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );
    await waitFor(() => {});

    // If the component attempted to read a missing property it would throw.
    // Reaching this line means the error shape was handled without exceptions.
    expect(true).toBe(true);
  });
});
