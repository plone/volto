import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import GroupsControlpanel from './GroupsControlpanel';

const mockStore = configureStore();
jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
describe('UsersControlpanel', () => {
  it('renders a user control component', () => {
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
    const component = renderer.create(
      <Provider store={store}>
        <GroupsControlpanel location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
