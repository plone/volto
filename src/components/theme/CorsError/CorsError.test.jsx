import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import CorsError from './CorsError';

jest.mock('~/config', () => ({
  settings: {
    apiPath: 'http://localhost:8080/Plone',
  },
}));

const mockStore = configureStore();

global.__DEVELOPMENT__ = true;

describe('CorsError', () => {
  it('renders a not found component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <CorsError />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
