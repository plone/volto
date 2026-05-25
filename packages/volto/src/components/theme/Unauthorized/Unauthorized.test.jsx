import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Unauthorized from './Unauthorized';

const mockStore = configureStore();

describe('Unauthorized', () => {
  it('renders an unauthorized component', () => {
    const store = mockStore({
      userSession: {
        token: null,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      apierror: {
        message: 'You are not authorized to access this resource',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Unauthorized />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an unauthorized component for authenticated user', () => {
    const store = mockStore({
      userSession: {
        token: '1234',
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      apierror: {
        message: 'You are not authorized to access this resource',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Unauthorized />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
