import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-intl-redux';
import jwt from 'jsonwebtoken';

import FakeTimers from '@sinonjs/fake-timers';
import History from './History';

const mockStore = configureStore();
vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
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
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <History location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
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
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <History location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
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
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <StaticRouter context={{}} location={'/blog'}>
            <History location={{ pathname: '/blog' }} />
            <div id="toolbar"></div>
          </StaticRouter>
        </CookiesProvider>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
