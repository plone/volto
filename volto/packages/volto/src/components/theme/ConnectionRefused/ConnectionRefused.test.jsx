import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ConnectionRefused from './ConnectionRefused';

const mockStore = configureStore();

global.__DEVELOPMENT__ = true;

describe('ConnectionRefused', () => {
  it('renders a not found component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ConnectionRefused />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
