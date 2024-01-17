import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import FakeTimers from '@sinonjs/fake-timers';
import History from './History';

const mockStore = configureStore();
jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

const FIXED_SYSTEM_TIME = '2017-04-23T15:38:00.000Z';

describe('History', () => {
  let clock;
  beforeEach(() => {
    clock = FakeTimers.install({ now: Date.parse(FIXED_SYSTEM_TIME) });
  });
  afterEach(() => {
    clock.uninstall();
  });

  it('renders a history component', () => {
    const store = mockStore({
      reduxAsyncConnect: {},
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'history',
              title: 'History',
            },
          ],
        },
      },
      router: { location: 'foo' },
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

  it('redirects if unassigned', () => {
    const store = mockStore({
      reduxAsyncConnect: {},
      userSession: {
        token: jwt.sign({ fullname: 'John Doe' }, 'secret'),
      },
      actions: {
        actions: {
          document_actions: [],
          object: [],
        },
      },
      router: { location: 'foo' },
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

  it('redirects if unassigned, no token gives unauthorized', () => {
    const store = mockStore({
      reduxAsyncConnect: {},
      userSession: {},
      actions: {
        actions: {
          document_actions: [],
          object: [],
        },
      },
      router: { location: 'foo' },
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
        <StaticRouter context={{}} location={'/blog'}>
          <History location={{ pathname: '/blog' }} />
        </StaticRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
