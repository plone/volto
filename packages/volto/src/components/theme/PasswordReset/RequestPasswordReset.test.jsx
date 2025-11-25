import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import RequestPasswordReset from './RequestPasswordReset';

vi.mock('@plone/volto/components/manage/Form');

const mockStore = configureStore();

describe('RequestPasswordReset', () => {
  it('renders a RequestPasswordReset component', () => {
    const store = mockStore({
      users: {
        reset: {
          error: null,
          loaded: false,
          loading: false,
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
          <RequestPasswordReset />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
