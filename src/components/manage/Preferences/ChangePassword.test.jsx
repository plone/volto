import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';

import ChangePassword from './ChangePassword';

const mockStore = configureStore();

describe('ChangePassword', () => {
  it('renders a change password component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john' }, 'secret'),
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      users: {
        edit: {
          loading: false,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ChangePassword />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
