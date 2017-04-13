import React from 'react';
import renderer from 'react-test-renderer';
import Anontools from './Anontools';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore();

describe('Anontools', () => {
  it('renders an anontools component when no token is specified', () => {
    const store = mockStore({ userSession: { token: null } });
    const component = renderer.create(
      <Provider store={store}>
        <Anontools />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should not render an anontools component when a token is specified', () => {
    const store = mockStore({ userSession: { token: '1234' } });
    const component = renderer.create(
      <Provider store={store}>
        <Anontools />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
