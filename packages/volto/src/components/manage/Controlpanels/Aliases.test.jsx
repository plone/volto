import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-intl-redux';

import Aliases from './Aliases';
import { MemoryRouter } from 'react-router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('Aliases', () => {
  it('renders an aliases control component', () => {
    const store = mockStore({
      aliases: {
        add: {
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
          loading: false,
          loaded: true,
          error: null,
        },
        items: [
          {
            datetime: '2022-05-16T11:52:35+00:00',
            manual: true,
            path: '/eventsalias',
            'redirect-to': '/events',
          },
          {
            datetime: '2022-05-17T09:38:19+00:00',
            manual: true,
            path: '/eventsgreatalias',
            'redirect-to': '/events',
          },
          {
            datetime: '2022-05-17T09:38:35+00:00',
            manual: true,
            path: '/eventsincredible',
            'redirect-to': '/events',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Aliases location={{ pathname: '/blog' }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
