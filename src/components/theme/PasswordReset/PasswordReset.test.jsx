import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import PasswordReset from './PasswordReset';

const mockStore = configureStore();

describe('PasswordReset', () => {
  it('renders a PasswordReset component', () => {
    const store = mockStore({
      users: {
        initial: {
          error: null,
          loaded: false,
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PasswordReset
          params={{ token: 'a9dd24f9aab74bdea66aba6d80ef651b' }}
          location={{ query: { userid: 'victor@plone.org' } }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
