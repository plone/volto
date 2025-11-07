import React from 'react';
import { render, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
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
    const { container } = await act(async () => {
      return render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/controlpanel/users']}>
            <UsersControlpanel />
            <div id="toolbar"></div>
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(container).toMatchSnapshot();
  });
});
