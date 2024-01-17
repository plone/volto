import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import RequestTimeout from './RequestTimeout';

const mockStore = configureStore();

global.__DEVELOPMENT__ = true;

describe('RequestTimeout', () => {
  it('renders a request timeout or no connection component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <RequestTimeout />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
