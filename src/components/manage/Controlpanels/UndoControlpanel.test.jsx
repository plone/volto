import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import UndoControlpanel from './UndoControlpanel';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('UndoControlpanel', () => {
  it('renders undo controlpanel component', () => {
    const store = mockStore({
      transactions: {
        transactions_recieved: [
          {
            description: 'Added default view for root object',
            id:
              'QStrR0RRc0M5TjA9\n 2022-06-19T22:15:02 Added default view for root object',
            size: 2216,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'Added virtual_hosting',
            id: 'QStrR0RRcTVrbFU9\n 2022-06-19T22:15:02 Added virtual_hosting',
            size: 1369,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'Added site error_log at /error_log',
            id:
              'QStrR0RRcVh4cGs9\n 2022-06-19T22:15:02 Added site error_log at /error_log',
            size: 1130,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'Added session_data_manager',
            id:
              'QStrR0RRcDlFaUk9\n 2022-06-19T22:15:02 Added session_data_manager',
            size: 1405,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'Added browser_id_manager',
            id:
              'QStrR0RRcFU2KzQ9\n 2022-06-19T22:15:02 Added browser_id_manager',
            size: 840,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'Created initial user',
            id: 'QStrR0RRbUkzKzQ9\n 2022-06-19T22:15:02 Created initial user',
            size: 403,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: '',
            id: 'QStrR0RRbEVVa1E9\n 2022-06-19T22:15:02',
            size: 717,
            time: '2022-06-19T22:15:02',
            user_name: '',
          },
          {
            description: 'initial database creation',
            id:
              'QStrR0ROWlo5YW89\n 2022-06-19T22:14:50 initial database creation',
            size: 154,
            time: '2022-06-19T22:14:50',
            user_name: '',
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
    });
    const component = renderer.create(
      <Provider store={store}>
        <UndoControlpanel location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
