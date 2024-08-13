import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Anontools from './Anontools';

const mockStore = configureStore();

describe('Anontools', () => {
  it('renders an anontools component when no token is specified', () => {
    const store = mockStore({
      userSession: { token: null },
      content: {
        data: { '@id': 'myid' },
        get: {
          loading: false,
          loaded: true,
          error: null,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Anontools />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should not render an anontools component when a token is specified', () => {
    const store = mockStore({
      userSession: { token: '1234' },
      content: {
        data: {},
        get: {
          loading: false,
          loaded: true,
          error: null,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Anontools />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
