import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { LogoutComponent as Logout } from './Logout';

const mockStore = configureStore();

jest.mock('../Login/Login', () => jest.fn(() => <div />));

describe('Logout', () => {
  it('renders a logout component', () => {
    const store = mockStore();
    const component = renderer.create(
      <Provider store={store}>
        <Logout location={{}} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
