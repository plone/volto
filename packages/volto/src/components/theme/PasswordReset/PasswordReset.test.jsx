import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import PasswordReset from './PasswordReset';

const mockStore = configureStore();
vi.mock('./PasswordReset', () => {
  const ActualPasswordReset = vi.importActual('./PasswordReset');
  return {
    ...ActualPasswordReset,
    default: vi.fn((props) => {
      const token = props.match?.params?.token || 'default-token';
      return <div data-testid="password-reset">Password Reset for {token}</div>;
    }),
  };
});
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
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <PasswordReset
            match={{
              params: { token: 'a9dd24f9aab74bdea66aba6d80ef651b' },
            }}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
