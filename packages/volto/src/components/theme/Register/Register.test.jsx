import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register';

vi.mock('@plone/volto/components/manage/Form');

const mockStore = configureStore();

describe('Register', () => {
  it('renders a register component', () => {
    const store = mockStore({
      users: {
        create: {
          loading: false,
          loaded: false,
          error: null,
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
          <Register />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
