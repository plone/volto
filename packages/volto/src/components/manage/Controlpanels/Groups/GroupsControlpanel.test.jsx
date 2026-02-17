import React from 'react';
import { render, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import GroupsControlpanel from './GroupsControlpanel';

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
      users: {
        users: [],
        create: { loading: false },
        user: {
          roles: ['Manager'],
          '@id': 'admin',
        },
      },
      roles: { roles: [] },
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
          <>
            <GroupsControlpanel location={{ pathname: '/blog' }} />
            <div id="toolbar"></div>
          </>
        </Provider>,
      );
    });

    expect(container).toMatchSnapshot();
  });
});
