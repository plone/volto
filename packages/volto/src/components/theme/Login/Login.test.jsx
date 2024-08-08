import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import Login from './Login';

beforeAll(() => {
  config.settings.nonContentRoutes = [];
  config.settings.navDepth = 1;
});

const mockStore = configureStore();

describe('Login', () => {
  it('renders a login component', () => {
    const store = mockStore({
      userSession: {
        login: {},
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Login location={{ search: {} }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
