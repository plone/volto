import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Aliases from './Aliases';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('AddonsControlpanel', () => {
  it('renders an addon control component', () => {
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
    });
    const component = renderer.create(
      <Provider store={store}>
        <Aliases location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
