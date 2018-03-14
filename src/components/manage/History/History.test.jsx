import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import History from './History';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
    fromNow: jest.fn(() => 'a few seconds ago'),
  })),
);

describe('History', () => {
  it('renders a history component', () => {
    const store = mockStore({
      history: {
        entries: [
          {
            transition_title: 'Publish',
            type: 'workflow',
            action: 'publish',
            state_title: 'Published',
            time: '2017-04-19T14:09:36+02:00',
            comments: '',
            actor: { fullname: 'Web Admin' },
          },
          {
            transition_title: 'Edited',
            type: 'versioning',
            action: 'Edited',
            time: '2017-04-19T14:09:35+02:00',
            comments: 'Changed text',
            actor: { fullname: 'Web Admin' },
          },
          {
            transition_title: 'Create',
            type: 'workflow',
            action: null,
            state_title: 'Private',
            time: '2017-04-19T14:09:34+02:00',
            comments: '',
            actor: { fullname: 'Web Admin' },
          },
        ],
        revert: {
          loading: false,
          loaded: false,
        },
      },
      content: {
        data: {
          title: 'Blog',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <History location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
