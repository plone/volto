import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import { LoginComponent as Login } from './Login';

const mockStore = configureStore();

describe('Login', () => {
  it('renders a login component', () => {
    const store = mockStore({
      userSession: {
        login: {},
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Login location={{ query: {} }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
