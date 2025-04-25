import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import UndoControlpanel from './UndoControlpanel';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});
vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

describe('UndoControlpanel', () => {
  it('renders undo controlpanel component', () => {
    const store = mockStore({
      transactions: {
        transactions_recieved: [
          {
            description: 'Added default view for root object',
            id: 'QStrR0RRc0M5TjA9',
            size: 2216,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'Added virtual_hosting',
            id: 'QStrR0RRcTVrbFU9',
            size: 1369,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'Added site error_log at /error_log',
            id: 'QStrR0RRcVh4cGs9',
            size: 1130,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'Added session_data_manager',
            id: 'QStrR0RRcDlFaUk9',
            size: 1405,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'Added browser_id_manager',
            id: 'QStrR0RRcFU2KzQ9',
            size: 840,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'Created initial user',
            id: 'QStrR0RRbUkzKzQ9',
            size: 403,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: '',
            id: 'QStrR0RRbEVVa1E9',
            size: 717,
            time: '2022-06-19T22:15:02',
            username: '',
          },
          {
            description: 'initial database creation',
            id: 'QStrR0ROWlo5YW89',
            size: 154,
            time: '2022-06-19T22:14:50',
            username: '',
          },
        ],
        revert: {
          loading: false,
          loaded: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
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
        <div>
          <UndoControlpanel location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
