import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-intl-redux';

import Aliases from './Aliases';
import { MemoryRouter } from 'react-router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('@plone/volto/components/manage/Widgets');
vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
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
        messages: {
          Both: 'Both',
          Automatically: 'Automatically',
          Manually: 'Manually',
        },
      },
      site: {
        data: {
          features: {
            filter_aliases_by_date: true,
          },
        },
      },
      actions: {
        actions: {},
      },
      userSession: {
        token: null,
      },
      content: {
        data: {},
        get: {
          loading: false,
          loaded: true,
        },
      },
      types: {
        types: [],
        get: {
          loading: false,
          loaded: true,
        },
      },
    });
    store.dispatch = vi.fn(() => Promise.resolve());
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Aliases location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
