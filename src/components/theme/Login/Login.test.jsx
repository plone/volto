import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { LoginComponent as Login } from './Login';

const mockStore = configureStore();

describe('Login', () => {
  it('renders a login component', () => {
    const store = mockStore({
      userSession: {
        login: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
