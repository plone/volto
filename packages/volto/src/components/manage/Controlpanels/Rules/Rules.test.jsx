import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Rules from './Rules';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('Rules', () => {
  it('renders rules control panel control', () => {
    const store = mockStore({
      rules: {
        add: {
          loaded: false,
          loading: false,
          error: null,
        },
        enable: {
          loaded: false,
          loading: false,
          error: null,
        },
        disable: {
          loaded: false,
          loading: false,
          error: null,
        },
        apply: {
          loaded: false,
          loading: false,
          error: null,
        },
        unapply: {
          loaded: false,
          loading: false,
          error: null,
        },
        remove: {
          loaded: false,
          loading: false,
          error: null,
        },
        get: {
          loaded: false,
          loading: false,
          error: null,
        },
        rules: [],
      },
      content: {
        data: {
          title: 'Blog',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Rules location={{ pathname: '/controlpanel/rules' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
