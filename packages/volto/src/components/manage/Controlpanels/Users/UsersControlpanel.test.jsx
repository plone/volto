import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import UsersControlpanel from './UsersControlpanel';

const mockStore = configureStore();
jest.mock('../../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

describe('UsersControlpanel', () => {
  it('renders a user control component', () => {
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
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <UsersControlpanel location={{ pathname: '/blog' }} />
        <div id="toolbar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
